"""SignalWire call recordings -> Whisper transcript -> LLM outcome -> ACC warehouse.

Closes the loop on PHONE leads (the dominant CTA). Pulls inbound call recordings from
the SignalWire Compatibility (LaML) API, transcribes each with Whisper, asks an LLM what
actually happened on the call (booked? job type? quoted price?), and UPSERTs the result
to ACC's POST /api/leads/sync as a call lead (channel="call") -- same warehouse + same
Frank sheet as web-form leads, so true ROAS finally includes the phone.

Idempotent: external_id = "call-<CallSid>" so re-runs UPDATE, never duplicate. A local
transcript cache (call_transcripts.json) means Whisper (the only paid-per-run step) is
spent ONCE per recording even across many re-runs.

Usage:
  python transcribe_signalwire.py --days 30                 # pull + transcribe + upload
  python transcribe_signalwire.py --days 7 --dry-run        # show what it'd do, no upload
  python transcribe_signalwire.py --no-upload               # transcribe + extract only
  python transcribe_signalwire.py --min-duration 25         # ignore calls shorter than 25s

Env (Google Ads .env): SIGNALWIRE_PROJECT_ID, SIGNALWIRE_API_TOKEN, SIGNALWIRE_SPACE_URL,
                       OPENAI_API_KEY, ACC_API_KEY, ACC_API_URL
"""
import os, sys, json, argparse, tempfile, datetime
import requests
from dotenv import load_dotenv

sys.stdout.reconfigure(encoding="utf-8", line_buffering=True)
load_dotenv(override=True)

SW_PROJECT = os.getenv("SIGNALWIRE_PROJECT_ID")
SW_TOKEN   = os.getenv("SIGNALWIRE_API_TOKEN")
SW_SPACE   = os.getenv("SIGNALWIRE_SPACE_URL")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")
ACC_KEY    = os.getenv("ACC_API_KEY")
ACC_URL    = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")

TENANT, VERTICAL = "dumpster", "junk-removal"

# ── Call source + pay-per-call billing ───────────────────────────────────────
# The SignalWire "junk removal" project is multi-property:
#   * Frank's OWN marketing numbers (Ads + GBP) — his calls, NOT billable.
#   * Joey's lead-gen CITY sites — calls SOLD to Frank as pay-per-call (billable).
# Each number's human label is the SignalWire "friendly_name" (auto-pulled at runtime),
# so new city sites self-label with no code change.
FRANK_ADS = "+16306525447"   # Dumpster Rescue Landing page (paid search) — Frank's own
FRANK_GBP = "+16306046428"   # Medinah Google Business Profile — Frank's own
FRANK_OWN = {FRANK_ADS, FRANK_GBP}

BILL_THRESHOLD_SEC = 90      # a lead-gen call must connect >= this long to be billable
BILL_RATE_USD = 45.0         # what Frank pays per billable lead-gen call

NUMBER_LABELS = {}           # e164 -> friendly_name, filled by fetch_number_labels()


def fetch_number_labels():
    out = {}
    try:
        r = requests.get(f"{SW_BASE}/IncomingPhoneNumbers.json?PageSize=100", auth=SW_AUTH, timeout=30)
        r.raise_for_status()
        for n in r.json().get("incoming_phone_numbers", []):
            pn = (n.get("phone_number") or "").strip()
            if pn:
                out[pn] = (n.get("friendly_name") or pn).strip()
    except Exception as ex:
        print(f"  (could not fetch number labels: {str(ex)[:60]})")
    return out


def classify(to_number):
    """-> (warehouse_source, human_label, is_leadgen). Frank's own numbers are not lead-gen."""
    to = (to_number or "").strip()
    if to == FRANK_ADS:
        return ("google-ads", "Dumpster Rescue (Google Ads)", False)
    if to == FRANK_GBP:
        return ("organic", "Medinah GBP", False)
    label = NUMBER_LABELS.get(to, to or "Unknown")
    return ("leadgen", label, True)   # any other tracked number = a lead-gen site sold to Frank
CACHE_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "call_transcripts.json")
SW_BASE = f"https://{SW_SPACE}/api/laml/2010-04-01/Accounts/{SW_PROJECT}"
SW_AUTH = (SW_PROJECT, SW_TOKEN)
MAX_SIZE = 24 * 1024 * 1024  # Whisper 25MB limit, leave headroom

EXTRACT_SYSTEM = (
    "You analyze a transcribed inbound phone call to a dumpster-rental / junk-removal company. "
    "Return STRICT JSON with these keys: "
    "booked (bool: did the caller actually schedule/agree to service?), "
    "job_type (short string e.g. 'dumpster rental','junk removal','construction debris', or null), "
    "dumpster_size (e.g. '10 yard','20 yard', or null), "
    "quoted_price (number in USD ONLY if the company explicitly quoted a dollar PRICE for the "
    "service, e.g. \"it'll be three fifty\" -> 350, \"that's $500 out the door\" -> 500. "
    "This is a dumpster/junk job: realistic prices are roughly $200-$1500. "
    "DO NOT use: phone numbers, street addresses, zip codes, dumpster SIZES (10/15/20 yard), "
    "dates, times, square footage, weights/tonnage, item counts, or any number that is not a "
    "spoken dollar price for the service. If no explicit service price was stated, use null.), "
    "service_city (the city/town the job is in, or null), "
    "spam (bool: TRUE ONLY for robocalls/auto-dialers, telemarketing or solicitation calls "
    "(e.g. selling business-listing/SEO/advertising services), wrong numbers, or truly silent/"
    "no-content calls. A REAL prospective customer is NOT spam even if they reached voicemail "
    "and did not book — if the caller leaves a name, a callback number, OR asks about junk/"
    "dumpster/removal service, set spam=false and treat it as a lead. A call in Spanish or any "
    "non-English language is NOT spam. When unsure between a real customer and spam, choose "
    "spam=false.), "
    "summary (one sentence, <=160 chars, what the caller wanted and the outcome). "
    "Only mark booked=true if there is clear agreement to schedule. If unsure, booked=false."
)

PRICE_MAX = 25000  # sanity cap — anything above this on a dumpster call is an extraction error


def clean_price(v):
    """Reject non-price numbers the model may still slip through (zips, phone #s, sizes)."""
    try:
        p = float(v)
    except (TypeError, ValueError):
        return None
    if p <= 0 or p > PRICE_MAX:
        return None
    return p


def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}


def save_cache(cache):
    with open(CACHE_FILE, "w", encoding="utf-8") as f:
        json.dump(cache, f, indent=2)


def list_recordings(days):
    """List call recordings created within the last <days>, paging through the LaML API."""
    cutoff = datetime.datetime.now(datetime.timezone.utc).replace(tzinfo=None) - datetime.timedelta(days=days)
    out, url = [], f"{SW_BASE}/Recordings.json?PageSize=100"
    while url:
        r = requests.get(url, auth=SW_AUTH, timeout=30)
        r.raise_for_status()
        data = r.json()
        for rec in data.get("recordings", []):
            try:
                created = datetime.datetime.strptime(rec["date_created"], "%a, %d %b %Y %H:%M:%S %z")
                if created.replace(tzinfo=None) < cutoff:
                    return out  # recordings are newest-first; once past cutoff we're done
            except Exception:
                pass
            out.append(rec)
        nxt = data.get("next_page_uri")
        url = f"https://{SW_SPACE}{nxt}" if nxt else None
    return out


def call_details(call_sid):
    try:
        r = requests.get(f"{SW_BASE}/Calls/{call_sid}.json", auth=SW_AUTH, timeout=30)
        r.raise_for_status()
        return r.json()
    except Exception:
        return {}


# ── DNI call attribution: gclid (captured at call time) -> exact keyword ──────
def dni_gclid(call_sid):
    """The gclid DNI tied to this call (None if not a tracked paid call)."""
    if not (call_sid and ACC_KEY):
        return None
    try:
        r = requests.get(f"{ACC_URL.rstrip('/')}/api/leads/dni-gclid",
                          params={"callSid": call_sid},
                          headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-dni"}, timeout=20)
        return r.json().get("gclid")
    except Exception:
        return None


def build_click_map(days=30):
    """gclid -> keyword, via click_view (single-day resource, so loop). Empty if Ads creds absent."""
    m = {}
    try:
        from google.ads.googleads.client import GoogleAdsClient
        import datetime as _dt
        cfg = {
            "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
            "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
            "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
            "login_customer_id": "6516751752",
            "use_proto_plus": True,
        }
        if not cfg["developer_token"]:
            return m
        ga = GoogleAdsClient.load_from_dict(cfg).get_service("GoogleAdsService")
        today = _dt.date.today()
        for i in range(days):
            d = (today - _dt.timedelta(days=i)).isoformat()
            q = (f"SELECT click_view.gclid, click_view.keyword_info.text "
                 f"FROM click_view WHERE segments.date = '{d}'")
            try:
                for row in ga.search(customer_id="2253432096", query=q):
                    if row.click_view.gclid:
                        m[row.click_view.gclid] = row.click_view.keyword_info.text or None
            except Exception:
                pass
    except Exception as ex:
        print(f"  (keyword resolution unavailable: {str(ex)[:60]})")
    return m


def download_recording(rec_sid, dest):
    r = requests.get(f"{SW_BASE}/Recordings/{rec_sid}.mp3", auth=SW_AUTH, timeout=120)
    r.raise_for_status()
    with open(dest, "wb") as f:
        f.write(r.content)
    return len(r.content)


def transcribe(path):
    with open(path, "rb") as audio:
        r = requests.post(
            "https://api.openai.com/v1/audio/transcriptions",
            headers={"Authorization": f"Bearer {OPENAI_KEY}"},
            files={"file": ("call.mp3", audio, "audio/mpeg")},
            data={"model": "whisper-1", "response_format": "text"},
            timeout=300,
        )
    r.raise_for_status()
    return r.text.strip()


def extract_outcome(transcript):
    r = requests.post(
        "https://api.openai.com/v1/chat/completions",
        headers={"Authorization": f"Bearer {OPENAI_KEY}", "Content-Type": "application/json"},
        json={
            "model": "gpt-4o-mini",
            "response_format": {"type": "json_object"},
            "temperature": 0,
            "messages": [
                {"role": "system", "content": EXTRACT_SYSTEM},
                {"role": "user", "content": transcript[:12000]},
            ],
        },
        timeout=120,
    )
    r.raise_for_status()
    return json.loads(r.json()["choices"][0]["message"]["content"])


def to_payload(rec, call, ext, attribution=None):
    to_number = call.get("to") or call.get("to_formatted")
    src, src_label, is_leadgen = classify(to_number)
    duration = int(rec.get("duration") or 0)
    spam = bool(ext.get("spam"))
    # Billable = a lead-gen (sold) call that connected long enough and isn't spam.
    billable = is_leadgen and (duration >= BILL_THRESHOLD_SEC) and not spam
    bill_amount = BILL_RATE_USD if billable else 0.0
    return {
        "tenant_id": TENANT,
        "external_id": "call-" + rec["call_sid"],
        "vertical": VERTICAL,
        "source": src,                           # google-ads / organic / leadgen, by number dialed
        "source_detail": ext.get("job_type"),
        "channel": "call",
        "lead_date": iso_start(call.get("start_time")),   # TRUE call time (normalized) for the dashboard windows
        "geo_city": ext.get("service_city"),
        "geo_state": None, "geo_zip": None,
        "contact_phone": call.get("from") or call.get("from_formatted"),
        "contact_email": None,
        "call_duration": int(rec.get("duration") or 0),
        "converted": 1 if ext.get("booked") else 0,
        "revenue": clean_price(ext.get("quoted_price")),
        "cost": None,
        "referrer": None,
        "metadata": {
            "recordingSid": rec["sid"], "callSid": rec["call_sid"],
            "toNumber": to_number, "sourceLabel": src_label, "callStart": call.get("start_time"),
            "isLeadgen": is_leadgen, "billable": billable, "billAmount": bill_amount,
            "gclid": (attribution or {}).get("gclid"), "keyword": (attribution or {}).get("keyword"),
            "dumpsterSize": ext.get("dumpster_size"), "summary": ext.get("summary"),
            "spam": spam, "transcript": (ext.get("_transcript") or "")[:4000],
        },
    }


def iso_start(raw):
    """SignalWire start_time is RFC 2822 ('Thu, 18 Jun 2026 16:27:04 +0000') -> 'YYYY-MM-DD HH:MM:SS' UTC."""
    if not raw:
        return None
    try:
        from email.utils import parsedate_to_datetime
        import datetime as _dt
        return parsedate_to_datetime(raw).astimezone(_dt.timezone.utc).strftime("%Y-%m-%d %H:%M:%S")
    except Exception:
        return None


def post_sync(payload):
    r = requests.post(f"{ACC_URL.rstrip('/')}/api/leads/sync", json=payload,
                      headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-call"}, timeout=30)
    r.raise_for_status()
    return r.json()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--min-duration", type=int, default=20, help="ignore calls shorter than N seconds")
    ap.add_argument("--limit", type=int, default=0, help="cap recordings processed (0 = all)")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--no-upload", action="store_true")
    ap.add_argument("--reextract", action="store_true",
                    help="re-run outcome extraction on cached transcripts (no re-transcribe), then re-upload")
    a = ap.parse_args()

    for name, val in [("SIGNALWIRE_PROJECT_ID", SW_PROJECT), ("SIGNALWIRE_API_TOKEN", SW_TOKEN),
                      ("SIGNALWIRE_SPACE_URL", SW_SPACE), ("OPENAI_API_KEY", OPENAI_KEY)]:
        if not val:
            print(f"Missing {name} in .env"); return

    NUMBER_LABELS.update(fetch_number_labels())
    # gclid->keyword map for DNI call attribution (skip on dry/no-upload to stay fast)
    click_map = {} if (a.dry_run or a.no_upload) else build_click_map(min(a.days, 30))
    cache = load_cache()

    if a.reextract:
        items = [(sid, e) for sid, e in cache.items() if e.get("transcript")]
        print(f"Re-extracting outcomes for {len(items)} cached transcript(s)...")
        for i, (sid, entry) in enumerate(items, 1):
            try:
                entry["extract"] = extract_outcome(entry["transcript"])
                if i % 20 == 0:
                    save_cache(cache); print(f"  ...{i}/{len(items)}")
            except Exception as e:
                print(f"  reextract ERR {sid[:10]}: {str(e)[:80]}")
        save_cache(cache)
        print("Re-extraction done — proceeding to re-upload with cleaned prices.\n")

    recs = list_recordings(a.days)
    print(f"Found {len(recs)} recording(s) in the last {a.days} days.")
    if a.limit:
        recs = recs[:a.limit]

    processed = booked = skipped = errors = billable_total = 0
    for rec in recs:
        sid, call_sid, dur = rec["sid"], rec["call_sid"], int(rec.get("duration") or 0)
        if dur < a.min_duration:
            skipped += 1
            continue

        cached = cache.get(sid)
        try:
            if cached and cached.get("transcript"):
                transcript, ext = cached["transcript"], cached["extract"]
            else:
                tmp = os.path.join(tempfile.gettempdir(), f"{sid}.mp3")
                size = download_recording(sid, tmp)
                if size > MAX_SIZE:
                    print(f"  {sid}: too large ({size/1e6:.1f}MB), skipping"); skipped += 1
                    if os.path.exists(tmp): os.unlink(tmp)
                    continue
                transcript = transcribe(tmp)
                if os.path.exists(tmp): os.unlink(tmp)
                ext = extract_outcome(transcript)
                cache[sid] = {"transcript": transcript, "extract": ext, "call_sid": call_sid}
                save_cache(cache)

            call = call_details(call_sid)
            ext = dict(ext); ext["_transcript"] = transcript
            g = dni_gclid(call_sid)
            attribution = {"gclid": g, "keyword": click_map.get(g)} if g else None
            payload = to_payload(rec, call, ext, attribution)
            meta = payload["metadata"]
            tag = "BOOKED" if payload["converted"] else ("SPAM" if ext.get("spam") else "no-book")
            bill = f"BILL ${BILL_RATE_USD:.0f}" if meta["billable"] else ""
            kwtag = f"  [kw: {meta['keyword']}]" if meta.get("keyword") else ""
            print(f"  {call_sid[:10]} {dur:>4}s {tag:>7} {bill:>8} | {meta['sourceLabel'][:22]:22} | {ext.get('summary','')[:40]}{kwtag}")

            if payload["converted"]:
                booked += 1
            if meta["billable"]:
                billable_total = billable_total + 1
            if not a.dry_run and not a.no_upload:
                post_sync(payload)
            processed += 1
        except Exception as e:
            errors += 1
            print(f"  ERR {call_sid[:10]}: {str(e)[:90]}")

    print(f"\nProcessed {processed} | booked {booked} | billable {billable_total} (${billable_total*BILL_RATE_USD:.0f} to Frank) "
          f"| skipped(<{a.min_duration}s/large) {skipped} | errors {errors}")
    if a.dry_run or a.no_upload:
        print("(no upload — dry-run/no-upload mode)")


if __name__ == "__main__":
    main()

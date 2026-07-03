"""DEPRECATED (2026-07-02): superseded by upload_call_conversions_dm.py — this script's
upload leg (UploadClickConversions) is GATED by Google and its HTTP source hits the
empty-tasks.db backend. Kept for reference only; do not schedule.

Push QUALIFIED PAID CALLS to Google Ads as offline phone-lead conversions.

Closes the loop the form leads already had: DNI captured the gclid on each paid call,
so now a qualified call (paid + connected >= 60s + not spam) gets uploaded against the
'Qualified Phone Lead (Offline)' action — so Google finally counts calls, and Smart
Bidding optimizes toward the keywords that drive them (not just form submits).

Source = the ACC warehouse (GET /api/leads/calls + per-call gclid via /dni-gclid).
Dedup = local uploaded_call_convs.json (so it never double-counts a call).

Usage: python upload_call_conversions.py [--min-duration 60] [--dry-run]
Env (Google Ads .env): ACC_API_KEY, ACC_API_URL, plus GOOGLE_ADS_* creds.
Run after transcribe_signalwire.py (which stamps the gclid). Safe on a schedule.
"""
import os, sys, json, argparse, datetime
from email.utils import parsedate_to_datetime
import requests
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()
CID = "2253432096"
ACTION_NAME = "Qualified Phone Lead (Offline)"
CALL_LEAD_VALUE = 50.0          # nominal value per qualified call lead (tune to match a lead's worth)
ACC_KEY = os.getenv("ACC_API_KEY")
ACC_URL = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")
SEEN_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploaded_call_convs.json")
config = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": "6516751752",
    "use_proto_plus": True,
}


def load_seen():
    if os.path.exists(SEEN_FILE):
        try: return set(json.load(open(SEEN_FILE)))
        except Exception: return set()
    return set()


def save_seen(seen):
    json.dump(sorted(seen), open(SEEN_FILE, "w"), indent=0)


def acc_get(path, **params):
    r = requests.get(ACC_URL.rstrip("/") + path, params=params,
                     headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-callconv"}, timeout=30)
    r.raise_for_status()
    return r.json()


def ads_time(raw):
    try:
        dt = parsedate_to_datetime(raw).astimezone(datetime.timezone.utc)
        return dt.strftime("%Y-%m-%d %H:%M:%S") + "+00:00"
    except Exception:
        return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-duration", type=int, default=60, help="seconds connected to qualify as a lead")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not ACC_KEY:
        print("ACC_API_KEY missing in .env"); return

    client = GoogleAdsClient.load_from_dict(config)
    ga = client.get_service("GoogleAdsService")
    action = list(ga.search(customer_id=CID, query=f"""
        SELECT conversion_action.resource_name FROM conversion_action
        WHERE conversion_action.name = '{ACTION_NAME}'"""))
    if not action:
        print(f"Conversion action '{ACTION_NAME}' not found — run create_call_conversion_action.py first."); return
    action_rn = action[0].conversion_action.resource_name

    calls = acc_get("/api/leads/calls", tenant="dumpster").get("calls", [])
    seen = load_seen()
    # qualified = connected >= min-duration, not spam, not already uploaded
    cand = [c for c in calls if (c.get("duration") or 0) >= a.min_duration
            and not c.get("spam") and (c.get("callSid") or c.get("recordingSid")) not in seen]
    print(f"{len(calls)} calls; {len(cand)} qualified & not-yet-uploaded — checking gclids…")

    rows = []
    for c in cand:
        cs = c.get("callSid")
        g = acc_get("/api/leads/dni-gclid", callSid=cs).get("gclid") if cs else None
        if not g:
            continue  # organic / pre-DNI call — no gclid, can't attribute
        ct = ads_time(c.get("callStart") or c.get("date"))
        rows.append({"key": cs or c.get("recordingSid"), "gclid": g, "time": ct,
                     "src": c.get("source"), "dur": c.get("duration")})

    print(f"{len(rows)} qualified PAID call(s) with a gclid to upload:")
    for r in rows:
        print(f"  {r['src']:28} {r['dur']:>4}s @ {r['time']} gclid={r['gclid'][:18]}…")
    if not rows:
        print("Nothing to upload (no qualified paid calls with a captured gclid yet)."); return
    if a.dry_run:
        print("\n[dry-run] not uploading."); return

    svc = client.get_service("ConversionUploadService")
    req = client.get_type("UploadClickConversionsRequest")
    req.customer_id = CID
    req.partial_failure = True
    for r in rows:
        conv = client.get_type("ClickConversion")
        conv.gclid = r["gclid"]
        conv.conversion_action = action_rn
        conv.conversion_value = CALL_LEAD_VALUE
        conv.currency_code = "USD"
        if r["time"]:
            conv.conversion_date_time = r["time"]
        req.conversions.append(conv)

    try:
        resp = svc.upload_click_conversions(request=req)
    except GoogleAdsException as ex:
        for er in ex.failure.errors: print("ERR:", er.message)
        return
    if resp.partial_failure_error and resp.partial_failure_error.message:
        print("Partial failure:", resp.partial_failure_error.message)

    ok = {r.gclid for r in resp.results if r.gclid}
    for r in rows:
        if r["gclid"] in ok:
            seen.add(r["key"])
    save_seen(seen)
    print(f"\nUploaded {len(ok)} call conversion(s) to '{ACTION_NAME}'. SECONDARY until you promote it.")


if __name__ == "__main__":
    main()

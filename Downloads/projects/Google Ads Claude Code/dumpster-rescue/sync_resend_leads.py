"""Universal connector: Resend (form-lead emails) -> Agency Command Center warehouse.

Every tenant's website quote form sends its notification through the Resend API. This pulls
those "New Quote / New Lead" emails, parses the labeled body, and upserts them into ACC's
POST /api/leads/sync (idempotent by tenant_id + external_id = resend-<email id>), so each
tenant's CRM has EMAIL/form leads alongside its calls (transcribe_signalwire.py) and ads
(pull_ad_spend.py).

Routing is by the Resend "from" sender (see TENANT_MAP) — add a client = add one line.
Only senders in TENANT_MAP are touched; dumpster web-forms keep syncing via Turso
(sync_to_acc.py), so they're intentionally NOT mapped here (no double-sync).

Usage:
    python sync_resend_leads.py --days 2            # normal (frequent job)
    python sync_resend_leads.py --days 7 --dry-run  # preview, no writes
"""
import os, re, json, argparse, urllib.request, urllib.error
from datetime import datetime, timedelta, timezone

# from-sender substring -> (tenant_id, vertical). Add a client here to onboard its email leads.
TENANT_MAP = [
    ("BG Concrete", ("bg-concrete", "concrete")),
]

# A real new-lead email (vs digests / reminders / signups / auto-callbacks). Sender must also
# be in TENANT_MAP. These subjects are the website-form notifications.
LEAD_SUBJECT = re.compile(r"\b(new quote|new lead|quote request|new .* lead)\b", re.I)
# Skip these even if a keyword matches (digests, reminders, internal).
SKIP_SUBJECT = re.compile(r"last 24h|follow-?up|signup|auto-?callback|after hours|voicemail|invoice|\bdue\b", re.I)

RESEND = "https://api.resend.com"

def env(path=".env"):
    out = {}
    try:
        with open(path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    out[k.strip()] = v.strip().strip('"').strip("\r")
    except FileNotFoundError:
        pass
    return out

def api(url, key):
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + key, "User-Agent": "acc-connector"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def tenant_for(sender):
    for sub, tv in TENANT_MAP:
        if sub.lower() in (sender or "").lower():
            return tv
    return None

def field(txt, label):
    m = re.search(r"^\s*" + re.escape(label) + r"\s*:?\s*(.+?)\s*$", txt, re.I | re.M)
    return m.group(1).strip() if m else None

def parse_body(text):
    g = lambda l: field(text, l)
    cs = g("City/State") or ""
    city, state = None, None
    if cs:
        parts = [p.strip() for p in cs.rsplit(",", 1)]
        city = parts[0] or None
        state = parts[1] if len(parts) > 1 else None
    return {
        "name": g("Name"), "phone": g("Phone"), "email": g("Email"),
        "project": g("Project"), "property": g("Property"), "timeline": g("Timeline"),
        "zip": g("ZIP"), "city": city, "state": state,
        "notes": g("Notes"), "page": g("Page"), "submitted": g("Submitted"),
    }

def post_sync(base, key, payload, dry):
    if dry:
        return {"dry": True}
    req = urllib.request.Request(base.rstrip("/") + "/api/leads/sync",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "X-API-Key": key, "User-Agent": "acc-connector"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=2)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    e = {**env(os.path.join(os.path.dirname(__file__), "..", ".env")), **env(".env")}
    rkey = e.get("RESEND_API_KEY") or os.getenv("RESEND_API_KEY")
    akey = e.get("ACC_API_KEY") or os.getenv("ACC_API_KEY")
    base = e.get("ACC_API_URL") or os.getenv("ACC_API_URL") or "https://agencycommandcenter.ai"
    if not rkey:
        print("RESEND_API_KEY missing in .env — skipping."); return
    if not akey and not a.dry_run:
        print("ACC_API_KEY missing in .env — mint one in ACC (apiKeys). Skipping."); return

    cutoff = datetime.now(timezone.utc) - timedelta(days=a.days)
    # Resend list is newest-first; page until we pass the cutoff.
    emails, url = [], RESEND + "/emails?limit=100"
    for _ in range(20):
        page = api(url, rkey)
        data = page.get("data", [])
        emails += data
        last = data[-1]["created_at"][:19] if data else None
        if not page.get("has_more") or not data:
            break
        if last and datetime.fromisoformat(last).replace(tzinfo=timezone.utc) < cutoff:
            break
        url = RESEND + "/emails?limit=100&after=" + data[-1]["id"]

    synced = skipped = 0
    print(f"Scanning {len(emails)} Resend email(s) over last {a.days} day(s) -> ACC (dry={a.dry_run})")
    for em in emails:
        created = em.get("created_at", "")[:19]
        try:
            if created and datetime.fromisoformat(created).replace(tzinfo=timezone.utc) < cutoff:
                continue
        except ValueError:
            pass
        sender, subject = em.get("from", ""), em.get("subject", "") or ""
        tv = tenant_for(sender)
        if not tv:
            continue
        if SKIP_SUBJECT.search(subject) or not LEAD_SUBJECT.search(subject):
            skipped += 1; continue
        tenant, vertical = tv
        full = api(RESEND + "/emails/" + em["id"], rkey)
        body = full.get("text") or re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", full.get("html") or "")).strip()
        f = parse_body(body)
        reply = (em.get("reply_to") or [None])[0]
        email_addr = f["email"] or reply
        # Paid if the body/page carries a gclid; the BG contact form is organic.
        paid = bool(re.search(r"gclid", body, re.I))
        payload = {
            "tenant_id": tenant, "external_id": "resend-" + em["id"], "vertical": vertical,
            "source": "google-ads" if paid else "organic",
            "source_detail": f["project"], "channel": "web-form",
            "geo_city": f["city"], "geo_state": f["state"], "geo_zip": f["zip"],
            "contact_phone": f["phone"], "contact_email": email_addr,
            "lead_date": f["submitted"] or full.get("created_at"),
            "metadata": {
                "name": f["name"], "projectType": f["project"], "property": f["property"],
                "timeline": f["timeline"], "body": f["notes"], "page": f["page"],
                "leadSource": "resend web-form", "resendId": em["id"], "subject": subject,
            },
        }
        r = post_sync(base, akey, payload, a.dry_run)
        synced += 1
        print(f"  [{tenant}] {created} | {f['name'] or email_addr} | {subject[:40]} -> {'dry' if a.dry_run else r.get('action', 'ok')}")
    print(f"\nDone. Synced {synced} | skipped {skipped} non-lead | scanned {len(emails)}")

if __name__ == "__main__":
    main()

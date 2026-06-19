"""Connector: Dumpster Rescue (Turso) -> Agency Command Center warehouse.
Reads recent leads, maps them to the universal warehouse shape, and UPSERTs each
to ACC's POST /api/leads/sync (idempotent by tenant_id + external_id, so re-syncing
updates keyword/status/revenue instead of duplicating). This is pipe #1 of the
multi-tenant data warehouse; every other client connector follows the same shape.

Usage: python sync_to_acc.py [--days 45] [--dry-run]
Env (in the Google Ads .env): ACC_API_KEY (required), ACC_API_URL (default agencycommandcenter.ai)
"""
import os, sys, json, argparse, urllib.request, urllib.error
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
import enrich_leads as e  # turso helpers + DUMPSTER_ENV

load_dotenv()  # Google Ads .env (has ACC_API_KEY / ACC_API_URL)
TENANT = "dumpster"
VERTICAL = "junk-removal"

def to_payload(L):
    # Paid if it carries a gclid OR came from a paid landing page (source starts "lp-")
    # — matches the lead-email PAID/Organic logic.
    paid = bool(L.get("gclid")) or (L.get("source") or "").startswith("lp-")
    return {
        "tenant_id": TENANT,
        "external_id": L["id"],
        "vertical": VERTICAL,
        "source": "google-ads" if paid else "organic",
        "source_detail": L.get("keyword"),            # the converting keyword (filled by enrich_leads)
        "channel": "web-form",
        "geo_city": L.get("city"), "geo_state": L.get("state"), "geo_zip": L.get("zipCode"),
        "contact_phone": L.get("phone"), "contact_email": L.get("email"),
        "converted": 1 if (L.get("status") == "won") else 0,
        "revenue": L.get("jobValue"),
        "lead_date": L.get("createdAt"),              # the TRUE lead date (drives the dashboard's time windows)
        "cost": None,                                  # ACC joins Ads cost via its own google-ads-api
        "referrer": None,
        "metadata": {
            "gclid": L.get("gclid"), "campaign": L.get("campaign"), "adGroup": L.get("adGroup"),
            "status": L.get("status"), "leadSource": L.get("source"),
            "projectType": L.get("projectType"), "dumpsterSize": L.get("dumpsterSize"),
            "closedAt": L.get("closedAt"),
        },
    }

def post_sync(base, key, payload):
    req = urllib.request.Request(base.rstrip("/") + "/api/leads/sync",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "X-API-Key": key,
                 "User-Agent": "Mozilla/5.0 acc-connector"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--days", type=int, default=45)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    key = os.getenv("ACC_API_KEY")
    base = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")
    if not key and not a.dry_run:
        print("ACC_API_KEY not set in the Google Ads .env — mint one in ACC (apiKeys) and add it. Skipping.")
        return

    env = e.read_env_file(e.DUMPSTER_ENV, {"TURSO_DATABASE_URL", "TURSO_AUTH_TOKEN"})
    u, t = env["TURSO_DATABASE_URL"], env["TURSO_AUTH_TOKEN"]
    leads = e.turso_query(u, t, f"""
        SELECT id, name, email, phone, city, state, zipCode, source, gclid, keyword,
               adGroup, campaign, status, jobValue, closedAt, projectType, dumpsterSize, createdAt
        FROM Lead
        WHERE spam = 0 AND (createdAt >= datetime('now','-{a.days} days') OR status = 'won')
        ORDER BY createdAt DESC""")
    print(f"Syncing {len(leads)} lead(s) -> ACC warehouse (tenant={TENANT}) at {base}")

    ok = fail = 0
    for L in leads:
        payload = to_payload(L)
        if a.dry_run:
            print(f"  [dry] {payload['external_id']} | {payload['source']} | kw={payload['source_detail']} "
                  f"| won={payload['converted']} | rev={payload['revenue']}")
            continue
        try:
            r = post_sync(base, key, payload)
            ok += 1 if r.get("ok") else 0
        except urllib.error.HTTPError as ex:
            fail += 1
            print(f"  ERR {L['id']}: HTTP {ex.code} {ex.read().decode()[:80]}")
        except Exception as ex:
            fail += 1
            print(f"  ERR {L['id']}: {str(ex)[:80]}")
    if not a.dry_run:
        print(f"Upserted {ok}/{len(leads)} to ACC ({fail} failed).")

if __name__ == "__main__":
    main()

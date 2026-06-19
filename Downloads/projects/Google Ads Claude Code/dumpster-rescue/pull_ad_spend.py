"""Per-tenant Google Ads SPEND -> ACC warehouse (ad_spend table) for the CRM/ROAS dashboard.

The ROAS denominator. The CRM dashboard divides booked revenue (from the warehouse) by ad
spend (this) to show true ROAS, cost-per-lead, and cost-per-call. Pulls cost/clicks/impr/conv
by day + campaign for each tenant, POSTs to ACC POST /api/leads/ad-spend (idempotent upsert).

All client accounts sit under one MCC (login 6516751752) so a single OAuth token works —
only the per-tenant customer_id changes (same TENANT_ADS map as the conversion uploaders).

Usage: python pull_ad_spend.py [--tenant X] [--days 30] [--dry-run]
Env (Google Ads .env): ACC_API_KEY, ACC_API_URL, GOOGLE_ADS_* creds.
"""
import os, sys, json, argparse
import urllib.request, urllib.error
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()
ACC_KEY = os.getenv("ACC_API_KEY")
ACC_URL = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")

# tenant_id -> Google Ads customer_id (all under MCC 6516751752)
TENANT_ADS = {
    "dumpster": "2253432096",
    "bg-concrete": "1488904463",
}
CONFIG = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": "6516751752",
    "use_proto_plus": True,
}


def acc_post(path, body):
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}", data=json.dumps(body).encode(),
        headers={"X-API-Key": ACC_KEY, "Content-Type": "application/json", "User-Agent": "Mozilla/5.0 acc-spend"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def run_tenant(client, tenant, cid, days, dry):
    ga = client.get_service("GoogleAdsService")
    query = f"""
        SELECT segments.date, campaign.name,
               metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions
        FROM campaign
        WHERE segments.date DURING LAST_{days}_DAYS"""
    rows = []
    try:
        for b in ga.search_stream(customer_id=cid, query=query):
            for r in b.results:
                rows.append({
                    "day": r.segments.date,
                    "campaign": r.campaign.name,
                    "cost": round(r.metrics.cost_micros / 1e6, 2),
                    "clicks": int(r.metrics.clicks),
                    "impressions": int(r.metrics.impressions),
                    "conversions": round(float(r.metrics.conversions), 2),
                })
    except GoogleAdsException as ex:
        for e in ex.failure.errors:
            print(f"  {tenant}: ERR {e.message}")
        return
    total = sum(x["cost"] for x in rows)
    print(f"  {tenant}: {len(rows)} day×campaign rows, ${total:,.0f} spend / {days}d")
    if dry:
        print(f"  {tenant}: [dry-run] not posted"); return
    if rows:
        resp = acc_post("/api/leads/ad-spend", {"tenant": tenant, "rows": rows})
        print(f"  {tenant}: upserted {resp.get('upserted', 0)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default=None, help="one tenant (default: all in TENANT_ADS)")
    ap.add_argument("--days", type=int, default=30, choices=[7, 14, 30, 90])
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not ACC_KEY:
        print("ACC_API_KEY missing in .env"); return
    client = GoogleAdsClient.load_from_dict(CONFIG)
    tenants = {a.tenant: TENANT_ADS[a.tenant]} if a.tenant else TENANT_ADS
    print(f"Pulling ad spend ({a.days}d) for: {', '.join(tenants)}")
    for tenant, cid in tenants.items():
        try:
            run_tenant(client, tenant, cid, a.days, a.dry_run)
        except Exception as e:
            print(f"  {tenant}: ERR {str(e)[:90]}")


if __name__ == "__main__":
    main()

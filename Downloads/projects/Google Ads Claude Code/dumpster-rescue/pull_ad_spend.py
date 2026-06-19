"""Per-tenant Google Ads SPEND -> ACC warehouse (ad_spend table) for the CRM/ROAS dashboard.

The ROAS denominator. The CRM dashboard divides booked revenue (from the warehouse) by ad
spend (this) to show true ROAS, cost-per-lead, and cost-per-call. Pulls cost/clicks/impr/conv
by day + campaign for each tenant, POSTs to ACC POST /api/leads/ad-spend (idempotent upsert).

All client accounts sit under one MCC (login 6516751752) so a single OAuth token works —
only the per-tenant customer_id changes (same TENANT_ADS map as the conversion uploaders).

Usage: python pull_ad_spend.py [--tenant X] [--days 30] [--dry-run]
Env (Google Ads .env): ACC_API_KEY, ACC_API_URL, GOOGLE_ADS_* creds.
"""
import os, sys, json, argparse, datetime
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
# Shared "app" creds (developer token + OAuth client). The per-AGENCY parts (refresh_token +
# login MCC) are filled in per client from ACC's /ads-config; clients with no connected agency
# fall back to the PLATFORM creds below (Joey's own MCC) so his own clients keep working.
CONFIG_BASE = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "use_proto_plus": True,
}
PLATFORM_LOGIN = "6516751752"                             # Joey's MCC (fallback login)
PLATFORM_REFRESH = os.getenv("GOOGLE_ADS_REFRESH_TOKEN")  # Joey's refresh token (fallback)

_CLIENTS = {}
def get_client(refresh_token, login_customer_id):
    """Build/cache a GoogleAdsClient for a given (refresh_token, login MCC)."""
    key = (refresh_token, str(login_customer_id))
    if key not in _CLIENTS:
        cfg = dict(CONFIG_BASE)
        cfg["refresh_token"] = refresh_token
        cfg["login_customer_id"] = str(login_customer_id)
        _CLIENTS[key] = GoogleAdsClient.load_from_dict(cfg)
    return _CLIENTS[key]


def acc_post(path, body):
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}", data=json.dumps(body).encode(),
        headers={"X-API-Key": ACC_KEY, "Content-Type": "application/json", "User-Agent": "Mozilla/5.0 acc-spend"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def acc_get(path):
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}",
        headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-spend"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def run_tenant(client, tenant, cid, days, dry):
    ga = client.get_service("GoogleAdsService")
    # Sync the client's real display name from their Google Ads account (shown on the dashboard).
    try:
        cust = list(ga.search(customer_id=cid, query="SELECT customer.descriptive_name FROM customer LIMIT 1"))
        name = cust[0].customer.descriptive_name if cust else None
        if name and not dry:
            # display_name_default = fallback only; a name set by hand is never overwritten.
            acc_post("/api/leads/tenant", {"tenant_id": tenant, "display_name_default": name, "ads_customer_id": cid})
            print(f"  {tenant}: name = {name}")
    except Exception as ex:
        print(f"  {tenant}: name sync skipped ({str(ex)[:50]})")
    end = datetime.date.today()
    start = end - datetime.timedelta(days=days)
    query = f"""
        SELECT segments.date, campaign.name,
               metrics.cost_micros, metrics.clicks, metrics.impressions, metrics.conversions
        FROM campaign
        WHERE segments.date BETWEEN '{start.isoformat()}' AND '{end.isoformat()}'"""
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
    ap.add_argument("--tenant", default=None, help="one tenant only (default: all clients)")
    ap.add_argument("--days", type=int, default=30)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not ACC_KEY:
        print("ACC_API_KEY missing in .env"); return

    # Per-client Ads config from ACC: each client's ads_customer_id + (if its agency connected) the
    # agency's refresh_token + login MCC. No agency creds -> fall back to the platform (Joey's) creds.
    clients = []
    try:
        clients = acc_get("/api/leads/ads-config").get("clients", [])
    except Exception as e:
        print(f"  /ads-config unavailable ({str(e)[:60]}) — falling back to built-in TENANT_ADS")
    if not clients:
        clients = [{"tenant": t, "ads_customer_id": c, "refresh_token": None, "login_customer_id": None}
                   for t, c in TENANT_ADS.items()]
    if a.tenant:
        clients = [c for c in clients if c["tenant"] == a.tenant]

    print(f"Pulling ad spend ({a.days}d) for {len(clients)} client(s)")
    for c in clients:
        tenant, cid = c["tenant"], c.get("ads_customer_id")
        if not cid:
            continue
        refresh = c.get("refresh_token") or PLATFORM_REFRESH
        login = c.get("login_customer_id") or PLATFORM_LOGIN
        src = "agency" if c.get("refresh_token") else "platform"
        try:
            run_tenant(get_client(refresh, login), tenant, str(cid), a.days, a.dry_run)
            print(f"    └ {tenant} via {src} creds")
        except Exception as e:
            print(f"  {tenant}: ERR {str(e)[:90]}")


if __name__ == "__main__":
    main()

"""BG Concrete (customer 1488904463) — list campaigns/status/budget/final-URLs, or --enable paused ones.

Usage:
  python bg_campaigns.py            # list (read-only)
  python bg_campaigns.py --enable   # flip every PAUSED campaign -> ENABLED
Env (Google Ads .env): GOOGLE_ADS_* creds.
"""
import os, sys
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()
CID = "1488904463"  # BG Concrete (under MCC 6516751752)
cfg = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": "6516751752",
    "use_proto_plus": True,
}
client = GoogleAdsClient.load_from_dict(cfg)
ga = client.get_service("GoogleAdsService")


def name():
    r = list(ga.search(customer_id=CID, query="SELECT customer.descriptive_name, customer.currency_code FROM customer LIMIT 1"))
    return (r[0].customer.descriptive_name, r[0].customer.currency_code) if r else ("?", "USD")


def list_campaigns():
    dn, cur = name()
    print(f"Account: {dn}  ({CID})  [{cur}]\n")
    q = """SELECT campaign.id, campaign.name, campaign.status, campaign.advertising_channel_type,
           campaign_budget.amount_micros
           FROM campaign WHERE campaign.status != 'REMOVED' ORDER BY campaign.name"""
    rows = list(ga.search(customer_id=CID, query=q))
    total_paused = 0.0
    for r in rows:
        b = r.campaign_budget.amount_micros / 1e6
        if r.campaign.status.name == "PAUSED":
            total_paused += b
        print(f"  [{r.campaign.status.name:7}] ${b:6.2f}/day  {r.campaign.advertising_channel_type.name:8}  {r.campaign.name}")
    print(f"\n  {len(rows)} campaign(s).  If enabled, PAUSED budgets add ${total_paused:.2f}/day exposure.")
    # sample landing pages
    urls = set()
    for r in ga.search(customer_id=CID, query="SELECT ad_group_ad.ad.final_urls FROM ad_group_ad WHERE ad_group_ad.status != 'REMOVED' LIMIT 50"):
        for u in r.ad_group_ad.ad.final_urls:
            urls.add(u)
    print("\n  Landing pages (final URLs):")
    for u in sorted(urls) or ["(none found)"]:
        print("   ", u)
    return rows


def enable_paused():
    """Enable the PAUSED SEARCH SKAGs ONLY (skip legacy Smart + the Commercial SKAG whose LP is 404)."""
    svc = client.get_service("CampaignService")
    ops = []
    q = ("SELECT campaign.resource_name, campaign.name FROM campaign "
         "WHERE campaign.status = 'PAUSED' AND campaign.advertising_channel_type = 'SEARCH'")
    for r in ga.search(customer_id=CID, query=q):
        if "Commercial" in r.campaign.name:      # /lp/commercial-concrete/ is 404 — hold
            print(f"  HOLD (404 LP)  -> {r.campaign.name}"); continue
        op = client.get_type("CampaignOperation")
        op.update.resource_name = r.campaign.resource_name
        op.update.status = client.enums.CampaignStatusEnum.ENABLED
        op.update_mask.paths.append("status")
        ops.append((op, r.campaign.name))
    if not ops:
        print("No matching PAUSED Search SKAGs to enable."); return
    try:
        svc.mutate_campaigns(customer_id=CID, operations=[o for o, _ in ops])
        for _, nm in ops:
            print(f"  ENABLED -> {nm}")
        print(f"\n{len(ops)} campaign(s) now LIVE.")
    except GoogleAdsException as ex:
        for e in ex.failure.errors:
            print("  ERR:", e.message)


if __name__ == "__main__":
    list_campaigns()
    if "--enable" in sys.argv:
        print("\n--- enabling paused campaigns ---")
        enable_paused()

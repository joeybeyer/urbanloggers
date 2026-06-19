"""Per-tenant WON FORM leads (in the ACC warehouse) -> Google Ads offline conversions.

The multi-tenant counterpart of upload_conversions.py: that one reads Dumpster's Turso;
this reads the ACC WAREHOUSE (where the productized lead-outcome flow records Won + price
for ANY client). Reads GET /api/leads/won-conversions, uploads each gclid+revenue to that
tenant's 'Closed Job Revenue (Offline)' action, then POSTs /mark-ads-uploaded (dedup).

All of Joey's client accounts sit under one MCC (login 6516751752), so a single OAuth
refresh token works — only the per-tenant customer_id changes (TENANT_ADS below).

Usage: python upload_form_conversions_warehouse.py [--tenant X] [--dry-run]
Env (Google Ads .env): ACC_API_KEY, ACC_API_URL, GOOGLE_ADS_* creds.
"""
import os, sys, json, argparse
from email.utils import parsedate_to_datetime
import datetime, urllib.request, urllib.error, urllib.parse
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

load_dotenv()
ACC_KEY = os.getenv("ACC_API_KEY")
ACC_URL = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")
ACTION_NAME = "Closed Job Revenue (Offline)"

# tenant_id -> Google Ads customer_id (all under MCC 6516751752)
TENANT_ADS = {
    "dumpster": "2253432096",
    "bg-concrete": "1488904463",
}
CONFIG_BASE = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "use_proto_plus": True,
}
PLATFORM_LOGIN = "6516751752"                             # Joey's MCC (fallback)
PLATFORM_REFRESH = os.getenv("GOOGLE_ADS_REFRESH_TOKEN")  # Joey's refresh token (fallback)

_CLIENTS = {}
def get_client(refresh_token, login_customer_id):
    """Build/cache a GoogleAdsClient for a given (refresh_token, login MCC) — agency or platform."""
    key = (refresh_token, str(login_customer_id))
    if key not in _CLIENTS:
        cfg = dict(CONFIG_BASE); cfg["refresh_token"] = refresh_token; cfg["login_customer_id"] = str(login_customer_id)
        _CLIENTS[key] = GoogleAdsClient.load_from_dict(cfg)
    return _CLIENTS[key]


def acc_get(path, **params):
    q = "&".join(f"{k}={urllib.parse.quote(str(v))}" for k, v in params.items())
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}?{q}",
        headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-formconv"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def acc_post(path, body):
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}", data=json.dumps(body).encode(),
        headers={"X-API-Key": ACC_KEY, "Content-Type": "application/json", "User-Agent": "Mozilla/5.0 acc-formconv"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def ads_time(raw):
    try:
        if "," in raw:  # RFC 2822
            dt = parsedate_to_datetime(raw)
        else:           # 'YYYY-MM-DD HH:MM:SS'
            dt = datetime.datetime.fromisoformat(raw.replace("T", " ").replace("Z", ""))
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.astimezone(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S") + "+00:00"
    except Exception:
        return None


def run_tenant(client, tenant, cid, dry):
    leads = acc_get("/api/leads/won-conversions", tenant=tenant).get("leads", [])
    if not leads:
        print(f"  {tenant}: nothing to upload"); return
    ga = client.get_service("GoogleAdsService")
    action = list(ga.search(customer_id=cid, query=f"""
        SELECT conversion_action.resource_name FROM conversion_action
        WHERE conversion_action.name = '{ACTION_NAME}'"""))
    if not action:
        print(f"  {tenant}: action '{ACTION_NAME}' missing in {cid} — create it first."); return
    action_rn = action[0].conversion_action.resource_name

    svc = client.get_service("ConversionUploadService")
    req = client.get_type("UploadClickConversionsRequest")
    req.customer_id = cid; req.partial_failure = True
    for L in leads:
        c = client.get_type("ClickConversion")
        c.gclid = L["gclid"]; c.conversion_action = action_rn
        c.conversion_value = float(L["revenue"]); c.currency_code = "USD"
        t = ads_time(L.get("when") or "")
        if t: c.conversion_date_time = t
        req.conversions.append(c)
        print(f"  {tenant}: ${float(L['revenue']):.0f} @ {t} gclid={L['gclid'][:16]}…")
    if dry:
        print(f"  {tenant}: [dry-run] {len(leads)} not uploaded"); return
    try:
        resp = svc.upload_click_conversions(request=req)
    except GoogleAdsException as ex:
        for e in ex.failure.errors: print("   ERR:", e.message)
        return
    if resp.partial_failure_error and resp.partial_failure_error.message:
        print("   partial:", resp.partial_failure_error.message)
    ok = {r.gclid for r in resp.results if r.gclid}
    done = [L["external_id"] for L in leads if L["gclid"] in ok]
    if done:
        acc_post("/api/leads/mark-ads-uploaded", {"tenant": tenant, "external_ids": done})
    print(f"  {tenant}: uploaded + marked {len(done)}/{len(leads)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default=None, help="one tenant (default: all in TENANT_ADS)")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not ACC_KEY:
        print("ACC_API_KEY missing in .env"); return
    # Per-client Ads config from ACC (agency creds if connected, else platform fallback).
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
    print(f"Uploading won-form conversions for {len(clients)} client(s)")
    for c in clients:
        tenant, cid = c["tenant"], c.get("ads_customer_id")
        if not cid:
            continue
        refresh = c.get("refresh_token") or PLATFORM_REFRESH
        login = c.get("login_customer_id") or PLATFORM_LOGIN
        try:
            run_tenant(get_client(refresh, login), tenant, str(cid), a.dry_run)
        except Exception as e:
            print(f"  {tenant}: ERR {str(e)[:90]}")


if __name__ == "__main__":
    main()

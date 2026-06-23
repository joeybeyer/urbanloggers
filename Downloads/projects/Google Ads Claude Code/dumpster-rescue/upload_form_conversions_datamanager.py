"""Per-tenant WON FORM leads (ACC warehouse) -> Google Ads offline conversions via the
DATA MANAGER API (datamanager.googleapis.com) — the replacement for the now-gated
ConversionUploadService.UploadClickConversions used by upload_form_conversions_warehouse.py.

Flow per tenant: GET /api/leads/won-conversions -> resolve that tenant's 'Closed Job Revenue
(Offline)' conversion-action NUMERIC id (via Ads API) -> POST datamanager v1 events:ingest
(gclid + revenue) -> POST /mark-ads-uploaded (dedup by external_id == transactionId).

Auth: TWO tokens, both already in .env —
  GOOGLE_ADS_REFRESH_TOKEN  (adwords scope)      -> resolve conversion-action id
  GOOGLE_DM_REFRESH_TOKEN   (datamanager scope)  -> the events:ingest POST

Usage: python upload_form_conversions_datamanager.py [--tenant X] [--dry-run]
  --dry-run uses the API's own validateOnly=true (validates against Google, ingests nothing).
"""
import os, sys, json, argparse, datetime
import urllib.request, urllib.parse, urllib.error
from email.utils import parsedate_to_datetime
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient

load_dotenv()
ACC_KEY = os.getenv("ACC_API_KEY")
ACC_URL = os.getenv("ACC_API_URL", "https://agencycommandcenter.ai")
ACTION_NAME = "Closed Job Revenue (Offline)"
DM_ENDPOINT = "https://datamanager.googleapis.com/v1/events:ingest"
MCC = "6516751752"                                  # Joey's manager (loginAccount)

TENANT_ADS = {"dumpster": "2253432096", "bg-concrete": "1488904463"}
ADS_CFG = {
    "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
    "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
    "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
    "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
    "login_customer_id": MCC, "use_proto_plus": True,
}


def acc_get(path, **params):
    q = "&".join(f"{k}={urllib.parse.quote(str(v))}" for k, v in params.items())
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}?{q}",
        headers={"X-API-Key": ACC_KEY, "User-Agent": "Mozilla/5.0 acc-dmconv"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def acc_post(path, body):
    req = urllib.request.Request(f"{ACC_URL.rstrip('/')}{path}", data=json.dumps(body).encode(),
        headers={"X-API-Key": ACC_KEY, "Content-Type": "application/json", "User-Agent": "Mozilla/5.0 acc-dmconv"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def dm_access_token():
    """Exchange GOOGLE_DM_REFRESH_TOKEN (datamanager scope) for a short-lived access token."""
    rt = os.getenv("GOOGLE_DM_REFRESH_TOKEN")
    if not rt:
        raise RuntimeError("GOOGLE_DM_REFRESH_TOKEN missing in .env — run reauth_datamanager.py")
    data = urllib.parse.urlencode({"client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"), "refresh_token": rt,
        "grant_type": "refresh_token"}).encode()
    with urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token", data=data)) as r:
        return json.loads(r.read())["access_token"]


def rfc3339(raw):
    """Lead time -> RFC3339 with offset (e.g. 2026-06-20T15:01:23+00:00)."""
    try:
        dt = parsedate_to_datetime(raw) if "," in raw else \
             datetime.datetime.fromisoformat(raw.replace("T", " ").replace("Z", ""))
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=datetime.timezone.utc)
        return dt.astimezone(datetime.timezone.utc).isoformat()
    except Exception:
        return datetime.datetime.now(datetime.timezone.utc).isoformat()


def action_id(client, cid):
    """Numeric id of the tenant's 'Closed Job Revenue (Offline)' conversion action (productDestinationId)."""
    ga = client.get_service("GoogleAdsService")
    rows = list(ga.search(customer_id=cid, query=f"""
        SELECT conversion_action.id FROM conversion_action
        WHERE conversion_action.name = '{ACTION_NAME}'"""))
    return str(rows[0].conversion_action.id) if rows else None


def run_tenant(client, access_token, tenant, cid, dry):
    leads = acc_get("/api/leads/won-conversions", tenant=tenant).get("leads", [])
    if not leads:
        print(f"  {tenant}: nothing to upload"); return
    aid = action_id(client, cid)
    if not aid:
        print(f"  {tenant}: action '{ACTION_NAME}' missing in {cid} — create it first."); return

    destination = {"reference": "primary",
        "operatingAccount": {"accountType": "GOOGLE_ADS", "accountId": cid},
        "loginAccount": {"accountType": "GOOGLE_ADS", "accountId": MCC},
        "productDestinationId": aid}
    events, sent_ids = [], []
    for L in leads:
        if not L.get("gclid"):
            continue
        events.append({"destinationReferences": ["primary"],
            "transactionId": str(L["external_id"]), "eventSource": "WEB",
            "eventTimestamp": rfc3339(L.get("when") or ""),
            "currency": "USD", "conversionValue": float(L["revenue"]),
            "adIdentifiers": {"gclid": L["gclid"]}})
        sent_ids.append(L["external_id"])
        print(f"  {tenant}: ${float(L['revenue']):.0f} @ {events[-1]['eventTimestamp']} gclid={L['gclid'][:16]}…")
    if not events:
        print(f"  {tenant}: {len(leads)} won lead(s) but none have a gclid — can't attribute, skipping."); return

    body = {"destinations": [destination], "events": events, "validateOnly": bool(dry)}
    req = urllib.request.Request(DM_ENDPOINT, data=json.dumps(body).encode(), method="POST",
        headers={"Authorization": "Bearer " + access_token, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            resp = json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        print(f"  {tenant}: INGEST FAILED {e.code}: {e.read().decode()[:300]}"); return

    # events:ingest echoes per-request failures; surface anything non-empty.
    if resp.get("partialFailureError") or resp.get("errors"):
        print(f"  {tenant}: partial/errors: {json.dumps(resp)[:300]}")
    if dry:
        print(f"  {tenant}: [validateOnly] {len(events)} event(s) validated OK — not ingested"); return
    acc_post("/api/leads/mark-ads-uploaded", {"tenant": tenant, "external_ids": sent_ids})
    print(f"  {tenant}: ingested + marked {len(sent_ids)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tenant", default=None)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    if not ACC_KEY:
        print("ACC_API_KEY missing in .env"); return
    token = dm_access_token()                       # fail fast if DM token bad
    client = GoogleAdsClient.load_from_dict(ADS_CFG)
    items = TENANT_ADS.items() if not a.tenant else [(a.tenant, TENANT_ADS.get(a.tenant))]
    print(f"Data Manager won-form upload for {len(list(items))} client(s)" + (" [DRY]" if a.dry_run else ""))
    for tenant, cid in TENANT_ADS.items():
        if a.tenant and tenant != a.tenant:
            continue
        if not cid:
            print(f"  {tenant}: no customer_id mapped"); continue
        try:
            run_tenant(client, token, tenant, str(cid), a.dry_run)
        except Exception as e:
            print(f"  {tenant}: ERR {str(e)[:120]}")


if __name__ == "__main__":
    main()

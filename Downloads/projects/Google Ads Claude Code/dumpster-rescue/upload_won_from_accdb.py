r"""BOX-SIDE direct-read uploader: WON leads in acc.db -> Google Ads offline conversions
via the DATA MANAGER API (datamanager.googleapis.com). "Option 1" from
OFFLINE-CONVERSIONS-HANDOFF.md — bypasses the broken /api/leads/won-conversions HTTP
path (nginx -> acc-api:3051 -> EMPTY tasks.db) and reads the REAL database directly:

    /home/biggelsworth/acc-api/acc.db   (owned + written by the LIVE 3050 app — do not disturb)

Safety model (deliberate, read before changing):
  * acc.db is opened READ-ONLY (sqlite URI mode=ro). We never hold a connection longer
    than one SELECT.
  * Dedup is 3 layers deep, so re-runs can never double-count:
      1. local sidecar state file (uploaded_won_state.json) — ALWAYS written after a real
         ingest; works even when we never touch acc.db.
      2. acc.db ads_uploaded_at column — used as a filter IF it exists, and stamped only
         when you pass --mark (explicit opt-in; a short-lived write txn w/ busy_timeout).
      3. Data Manager transactionId == external_id — Google itself dedups repeats.
  * --dry-run maps to the API's own validateOnly=true (validates at Google, ingests
    nothing, writes NOTHING anywhere). Always run this first.
  * No third-party deps required: stdlib only. python-dotenv is used if present, else a
    minimal .env parser. Conversion-action id is resolved via the Ads REST API (no
    google-ads library needed on the box) and can be pinned with --action-id.

Flow per tenant: SELECT won leads (revenue + gclid, not-yet-uploaded) from acc.db
  -> resolve 'Closed Job Revenue (Offline)' numeric id (Ads REST searchStream)
  -> POST datamanager v1 events:ingest (gclid + revenue, transactionId=external_id)
  -> record in state file; optionally (--mark) stamp ads_uploaded_at in acc.db.

Usage (on the box; see RUN.md for deploy/cron):
  python3 upload_won_from_accdb.py --dry-run                 # SAFE first run
  python3 upload_won_from_accdb.py --tenant dumpster         # real ingest, state-file dedup only
  python3 upload_won_from_accdb.py --tenant dumpster --mark  # also stamp acc.db (opt-in)
Windows test against a copy:
  C:\gadsenv\Scripts\python.exe upload_won_from_accdb.py --db C:\path\to\acc.copy.db --dry-run
"""
import os, sys, json, sqlite3, argparse, datetime
import urllib.request, urllib.parse, urllib.error
from email.utils import parsedate_to_datetime
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

# ---- .env: python-dotenv if installed, else a minimal parser (box has no pip deps) ----
def load_env(path=None):
    try:
        from dotenv import load_dotenv
        load_dotenv(path) if path else load_dotenv()
        return
    except ImportError:
        pass
    p = path or os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
    if not os.path.exists(p):
        p = ".env"
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


ACTION_NAME = "Closed Job Revenue (Offline)"
DM_ENDPOINT = "https://datamanager.googleapis.com/v1/events:ingest"
MCC = "6516751752"                                  # Joey's manager (loginAccount)
TENANT_ADS = {"dumpster": "2253432096", "bg-concrete": "1488904463"}
DEFAULT_DB = "/home/biggelsworth/acc-api/acc.db"    # the REAL data (owned by the 3050 app)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_STATE = os.path.join(SCRIPT_DIR, "uploaded_won_state.json")


# ---------------------------------------------------------------- Google auth helpers
def oauth_access_token(refresh_token, what):
    """Exchange a refresh token for a short-lived access token."""
    if not refresh_token:
        raise RuntimeError(f"{what} refresh token missing in .env")
    data = urllib.parse.urlencode({"client_id": os.environ["GOOGLE_ADS_CLIENT_ID"],
        "client_secret": os.environ["GOOGLE_ADS_CLIENT_SECRET"],
        "refresh_token": refresh_token, "grant_type": "refresh_token"}).encode()
    with urllib.request.urlopen(urllib.request.Request(
            "https://oauth2.googleapis.com/token", data=data), timeout=30) as r:
        return json.loads(r.read())["access_token"]


def dm_access_token():
    return oauth_access_token(os.getenv("GOOGLE_DM_REFRESH_TOKEN"), "GOOGLE_DM_REFRESH_TOKEN (datamanager scope)")


def ads_access_token():
    return oauth_access_token(os.getenv("GOOGLE_ADS_REFRESH_TOKEN"), "GOOGLE_ADS_REFRESH_TOKEN (adwords scope)")


def action_id(cid, ads_token, name=None):
    """Numeric id of a conversion action by name (= DM productDestinationId). Uses the
    Ads REST API so the box needs no google-ads library. If the API version rots, set
    GOOGLE_ADS_API_VERSION or pass --action-id."""
    name = name or ACTION_NAME
    ver = os.getenv("GOOGLE_ADS_API_VERSION", "v21")
    url = f"https://googleads.googleapis.com/{ver}/customers/{cid}/googleAds:searchStream"
    body = json.dumps({"query":
        f"SELECT conversion_action.id FROM conversion_action WHERE conversion_action.name = '{name}'"}).encode()
    req = urllib.request.Request(url, data=body, method="POST", headers={
        "Authorization": "Bearer " + ads_token,
        "developer-token": os.environ["GOOGLE_ADS_DEVELOPER_TOKEN"],
        "login-customer-id": MCC, "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=40) as r:
        chunks = json.loads(r.read() or b"[]")
    for chunk in chunks if isinstance(chunks, list) else [chunks]:
        for row in chunk.get("results", []):
            aid = row.get("conversionAction", {}).get("id")
            if aid:
                return str(aid)
    return None


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


# ---------------------------------------------------------------- acc.db (READ-ONLY)
def db_columns(db_path):
    """Column names of the leads table, via a read-only connection."""
    con = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True, timeout=5)
    try:
        return {row[1] for row in con.execute("PRAGMA table_info(leads)")}
    finally:
        con.close()


def fetch_won(db_path, tenant, has_ads_col):
    """Same shape as acc-api's GET /won-conversions (leads-sync.js): won + revenue,
    gclid pulled from metadata JSON; ads_uploaded_at filter only if the column exists."""
    ads_clause = "AND (ads_uploaded_at IS NULL OR ads_uploaded_at='')" if has_ads_col else ""
    sql = f"""SELECT external_id, revenue, closed_at, created_at, metadata
              FROM leads
              WHERE tenant_id=? AND outcome='won' AND revenue IS NOT NULL {ads_clause}
              ORDER BY closed_at DESC LIMIT 500"""
    con = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True, timeout=5)
    con.row_factory = sqlite3.Row
    try:
        rows = con.execute(sql, (tenant,)).fetchall()
    finally:
        con.close()
    out = []
    for r in rows:
        try:
            m = json.loads(r["metadata"] or "{}")
        except Exception:
            m = {}
        out.append({"external_id": r["external_id"], "gclid": m.get("gclid"),
                    "revenue": r["revenue"], "when": r["closed_at"] or r["created_at"]})
    return out


def mark_uploaded(db_path, tenant, external_ids):
    """OPT-IN (--mark): stamp ads_uploaded_at in acc.db. The DB is live and owned by the
    3050 app, so keep the write surgical: busy_timeout so we wait (not error) if the app
    holds the write lock, one short transaction, close immediately."""
    con = sqlite3.connect(db_path, timeout=10)
    try:
        con.execute("PRAGMA busy_timeout=10000")
        with con:                                   # single implicit transaction
            con.executemany(
                "UPDATE leads SET ads_uploaded_at=datetime('now') WHERE tenant_id=? AND external_id=?",
                [(tenant, eid) for eid in external_ids])
    finally:
        con.close()


# ---------------------------------------------------------------- local dedup state
def load_state(path):
    if os.path.exists(path):
        try:
            return json.loads(open(path, encoding="utf-8").read())
        except Exception:
            print(f"WARN: state file {path} unreadable — starting fresh (Google-side "
                  "transactionId dedup still protects against double-count)")
    return {}


def save_state(path, state):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=1)
    os.replace(tmp, path)


# ---------------------------------------------------------------- per-tenant run
def run_tenant(tenant, cid, args, dm_token, ads_token, state, has_ads_col):
    leads = fetch_won(args.db, tenant, has_ads_col)
    already = set(state.get(tenant, []))
    no_gclid = sum(1 for L in leads if not L.get("gclid"))
    leads = [L for L in leads if L.get("gclid") and str(L["external_id"]) not in already]
    if not leads:
        print(f"  {tenant}: nothing to upload"
              + (f" ({no_gclid} won lead(s) w/o gclid — GBP/organic, not attributable)" if no_gclid else ""))
        return

    aid = args.action_id or action_id(cid, ads_token)
    if not aid:
        print(f"  {tenant}: action '{ACTION_NAME}' missing in {cid} — create it first."); return

    destination = {"reference": "primary",
        "operatingAccount": {"accountType": "GOOGLE_ADS", "accountId": cid},
        "loginAccount": {"accountType": "GOOGLE_ADS", "accountId": MCC},
        "productDestinationId": aid}
    events, sent_ids = [], []
    for L in leads:
        events.append({"destinationReferences": ["primary"],
            "transactionId": str(L["external_id"]), "eventSource": "WEB",
            "eventTimestamp": rfc3339(L.get("when") or ""),
            "currency": "USD", "conversionValue": float(L["revenue"]),
            "adIdentifiers": {"gclid": L["gclid"]}})
        sent_ids.append(str(L["external_id"]))
        print(f"  {tenant}: ${float(L['revenue']):.0f} @ {events[-1]['eventTimestamp']} gclid={L['gclid'][:16]}…")

    body = {"destinations": [destination], "events": events, "validateOnly": bool(args.dry_run)}
    req = urllib.request.Request(DM_ENDPOINT, data=json.dumps(body).encode(), method="POST",
        headers={"Authorization": "Bearer " + dm_token, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            resp = json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        print(f"  {tenant}: INGEST FAILED {e.code}: {e.read().decode()[:300]}"); return

    if resp.get("partialFailureError") or resp.get("errors"):
        print(f"  {tenant}: partial/errors: {json.dumps(resp)[:300]}")
    if args.dry_run:
        print(f"  {tenant}: [validateOnly] {len(events)} event(s) validated OK — not ingested, nothing written")
        return

    # --- real ingest succeeded: record locally (always), stamp acc.db (only if --mark) ---
    state.setdefault(tenant, []).extend(sent_ids)
    save_state(args.state, state)
    if args.mark:
        if has_ads_col:
            mark_uploaded(args.db, tenant, sent_ids)
            print(f"  {tenant}: ingested {len(sent_ids)}; stamped ads_uploaded_at in acc.db + state file")
        else:
            print(f"  {tenant}: ingested {len(sent_ids)}; --mark requested but acc.db leads table "
                  "has NO ads_uploaded_at column — recorded in state file only. "
                  "To add it (one-time, safe ALTER):\n"
                  "    sqlite3 " + args.db + " \"ALTER TABLE leads ADD COLUMN ads_uploaded_at TEXT\"")
    else:
        print(f"  {tenant}: ingested {len(sent_ids)}; recorded in state file (acc.db untouched). "
              f"external_ids: {', '.join(sent_ids)}")


def main():
    ap = argparse.ArgumentParser(description="acc.db (read-only) -> Data Manager offline conversions")
    ap.add_argument("--tenant", default=None, help="one tenant only (dumpster | bg-concrete)")
    ap.add_argument("--dry-run", action="store_true", help="validateOnly=true; writes nothing anywhere")
    ap.add_argument("--mark", action="store_true",
                    help="after a real ingest, stamp ads_uploaded_at in acc.db (default: state file only)")
    ap.add_argument("--db", default=os.getenv("ACC_DB_PATH", DEFAULT_DB), help="path to acc.db")
    ap.add_argument("--state", default=os.getenv("WON_STATE_PATH", DEFAULT_STATE),
                    help="local dedup state file (json)")
    ap.add_argument("--action-id", default=os.getenv("CLOSED_JOB_ACTION_ID"),
                    help="pin the conversion-action numeric id (skips the Ads API lookup)")
    ap.add_argument("--env", default=None, help="path to .env with Google tokens")
    args = ap.parse_args()
    load_env(args.env)

    if not os.path.exists(args.db):
        print(f"DB not found: {args.db} (set --db or ACC_DB_PATH)"); sys.exit(1)
    for k in ("GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_DEVELOPER_TOKEN"):
        if not os.getenv(k):
            print(f"{k} missing — point --env at the .env holding the Google credentials"); sys.exit(1)

    dm_token = dm_access_token()                    # fail fast if DM token bad
    ads_token = None if args.action_id else ads_access_token()
    cols = db_columns(args.db)
    if not cols:
        print(f"no 'leads' table in {args.db} — wrong DB?"); sys.exit(1)
    has_ads_col = "ads_uploaded_at" in cols
    if not has_ads_col:
        print("note: acc.db has no ads_uploaded_at column — dedup via local state file "
              "+ Google transactionId (see --mark help)")

    state = load_state(args.state)
    items = [(t, c) for t, c in TENANT_ADS.items() if not args.tenant or t == args.tenant]
    if not items:
        print(f"unknown tenant '{args.tenant}' (known: {', '.join(TENANT_ADS)})"); sys.exit(1)
    print(f"acc.db direct won-upload for {len(items)} client(s)"
          + (" [DRY]" if args.dry_run else "") + (" [MARK]" if args.mark else ""))
    for tenant, cid in items:
        try:
            run_tenant(tenant, str(cid), args, dm_token, ads_token, state, has_ads_col)
        except Exception as e:
            print(f"  {tenant}: ERR {str(e)[:200]}")


if __name__ == "__main__":
    main()

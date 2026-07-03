r"""QUALIFIED PAID CALLS -> Google Ads offline conversions via the DATA MANAGER API.

Replaces upload_call_conversions.py, which is dead twice over:
  1. its upload leg used ConversionUploadService.UploadClickConversions — GATED by Google
     ("new integrations should use the Data Manager API");
  2. its data source (/api/leads/calls + /dni-gclid over HTTP) hits acc-api:3051 which
     runs on the EMPTY tasks.db (see OFFLINE-CONVERSIONS-HANDOFF.md).

This version uses the same SSH bridge as upload_won_ssh.py — all Google tokens stay in
the local .env, nothing is copied to the VPS, no live DB is ever written:

  1. ssh : sqlite3 .backup of the live acc.db -> /tmp -> scp pull (call leads live there)
  2. ssh : sqlite3 -json dump of dni_assignments from BOTH DBs (live DNI writes go to
           tasks.db via acc-api:3051; acc.db holds the pre-06/28 history)
  3. local: qualify calls (connected >= --min-duration, not spam), resolve each gclid
           (lead metadata.gclid first, else dni_assignments by callSid)
  4. POST datamanager v1 events:ingest ('Qualified Phone Lead (Offline)', $50 nominal,
           transactionId = lead external_id; --dry-run maps to validateOnly=true)
  5. dedup: uploaded_call_convs.json (same file the legacy script used) + Google-side
           transactionId.

Usage (venv python):
  C:\gadsenv\Scripts\python.exe upload_call_conversions_dm.py --dry-run   # SAFE first
  C:\gadsenv\Scripts\python.exe upload_call_conversions_dm.py            # real ingest
"""
import os, sys, json, sqlite3, argparse, subprocess, tempfile
import urllib.request, urllib.error
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

from upload_won_from_accdb import (load_env, dm_access_token, ads_access_token,
                                   action_id, rfc3339, DM_ENDPOINT, MCC)

TENANT_ADS = {"dumpster": "2253432096", "bg-concrete": "1488904463"}
ACTION_NAME = "Qualified Phone Lead (Offline)"
CALL_LEAD_VALUE = 50.0                              # nominal value per qualified call lead

HOST = os.getenv("ACC_SSH_HOST", "biggelsworth@134.195.90.110")
REMOTE_ACC_DB = "/home/biggelsworth/acc-api/acc.db"
REMOTE_TASKS_DB = "/home/biggelsworth/db/tasks.db"
REMOTE_SNAP = "/tmp/acc.call-snap.db"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SEEN_FILE = os.path.join(SCRIPT_DIR, "uploaded_call_convs.json")

# NOTE: '<>' not '!=' — a literal ! trips bash history expansion on the remote shell.
DNI_SQL = ("SELECT call_sid, gclid FROM dni_assignments "
           "WHERE call_sid IS NOT NULL AND gclid IS NOT NULL AND gclid <> ''")


def sh(cmd, capture=False):
    r = subprocess.run(cmd, capture_output=capture, text=capture)
    if r.returncode != 0:
        sys.exit(f"FAILED ({r.returncode}): {' '.join(cmd)}"
                 + (f"\n{r.stderr[:300]}" if capture and r.stderr else ""))
    return r.stdout if capture else None


def fetch_snapshot():
    """Consistent (WAL-safe) copy of the live acc.db -> local temp file."""
    local = os.path.join(tempfile.gettempdir(), "acc.call-snap.db")
    print(f"snapshot {REMOTE_ACC_DB} on {HOST} ...")
    sh(["ssh", "-o", "ConnectTimeout=15", HOST,
        f"sqlite3 {REMOTE_ACC_DB} \".backup '{REMOTE_SNAP}'\" && chmod 600 {REMOTE_SNAP}"])
    sh(["scp", "-q", f"{HOST}:{REMOTE_SNAP}", local])
    sh(["ssh", HOST, f"rm -f {REMOTE_SNAP}"])
    return local


def fetch_dni_map():
    """callSid -> gclid from dni_assignments in BOTH DBs (tasks.db is the live one)."""
    dni = {}
    for db in (REMOTE_ACC_DB, REMOTE_TASKS_DB):        # tasks.db last = live wins ties
        out = sh(["ssh", HOST, f"sqlite3 -json 'file:{db}?mode=ro' \"{DNI_SQL}\""], capture=True)
        for row in (json.loads(out) if out.strip() else []):
            dni[row["call_sid"]] = row["gclid"]
    print(f"dni map: {len(dni)} callSid->gclid entries (both DBs)")
    return dni


def load_seen():
    if os.path.exists(SEEN_FILE):
        try:
            return set(json.load(open(SEEN_FILE)))
        except Exception:
            return set()
    return set()


def save_seen(seen):
    json.dump(sorted(seen), open(SEEN_FILE, "w"), indent=0)


def qualified_calls(db_path, tenant, dni, min_duration, seen):
    con = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True, timeout=5)
    con.row_factory = sqlite3.Row
    try:
        rows = con.execute(
            "SELECT external_id, call_duration, created_at, metadata FROM leads "
            "WHERE tenant_id=? AND channel='call' ORDER BY created_at DESC LIMIT 1000",
            (tenant,)).fetchall()
    finally:
        con.close()
    out, no_gclid = [], 0
    for r in rows:
        try:
            m = json.loads(r["metadata"] or "{}")
        except Exception:
            m = {}
        if (r["call_duration"] or 0) < min_duration or m.get("spam"):
            continue
        key = m.get("callSid") or r["external_id"]
        if key in seen or r["external_id"] in seen:
            continue
        gclid = m.get("gclid") or dni.get(m.get("callSid"))
        if not gclid:
            no_gclid += 1
            continue                                  # organic / pre-DNI — not attributable
        out.append({"key": key, "external_id": r["external_id"], "gclid": gclid,
                    "when": m.get("callStart") or r["created_at"],
                    "src": m.get("sourceLabel") or "", "dur": r["call_duration"]})
    return out, no_gclid


def run_tenant(tenant, cid, snap, dni, a, dm_token, ads_token, seen):
    rows, no_gclid = qualified_calls(snap, tenant, dni, a.min_duration, seen)
    if not rows:
        print(f"  {tenant}: nothing to upload"
              + (f" ({no_gclid} qualified call(s) w/o gclid — organic/pre-DNI)" if no_gclid else ""))
        return
    aid = a.action_id if (a.action_id and a.tenant) else action_id(cid, ads_token, ACTION_NAME)
    if not aid:
        print(f"  {tenant}: action '{ACTION_NAME}' missing in {cid} — create it first."); return
    print(f"  {tenant}: {len(rows)} qualified PAID call(s) with a gclid"
          + (f" ({no_gclid} more w/o gclid — organic)" if no_gclid else "") + ":")

    destination = {"reference": "primary",
        "operatingAccount": {"accountType": "GOOGLE_ADS", "accountId": cid},
        "loginAccount": {"accountType": "GOOGLE_ADS", "accountId": MCC},
        "productDestinationId": str(aid)}
    events = []
    for r in rows:
        events.append({"destinationReferences": ["primary"],
            "transactionId": str(r["external_id"]), "eventSource": "WEB",
            "eventTimestamp": rfc3339(r["when"] or ""),
            "currency": "USD", "conversionValue": CALL_LEAD_VALUE,
            "adIdentifiers": {"gclid": r["gclid"]}})
        print(f"    {r['src']:28} {r['dur']:>4}s @ {events[-1]['eventTimestamp']} gclid={r['gclid'][:16]}…")

    body = {"destinations": [destination], "events": events, "validateOnly": bool(a.dry_run)}
    req = urllib.request.Request(DM_ENDPOINT, data=json.dumps(body).encode(), method="POST",
        headers={"Authorization": "Bearer " + dm_token, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            resp = json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        print(f"  {tenant}: INGEST FAILED {e.code}: {e.read().decode()[:300]}"); return

    if resp.get("partialFailureError") or resp.get("errors"):
        print(f"  {tenant}: partial/errors: {json.dumps(resp)[:300]}")
    if a.dry_run:
        print(f"  {tenant}: [validateOnly] {len(events)} event(s) validated OK — not ingested, nothing written")
        return
    seen.update(r["key"] for r in rows)
    save_seen(seen)
    print(f"  {tenant}: ingested {len(events)} call conversion(s) into '{ACTION_NAME}' via Data Manager.")


def main():
    ap = argparse.ArgumentParser(description="qualified paid calls (acc.db via ssh) -> Data Manager")
    ap.add_argument("--tenant", default=None, help="one tenant only (dumpster | bg-concrete)")
    ap.add_argument("--min-duration", type=int, default=60, help="seconds connected to qualify")
    ap.add_argument("--dry-run", action="store_true", help="validateOnly=true; writes nothing anywhere")
    ap.add_argument("--action-id", default=None,
                    help="pin the conversion-action numeric id (only with --tenant)")
    ap.add_argument("--env", default=None, help="path to .env with Google tokens")
    a = ap.parse_args()
    load_env(a.env)
    for k in ("GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_DEVELOPER_TOKEN"):
        if not os.getenv(k):
            sys.exit(f"{k} missing — point --env at the .env holding the Google credentials")
    items = [(t, c) for t, c in TENANT_ADS.items() if not a.tenant or t == a.tenant]
    if not items:
        sys.exit(f"unknown tenant '{a.tenant}' (known: {', '.join(TENANT_ADS)})")

    dm_token = dm_access_token()                      # fail fast if DM token bad
    ads_token = None if (a.action_id and a.tenant) else ads_access_token()
    seen = load_seen()
    dni = fetch_dni_map()
    snap = fetch_snapshot()
    print(f"call-conversion upload for {len(items)} client(s)" + (" [DRY]" if a.dry_run else ""))
    try:
        for tenant, cid in items:
            try:
                run_tenant(tenant, cid, snap, dni, a, dm_token, ads_token, seen)
            except Exception as e:
                print(f"  {tenant}: ERR {str(e)[:200]}")
    finally:
        try:
            os.remove(snap)
        except OSError:
            pass


if __name__ == "__main__":
    main()

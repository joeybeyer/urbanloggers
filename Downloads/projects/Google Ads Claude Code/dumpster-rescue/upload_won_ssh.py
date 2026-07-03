r"""SSH-BRIDGE won-job uploader ("Option 1b" from OFFLINE-CONVERSIONS-HANDOFF.md).

Runs on WINDOWS. All Google tokens stay in the local project .env — nothing is copied
to the VPS. Flow:

  1. ssh  : sqlite3 .backup of the live acc.db -> /tmp snapshot (WAL-safe, consistent)
  2. scp  : pull the snapshot to a local temp file
  3. run  : upload_won_from_accdb.py --db <snapshot>  (all its dedup/DM logic reused)
  4. clean: delete remote + local snapshots

Dedup: local state file (dumpster-rescue/uploaded_won_state.json) + Google-side
transactionId. --mark is refused (we run against a snapshot; stamping it is pointless
and acc.db itself is deliberately never written).

Usage (venv python):
  C:\gadsenv\Scripts\python.exe upload_won_ssh.py --dry-run            # SAFE first run
  C:\gadsenv\Scripts\python.exe upload_won_ssh.py --tenant dumpster    # real ingest
"""
import os, sys, argparse, subprocess, tempfile

HOST = os.getenv("ACC_SSH_HOST", "biggelsworth@134.195.90.110")
REMOTE_DB = "/home/biggelsworth/acc-api/acc.db"
REMOTE_SNAP = "/tmp/acc.won-snap.db"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOADER = os.path.join(SCRIPT_DIR, "upload_won_from_accdb.py")


def run(cmd, **kw):
    r = subprocess.run(cmd, **kw)
    if r.returncode != 0:
        sys.exit(f"FAILED ({r.returncode}): {' '.join(cmd)}")
    return r


def main():
    ap = argparse.ArgumentParser(description="ssh-snapshot acc.db, then run upload_won_from_accdb.py locally")
    ap.add_argument("--tenant", default=None)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--mark", action="store_true", help=argparse.SUPPRESS)
    a = ap.parse_args()
    if a.mark:
        sys.exit("--mark is not supported in ssh-bridge mode (we upload from a snapshot; "
                 "acc.db is never written). Dedup = state file + Google transactionId.")

    local_snap = os.path.join(tempfile.gettempdir(), "acc.won-snap.db")
    print(f"snapshot {REMOTE_DB} on {HOST} ...")
    run(["ssh", "-o", "ConnectTimeout=15", HOST,
         f"sqlite3 {REMOTE_DB} \".backup '{REMOTE_SNAP}'\" && chmod 600 {REMOTE_SNAP}"])
    print("pull snapshot ...")
    run(["scp", "-q", f"{HOST}:{REMOTE_SNAP}", local_snap])
    run(["ssh", HOST, f"rm -f {REMOTE_SNAP}"])

    try:
        cmd = [sys.executable, UPLOADER, "--db", local_snap,
               "--state", os.path.join(SCRIPT_DIR, "uploaded_won_state.json")]
        if a.tenant:
            cmd += ["--tenant", a.tenant]
        if a.dry_run:
            cmd += ["--dry-run"]
        run(cmd, cwd=SCRIPT_DIR)
    finally:
        try:
            os.remove(local_snap)
        except OSError:
            pass


if __name__ == "__main__":
    main()

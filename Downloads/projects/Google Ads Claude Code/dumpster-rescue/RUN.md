# RUN — `upload_won_from_accdb.py` (box-side won-job → Google Ads offline conversions)

"Option 1" from `OFFLINE-CONVERSIONS-HANDOFF.md`: skip the broken
`agencycommandcenter.ai/api/leads/won-conversions` path (nginx → acc-api:3051 → empty
`tasks.db`) and read the REAL data directly from `/home/biggelsworth/acc-api/acc.db`
**read-only**, then push to the Data Manager API. No live app is touched; `acc.db`'s
schema is never modified unless you explicitly choose to.

Stdlib-only — no `pip install` needed on the box (no google-ads lib, no dotenv required).

## 1. Deploy to the box

```bash
# from Windows
scp "C:\Users\joey\Downloads\projects\Google Ads Claude Code\dumpster-rescue\upload_won_from_accdb.py" \
    biggelsworth@134.195.90.110:/home/biggelsworth/uploaders/

# on the box: a .env next to the script with ONLY the Google creds (copy values from
# C:\Users\joey\Downloads\projects\Google Ads Claude Code\.env — they're fresh as of 2026-07-02)
cat > /home/biggelsworth/uploaders/.env <<'EOF'
GOOGLE_ADS_CLIENT_ID=...
GOOGLE_ADS_CLIENT_SECRET=...
GOOGLE_ADS_DEVELOPER_TOKEN=...
GOOGLE_ADS_REFRESH_TOKEN=...
GOOGLE_DM_REFRESH_TOKEN=...
EOF
chmod 600 /home/biggelsworth/uploaders/.env
```

## 2. Verify BEFORE the first real run (on the box)

```bash
# a) the data is where we think it is (read-only peek; safe)
sqlite3 "file:/home/biggelsworth/acc-api/acc.db?mode=ro" \
  "SELECT count(*), sum(revenue) FROM leads WHERE tenant_id='dumpster' AND outcome='won' AND revenue IS NOT NULL"

# b) does the leads table have ads_uploaded_at? (drives the marking choice below)
sqlite3 "file:/home/biggelsworth/acc-api/acc.db?mode=ro" "PRAGMA table_info(leads)" | grep ads_uploaded_at

# c) acc-api (3051) is stable — see "FIRST: stabilize 3051" in the handoff
pm2 status acc-api
```

## 3. Dry run (validates at Google via validateOnly=true — ingests nothing, writes nothing)

```bash
cd /home/biggelsworth/uploaders
python3 upload_won_from_accdb.py --env .env --dry-run
```

Expect one line per won+gclid lead with `$revenue @ timestamp gclid=…`, then
`[validateOnly] N event(s) validated OK`. Most won jobs have **no** gclid (GBP/organic) —
that's expected and reported, not an error.

If the conversion-action lookup fails (Ads REST version drift), pin it:
`--action-id <numeric id>` or `GOOGLE_ADS_API_VERSION=v22` in `.env`. The id is the
`Closed Job Revenue (Offline)` action in acct 2253432096 (dumpster) / 1488904463 (bg-concrete).

## 4. Real run

```bash
python3 upload_won_from_accdb.py --env .env --tenant dumpster
```

Default is **acc.db untouched**: ingested leads are recorded in
`uploaded_won_state.json` next to the script (this is the dedup for re-runs) and the
external_ids are printed so they can be marked by hand if ever desired.

Then check Google Ads → acct 2253432096 → Goals → Conversions → `Closed Job Revenue
(Offline)` (imports show within ~3h). Once data flows, promote the action to Primary.

## 5. Optional: stamp `ads_uploaded_at` in acc.db (`--mark`)

```bash
python3 upload_won_from_accdb.py --env .env --tenant dumpster --mark
```

- Only runs after a **successful, non-dry** ingest. Short-lived write: single
  transaction, `busy_timeout=10s` so it waits politely if the live 3050 app holds the
  write lock.
- If the column doesn't exist (step 2b), `--mark` does NOT alter the schema — it tells
  you the one-line `ALTER TABLE leads ADD COLUMN ads_uploaded_at TEXT` to run yourself
  if you want DB-level marking. Adding a nullable column is non-breaking for the 3050
  app, but it's your call; the state file alone is sufficient dedup.
- Recommendation: run the first few cycles WITHOUT `--mark`, confirm conversions land
  in Ads, then decide.

## 6. Schedule (cron, box)

```bash
crontab -e   # as biggelsworth — every 6h is plenty for won-job cadence
0 */6 * * * cd /home/biggelsworth/uploaders && /usr/bin/python3 upload_won_from_accdb.py --env .env >> won_upload.log 2>&1
```

Add `--mark` to the cron line only after you've settled the step-5 choice.

## Safety notes

- **Read-only open**: `sqlite3.connect("file:acc.db?mode=ro", uri=True)` — the script
  cannot write to acc.db on the read path. If acc.db is in WAL mode and the ro open ever
  errors (`unable to open database file`), the 3050 app already keeps the `-wal`/`-shm`
  files alive so in practice it won't; worst case, run against a copy:
  `cp acc.db /tmp/acc.copy.db && ... --db /tmp/acc.copy.db` (then dedup is state-file only, which is fine).
- **Triple dedup**: local state file (always) → `ads_uploaded_at` filter (if column
  exists) → Data Manager `transactionId=external_id` (Google rejects repeats). Losing
  the state file cannot cause double-counting.
- **Windows test against a copy**:
  `C:\gadsenv\Scripts\python.exe upload_won_from_accdb.py --db C:\path\to\acc.copy.db --dry-run`
  (uses the project `.env` automatically).
- This does NOT fix `upload_call_conversions.py` (still on gated legacy
  UploadClickConversions) — separate task, see handoff.

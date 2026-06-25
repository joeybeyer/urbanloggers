# Scaling the Lead Warehouse — Onboarding a New Tenant

Every client ("tenant") in the Agency Command Center (ACC) warehouse gets **three lead feeds**
into its CRM. This doc is the repeatable playbook to add a new client. It's **config, not code** —
the engines are map-driven; onboarding is a handful of one-line entries.

> CRM/warehouse details: ACC runs on the VPS (`biggelsworth@134.195.90.110`, `~/acc-api`, pm2
> `acc-api`, port 3051). Warehouse DB = `acc.db` (`leads`, `tenants`). All the lead engines below
> live in `Google Ads Claude Code/dumpster-rescue/` and run from Windows Task Scheduler via
> `run_hidden.vbs` (no visible window).

---

## The three feeds

| Channel | Engine (in `dumpster-rescue/`) | Routes to tenant by | Schedule |
|---------|-------------------------------|---------------------|----------|
| **Form / email leads** | `sync_resend_leads.py` | `TENANT_MAP` (Resend "from" sender → tenant) | every 30 min |
| **Calls** | `transcribe_signalwire.py --tenant X` | SignalWire number-map → tenant | every 30 min (frequent) + daily backfill |
| **Ads spend + conversions** | `pull_ad_spend.py`, `upload_form_conversions_datamanager.py` | Google Ads account under the MCC | daily |

Schedulers:
- `run_transcribe_frequent.bat` — every 30 min: SignalWire calls (all tenants) + Dumpster Turso
  form sync + **`sync_resend_leads.py`** (all other tenants' form leads).
- `run_call_transcribe.bat` — daily ~8:20am: deeper call backfill, won-lead conversion uploads
  (Data Manager API), `pull_ad_spend.py` (ROAS denominator).

---

## Onboard a new client (≈5 steps)

### 1. Create the tenant row (warehouse)
Insert into `tenants` (id, `display_name`, `brand_color`, `profit_margin`, `payout_pct`).
This drives the CRM branding + the owner-cockpit math.

### 2. Form / email leads  →  Resend
The client's website quote form must **send its notification through the Resend API** from a
**verified Resend domain**, using the shared labeled template:

```
Name: ...
Phone: ...
Email: ...
Project: ...
Property: ...
Timeline: ...
ZIP: ...
City/State: <City>, <ST>
Notes: ...
Page: https://<site>/contact/
Submitted: <ISO timestamp>
```

> The parser keys off `Label: value` lines in the email **text body**. If a client's form uses a
> different layout, fields land null. Keep ONE shared form-email template across all sites.

Then add **one line** to `TENANT_MAP` in `sync_resend_leads.py` (match the Resend "from" name):

```python
TENANT_MAP = [
    ("BG Concrete", ("bg-concrete", "concrete")),
    ("New Client Brand", ("new-client-tenant", "vertical")),   # <-- add
]
```

Test before relying on it:
```
python sync_resend_leads.py --days 7 --dry-run
```

> Dumpster web-form leads are intentionally NOT in `TENANT_MAP` — they sync via Turso
> (`sync_to_acc.py`). Don't double-map them.

### 3. Calls  →  SignalWire
- Put the client's SignalWire **subproject** creds in `.env`.
- Add its tracked numbers to the number-map (number → tenant).
- Add **one line** to `run_transcribe_frequent.bat`:
  ```
  "C:\gadsenv\Scripts\python.exe" transcribe_signalwire.py --tenant new-client-tenant --days 1 --min-duration 20 >> signalwire_frequent.log 2>&1
  ```
Engine records → transcribes (OpenRouter→Gemini) → AI-extracts name/price/summary → upserts
(`source=google-ads`, `external_id=call-<sid>`). Spam (short voicemails) is judged + filtered.

### 4. Ads  →  Google Ads
- Link the account under the MCC.
- `pull_ad_spend.py` pulls spend per tenant (the ROAS denominator in the CRM).
- Won leads push back to Google Ads for value-ROAS via `upload_form_conversions_datamanager.py`
  (Data Manager API; legacy `UploadClickConversions` is gated — do NOT re-enable it).

### 5. CRM access
Mint the tenant's magic link and hand it over:
`https://agencycommandcenter.ai/api/crm?token=<sign {t:'new-client-tenant', scope:'crm'}>`
(sign with `LEAD_ACTION_SECRET` on the VPS). Treat tokens like passwords.

---

## Billable semantics (so the CRM counts the right money)
The CRM "💰 Billable" chip = **money owed to Joey**, not the client's job value:
- **Lead-gen** lead (`metadata.leadgen`) → billable once it clears the duration gate
  (`metadata.billable`); amount = `metadata.billAmount`.
- **Resale** pay-per-call (HVAC, `metadata.attribution`) → billable if `revenue>0`.
- A client's **own** lead (no leadgen / no attribution) is **never** billable even with revenue.
The chip stays visible (showing 0) for any tenant that generates billable leads, so new
directories/EMD sites show their billables the moment a call clears the gate.

---

## Paid vs organic on form leads
A form lead is tagged **paid** (`google-ads`) only if the Resend email body carries a `gclid`;
otherwise **organic**. To get paid attribution on form leads, make the paid LP pass `gclid` into
the form submission so it appears in the email.

---

## Gotchas
- `sync_resend_leads.py` reads keys from the **root** `.env` (`RESEND_API_KEY`, `ACC_API_KEY`,
  `ACC_API_URL`) even though it runs from `dumpster-rescue/`.
- Resend API blocks requests without a `User-Agent` header (403) — the connector sends one.
- Resend list is newest-first; the connector pages with `?after=<id>` until it passes `--days`.
- Idempotent everywhere by `tenant_id + external_id` (`resend-<id>`, `call-<sid>`), so re-runs
  update instead of duplicating.

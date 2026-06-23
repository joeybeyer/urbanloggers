# Data Manager API migration — offline conversion uploads

**STATUS: ✅ DONE 2026-06-23.** OAuth re-consented (`GOOGLE_DM_REFRESH_TOKEN`, adwords+datamanager scopes),
`upload_form_conversions_datamanager.py` built and validated against the live endpoint (HTTP 200 via
`validateOnly`), and wired into `run_call_transcribe.bat`. It auto-fires the next time a Won job is queued.
Gotcha learned: every event MUST include `eventSource` (e.g. "WEB") or it 400s `event_source missing`.
The first real Won lead is still the true end-to-end confirmation (watch "Closed Job Revenue (Offline)").

---
_Original scoping notes below (kept for reference):_

**Status:** NOT urgent. Blocked on OAuth re-consent. Build + test when Frank's FIRST "Won" job is queued.
**Why:** Google gated the legacy `ConversionUploadService.UploadClickConversions` to "existing users."
Our integration never established usage (the daily task was silently broken until 2026-06-23), so
Google now treats it as a new integration and rejects it → *"should use the Data Manager API."*

## What this affects
| Script | Conversion action | Impact today |
|---|---|---|
| `upload_call_conversions.py` | Qualified Phone Lead (Offline) — SECONDARY | **None** — disabled in bat. Native call tracking ("Phone call from ad" + "Phone calls on the website") already feeds bidding as PRIMARY. |
| `upload_form_conversions_warehouse.py` | Closed Job Revenue (Offline) — value-based ROAS | **Will fail** the same way the moment a Won lead is queued. Currently 0 queued, so it hasn't errored yet. |

The migration is only worth doing for **`upload_form_conversions_warehouse.py`** (true revenue ROAS).
Leave the call upload disabled — native tracking covers it.

## THE BLOCKER (a Joey browser action — do this first)
Current OAuth token (`GOOGLE_ADS_REFRESH_TOKEN`) has scope `https://www.googleapis.com/auth/adwords` ONLY.
Data Manager API needs `https://www.googleapis.com/auth/datamanager`.

→ Re-run the OAuth consent for the same client_id requesting BOTH scopes, mint a new refresh token.
   Store it as a SEPARATE env var `GOOGLE_DM_REFRESH_TOKEN` (do NOT overwrite the working Ads token).
   The Data Manager API project may also need to be enabled in the GCP Cloud Console for the client_id's project.

## API shape (confirmed from Google docs 2026-06)
- **Endpoint:** `POST https://datamanager.googleapis.com/v1/events:ingest`
- **Auth:** `Authorization: Bearer <access_token from datamanager-scoped refresh token>`
- **Body:**
```json
{
  "destinations": [{
    "operatingAccount": { "accountType": "GOOGLE_ADS", "accountId": "2253432096" },
    "loginAccount":     { "accountType": "GOOGLE_ADS", "accountId": "6516751752" },
    "productDestinationId": "<conversion_action NUMERIC id, not resource_name>"
  }],
  "events": [{
    "adIdentifiers": { "gclid": "<gclid>" },
    "conversionValue": 450.00,
    "currency": "USD",
    "eventTimestamp": "2026-06-20T15:07:01-05:00",   // RFC3339 w/ offset
    "transactionId": "<external_id>",                 // dedup key — use the lead external_id
    "eventSource": "WEB"
  }],
  "encoding": "HEX"
}
```
Gotchas vs the old API:
- `accountId` = customer id **digits only, no dashes**.
- `productDestinationId` = the conversion action's **numeric id** (last segment of `customers/{cid}/conversionActions/{ID}`), NOT the resource_name string the old code passed.
- `transactionId` is the dedup key — pass each lead's `external_id` so retries don't double-count.
- `eventTimestamp` is RFC3339 with timezone offset (old API used `YYYY-MM-DD HH:MM:SS+00:00`).

## Build plan (when triggered)
1. Joey: re-consent OAuth (adwords + datamanager) → `GOOGLE_DM_REFRESH_TOKEN` in `.env`.
2. New `upload_form_conversions_datamanager.py`: same ACC plumbing as `upload_form_conversions_warehouse.py`
   (`/api/leads/won-conversions` → upload → `/mark-ads-uploaded`), but POST to `events:ingest` with the body above.
   Resolve each tenant's conversion-action numeric id once via the Ads API (query `conversion_action.id`).
3. Test against the REAL first Won lead (dry-run print, then live, then confirm it shows in the account's
   "Closed Job Revenue (Offline)" within ~6h).
4. Swap the bat line `upload_form_conversions_warehouse.py` → the new script. Keep the old as backup.

## Re-enabling the call upload (optional, lower value)
Same migration applies to `upload_call_conversions.py` if you ever want the AI-qualified call layer back.
Native call conversions already feed bidding, so only do this if you want transcript-qualified calls
(filtering spam/short calls) as a distinct signal. Most accounts don't need it.

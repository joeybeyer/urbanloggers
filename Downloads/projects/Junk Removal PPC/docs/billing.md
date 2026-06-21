# Billing Config

| Setting | Value | Where set |
|---|---|---|
| Rate | **$45 / billable call** | `BILL_RATE_USD` in `transcribe_signalwire.py` + `RATE` in `invoice_frank.py` |
| Billable threshold | **connected ≥ 90 seconds** | `BILL_THRESHOLD_SEC` |
| Spam excluded | yes (transcriber flags robocalls/solicitations) | LLM extraction `spam` flag |
| Frank's own calls | never billed (Ads + GBP = his marketing) | `FRANK_OWN` set |
| Buyer | **Frank @ Dumpster Rescue** (exclusive, for now) | invoice `--to dumpsterrescue@gmail.com --send-to-frank` |

**Billable = lead-gen site call + ≥90s + not spam.**

## Invoice flow
- `invoice_frank.py` pulls billable calls for a month from `GET /api/leads/calls?tenant=dumpster`,
  itemizes (date / site / duration / summary + recording-proof link), totals @ $45, emails via Resend.
- Runner `run_frank_invoice.bat` → bills Frank directly. **Silent on $0 months** (no empty invoice).
- Scheduled monthly (1st, 9am) as Windows task **DumpsterFrankInvoice**.
- Sender `invoices@notify.dumpsterrescueusa.com` (verified in Resend).

## Knobs to change later
- **Raise the rate / threshold** → edit the constants in `transcribe_signalwire.py`, then
  re-run `--reextract`-free pass (it re-stamps `billAmount` from the cache).
- **Add a second buyer / go marketplace** → route by buyer, per-buyer rate (not built yet).
- **Tighten "billable"** → switch from duration-based to transcript-qualified (only real job inquiries).

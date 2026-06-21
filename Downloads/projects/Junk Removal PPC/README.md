# Junk Removal — Pay-Per-Call Network

Joey's junk-removal lead-gen business: own a network of city-specific junk-removal
websites + GBPs, capture the inbound calls, and **sell them to buyers per call**.
First (exclusive) buyer: **Frank @ Dumpster Rescue** ($45/billable call).

> Dumpster Rescue itself is a **client** (SEO/Ads) — that work lives in
> `../Dumpster Rescue USA/`. This folder is the **lead-gen network Joey owns** and the
> machine that bills Frank for its calls.

---

## How it works (live)

```
8 city lead-gen sites ─┐
                       ├─► SignalWire tracking #s ─► [daily] transcribe + extract + classify
Frank's Ads + GBP #s ──┘                              │   billable? (leadgen + 90s+ + not spam) → $45
                                                      ├─► ACC warehouse (tenant=dumpster, channel=call)
                                                      ├─► Frank's "Call Leads" sheet (sortable, sourced,
                                                      │     playable recording + transcript)
                                                      └─► [monthly 1st] invoice_frank.py → emailed invoice
```

Billable rule: **lead-gen call, connected ≥ 90s, not spam = $45.** Frank's own Ads/GBP
calls are his marketing (never billed). Spam (≈46% of volume) auto-excluded by the transcriber.

**Current state (2026-06-18):** engine armed, $0 to bill — the 8 sites haven't produced
qualifying calls yet. Job #1 = build/rank the sites so they ring. Every qualifying call
then auto-appears at $45 with a recording link as dispute-proof.

---

## Where everything actually runs (do not move without re-pointing)

| Piece | Lives / runs at |
|---|---|
| `transcribe_signalwire.py`, `invoice_frank.py` + `.bat` runners | `../Google Ads Claude Code/dumpster-rescue/` (uses that tree's `.env`) |
| Scheduled tasks | Windows Task Scheduler: **DumpsterCallTranscribe** (daily 8:20am), **DumpsterFrankInvoice** (1st 9am) |
| Warehouse API (`/api/leads/calls`, `/api/calls/recording/:sid`) | ACC VPS `134.195.90.110` (pm2 `acc-api`), repo `joeybeyer/acc-api` |
| n8n workflows | self-hosted n8n at n8n.agencycommandcenter.ai (JSON copies in `workflows/`) |
| SignalWire | Space `seologicagency.signalwire.com`, project "junk removal" |

The `.json` files in `workflows/` are version-controlled **copies** — the live versions
run inside n8n. Re-import there to update.

---

## Folder layout
- `docs/` — phone-number→site map, billing config
- `workflows/` — n8n workflow exports (call sync, garage intake, status sync, web leads)
- `sites/` — the 8 city site builds (see `sites/README.md`)

See `docs/phone-numbers.md` and `docs/billing.md` for the specifics.

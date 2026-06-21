# City Lead-Gen Sites

The 10 junk-removal EMD sites whose calls we sell to Frank. Goal: each ranks locally
(pure organic / EMD — **no GBP** for these 10) and rings its SignalWire number with
real junk/dumpster jobs.

## Build targets
Numbers below are **verified live against SignalWire** (`IncomingPhoneNumbers`, project
`junk removal`, 2026-06-21). The number's `friendly_name` is the per-city billing key.
⚠️ The §C table in `../JUNK-REMOVAL-10-SITE-REBUILD-SPEC.md` had these scrambled — **this
table is the source of truth.**

| City | Domain | SignalWire # | Site folder | # status |
|---|---|---|---|---|
| Bartlett | junkremovalbartlett.net | 630-780-4508 | `bartlett/` | ✅ live |
| Elmhurst | junkremovalelmhurst.com | 630-780-5461 | `elmhurst/` | ✅ live |
| Glen Ellyn | junkremovalglenellyn.com | 630-780-5987 | `glen-ellyn/` | ✅ live |
| Aurora | junkremovalinaurora.com | 630-604-7373 | `aurora/` | ✅ live |
| Itasca | junkremovalitasca.com | — none — | `itasca/` | ⚠️ **buy + name** |
| St. Charles | junkremovalstcharles.net | 630-780-4492 | `st-charles/` | ✅ live |
| Warrenville | junkremovalwarrenville.com | — none — | `warrenville/` | ⚠️ **buy + name** |
| Wayne | junkremovalwayne.com | 630-780-4948 | `wayne/` | ✅ live |
| Wheaton | junkremovalwheatonil.com | 630-593-3827 | `wheaton/` | ✅ live |
| Winfield | junkremovalwinfield.com | 630-780-4941 | `winfield/` | ✅ live |

**Frank's own numbers (never billable):** 630-652-5447 (paid landing) · 630-604-6428 (Medinah GBP).
**Before Itasca/Warrenville go live:** buy a SignalWire number, name it `Junk Removal <City> IL`,
point the site at it — no code change to bill (`transcribe_signalwire.py` auto-labels it).

## Approach (recommended)
- **One template, N cities.** A static Next.js (`output: 'export'`) template like the
  Dumpster Rescue / Urban Loggers builds, parameterized per city (H1, neighborhoods,
  county, landmarks, FAQs, the SignalWire number). Deploy each to Vercel.
- **Click-to-call above the fold** wired to that city's SignalWire number (tel: + GA event).
- **GBP per city** (the organic/maps lead source) — fact-dense description + FAQPage schema
  (per Joey's SEO doctrine: GBP manual Q&A is dead, Gemini reads schema + reviews).
- **No code change to bill** — once a site rings its named number, qualifying calls
  (≥90s, not spam) auto-bill Frank at $45.

## Per-city content checklist (from SEO SOP / city-page formula)
TLDR 5 bullets at top · H1 `Junk Removal in <City>, IL` · 5+ unique neighborhoods · county ·
1+ local landmark/road · local-specific FAQ · GeoCoordinates schema · 800–1,500 unique words.

> Reuse the Dumpster Rescue repo as the template starting point — it already has the
> schema, sticky call bar, and city-page patterns. Don't share content between cities
> (thin/duplicate city pages are the #1 fail mode).

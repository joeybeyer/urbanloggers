# 02 — Cannibalization

**Measured:** 2026-10-04, last 28 days, `sc-domain:urbanloggers.org`. Source `audit/cann-28d.json`
(71 flagged queries, 5,894 impressions, 22 clicks).

Read this before acting on `audit/cann-28d.json` or `audit/gaps.md`. **Both tools over-report here**,
for two reasons that are specific to this site, and one of their recommendations would lose a
page-one ranking.

## First: throw out two classes of false signal

**1. Legacy hosts — 740 of 5,894 impressions (12.6%).** The site recently consolidated onto
`https://urbanloggers.org`. Search Console still holds history for `https://www.` (572 impressions)
and `http://` (168). Those appear as a second "competing URL" for the same query.

```
https:// (canonical)   4,292 impressions
https://www.             572
http://                  168
```

Host canonicalisation is already correct and verified live — `http://`, `https://www.` and
`http://www.` all 301 to the canonical host. This resolves on its own. **Do not 301 anything to fix
it.** Only **26 of the 71** flagged queries have all competing URLs on the canonical host; those 26
are the real set.

**2. One-and-two-impression noise.** The tool counts any URL with ≥1 impression as a competitor.
The clearest case is the site's largest query:

```
'stump grinding mount pleasant wi'   3,435 impressions   HIGH   "301 redirect loser → winner"
  /mount-pleasant/                   3,432 impr   pos 7.9
  /                                      2 impr   pos 12.5
  www./brookfield/                       1 impr   pos 2.0
```

`/mount-pleasant/` owns the query with 99.9% of impressions at position 7.9. There is no fight.
**Following the tool's advice here would 301 away a page-one ranking.**

## Retraction: the zero-click row is instrumentation, not an opportunity

The section below called this row the biggest finding on the site and sent you to rewrite
`/mount-pleasant/`'s title and meta for the click. **That was wrong — the impressions are almost
certainly not human.** A position-1 listing converts at 20–30%; here every high-position row is
zero:

```
emergency stump removal   www./brookfield/   116 impr   pos 1.0   0 clicks   (expect ~31)
tree trimming             www./brookfield/    55 impr   pos 1.0   0 clicks   (expect ~15)
stump removal             www./brookfield/    78 impr   pos 2.0   0 clicks   (expect ~12)
```

Site-wide: 22 clicks on 5,894 impressions. The Mount Pleasant query runs at a near-constant 122
impressions/day for a village of 27,000, and the ranking URLs are on the legacy `www` host. Together
that reads as rank-tracking software, not demand.

Leave the title alone. Beyond chasing phantom volume, putting `stump grinding` in a city page's
title hands a service term to a geo page — the exact split this file tells you to undo.

## The original section, kept for the numbers

That same row is the biggest single finding in this audit, for a different reason:

> **3,432 impressions at average position 7.9 and zero clicks.** One query is 58% of all site
> impressions and converts nothing.

A page-one listing with no clicks at that volume points at the SERP entry rather than the page —
the title and meta description as Google renders them, or a SERP whose top block absorbs the click.
Worth more than every item below combined. Check the live SERP for the query, then rewrite
`/mount-pleasant/`'s title and meta description for the click, not the ranking.

## Real conflict 1 — the homepage competes with its own money pages

The dominant genuine pattern. The homepage ranks for Milwaukee and stump terms that belong to
dedicated pages, and usually outranks them — while both sit too low to earn clicks.

| Query | Impr | Homepage | Dedicated page |
|---|---|---|---|
| `stump grinding milwaukee` | 107 | pos 30.5 (15) | `/stump-grinding/` pos 12.5 (92) |
| `milwaukee tree services` | 39 | **pos 14.9 (27)** | `/milwaukee/` pos 48.3 (12) |
| `milwaukee tree service` | 29 | **pos 17.3 (23)** | `/milwaukee/` pos 48.0 (6) |
| `tree removal milwaukee, wi` | 19 | **pos 22.9 (16)** | `/milwaukee/` pos 27.0 (3) |
| `tree trimming milwaukee` | 15 | **pos 15.0 (14)** | `/milwaukee/` pos 18.0 (1) |
| `stump removal milwaukee` | 34 | pos 27.6 (18) | `/stump-grinding/` pos 14.3 (16) |
| `stump removal milwaukee wi` | 16 | pos 43.9 (9) | `/stump-grinding/` pos 26.1 (7) |

`/milwaukee/` sits at **position 48** for its own city's terms while the homepage holds 15–23.

**Do not 301 and do not change either URL.** Both pages are indexed and both should exist. This is a
de-optimisation job, per `keyword-cannibalization-sop`:

1. **The homepage stops targeting Milwaukee.** It owns brand and generic terms
   (`tree service near me`, `urban loggers`, `tree trimming`). Remove "Milwaukee" from its title,
   H1 and first 100 words; keep it only where it names the service area in passing.
2. **`/milwaukee/` keeps every Milwaukee term** in title, H1 and the one phrase-bearing H2.
3. **Same for stump terms:** the homepage drops them; `/stump-grinding/` keeps them.
4. **Link down, not across:** the homepage links to `/milwaukee/` with "tree service in Milwaukee"
   as the anchor, so the city page is the obvious destination for the entity.

Commit 0a14e00 ("De-cannibalize /milwaukee vs homepage") started this. It is not finished — the
numbers above are from after it.

## Real conflict 2 — /pewaukee/ and /mequon/ split Pewaukee pruning

The only HIGH-severity rows with no legacy-host or noise explanation.

```
tree pruning companies pewaukee wi   14 impr   /pewaukee/ pos 10.7 (7)   /mequon/ pos 44.3 (7)
tree pruners pewaukee wi             12 impr   /pewaukee/ pos  8.5 (8)   /mequon/ pos 49.3 (4)
```

`/mequon/` should not rank for Pewaukee at all. Its copy names Pewaukee somewhere it should not.
Remove Pewaukee from `/mequon/`'s body copy, headings and FAQs — `data/locations.ts`, the `mequon`
entry — leaving at most a single internal link to `/pewaukee/`. Low volume, but it is a clean fix
and `/pewaukee/` is already at position 8.5.

## What NOT to do

- **No 301s anywhere from this report.** Every flagged pair is either legacy-host history, noise,
  or two pages that should both exist.
- **No URL, title or H1 changes on an indexed page** beyond the de-optimisation above — and that
  changes the *losing* targeting, never the winner's.
- **Ignore `audit/cannibalization.json` (90-day).** That window is mostly pre-consolidation
  `www`/`http` duplication and is actively misleading. Use the 28-day file.

## Verify

Re-pull after the de-optimisation has been live 3–4 weeks:

```bash
bash ~/.claude/skills/local-seo-audit/scripts/acc.sh cannibalization sc-domain:urbanloggers.org
```

Success is `/milwaukee/` moving off position 48 toward the homepage's 15–17 on its own terms, and
the homepage dropping off those queries. Legacy-host rows should also have thinned on their own.

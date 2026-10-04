# Urban Loggers LLC — on-page fix brief

**Site:** urbanloggers.org · **Repo:** `Urban Loggers LLC` (Next.js 14, App Router)
**Audited:** 2026-10-04 · **Doctrine:** Underground SEO University factor set, server version `2026-10-01` (186 factors)
**Scope:** 19 money pages — 14 city pages + 5 service pages. 23 pages crawled in total.

Two sources were used, and the difference matters:

- **Structure** (titles, canonicals, schema, nav, link counts) measured against the raw HTML.
- **Content** (answer position, word count, opening paragraph, citations) measured against the
  *visible text*, captured as markdown via Firecrawl.

Measuring content against raw HTML counts `<head>`, JSON-LD and scripts as if they were words on the
page. Two of the original twelve findings were that mistake and have been dropped — see the last
section. Do not re-raise them.

---

> ## STOP — read this before doing any of the work below
>
> **Most of this brief is already built in the repo and simply has not been deployed.** It was
> written against the **live** site while naming repo files to change, and the repo had moved on.
> Measured 2026-10-04 against a fresh `npx next build`:
>
> | Item | Live site | Repo build | Verdict |
> |---|---|---|---|
> | §1 external citations | ~0 domains/page | **6–9 domains on 19 of 20 money pages** | already done |
> | §2 footer links | — | **footer 26, page total 32** | already done (brief's "13" was a mis-measurement) |
> | §5 breadcrumb schema | **21 pages** | **0** | already removed |
> | §6 nav not server HTML | — | `nav>ul>li>a`: 7 `<ul>`, 33 `<li>`, 27 anchors, 0 buttons | **never true** |
> | L1 map embed / hours | both present | both present | **never true** |
> | L2 Brookfield street on 23 pages | real | **now 1** | fixed 2026-10-04 |
>
> `git status`: **42 modified/untracked files and 1 unpushed commit** on `master`. The site is on
> Vercel, so a push deploys. **Deploying is worth more than any remaining item in this brief.**
>
> Three measurement traps produced the false entries — a stale `.next` build, an hours regex that
> cannot read "Open 24 hours", and **Firecrawl absolutising every `href`** so that link checks
> matching `href="/` returned zero on every page. Detail in `00-local.md` → *Measurement traps*.
> Measure links and structure against `.next/server/app`; measure content against the `.md` files.

## Priority order

1. **Deploy what is already built** — commit and push; Vercel builds from `master`.
2. **Local (`00-local.md`)** — three GBP profiles, one silo each. Local comes first.
3. **Then re-audit against a fresh build** and work only what still fails. As of 2026-10-04 that is:
   `/brookfield/` (6 H2s carry the full phrase; 0 external domains; nothing bolded in the opening)
   and `/insurance/` (L2, an accepted exception).
4. **Thin service pages** (§3) — 5 pages, real content work. Still valid.

Everything below is kept for the rules and the factor numbers, which are correct. The *measured
state* in each section is not — re-measure before acting.

---

## 1. Every money page links to exactly one external site

**Failing:** 19 of 19 · **Factor:** `Money page links to at least five different external websites
using followed links` — All Positive, score **433**

```
AI Overview citations   +107%
Google positions 1-3    +168%
Google positions 1-5    +137%
```

There is a penalty on the other side too: `Contains no links to other websites` is All Negative at
**−148** (positions 1-3 −46%). One link per page sits in neither camp and nearer the penalty.

A third row matters for *placement*: `Links to other websites only in a sources or references list,
none in the text` is All Negative at **−141** (positions 1-5 −78%). So the links must sit **inside
sentences in the body copy**. A "Resources" list at the foot of the page is worse than nothing.

**Where:** `components/templates/CityPageTemplate.tsx` and `components/templates/ServiceHubTemplate.tsx`
(body copy), or the per-page content they consume.

**What to do:** weave 5–10 links to distinct authoritative domains into existing sentences, where the
fact they support is stated. Tree work has obvious anchors:

| Topic already in the copy | Natural citation |
|---|---|
| emerald ash borer, quarantine | `dnr.wisconsin.gov`, `aphis.usda.gov` |
| pruning standards, certified arborist | `isa-arbor.com`, `treesaregood.org` |
| storm damage, debris, utility lines | `fema.gov`, `we-energies.com` |
| tree risk, structural defect | `fs.usda.gov` |
| permits, protected trees | the relevant `city.milwaukee.gov` / municipal page |
| disposal, wood waste, mulch | `epa.gov` |

Rules: distinct domains (five links to `dnr.wisconsin.gov` counts once), no `rel="nofollow"`, inside
`<p>` prose rather than a list, and only where the sentence genuinely cites the source.

---

## 2. Internal link surface is short on every page

**Failing:** 19 of 19

```
S2  footer links to ≥21 distinct pages   score 179   currently 13
S1  header + footer reach ≥49 pages      score 185   currently 35 (22 header + 13 footer)
```

**Where:** `components/layout/Footer.tsx`, and `components/layout/Nav.tsx` / `Header.tsx`.

**S2 is a single change and clears all 19 pages.** The site has 14 city pages and 5 service pages;
listing all of them in the footer takes it from 13 to 21+ immediately. Pull them from
`data/locations.ts` and `data/services.ts` rather than hardcoding, so new pages appear automatically.

**S1 (≥49) is not reachable at the current page count** — the site has 25 routes in total. Treat it
as a reason to build more pages, not as something to force. Do not pad the nav with duplicates.

---

## 3. Five service pages are thin

**Failing:** 11 of 19 under 800 words. The service pages are the worst of them.

```
stump-grinding           409 words
tree-trimming-pruning    480
emergency-tree-service   484
tree-removal             493
log-milling              544
---
city pages               777 – 831   (mostly fine, a few just under)
milwaukee              1,958
brookfield             1,133
```

Counts are of visible body text after the H1, so nav and footer are excluded.

**Target:** 800 minimum. The current set favours 2,100–2,500 for the pages that matter, and the
`Semantic score 11 to 20 points over the Goldilocks zone` row scores 336 — so more depth is rewarded
well past the 800 floor.

**Where:** `components/templates/ServiceHubTemplate.tsx` and the five pages under `app/`.

---

## 4. More than one H2 carries the target phrase

**Failing:** 17 of 19 · The winner config is **exactly one** H2 containing the complete search phrase.
Two or more reads as "multiple subheading forms" and loses to the single-H2 config.

**What to do:** on each page keep one H2 carrying the full phrase (e.g. "Tree Removal in Waukesha,
WI") and rewrite the others as declarative headings that do not repeat it in full.

**Where:** both templates in `components/templates/`.

---

## 5. Remove the breadcrumb schema

**Failing:** 21 pages · `Breadcrumb schema` scores **−30**, and the audit's own T5 rule is "no
rendered breadcrumb trail, no BreadcrumbList".

**Where:** `lib/schema.ts:154` emits it; it is called from every page under `app/`.

**What to do:** delete the `BreadcrumbList` generator and its call sites. There is no rendered
breadcrumb trail to remove — only the JSON-LD.

---

## 6. Nav is not plain server HTML

**Failing:** 23 pages · The check wants `<nav>` → `<ul>` → `<li>` → real `<a href>` present in the
server-rendered HTML.

**Where:** `components/layout/Nav.tsx`.

**What to do:** make sure the primary nav renders as that structure server-side — real anchors, not
buttons or click handlers, and not dependent on hydration.

---

## 7. Nothing bolded in the opening section

**Failing:** 6 pages — all five service pages plus `/milwaukee/`.

Every city page already does this (4 bold elements in the opening); the service template does not.
Whatever the city template does, copy it.

**Where:** `components/templates/ServiceHubTemplate.tsx`.

---

## 8. Two single-page items

- **One page has more than one sales/urgency phrase.** Target is a single plain "Call {phone}".
- **One page has a `<title>` over 72 characters** and will be rewritten by Google. 72 is the tested
  limit, not 65.

Both are named in `audit/fc-audit.md`.

---

## Dropped — do not re-raise

These two were in the original audit and are **not real**. Both came from measuring content against
raw HTML source.

| Reported | Measured against visible text |
|---|---|
| `O16` answer buried past 13,000 chars — 19 pages | Every H1 sits at character **1,415–1,492**. Zero fail. |
| `O10` opening paragraph outside 1–75 words — 12 pages | Every opening paragraph is **11–59 words**. Zero fail. |

The Milwaukee page is the clearest example: its H1 is at character 17,828 of the HTML source and at
character **1,446** of the visible content. The 16,000-character difference is `<head>`, JSON-LD and
scripts. The whole page is only 15,425 characters of visible text.

The factor itself is also weaker than it looks. `Complete search phrase first appears past 13,000
characters of the page HTML source` is direction **Mixed**, and its own data runs the other way on
the source measure — 754 pages past 13,000 vs 1,005 before, cited 6.63% vs 5.37%. The damaging row is
a separate Vertex-lab one about *content* position, which this site passes comfortably.

---

## Already clean — leave alone

```
canonical tags                  100%     internal links hitting a redirect   0
exactly one H1 per page         100%     internal links to a missing page    0
noindex pages                      0     sitemap is bare <loc> of 200s only  yes
duplicate H1s across the site      0     one phone per page                  yes
visible dateline / author byline   0     cross-location NAP bleed            none
URLs short and flat             100%     rendered breadcrumb trail           none
```

The technical and local foundations are sound. This is an on-page content problem.

---

## Verifying the work

Re-crawl and re-audit:

```bash
export FIRECRAWL_API_KEY=fc-...

node ~/.claude/skills/local-seo-audit/scripts/crawl-live.cjs \
  --firecrawl --sitemap https://urbanloggers.org/sitemap.xml \
  --out audit/fc --max 26 --concurrency 2 --rpm 10

node ~/.claude/skills/local-seo-audit/scripts/audit-built-site.cjs \
  --build audit/fc --sitemap audit/fc/sitemap.xml --trailing-slash true \
  --money '^/(milwaukee|waukesha|wauwatosa|west-allis|brookfield|cedarburg|greenfield|mequon|mount-pleasant|new-berlin|pewaukee|port-washington|racine|south-milwaukee|tree-removal|tree-trimming-pruning|stump-grinding|emergency-tree-service|log-milling)/?$' \
  --out audit/fc-audit.md
```

The crawler writes `<page>.html` and `<page>.md` side by side. **Ignore the audit's O16 and O10
results** — they read the HTML. For word counts, citation counts and answer position, measure the
`.md` files.

Firecrawl's free tier allows ~10 requests/minute; `--rpm` controls the pace and 429s are retried
automatically. A full re-crawl is 23 credits.

---

## Separate from this brief: keyword cannibalization

Not on-page, but it will limit results if left alone. Measured over the last 28 days on the canonical
host:

- **The homepage outranks `/milwaukee/` for Milwaukee's own terms**, roughly 4:1 across
  `milwaukee tree services`, `milwaukee tree service`, `tree removal milwaukee wi` and
  `tree trimming milwaukee`. Both sit at position 25–33, so neither wins.
- **`/stump-grinding/` and the homepage split the stump terms**, and on two of three the homepage is
  ahead of the dedicated service page.
- **`/pewaukee/` and `/mequon/` split the Pewaukee pruning queries** almost evenly.

Ignore any older 90-day cannibalization report: the site recently moved to a single canonical host
and most of what that window shows is historical `www`/`http` duplication that is already resolving
on its own.

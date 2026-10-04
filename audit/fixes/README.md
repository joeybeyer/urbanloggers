# Urban Loggers LLC — local SEO audit

**Site:** urbanloggers.org · Next.js 14 App Router, `trailingSlash: true`, Vercel
**Audited:** 2026-10-04 · **Doctrine:** Underground SEO University tested factor set, server version
`2026-10-01` (186 factors, 138 complete setups, 16,920 page tests). Snapshots in
`audit/live-2026-10-04/`.
**Scope:** 20 money pages — 15 city + 5 service. 30 routes built.

Priority order is the business order: **Google Business Profile first, organic second, AI-Overview
citations third.** Everything here follows that.

---

## The one thing that matters most

**The repo is ahead of the live site, and nothing is deployed.**

`git status` on `master` showed 42 modified/untracked files plus an unpushed commit; that work is now
committed on branch **`local-seo-gbp-silos`**. The live site is missing all of it:

| | Live | Repo build |
|---|---|---|
| External citations per money page | ~0 | **6–9 on 19 of 20** |
| `BreadcrumbList` schema (scores −30) | **21 pages** | 0 |
| Service-page depth | 409–544 words | **1,123–1,395** |
| Brookfield street on non-Brookfield pages | 23 pages | **1** (accepted) |
| GBP profiles referenced correctly | 2 of 3 | **3 of 3** |

Vercel builds from `master`, so merging this branch deploys. **Deploying is worth more than every
remaining item in these briefs combined.** Review the branch, merge, confirm the four routes that
currently 404 return 200 (`/menomonee-falls/`, `/land-clearing/`, `/difficult-tree-removal/`,
`/hardwood-slabs/`), then re-run the audit against live.

---

## Pass/fail — fresh build, 2026-10-04

**34 of 36 checks pass.**

| Group | Check | Result |
|---|---|---|
| LOCAL | L1-brookfield — own NAP + hours + map + tel, no other location's | PASS |
| LOCAL | L2 — no page carries another location's street address | **1** — `/insurance/`, accepted |
| LOCAL | L3 — one phone per page | PASS |
| TECH | T1a–d sitemap · T2a–d redirects · T3a–b internal links | PASS |
| TECH | T4 — nav is server HTML | PASS |
| TECH | T5a–b — no breadcrumb trail, no `BreadcrumbList` | PASS |
| ONPAGE | O1–O15, O17, O18 | PASS |
| ONPAGE | O16 — H1 within 13,000 chars of HTML | **FAIL — false positive** |
| ONSITE | S1 — header+footer reach ≥49 pages · S2 — footer ≥21 | PASS |

`O16` measures the HTML byte offset, where `<head>` and JSON-LD come first. In visible text the
worst H1 on the site is at character **541**. Do not act on it — see `04-onpage.md`.

`L2`'s remaining page is `/insurance/`, whose certificate-of-insurance table names the insured
entity's registered address on purpose.

---

## The briefs

| File | Covers |
|---|---|
| `00-local.md` | **The three GBP profiles**, one silo each. L1/L2/L3. Open items needing Brian's input. Read first. |
| `01-technical.md` | Sitemap, redirects, internal links, nav, breadcrumbs. All passing. |
| `02-cannibalization.md` | The homepage outranking `/milwaukee/`; `/pewaukee/` vs `/mequon/`. **Why no 301s.** |
| `03-content-gaps.md` | Why none of the 11 proposed pages should be built. |
| `04-onpage.md` | What passes, what was fixed and why, and the depth/citation gains left. |

---

## Ship order

**Phase 1 — deploy (now).** Merge `local-seo-gbp-silos`. Verify the four 404 routes return 200 and
that `/brookfield/` and `/menomonee-falls/` each embed their own profile.

**Phase 2 — GBP, not code (`00-local.md`).** Three profiles now means three of everything:
categories compared against each profile's own map pack, steady review cadence per profile, and each
profile's website URL pointing at its own page. Then supply what the audit cannot know — each
profile's real street (or "hidden"), phone and hours — so `audit/locations.json` can hold three
entries and L1/L2/L3 can check all three. Today it holds one, and L3 passes only because a single
phone number is used site-wide.

**Phase 3 — de-cannibalize (`02-cannibalization.md`).** Take Milwaukee and stump terms out of the
homepage's title, H1 and first 100 words; leave them to `/milwaukee/` and `/stump-grinding/`. No
301s, no URL changes. Remove Pewaukee from `/mequon/`'s copy.

**Phase 4 — wait 3–4 weeks.** Re-pull cannibalization and gaps. Do not build new pages before this.

**Phase 5 — depth (`04-onpage.md`).** `/milwaukee/` to ~2,400 words first, then the service hubs,
then the 13 city pages off 951–1,003. Raise citations toward 10 per money page, in-sentence.

---

## The click problem — bigger than anything above

```
'stump grinding mount pleasant wi'   3,432 impressions   avg position 7.9   0 clicks
```

One query is **58% of all site impressions** (5,894 over 28 days), ranks on page one, and earns
nothing. 22 clicks across the whole site in 28 days. That is a SERP-entry problem — the title and
meta description as Google renders them, or a top block absorbing the click — not a ranking problem,
and no on-page factor in these briefs addresses it. Look at the live SERP for that query, then
rewrite `/mount-pleasant/`'s title and meta for the click.

Note that `audit/cann-28d.json` flags this row HIGH with "301 redirect loser → winner".
**Following that would 301 away a page-one ranking** — the two "competitors" have 2 and 1
impressions. See `02-cannibalization.md`.

---

## Corrections to the first pass — do not re-raise these

Four findings in the original `FIX-BRIEF.md` were measurement artefacts, and one real finding was
wrongly dismissed. Causes and fixes are in `00-local.md` → *Measurement traps*.

| Reported | Truth |
|---|---|
| T4 nav is not server HTML (23 pages) | Never true — `nav>ul>li>a`, 27 real anchors. Firecrawl absolutises every `href`, so `href="/` matched nothing. |
| L1 no Google map embed | Never true — audited a stale `.next` build. |
| L1 opening hours not visible | Never true — the check could not read "Open 24 hours". Regex since fixed in the skill. |
| §2 footer links to 13 pages | Footer is 26; live pages carry 31 distinct internal links. |
| O16 answer past 13,000 chars (19 pages) | False — worst visible position 541. |
| ~~O10 opening paragraph outside 1–75 words~~ **dropped as a false alarm** | **Real.** It was dismissed from the Firecrawl markdown; in the rendered page the first `<p>` under the H1 is `intro` at 87–119 words. Now fixed. |

**Rule for this site:** measure links and structure against `.next/server/app`; measure content
against the `.md` files. Always rebuild before auditing.

---

## Open questions only Brian can answer

1. **Each profile's own phone.** The site shows `(414) 240-4626` in 35 places. If Menomonee Falls
   has its own number, `/menomonee-falls/` should show that one and not this one.
2. **Each profile's street, or confirmation it is hidden.** Needed for `audit/locations.json`.
3. **Real opening hours per profile.** `lib/schema.ts:52-63` currently emits *guessed* hours
   (Mon–Fri 07:00–18:00, Sat 08:00–16:00) with a comment admitting they are defaults, while
   `/brookfield/` tells visitors "Open 24 hours". Those contradict each other, and at least one
   contradicts the profiles.

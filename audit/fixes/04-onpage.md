# 04 — On-page

**Source:** Underground SEO University tested factor set, server version `2026-10-01` (186 factors,
138 complete setups, 16,920 page tests). Live snapshots in `audit/live-2026-10-04/`.
**Measured:** 2026-10-04 against a fresh `npx next build`, 20 money pages (15 city + 5 service).

Every on-page rule now passes except `O16`, which is a false positive. The work below is what is
left to *gain*, not to fix.

## Current state

```
O1   exactly one H2 with the complete phrase     PASS   (was 6 H2s on /brookfield/)
O2   at most one question-form H2                PASS
O3   real <title>                                PASS
O4   H1 present                                  PASS
O5   ≥5 distinct external domains, in-sentence   PASS   (was 0 on /brookfield/)
O6   1–10 images                                 PASS
O7   no visible dateline                         PASS
O8   no named author byline                      PASS
O9   no Pros/Cons headings                       PASS
O10  opening paragraph 1–75 words                PASS   (was 87–119 on 13 pages)
O11  no first-person proof language              PASS
O12  ≤1 sales/urgency phrase                     PASS
O13  URL ≤30 chars                               PASS
O14  no duplicate H1                             PASS
O15  <title> ≤72 chars                           PASS
O17  key facts bolded in the opening             PASS   (was failing /log-milling/)
O18  main content ≥800 words                     PASS   (0 of 20 under 800)
O16  H1 within first 13,000 chars of HTML        FAIL — false, see below
```

## O16 is a false positive — do not act on it

The check measures the H1's byte offset in the **HTML source**, where `<head>` and JSON-LD come
first. Measured in **visible text** instead, the worst H1 on the site sits at character **541**:

```
page                 H1 @ HTML   H1 @ visible text
milwaukee               18,454                  0
brookfield              17,713                  0
menomonee-falls         15,857                513
index                   13,919                541   ← worst on the site
```

The factor itself is also weaker than the check implies. `Complete search phrase first appears past
13,000 characters of the page HTML source` is direction **Mixed**, and its own data runs the other
way on the source measure — 754 pages past 13,000 cited at 6.63% versus 1,005 before at 5.37%. The
damaging row is a separate Vertex-lab one about *content* position, which this site passes at 541.

## What was fixed, and why each was right

**O1 — `/brookfield/` carried the phrase in six H2s.** Tactic 06: one H2 holds the complete search
phrase, the rest are declarative statements. Two or more reads as "complete search phrase in
multiple subheading forms", which in the setup table cites at 23.1% and reaches positions 1-5 only
7.7%, against the winner's 32.8% / 15.5%. `/brookfield/` now has one — "Tree Service in Brookfield,
WI" — and five declarative siblings.

> Note for future runs: the check derives the phrase from **URL tokens**. For a bare city slug the
> only token is the city, so every H2 naming the city counts as "the complete phrase". On
> `/brookfield/` that inflated the count; the fix was correct by tactic 06 regardless, but treat the
> raw number on bare-slug city pages with care.

**O5 — `/brookfield/` had zero external citations.**
`Money page links to at least five different external websites using followed links` is All Positive
at **433** — the largest single factor in the set (+107% AIO citations, +168% positions 1-3, +137%
positions 1-5). `Contains no links to other websites` is All Negative at **−148**. Five were woven
into existing sentences where the fact appears: Wisconsin DNR (emerald ash borer), ISA and
treesaregood.org (pruning standards), USDA APHIS (ash quarantine), We Energies (service-drop
clearance).

Placement matters as much as count: `Links to other websites only in a sources or references list,
none in the text` is All Negative at **−141** (positions 1-5 −78%). Use `<ExtLink>` inside `<p>`
prose. **Never add a "Sources" block.**

**O10 — opening paragraphs were 87–119 words on 13 city pages.** Each `intro` in
`data/locations.ts` holds two paragraphs separated by a blank line, but
`CityPageTemplate` rendered the whole string inside one `<p>`, collapsing the newline. Split into
real paragraphs, so the first is the ≤75-word answer. **No copy was rewritten.** Openings are now
53–61 words.

**O17 — `/log-milling/` had no bold in its opening.** Its short answer sat below `longDesc`, putting
the only bolded text 3,105 characters past the H1, outside the 3,000-char window. Moved into the
template's existing `keyFact` prop, as the three passing service hubs already do.

## What is left to gain

**1. Depth on the pages that matter.** All 20 clear the 800 floor, but the current set rewards far
more: `Semantic score 11 to 20 points over the Goldilocks zone` scores **336**, and the favoured
band is 2,100–2,500 words.

```
13 city pages        951 – 1,003     ← the gap
west-allis           1,003
brookfield           1,112
tree-trimming-pruning 1,123
stump-grinding       1,138
emergency-tree-service 1,163
tree-removal         1,284
log-milling          1,395
milwaukee            1,966           ← closest to the band
```

Take `/milwaukee/` to ~2,400 first (see `03-content-gaps.md` — it is also the cannibalization fix),
then the service hubs, then the cities. Depth means more specifics — species, neighbourhoods, costs,
decision criteria — not padding.

**2. More citations per page.** Five clears the threshold; the strong configuration is ten. The
13 template city pages carry 8, `/milwaukee/` and `/stump-grinding/` carry 6, `/brookfield/` now 5.
Add in-sentence, distinct domains, no `nofollow`.

**3. Images.** O6 passes at 1–10, which is also the tested band. Do not exceed 10 on a money page.

## Measurement rules for this site

Three traps produced false findings in the first pass. All three are documented in `00-local.md`;
the short version:

1. **Always `npx next build` immediately before auditing.** A stale `.next` tree produced a false
   "no map embed".
2. **Measure links and structure against `.next/server/app`.** Firecrawl absolutises every `href`,
   so any check matching `href="/` returns zero on every crawled page — that is what produced the
   false "nav is not server HTML" and "footer has 13 links".
3. **Measure content against the `.md` files** the crawler writes beside each page. Word counts,
   answer position and opening paragraphs are about visible text, not HTML.

## Verify

```bash
npx next build
node ~/.claude/skills/local-seo-audit/scripts/audit-built-site.cjs \
  --build .next/server/app --sitemap public/sitemap.xml --vercel vercel.json \
  --trailing-slash true --locations audit/locations.json \
  --money '^/(milwaukee|waukesha|wauwatosa|west-allis|brookfield|cedarburg|greenfield|mequon|mount-pleasant|new-berlin|pewaukee|port-washington|racine|south-milwaukee|menomonee-falls|tree-removal|tree-trimming-pruning|stump-grinding|emergency-tree-service|log-milling)/?$' \
  --out audit/site-audit.md
```

Expect every O-rule to pass except `O16`. If `O10` regresses, something is rendering `intro` in a
single `<p>` again.

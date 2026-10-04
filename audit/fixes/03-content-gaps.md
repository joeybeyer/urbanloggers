# 03 — Content gaps

**Measured:** 2026-10-04 from `audit/gaps.json` (11 recommendations mined from 464 GSC queries) and
`audit/gaps.md`.

## Verdict: build none of the 11 as proposed

`audit/gaps.md` is machine-generated and reads every query with impressions and no exact-match page
as a gap. On this site that logic misfires, because the demand it finds is demand `/milwaukee/`
*already has a page for* and cannot win — see `02-cannibalization.md`. Checked against the routes
that exist:

| Proposed slug | Impr | Best pos | Problem |
|---|---|---|---|
| `/tree-service-milwaukee` | 705 | 12 | duplicates `/milwaukee/` |
| `/arborist-milwaukee` | 85 | 18.4 | duplicates `/milwaukee/` |
| `/tree-ca` | 40 | 18.5 | **truncated slug** — generator bug |
| `/tree-care-milwaukee` | 34 | 18.6 | duplicates `/milwaukee/` |
| `/professional-tree-trimming-milwaukee` | 34 | 20.1 | duplicates `/milwaukee/`; 36 chars |
| `/arborists-milwaukee-wi` | 27 | 21.8 | duplicates `/milwaukee/`; `-wi` adds nothing |
| `/milwaukee-tree-removal` | 18 | 23 | duplicates `/milwaukee/` **and** `/tree-removal/` |
| `/tree-pruning-services` | 18 | 16.6 | duplicates `/tree-trimming-pruning/` |
| `/milwaukee-tree-trimming` | 17 | 22 | duplicates `/milwaukee/` |
| `/removal-services` | 17 | 41 | duplicates `/tree-removal/`; no entity, no city |
| `/land-clearing-company-milwaukee` | 15 | 68.5 | duplicates `/land-clearing/` + `/milwaukee/` |

**9 of 11 are Milwaukee pages and `/milwaukee/` exists.** Building them would add nine competitors
to a page that is already losing its own terms to the homepage at position 48. That makes the
problem in `02` worse, not better.

## What the data actually says

Those 705 impressions for `tree service milwaukee` are not an unserved market. They are
`/milwaukee/`'s own demand, currently being answered by the homepage at position 12–17 and by
`/milwaukee/` at position 48.

**The fix is `02-cannibalization.md`, not new pages.** De-optimise the homepage for Milwaukee terms,
leave them to `/milwaukee/`, and the existing page absorbs this demand. Re-measure after 3–4 weeks
before considering any build.

## If /milwaukee/ still cannot win after that

Then the page is the problem, not the page count. In order:

1. **Depth.** `/milwaukee/` is the site's longest city page at ~1,958 words and the current factor
   set favours 2,100–2,500 for pages that matter, with
   `Semantic score 11 to 20 points over the Goldilocks zone` scoring **336**. Take it to 2,400.
2. **Neighbourhood coverage.** It already names East Side, Riverwest, Bay View, Walker's Point and
   the Third Ward. Give each a real paragraph of specifics rather than a list mention.
3. **Citations.** It carries 6 external domains; the money-page target is ≥5 and the strong config
   is 10. Add four more woven in-sentence.

All three strengthen one indexed URL. None of them risks a new page splitting the entity.

## The one genuine gap

`/arborist-milwaukee` is the only proposal targeting a distinct *entity* rather than a reworded
service: "arborist" is a credential, not a synonym for "tree service", and the site has a licensed
arborist (`COMPANY.credentials`). 112 impressions across `arborist milwaukee`,
`arborist milwaukee wi` and `arborists milwaukee wi` at positions 18–22.

Even so, **do not build it as a city page.** Serve it from `/milwaukee/` with a dedicated H2 and FAQ
covering what a certified arborist does and when you need one. If it still underperforms after the
cannibalization fix, a single `/arborist/` hub — entity, no city, flat, 10 chars — is the correct
shape, with the city served by `/milwaukee/` linking to it. That follows the winner config
(URL = main entity phrase) rather than putting the complete search phrase in the path; see
`CLAUDE.md` rule 1 for the numbers.

## Where new pages genuinely belong

Not from this report. The site has 25 routes, and `S1` (header+footer reaching ≥49 distinct pages,
score 185) is unreachable below roughly 50. That is a real argument for more pages — but they should
be **cities and services that do not yet exist**, each owning an uncontested query, not nine
restatements of Milwaukee. The 14 city pages and 5 service hubs already cover the service area;
expansion means new geography or new services, decided with Brian, not mined from GSC restatements.

## Verify

```bash
bash ~/.claude/skills/local-seo-audit/scripts/acc.sh gaps sc-domain:urbanloggers.org
```

Re-run only after `02` has been live 3–4 weeks. A proposal is worth building only when no existing
page targets the entity and the query is not already in some other page's cluster.

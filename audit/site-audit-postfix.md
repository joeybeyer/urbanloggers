# Built-site audit — 2026-10-04

built pages: 30 · sitemap: 27 · money pages: 20 · redirect rules: 0 · locations: 3

| group | id | check | result |
|---|---|---|---|
| LOCAL | L1-brookfield | GBP page /brookfield/: own NAP + hours + map + tel, nothing from other locations | PASS |
| LOCAL | L1-menomonee-falls | GBP page /menomonee-falls/: own NAP + hours + map + tel, nothing from other locations | PASS |
| LOCAL | L1-waukesha | GBP page /waukesha/: own NAP + hours + map + tel, nothing from other locations | PASS |
| LOCAL | L2 | No page carries another location's street address (pages naming ALL locations are symmetric: none) | **FAIL** (1) |
| LOCAL | L3 | One phone per page — the serving profile's (pages naming all locations excepted) | PASS |
| TECH | T1a | Sitemap lists only canonical 200s (no redirect sources) | PASS |
| TECH | T1b | Every sitemap URL is a built page | PASS |
| TECH | T1c | No noindex page in the sitemap | PASS |
| TECH | T1d | Sitemap is bare <loc> (convention, not tested) — read from sitemap.xml | PASS |
| TECH | T2a | Redirect sources/destinations match trailingSlash config | PASS |
| TECH | T2b | No redirect chains (destination is itself a source) | PASS |
| TECH | T2c | Every redirect destination is a built page | PASS |
| TECH | T2d | Both redirect layers agree | PASS |
| TECH | T3a | Internal links that land on a redirect (total 0) | PASS |
| TECH | T3b | Internal links to a URL that neither exists nor redirects | PASS |
| TECH | T4 | Primary nav is server HTML: <nav> → <ul> → <a href> | PASS |
| TECH | T5a | No rendered breadcrumb trail | PASS |
| TECH | T5b | No BreadcrumbList schema | PASS |
| ONPAGE | O1 | Exactly ONE H2 contains the complete search phrase (winner config; 2+ = 'multiple subheading forms') | PASS |
| ONPAGE | O2 | At most one question-form H2 | PASS |
| ONPAGE | O3 | Real <title> present | PASS |
| ONPAGE | O4 | H1 present | PASS |
| ONPAGE | O5 | ≥5 distinct external domains linked (in-sentence) | PASS |
| ONPAGE | O6 | 1–10 images | PASS |
| ONPAGE | O7 | No visible dateline (service page, not dated post) | PASS |
| ONPAGE | O8 | No named author byline | PASS |
| ONPAGE | O9 | No Pros/Cons headings | PASS |
| ONPAGE | O10 | Opening paragraph under H1 is 1–75 words | PASS |
| ONPAGE | O11 | No first-person proof language | PASS |
| ONPAGE | O12 | ≤1 sales/urgency phrase (target: one plain 'Call {phone}') | PASS |
| ONPAGE | O13 | URL ≤30 chars (report only; never change an indexed URL) | PASS |
| ONPAGE | O15 | <title> ≤72 chars (longer gets rewritten by Google) | PASS |
| ONPAGE | O16 | H1 (and so the answer) within the first 13,000 chars of HTML | **FAIL** (20) |
| ONPAGE | O17 | Answer/key facts bolded in the opening section (info) | PASS |
| ONPAGE | O18 | Main content ≥800 words (Sept 8 correlation favours 2,100–2,500; info) | PASS |
| ONSITE | S1 | Header+footer link to ≥49 distinct pages (Sept 4) | PASS |
| ONSITE | S2 | Footer links to ≥21 distinct pages (Sept 4) | PASS |
| ONPAGE | O14 | No duplicate H1 across indexable pages | PASS |

## Failures

### L2 — No page carries another location's street address (pages naming ALL locations are symmetric: none)
- /insurance/ shows brookfield street outside its section

### O16 — H1 (and so the answer) within the first 13,000 chars of HTML
- /brookfield/ H1 at char 16063
- /cedarburg/ H1 at char 14206
- /emergency-tree-service/ H1 at char 13392
- /greenfield/ H1 at char 14261
- /log-milling/ H1 at char 13484
- /menomonee-falls/ H1 at char 14212
- /mequon/ H1 at char 14164
- /milwaukee/ H1 at char 16746
- /mount-pleasant/ H1 at char 14154
- /new-berlin/ H1 at char 14157
- /pewaukee/ H1 at char 14134
- /port-washington/ H1 at char 14239
- /racine/ H1 at char 14124
- /south-milwaukee/ H1 at char 14223
- /stump-grinding/ H1 at char 13702
- /tree-removal/ H1 at char 13966
- /tree-trimming-pruning/ H1 at char 13881
- /waukesha/ H1 at char 14252
- /wauwatosa/ H1 at char 14243
- /west-allis/ H1 at char 14334

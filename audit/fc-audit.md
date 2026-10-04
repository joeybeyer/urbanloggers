# Built-site audit — 2026-10-04

built pages: 23 · sitemap: 23 · money pages: 19 · redirect rules: 0 · locations: 0

| group | id | check | result |
|---|---|---|---|
| LOCAL | L2 | No page carries another location's street address (pages naming ALL locations are symmetric: none) | PASS |
| LOCAL | L3 | One phone per page — the serving profile's (pages naming all locations excepted) | PASS |
| TECH | T1a | Sitemap lists only canonical 200s (no redirect sources) | PASS |
| TECH | T1b | Every sitemap URL is a built page | PASS |
| TECH | T1c | No noindex page in the sitemap | PASS |
| TECH | T1d | Sitemap is bare <loc> (convention, not tested) — read from sitemap-original.xml | PASS |
| TECH | T2a | Redirect sources/destinations match trailingSlash config | PASS |
| TECH | T2b | No redirect chains (destination is itself a source) | PASS |
| TECH | T2c | Every redirect destination is a built page | PASS |
| TECH | T2d | Both redirect layers agree | PASS |
| TECH | T3a | Internal links that land on a redirect (total 0) | PASS |
| TECH | T3b | Internal links to a URL that neither exists nor redirects | PASS |
| TECH | T4 | Primary nav is server HTML: <nav> → <ul> → <a href> | **FAIL** (23) |
| TECH | T5a | No rendered breadcrumb trail | PASS |
| TECH | T5b | No BreadcrumbList schema | **FAIL** (21) |
| ONPAGE | O1 | Exactly ONE H2 contains the complete search phrase (winner config; 2+ = 'multiple subheading forms') | **FAIL** (17) |
| ONPAGE | O2 | At most one question-form H2 | PASS |
| ONPAGE | O3 | Real <title> present | PASS |
| ONPAGE | O4 | H1 present | PASS |
| ONPAGE | O5 | ≥5 distinct external domains linked (in-sentence) | **FAIL** (19) |
| ONPAGE | O6 | 1–10 images | PASS |
| ONPAGE | O7 | No visible dateline (service page, not dated post) | PASS |
| ONPAGE | O8 | No named author byline | PASS |
| ONPAGE | O9 | No Pros/Cons headings | PASS |
| ONPAGE | O10 | Opening paragraph under H1 is 1–75 words | **FAIL** (12) |
| ONPAGE | O11 | No first-person proof language | PASS |
| ONPAGE | O12 | ≤1 sales/urgency phrase (target: one plain 'Call {phone}') | **FAIL** (1) |
| ONPAGE | O13 | URL ≤30 chars (report only; never change an indexed URL) | PASS |
| ONPAGE | O15 | <title> ≤72 chars (longer gets rewritten by Google) | **FAIL** (1) |
| ONPAGE | O16 | H1 (and so the answer) within the first 13,000 chars of HTML | **FAIL** (19) |
| ONPAGE | O17 | Answer/key facts bolded in the opening section (info) | **FAIL** (6) |
| ONPAGE | O18 | Main content ≥800 words (Sept 8 correlation favours 2,100–2,500; info) | **FAIL** (16) |
| ONSITE | S1 | Header+footer link to ≥49 distinct pages (Sept 4) | **FAIL** (19) |
| ONSITE | S2 | Footer links to ≥21 distinct pages (Sept 4) | **FAIL** (19) |
| ONPAGE | O14 | No duplicate H1 across indexable pages | PASS |

## Failures

### T4 — Primary nav is server HTML: <nav> → <ul> → <a href>
- /about/
- /brookfield/
- /cedarburg/
- /contact/
- /emergency-tree-service/
- /greenfield/
- /
- /insurance/
- /log-milling/
- /mequon/
- /milwaukee/
- /mount-pleasant/
- /new-berlin/
- /pewaukee/
- /port-washington/
- /racine/
- /south-milwaukee/
- /stump-grinding/
- /tree-removal/
- /tree-trimming-pruning/
- /waukesha/
- /wauwatosa/
- /west-allis/

### T5b — No BreadcrumbList schema
- /about/
- /brookfield/
- /cedarburg/
- /contact/
- /emergency-tree-service/
- /greenfield/
- /log-milling/
- /mequon/
- /milwaukee/
- /mount-pleasant/
- /new-berlin/
- /pewaukee/
- /port-washington/
- /racine/
- /south-milwaukee/
- /stump-grinding/
- /tree-removal/
- /tree-trimming-pruning/
- /waukesha/
- /wauwatosa/
- /west-allis/

### O1 — Exactly ONE H2 contains the complete search phrase (winner config; 2+ = 'multiple subheading forms')
- /brookfield/ phrase in 6 H2s
- /cedarburg/ phrase in 5 H2s
- /greenfield/ phrase in 5 H2s
- /log-milling/ phrase in 0 H2s
- /mequon/ phrase in 5 H2s
- /milwaukee/ phrase in 11 H2s
- /mount-pleasant/ phrase in 5 H2s
- /new-berlin/ phrase in 5 H2s
- /pewaukee/ phrase in 5 H2s
- /port-washington/ phrase in 5 H2s
- /racine/ phrase in 5 H2s
- /south-milwaukee/ phrase in 5 H2s
- /tree-removal/ phrase in 2 H2s
- /tree-trimming-pruning/ phrase in 0 H2s
- /waukesha/ phrase in 5 H2s
- /wauwatosa/ phrase in 5 H2s
- /west-allis/ phrase in 5 H2s

### O5 — ≥5 distinct external domains linked (in-sentence)
- /brookfield/ 1 external domains
- /cedarburg/ 1 external domains
- /emergency-tree-service/ 1 external domains
- /greenfield/ 1 external domains
- /log-milling/ 1 external domains
- /mequon/ 1 external domains
- /milwaukee/ 1 external domains
- /mount-pleasant/ 1 external domains
- /new-berlin/ 1 external domains
- /pewaukee/ 1 external domains
- /port-washington/ 1 external domains
- /racine/ 1 external domains
- /south-milwaukee/ 1 external domains
- /stump-grinding/ 1 external domains
- /tree-removal/ 1 external domains
- /tree-trimming-pruning/ 1 external domains
- /waukesha/ 1 external domains
- /wauwatosa/ 1 external domains
- /west-allis/ 1 external domains

### O10 — Opening paragraph under H1 is 1–75 words
- /cedarburg/ 95w
- /greenfield/ 94w
- /mequon/ 85w
- /mount-pleasant/ 90w
- /new-berlin/ 89w
- /pewaukee/ 84w
- /port-washington/ 84w
- /racine/ 100w
- /south-milwaukee/ 88w
- /waukesha/ 91w
- /wauwatosa/ 101w
- /west-allis/ 95w

### O12 — ≤1 sales/urgency phrase (target: one plain 'Call {phone}')
- /emergency-tree-service/ 2 sales phrases

### O15 — <title> ≤72 chars (longer gets rewritten by Google)
- /emergency-tree-service/ 78 chars

### O16 — H1 (and so the answer) within the first 13,000 chars of HTML
- /brookfield/ H1 at char 18626
- /cedarburg/ H1 at char 16764
- /emergency-tree-service/ H1 at char 16045
- /greenfield/ H1 at char 16825
- /log-milling/ H1 at char 15770
- /mequon/ H1 at char 16492
- /milwaukee/ H1 at char 19365
- /mount-pleasant/ H1 at char 16574
- /new-berlin/ H1 at char 16719
- /pewaukee/ H1 at char 16558
- /port-washington/ H1 at char 16521
- /racine/ H1 at char 16590
- /south-milwaukee/ H1 at char 16787
- /stump-grinding/ H1 at char 15462
- /tree-removal/ H1 at char 15752
- /tree-trimming-pruning/ H1 at char 15506
- /waukesha/ H1 at char 16237
- /wauwatosa/ H1 at char 16669
- /west-allis/ H1 at char 17052

### O17 — Answer/key facts bolded in the opening section (info)
- /emergency-tree-service/
- /log-milling/
- /milwaukee/
- /stump-grinding/
- /tree-removal/
- /tree-trimming-pruning/

### O18 — Main content ≥800 words (Sept 8 correlation favours 2,100–2,500; info)
- /cedarburg/ 774 words
- /emergency-tree-service/ 508 words
- /greenfield/ 781 words
- /log-milling/ 556 words
- /mequon/ 764 words
- /mount-pleasant/ 762 words
- /new-berlin/ 778 words
- /pewaukee/ 761 words
- /port-washington/ 776 words
- /racine/ 769 words
- /south-milwaukee/ 786 words
- /stump-grinding/ 409 words
- /tree-removal/ 498 words
- /tree-trimming-pruning/ 473 words
- /waukesha/ 777 words
- /wauwatosa/ 791 words

### S1 — Header+footer link to ≥49 distinct pages (Sept 4)
- /brookfield/ header 0 + footer 0 = 0
- /cedarburg/ header 0 + footer 0 = 0
- /emergency-tree-service/ header 0 + footer 0 = 0
- /greenfield/ header 0 + footer 0 = 0
- /log-milling/ header 0 + footer 0 = 0
- /mequon/ header 0 + footer 0 = 0
- /milwaukee/ header 0 + footer 0 = 0
- /mount-pleasant/ header 0 + footer 0 = 0
- /new-berlin/ header 0 + footer 0 = 0
- /pewaukee/ header 0 + footer 0 = 0
- /port-washington/ header 0 + footer 0 = 0
- /racine/ header 0 + footer 0 = 0
- /south-milwaukee/ header 0 + footer 0 = 0
- /stump-grinding/ header 0 + footer 0 = 0
- /tree-removal/ header 0 + footer 0 = 0
- /tree-trimming-pruning/ header 0 + footer 0 = 0
- /waukesha/ header 0 + footer 0 = 0
- /wauwatosa/ header 0 + footer 0 = 0
- /west-allis/ header 0 + footer 0 = 0

### S2 — Footer links to ≥21 distinct pages (Sept 4)
- /brookfield/ footer 0
- /cedarburg/ footer 0
- /emergency-tree-service/ footer 0
- /greenfield/ footer 0
- /log-milling/ footer 0
- /mequon/ footer 0
- /milwaukee/ footer 0
- /mount-pleasant/ footer 0
- /new-berlin/ footer 0
- /pewaukee/ footer 0
- /port-washington/ footer 0
- /racine/ footer 0
- /south-milwaukee/ footer 0
- /stump-grinding/ footer 0
- /tree-removal/ footer 0
- /tree-trimming-pruning/ footer 0
- /waukesha/ footer 0
- /wauwatosa/ footer 0
- /west-allis/ footer 0

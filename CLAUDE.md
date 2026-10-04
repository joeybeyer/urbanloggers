# CLAUDE.md — AI Assistant Instructions

## Project Context

**Urban Loggers LLC** — tree service client site for Brian Smith, Greater Milwaukee WI.
Next.js 14 (App Router) on Vercel. Migrated off Wix. Goal: generate calls + quote requests.

**Phone:** (414) 240-4626 — SignalWire tracking number, forwards calls and texts to Brian. Single source of truth: `COMPANY` in `data/company.ts`.
**Email:** urbanloggersllc@gmail.com
**Address (GBP):** 17000 W North Ave, Brookfield, WI 53005

---

## Stack & Conventions

- **Next.js 14** App Router — **NOT** a static export. `output: 'export'` is not set; API routes are in use.
- **API route:** `app/api/contact/route.ts` receives the quote form, emails Brian via **Resend** (photos attached), and syncs the lead to the ACC CRM (tenant `urban-loggers-llc`).
- **Redirects** live in `next.config.js`. `trailingSlash: true`, `images.unoptimized: true`.
- **TypeScript** strict mode
- **Tailwind CSS** — no CSS modules, no styled-components
- **Server Components** by default; `'use client'` only when needed
- Pages are built from the data layer: `data/services.ts`, `data/locations.ts`, `data/local-context.ts`. The nav, footer, homepage grid, and city pages read from it, so a new service or city appears everywhere automatically.

### File Naming

```
components/ui/Button.tsx          # PascalCase components
lib/schema.ts                     # camelCase utilities
app/tree-removal/page.tsx         # kebab-case routes
data/services.ts                  # data layer
```

### Templates

- `components/templates/ServiceHubTemplate.tsx` — service pages (hero → summary table → body → FAQ → related links)
- `components/templates/CityPageTemplate.tsx` — city pages
- `components/ui/ExtLink.tsx` — followed external citation link (use inside body sentences)
- Emergency page (`app/emergency-tree-service`) and `/milwaukee` use custom layouts.

### Import Order

```tsx
// 1. React/Next
import Link from 'next/link'
import Image from 'next/image'
// 2. Third-party
// 3. Internal components
import { PhoneButton } from '@/components/ui/PhoneButton'
// 4. Data/types
import { services } from '@/data/services'
```

---

## SEO Rules (CRITICAL)

The rules below come from the on-page audit (`audit/FIX-BRIEF.md`, Underground SEO University factor set). The audit tooling is `~/.claude/skills/local-seo-audit`.

### URLs / architecture

1. **URLs are FLAT and single-segment** (≤30 chars); `/location/service` nesting is not used. A city page's slug is the **bare city name** — `/menomonee-falls/`, matching its 14 siblings. Do **not** put the complete search phrase in the path (`/tree-service-menomonee-falls/`): in the tested setup table, URL = "Complete search phrase" is the worst of the five URL configurations at **1.3%** of pages reaching positions 1-5 (19 configs, 377 pages), against **4.1%** for the partial match a bare city slug produces (41 configs, 11,236 pages). The service words belong in the title, H1 and one H2 — not the URL.
2. **Never change an already-indexed URL.** All 14 original city pages and the service hubs keep their slugs. A URL may only be renamed while it is still unindexed — 404 live, absent from the live sitemap, zero impressions in Search Console. That test is what allowed `/tree-service-menomonee-falls/` → `/menomonee-falls/`; it does not generalise.
3. Each city page lists its own county in `data/locations.ts`; the nav groups cities by county automatically, so set `county` correctly (Menomonee Falls = Waukesha County).
4. **Keyword cannibalization:** one page per query. The homepage owns brand and generic terms, `/milwaukee/` owns Milwaukee. Before adding a page, check it does not compete with an existing one (see `audit/FIX-BRIEF.md`, cannibalization section).

### Content (each money page — service and city)

5. **≥ 800 words of visible text**; service pages should reach 1,000+.
6. **Exactly ONE `<h2>` contains the complete search phrase**; all other `<h2>`s are declarative and must not repeat it.
   - Service pages: the phrase is the slug words (e.g. `tree`, `removal`). The `tableTitle` h2 counts.
   - City pages: one h2 carries the city name (`Tree Service in {city}, WI`). All others omit it.
   - At most one question-form `<h2>`; prefer zero.
7. **≥ 5 distinct external domains**, linked **inside sentences** in body copy with `<ExtLink>` — never in a "Resources" list, never `nofollow`. Cite only where the sentence genuinely supports a fact (DNR, ISA, USDA, We Energies, NWS, UW Extension, OSHA, EPA, FEMA).
8. **Bold the key answer** (`<strong>`) in the opening section. Opening paragraph under the H1: 1–75 words.
9. **At most one sales/urgency phrase** per page. A plain "Call (414) 240-4626" is the one allowed CTA. Avoid: book now, call now, act now, don't wait, limited time, best in, #1, number one, trusted, price match, guarantee.
10. **`<title>` ≤ 72 characters.**
11. No dateline, no author byline, no Pros/Cons headings, no first-person proof language ("we tested", "in our experience").
12. **Tables and lists at the TOP of content, before prose** (BERT optimization).
13. **Do NOT add `BreadcrumbList` schema** or a rendered breadcrumb trail. It scores negative in the audit and was removed on purpose.

### Linking

14. **Internal linking formula:** 1 UP + 2–3 ACROSS. Every page links up to its parent/home and 2–3 siblings.
15. Header + footer should link to as many pages as exist (footer ≥ 21). The footer is generated from `services` and `locations`; do not pad with duplicates.
16. Nav must be server-rendered `<nav>` → `<ul>` → `<li>` → real `<a href>`. Dropdowns are CSS-only; no links that depend on hydration.

### Schema and CTA

17. **Schema on every page:**
    - Homepage: `LocalBusiness` + `TreeService`
    - Service pages: `Service` + `FAQPage`
    - City pages: `LocalBusiness` with `areaServed`, plus `FAQPage`
18. **Phone number format:** `(414) 240-4626`, consistent everywhere.
19. **CTA above the fold** — click-to-call visible without scrolling on mobile.

### Measuring

20. Audit on **visible text**, not raw HTML. Raw-HTML measurement counts `<head>`, JSON-LD and scripts as words and produced false positives for answer position and opening-paragraph length. Use the Firecrawl `.md` output. Re-run commands are at the bottom of `audit/FIX-BRIEF.md`, and the `--money` pattern there must include every new page.

---

## Services & Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, services grid, phone CTA, testimonials |
| `/tree-removal` | Primary service hub |
| `/difficult-tree-removal` | Precarious, leaning, hard-to-reach trees |
| `/tree-trimming-pruning` | Service hub |
| `/stump-grinding` | Service hub |
| `/land-clearing` | Small and medium land clearing (source of milling hardwood) |
| `/emergency-tree-service` | High-intent page |
| `/log-milling` | Portable sawmill — unique differentiator |
| `/hardwood-slabs` | Buyer page for woodworkers; slabs come from removals and clearing jobs |
| `/milwaukee` + 13 city pages | City pages (bare slugs, frozen) |
| `/menomonee-falls` | City page, bare slug like its siblings (Waukesha County) |
| `/about`, `/contact`, `/gallery`, `/insurance` | Core pages |

**Slabs strategy:** Brian mills hardwood from trees taken down on removal and land-clearing jobs and can sell it. `/hardwood-slabs` targets buyers (woodworking slabs, hardwood slabs, "looking for hardwood"). Never invent inventory, prices, or specific slabs on the page; it works on an inquiry model until real stock exists.

---

## Brand Voice

- Direct, no-nonsense — Brian is a craftsman, not a salesman
- Emphasize: passion for trees, not just cutting them down
- Highlight: sawmill/milling as sustainability differentiator
- Credentials matter: 20+ years, fully insured, licensed arborist (as listed in `data/company.ts`). Do not claim ISA certification or any credential not in `data/company.ts`.
- Testimonials are gold — use real ones from Google/Angi/Nextdoor
- Be honest about fit: say when a job is too big, or when a tree does not need to come down

---

## DO NOT

- Do not add `http2 on;` to any nginx config (breaks server)
- Do not use Pages Router — App Router only
- Do not hardcode phone numbers in JSX — use `COMPANY` from `@/data/company`
- Do not re-add `output: 'export'` — the quote form API route depends on it being off
- Do not upload `.next/` folder to server — build runs on Vercel
- Do not change an existing indexed URL
- Do not add BreadcrumbList schema
- Do not invent prices, stock, stats, permits, or testimonials

# CLAUDE.md — AI Assistant Instructions

## Project Context

**Urban Loggers LLC** — tree service client site for Brian Smith, Greater Milwaukee WI.  
Static Next.js 14 export on Vercel. Migrated off Wix. Goal: generate calls + quote requests.

**Phone:** (414) 514-0750  
**Email:** urbanloggersllc@gmail.com  

---

## Stack & Conventions

- **Next.js 14** App Router, `output: 'export'` in next.config.js
- **TypeScript** strict mode
- **Tailwind CSS** — no CSS modules, no styled-components
- **Server Components** by default; `'use client'` only when needed
- **No API routes** — static export only; forms go to Formspree or similar

### File Naming

```
components/ui/Button.tsx          # PascalCase components
lib/schema.ts                     # camelCase utilities
app/tree-removal/page.tsx         # kebab-case routes
data/services.ts                  # data layer
```

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

1. **No city+service combo pages** — hub and spoke only
   - ✅ `/tree-removal` (service hub)
   - ✅ `/milwaukee` (city hub)
   - ❌ `/tree-removal-milwaukee` (combo — never do this)

2. **Internal linking formula:** 1 UP + 2-3 ACROSS
   - Every page links up to parent + 2-3 sibling pages

3. **BERT optimization:** Tables and lists at TOP of content, before prose

4. **Schema on every page:**
   - Homepage: `LocalBusiness` + `TreeService`
   - Service pages: `Service` + `FAQPage`
   - Location pages: `LocalBusiness` with area served

5. **Phone number format:** `(414) 514-0750` — consistent everywhere

6. **CTA above the fold** — click-to-call button visible without scrolling on mobile

---

## Brand Voice

- Direct, no-nonsense — Brian is a craftsman, not a salesman
- Emphasize: passion for trees, not just cutting them down
- Highlight: sawmill/milling as sustainability differentiator
- Credentials matter: 20+ years, SAM registered, fully insured
- Testimonials are gold — use real ones from Angi/Nextdoor

---

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Homepage — hero, services grid, phone CTA, testimonials |
| `/tree-removal` | Primary service hub |
| `/tree-trimming-pruning` | Service hub |
| `/stump-grinding` | Service hub |
| `/emergency-tree-service` | High-intent page |
| `/log-milling` | Unique differentiator page |
| `/milwaukee` | Primary city hub |
| `/about` | Brian's story, credentials |
| `/contact` | Quote request form |

---

## DO NOT

- Do not add `http2 on;` to any nginx config (breaks server)
- Do not use Pages Router — App Router only
- Do not hardcode phone numbers in JSX — use `PHONE` constant from `@/data/company`
- Do not upload `.next/` folder to server — build runs on Vercel
- Do not use `next/headers` or server-only APIs — static export only

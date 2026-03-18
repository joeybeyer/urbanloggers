# PLAN.md — Implementation Roadmap

## Phase 1: Foundation (Day 1)

- [ ] Init Next.js 14 project (`npx create-next-app@latest`)
- [ ] Configure `next.config.js` — static export, trailing slash
- [ ] Set up Tailwind CSS
- [ ] Create `data/company.ts`, `data/services.ts`, `data/locations.ts`
- [ ] Build root `layout.tsx` with Header + Footer
- [ ] Build `PhoneButton` component (click-to-call)
- [ ] Add LocalBusiness schema to root layout
- [ ] Deploy to Vercel, connect domain

## Phase 2: Core Pages (Day 2)

- [ ] Homepage — Hero, ServicesGrid, WhyUs, Testimonials, CTA
- [ ] `/about` — Brian's story, credentials, sawmill differentiator
- [ ] `/contact` — Quote form (Formspree), map embed
- [ ] `/emergency-tree-service` — high-intent, above-fold phone CTA

## Phase 3: Service Hubs (Day 3)

- [ ] `/tree-removal`
- [ ] `/tree-trimming-pruning`
- [ ] `/stump-grinding`
- [ ] `/log-milling` (unique — sawmill/custom lumber angle)
- [ ] Each with: FAQPage schema, internal links 1 UP + 2-3 ACROSS

## Phase 4: City Pages (Day 4)

- [ ] `/milwaukee` (primary hub)
- [ ] `/wauwatosa`
- [ ] `/west-allis`
- [ ] `/greenfield`
- [ ] `/shorewood`
- [ ] Each with unique intro, local FAQs, link to service pages

## Phase 5: SEO & Polish (Day 5)

- [ ] Add `sitemap.xml` (next-sitemap)
- [ ] Add `robots.txt`
- [ ] Verify all schema with Google Rich Results Test
- [ ] Submit to Google Search Console
- [ ] Add Vercel Analytics
- [ ] Mobile QA — especially CTA button visibility above fold
- [ ] PageSpeed Insights — target 95+

---

## Priority Order

1. Domain live on Vercel ← do this first
2. Homepage + phone CTA
3. Emergency page (highest intent)
4. Service hubs
5. City pages
6. SEO layer

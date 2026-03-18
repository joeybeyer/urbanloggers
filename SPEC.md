# SPEC.md — Technical Specification

## Architecture

```
app/
├── page.tsx                    # Homepage
├── tree-removal/page.tsx       # Service hub
├── tree-trimming-pruning/page.tsx
├── stump-grinding/page.tsx
├── emergency-tree-service/page.tsx
├── log-milling/page.tsx        # Unique differentiator
├── milwaukee/page.tsx          # Primary city hub
├── wauwatosa/page.tsx
├── west-allis/page.tsx
├── about/page.tsx
├── contact/page.tsx
├── layout.tsx                  # Root layout w/ schema
└── globals.css

components/
├── ui/
│   ├── PhoneButton.tsx         # Click-to-call CTA
│   ├── QuoteForm.tsx           # Contact/quote form
│   └── TestimonialCard.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Nav.tsx
└── sections/
    ├── Hero.tsx
    ├── ServicesGrid.tsx
    ├── WhyUs.tsx
    ├── Testimonials.tsx
    └── ServiceArea.tsx

data/
├── company.ts                  # Phone, address, hours
├── services.ts                 # Service definitions + FAQs
└── locations.ts                # City data

lib/
├── schema.ts                   # JSON-LD generators
└── metadata.ts                 # Page metadata helpers
```

---

## Data Layer

### company.ts
```ts
export const COMPANY = {
  name: 'Urban Loggers LLC',
  phone: '(414) 514-0750',
  phoneHref: 'tel:4145140750',
  email: 'urbanloggersllc@gmail.com',
  owner: 'Brian Smith',
  address: {
    city: 'Milwaukee',
    state: 'WI',
    stateCode: 'WI',
  },
  founded: 2014,
  experienceSince: 2003,
  insured: true,
  samRegistered: true,
  serviceArea: 'Greater Milwaukee',
}
```

### services.ts
Each service:
```ts
{
  slug: string
  name: string
  shortDesc: string
  longDesc: string
  faqs: { q: string; a: string }[]
  schema: object  // Service JSON-LD
}
```

### locations.ts
Each city:
```ts
{
  slug: string
  name: string
  county: string
  intro: string       // unique 80+ words
  faqs: { q: string; a: string }[]
}
```

---

## Schema

### Homepage — LocalBusiness
```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TreeService"],
  "name": "Urban Loggers LLC",
  "telephone": "(414) 514-0750",
  "email": "urbanloggersllc@gmail.com",
  "areaServed": "Greater Milwaukee, WI",
  "founder": { "@type": "Person", "name": "Brian Smith" },
  "foundingDate": "2014",
  "description": "Tree removal, trimming, pruning, and log milling serving Greater Milwaukee since 2014.",
  "hasCredential": "SAM Registered Federal Contractor",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "reviewCount": "20"
  }
}
```

### Service Pages — Service + FAQPage
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Tree Removal",
  "provider": { "@type": "LocalBusiness", "name": "Urban Loggers LLC" },
  "areaServed": "Greater Milwaukee, WI"
}
```

---

## Forms

- Use **Formspree** (free tier) for quote/contact form
- Required fields: Name, Phone, Service Type, Message
- On submit: show inline success message (no redirect — static export)
- Add honeypot field for spam

---

## next.config.js
```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
module.exports = nextConfig
```

---

## Vercel Settings
- Framework: Next.js
- Output Directory: `out`
- Node version: 20.x
- Install command: `npm install`
- Build command: `npm run build`

---

## Cloudflare (DNS only — not proxying Vercel)
- A/CNAME records pointing to Vercel
- Set to **DNS only** (gray cloud) for Vercel domains
- Or use Vercel's nameservers directly

# Urban Loggers LLC

**Domain:** urbanloggers.org  
**Business:** Tree removal, trimming, pruning, milling — Greater Milwaukee, WI  
**Owner:** Brian Smith  
**Phone:** (414) 514-0750  
**Email:** urbanloggersllc@gmail.com  
**Tech Stack:** Next.js 14 (static export) + Tailwind CSS + Vercel  

---

## Project Overview

Redesign of urbanloggers.org — migrated off Wix, domain at Namecheap, DNS on Cloudflare, deploying to Vercel. Client site for Brian Smith, owner/operator since 2014.

### Unique Differentiators to Feature
- Portable sawmill — trees milled into boards instead of landfill
- SAM registered for federal disaster relief contracts
- Storm chasing experience (Iowa derecho, Hurricane Ida in Louisiana)
- 20+ years experience (since 2003)
- Specialty pruning: orchard, pollarding, European espalier, drop crotch
- 5-star reputation across Google, Angi, Nextdoor

---

## Services

| Service | Notes |
|---------|-------|
| Tree Removal | Large + small, near structures |
| Tree Trimming & Pruning | Dormancy pruning, specialty styles |
| Stump Grinding | — |
| Emergency Tree Service | Storm damage, 24/7 |
| Log Milling | Portable sawmill, custom lumber |
| Orchard Pruning | Blossom/fruit stimulation |
| Storm Debris Cleanup | Federal contractor (SAM registered) |

---

## Service Area

Greater Milwaukee — primary focus on Milwaukee, Wauwatosa, West Allis, Greenfield, Shorewood, Whitefish Bay, Oak Creek, Franklin, Brookfield, New Berlin

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS |
| Export | Static (`output: 'export'`) |
| Hosting | Vercel |
| DNS | Cloudflare (proxied) |
| Domain | Namecheap |
| Analytics | Vercel Analytics |

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → /out
```

## Deployment

Push to `main` → Vercel auto-deploys.  
Vercel project settings: Framework = Next.js, Output Directory = `out`.

---

## Docs

| File | Purpose |
|------|---------|
| [CLAUDE.md](./CLAUDE.md) | AI assistant instructions |
| [SPEC.md](./SPEC.md) | Technical specification |
| [PLAN.md](./PLAN.md) | Implementation roadmap |
| [SEO-STRATEGY.md](./SEO-STRATEGY.md) | Local SEO playbook |

# SEO-STRATEGY.md — Local SEO Playbook

## Target Keywords

### Primary (homepage/service hubs)
- tree removal Milwaukee
- tree service Milwaukee
- tree trimming Milwaukee
- emergency tree removal Milwaukee
- stump grinding Milwaukee

### Unique Angle (low competition)
- log milling Milwaukee
- portable sawmill Milwaukee
- urban wood milling Wisconsin
- tree milling service Milwaukee

### Long-tail / Intent
- tree removal cost Milwaukee
- how much does tree removal cost in Milwaukee
- tree service near me Milwaukee WI
- emergency tree removal Milwaukee 24 hour

---

## Hub & Spoke Architecture

```
Homepage (root entity)
├── /tree-removal          ← Service hub
├── /tree-trimming-pruning ← Service hub
├── /stump-grinding        ← Service hub
├── /emergency-tree-service← Service hub
├── /log-milling           ← Service hub (unique)
└── /milwaukee             ← City hub
    ├── /wauwatosa         ← Spoke
    ├── /west-allis        ← Spoke
    ├── /greenfield        ← Spoke
    └── /shorewood         ← Spoke
```

**Rule:** NO city+service combo pages (no `/tree-removal-milwaukee`)  
**Linking:** Every page → 1 UP (parent) + 2-3 ACROSS (siblings)

---

## GBP Optimization

**Listing:** Urban Loggers LLC — claim and optimize  
**Categories:** Tree Service (primary), Arborist, Stump Removal Service  
**Services to add in GBP:**
- Tree Removal
- Tree Trimming
- Stump Grinding
- Emergency Tree Service
- Log Milling / Sawmill Service
- Orchard Pruning
- Storm Damage Cleanup

**Posts:** Weekly — seasonal tips, before/after photos, milling projects  
**Q&A:** Preemptively answer top 10 questions  
**Photos:** Before/after removals, sawmill in action, crew shots

---

## Schema Priority

| Page | Schema Types |
|------|-------------|
| Homepage | LocalBusiness, TreeService, AggregateRating |
| Service pages | Service, FAQPage |
| City pages | LocalBusiness w/ areaServed |
| About | Person (Brian Smith) |

---

## Content Differentiators for AI Overviews

Brian's unique angles that AI systems will cite:
1. **Portable sawmill** — trees milled on-site into usable lumber
2. **SAM federal contractor** — disaster relief experience
3. **Specialty pruning** — espalier, pollarding, orchard techniques
4. **20+ years** in Wisconsin and Pacific Northwest

Write FAQ content that directly answers:
- "Does Urban Loggers do log milling?"
- "Is Urban Loggers insured?"
- "What areas does Urban Loggers serve?"
- "Can Urban Loggers do emergency tree removal?"

---

## BERT Optimization

Lead every page with a summary table or bullet list BEFORE prose:

```
| Service | Details |
|---------|---------|
| Tree Removal | Large + small, near structures |
| Service Area | Greater Milwaukee, WI |
| Phone | (414) 514-0750 |
| Free Estimates | Yes |
| Insured | Yes |
```

Minimize token distance between service + geo in headings:
✅ "Tree Removal in Milwaukee, WI"  
❌ "Professional and Experienced Tree Services for Your Home"

---

## Quick Wins (Week 1)

1. Get site live on Vercel with phone number visible
2. Claim/verify GBP if not already done
3. Add LocalBusiness schema
4. Submit sitemap to Search Console
5. Publish emergency tree service page (highest intent, lowest competition)

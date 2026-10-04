# 00 — Local (GBP). Fix before anything else.

**Source:** Underground SEO University tested factor set, server version `2026-10-01` (186 factors,
133 On-page). Live snapshots in `audit/live-2026-10-04/`. Measured 2026-10-04.

> **Correction to the first version of this file.** It stated Urban Loggers runs *one* service-area
> GBP. **There are three profiles.** It also recorded two L1 failures on `/brookfield/` — "opening
> hours not visible" and "no Google map embed" — and **both were false**. See *Measurement traps* at
> the end; the same traps invalidated findings in `01-technical.md` and `FIX-BRIEF.md`.

## The three profiles

Each is its own silo. A page embeds, links and schema-references exactly one — the profile that
serves it. All three render as "Urban Loggers LLC", so they are indistinguishable by eye and only a
place-ID comparison tells them apart.

| Profile | CID | Place ID | Owns | Map |
|---|---|---|---|---|
| Service-area business | `1762089579775349192` | `0x880516dbeab8a99f:0x1874332308ed51c8` | `/`, `/contact/`, the 13 cities with no profile of their own | wide, satellite, no street pin |
| Brookfield | `6929671209341908664` | `0x880507432e635c89:0x602b233ffb1376b8` | `/brookfield/` | street-level pin, 17000 W North Ave |
| Menomonee Falls | `7352646033592042022` | `0x8804fde3dd82c641:0x6609d89c8f704226` | `/menomonee-falls/` | wide, no street pin |

All three live in `COMPANY.gbp` (`data/company.ts`) and are reached only through
`<GbpMap profile="…" />` and `GBP[…].mapsUrl`. **Never paste a map iframe into a page** — that is how
the repo came to hold five iframes across three embeds with no single source of truth.

Verified in the build: 17 pages carry a map, each carrying **exactly one** profile, zero pages
mixing two.

## L1 — passes on /brookfield/

```
street address visible           pass
phone visible + own tel: only    pass
opening hours visible            pass   ("Hours: Open 24 hours")
Google map embed                 pass   (its own profile, street-level)
LocalBusiness schema w/ address  pass
self-canonical, indexable, 1 H1  pass
```

The map embed earns twice: `Has an embedded video or iframe` is All Positive at **167** in the
current set.

## L2 — fixed: 23 pages → 1

`components/layout/Footer.tsx` rendered `COMPANY.address.full` on every page, publishing the
Brookfield street on 23 pages that are not Brookfield's — including `/menomonee-falls/`, which has
its own profile. A Brookfield street on a Menomonee Falls page tells Google that page is about
Brookfield. The service-area profile also hides its address, so publishing it site-wide contradicts
the profile rather than reinforcing it.

The footer now reads "Serving Greater Milwaukee, WI". Full NAP remains on `/contact/` and
`/brookfield/`, both of which render it in their own content.

**Remaining:** `/insurance/` carries the Brookfield street in its certificate-of-insurance table
(`app/insurance/page.tsx:49`). On a COI page the insured entity's registered address is the point,
so this is an accepted exception rather than a defect — but it is why L2 still reports 1.

## LocalBusiness schema is already siloed correctly

`lib/schema.ts:16-17` drops `COMPANY.social.google` from `sameAs` whenever a page passes its own
`mapUrl`, and `hasMap` uses that `mapUrl`. So `/brookfield/` and `/menomonee-falls/` cite their own
profiles and not the umbrella. The umbrella profile still appears in the global footer and in
`Organization.sameAs`, which is correct — that is the brand-level listing.

## Still open — needs input, not code

- **`audit/locations.json` describes only Brookfield.** With three profiles it needs three entries
  for L1/L2/L3 to check each one, which requires each profile's own street (or an explicit "hidden"),
  phone and tel. The service-area and Menomonee Falls profiles currently have neither recorded.
- **One phone, three profiles.** The whole site shows `(414) 240-4626` (35 occurrences). If the
  Menomonee Falls profile has its own number, `/menomonee-falls/` should show that number and not
  this one — L3 passes today only because one number is used everywhere.
- **`lib/schema.ts:52-63` emits guessed opening hours** (Mon–Fri 07:00–18:00, Sat 08:00–16:00) with
  a comment admitting they are "typical defaults", while `/brookfield/` tells visitors "Open 24
  hours". Those contradict each other and at least one contradicts the profiles. Replace with each
  profile's real hours.

## Track B — the GBP itself, not code

- **Categories** — compare each of the three against the top three competitors in its own map pack.
- **Review cadence** — steady beats bursts; this now matters per profile.
- **Each profile's website URL** should point at its own page: service-area → `/`,
  Brookfield → `/brookfield/`, Menomonee Falls → `/menomonee-falls/`.

## The fourth profile: Waukesha (decided 2026-10-04)

Evidence comes from a **second property**, `milwaukeetreeguys.com`, not from this site. Over three
months its Waukesha page is the clear leader and the demand is unambiguously Waukesha-intent:

```
/tree-service-waukesha-wi/    6,839 impressions   1 click
/tree-service-caledonia-wi/   1,658
/tree-service-brookfield-wi/  1,237
/tree-service-burlington-wi/    669

queries on that page:  waukesha tree removal 141 · tree removal company waukesha 140
                       waukesha tree removal services 140 · tree trimming waukesha 137
                       waukesha tree trimming 133 · tree removal waukesha 126
                       tree service waukesha 98          — all 0 clicks
```

Urban Loggers captures **none** of it. In the 28-day set, `/waukesha/`'s only queries are brand
terms (`urban loggers`, 12 impressions at position 5.2). The city has real demand and this site has
a page that does not rank for it.

**Why this justifies a listing rather than more organic work.** Note the click column: 6,839
impressions and 1 click on one property, and on this site `/mount-pleasant/` takes 3,432
impressions at position 7.9 for **0 clicks**. Two different domains, the same signature — Wisconsin
tree-service city SERPs where organic ranks and converts at nothing. That is what it looks like when
the map pack absorbs the clicks, and the lever for the map pack is a profile, not a longer page.

### Wiring it when the profile exists

`/waukesha/` is already the landing page (964 words, template city). The code takes any number of
profiles, so this is three paste-points. Get the values from the profile's own
**Share → Embed a map**, never from anywhere else.

**1. `data/company.ts`** — add a fourth entry to `COMPANY.gbp`. `cid` is the decimal of the second
hex half of the place ID (`python3 -c "print(int('<hex>',16))"`):

```ts
waukesha: {
  placeId: '0x…:0x…',
  cid: '…',
  mapsUrl: 'https://www.google.com/maps?cid=…',
  embedPb: '…',          // the pb= payload from the embed, without the leading `?pb=`
},
```

**2. `app/waukesha/page.tsx`** — two lines, exactly as `/menomonee-falls/` does it:

```tsx
localBusinessSchema('Waukesha, WI', 'waukesha', COMPANY.gbp.waukesha.mapsUrl),
return <CityPageTemplate location={location} schemas={schemas} gbpProfile="waukesha" />
```

(`lib/schema.ts` then drops the umbrella profile from `sameAs` automatically — that branch already
exists and is why `/brookfield/` and `/menomonee-falls/` are siloed.)

**3. `audit/locations.json`** — add Waukesha's street, phone and tel so L1/L2/L3 check it.

**Then verify** with the one-liner below; the Waukesha page must carry exactly one profile:

```bash
npx next build
python3 -c "
import glob,os
prof={'serviceArea':'0x880516dbeab8a99f','brookfield':'0x880507432e635c89','menomoneeFalls':'0x8804fde3dd82c641','waukesha':'0x…'}
for f in sorted(glob.glob('.next/server/app/*.html')):
    h=open(f,encoding='utf-8',errors='ignore').read()
    hits=[k for k,v in prof.items() if v in h]
    if len(hits)>1: print('MIXED:', os.path.basename(f), hits)
"
```

**Also check:** if the new profile gets its own phone number, `/waukesha/` must show that number and
not `(414) 240-4626`. Per-page phone is not supported today — the site renders `COMPANY.phone`
everywhere — so a second number needs a per-profile phone field threaded through
`PhoneButton`/`TextButton` and the NAP blocks. Raise it before the number goes live, not after.

### Caveat that still stands

GSC holds organic web impressions only; profile views, searches, calls and direction requests live
in each profile's own insights, and no GSC figure shows map-pack rank. The evidence above is strong
on **demand** and on **organic failing to convert** — it is not a map-pack measurement. Confirm with
a geo-grid scan around the intended Waukesha pin before committing, and do not site any *further*
listing on city volume alone.

## Measurement traps that produced false findings here

1. **A stale `.next` build.** The original "no Google map embed" came from auditing a `.next` tree
   built before the embed existed. Always `npx next build` immediately before auditing.
2. **An hours regex that could not read "Open 24 hours."** The check wanted a `Mon…am/pm` pattern.
   Fixed in `~/.claude/skills/local-seo-audit/scripts/audit-built-site.cjs` — it now also accepts
   "open 24 hours", "24/7" and "24 hours a day".
3. **Firecrawl rewrites every `href`.** It absolutises `href="/x/"` to
   `href="https://urbanloggers.org/x/"`, so every check matching `href="/` found **zero** internal
   links on every crawled page. Link counts, nav structure and internal-link totals must be measured
   against `.next/server/app`. Only content checks (word counts, answer position, opening paragraph)
   may use the Firecrawl `.md` output.

## Verify

```bash
npx next build    # never audit a stale build

node ~/.claude/skills/local-seo-audit/scripts/audit-built-site.cjs \
  --build .next/server/app --sitemap public/sitemap.xml --vercel vercel.json \
  --trailing-slash true --locations audit/locations.json \
  --money '^/(milwaukee|waukesha|wauwatosa|west-allis|brookfield|cedarburg|greenfield|mequon|mount-pleasant|new-berlin|pewaukee|port-washington|racine|south-milwaukee|menomonee-falls|tree-removal|tree-trimming-pruning|stump-grinding|emergency-tree-service|log-milling)/?$' \
  --out audit/site-audit.md
```

`L1-brookfield` and `L3` must pass; `L2` must report at most the `/insurance/` exception.

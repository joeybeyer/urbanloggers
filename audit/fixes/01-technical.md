# 01 — Technical

**Source:** Underground SEO University tested factor set, server version `2026-10-01`. Snapshot at `audit/doctrine-2026-10-04.json`. Measured 2026-10-04 against a live Firecrawl crawl of 23 pages.

> **Correction 2026-10-04.** Both failures below are wrong. **T4 was never true** — Firecrawl
> absolutises every `href`, so the check (which matches `href="/`) saw zero links on every crawled
> page; against `.next/server/app` the nav is `nav > ul > li > a` with 7 `<ul>`, 33 `<li>`, 27 real
> anchors and 0 buttons, and T4 **passes**. **T5b is real on the live site but already fixed in the
> repo** — `BreadcrumbList` appears on 21 live pages and **0** in the current build; it needs
> deploying, not coding. Against a fresh build every T-rule now passes: T1a–d, T2a–d, T3a–b, T4,
> T5a, T5b. See `00-local.md` → *Measurement traps*.

Clean against a fresh build. The two failures recorded below were measurement artefacts.

## Passing — leave alone

```
T1   sitemap is bare <loc> of 200s only, every URL a built page, no noindex   pass
T2   redirects match trailingSlash, no chains, no dead targets                 pass
T3   internal links landing on a 301 or 404                                      0
T5a  rendered breadcrumb trail                                                 none
```

Host canonicalisation is already correct, verified live: `http://`, `https://www.` and `http://www.` all 301 to `https://urbanloggers.org/`, and every page self-canonicals to the right host. Any report showing www/non-www duplication is reading historical Search Console data — do not act on it.

## T4 — the primary nav is not server HTML

**Rule:** `<nav>` → `<ul>` → `<li>` → real `<a href>`, present in the server-rendered HTML on every indexable page.

**Measured:** fails on all 23 pages.

**Why it matters:** internal links are the second-largest group in the set — `money page links to at least 69 different pages` scores 222, `header or navigation links to at least 35 other pages` scores 185. A nav that depends on hydration is not counted.

**Where:** `components/layout/Nav.tsx`.

## T5b — remove the breadcrumb schema

**Rule:** no `BreadcrumbList`. `Breadcrumb schema` is Mixed at **−30**, and the skill's T5 forbids it outright.

**Measured:** present on 21 pages. There is no rendered trail — only the JSON-LD.

**Where:** `lib/schema.ts:154` emits it; called from every page under `app/`.

## Note on auditing this site

The audit reads raw HTML. Several checks in `04-onpage.md` are about **visible content** and must be measured against the markdown the crawler writes alongside each page, not the HTML. Two findings were false alarms for exactly this reason — see the end of `04-onpage.md`.

Crawl with:

```bash
export FIRECRAWL_API_KEY=fc-...
node ~/.claude/skills/local-seo-audit/scripts/crawl-live.cjs \
  --firecrawl --sitemap https://urbanloggers.org/sitemap.xml \
  --out audit/fc --max 26 --concurrency 2 --rpm 10
```

That writes `<page>.html` and `<page>.md` side by side. Free tier is ~10 requests/minute; `--rpm` sets the pace and 429s retry automatically. A full crawl is 23 credits.

## Verify

Re-run the audit command in `00-local.md`. `T4` and `T5b` must pass.

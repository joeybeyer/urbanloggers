# Junk Removal Lead-Gen — 10-Site Rebuild Spec
### Applies `LOCAL-SITE-BUILD-PLAYBOOK.md` to Frank's W-Chicago junk-removal portfolio

**What this is:** the build order for rebuilding the 10 EMD city sites *correctly* — not a patch. Track A (sed-patching the broken static output) is **rejected**: it violates the playbook (§4 "no spun/templated location pages," §2/§3 cannibalization rules, §21 "don't mass-edit titles"). We rebuild per the playbook and deploy clean.

---

## A. Locked decisions

1. **One city per site.** Each EMD targets *only* the city in its domain. Homepage owns "junk removal {city}". No cross-targeting other cities.
2. **No GBP for the 10** → pure organic / EMD play. **Drop** the GBP layer (§14 GBP), GBP-CID `sameAs`, and GBP-sourced reviews. Ranking rides on on-page city focus + EMD + content quality.
3. **Coverage is real** — Frank services all 10 cities. So `areaServed` and all service claims are **truthful** (satisfies §1 claims-discipline). No fabrication needed.
4. **Source is gone** (Biggelsworth confirmed) → rebuild fresh per the playbook's static-HTML model. **Deploy target LOCKED 2026-06-21: AWS S3 static website hosting** (playbook-native; the §18 scripts + `aws s3 sync` work unchanged). Stack:
   - **S3 website hosting**, region `us-east-2`, one bucket per domain (bucket name = FQDN). AWS acct `292867317570` (CLI authenticated, root). Mirrors existing rank-and-rent buckets (`bg-concrete-inc-site`, `boulderheatingcooling.com`, `www.urbanchimneypros.com`).
   - **Cloudflare in front** of each domain (Namecheap NS → Cloudflare) for **free SSL/HTTPS** (S3 website endpoints are HTTP-only) + proxy. EMDs must be HTTPS to rank + not trip Chrome "Not Secure".
   - **Cloudflare Worker + Resend** for the quote-form backend (playbook §8) — same Cloudflare account.
   - ⚠️ S3 ignores `_redirects` (§21): `.html` mirrors rely on canonical tags; for true 301s use Cloudflare rules or per-object `x-amz-website-redirect-location`.
5. **Per-city tracking numbers stay.** Each site's unique 630 number is the per-city attribution key — keep it.

---

## B. Deltas vs. the playbook (because no GBP)

| Playbook section | Adaptation for these 10 |
|---|---|
| §5 Schema | `LocalBusiness` with `areaServed` = the city. **No GBP CID** in `sameAs`. Use only Frank's *real* external profiles (BBB/etc.) if appropriate, else omit `sameAs`. |
| §10 Trust | No GBP reviews. Use **real reviews only if Frank shares attributable ones**; otherwise lean on §10 E-E-A-T heritage (owner entity, longevity, spec-on-paper trust). Never invent reviews. |
| §14 Off-site | **Skip the GBP layer entirely.** For 10 rank-and-rent feeders, run the off-site engine *light* — brand-mention baseline + RD velocity only where it pays. Don't try full syndication ×10. |
| §9 SMS funnel | Playbook's "SMS to owner's cell" becomes "SMS to the per-city number → SignalWire forwards to Frank, city-tagged + logged" (see §E). You get the funnel *and* attribution/billing. |

**Footprint note:** 10 same-niche sites in one metro routing to one operator *is* a detectable footprint. The defense is genuine per-city uniqueness (§4: 85%+ unique, real local detail). Vary everything that isn't NAP.

---

## C. Per-site data model

> ⚠️ **CORRECTED 2026-06-21.** The original tracking #s in this table were wrong (scrambled —
> e.g. Frank's own GBP/landing numbers were assigned to Glen Ellyn/Aurora). Numbers below are
> **verified live against SignalWire** (`friendly_name` per number = the billing key). Canonical
> copy lives in `sites/README.md`.

| Domain | City | Tracking # (verified) | Real adjacent service towns (Frank's true coverage) |
|---|---|---|---|
| junkremovalbartlett.net | Bartlett | (630) 780-4508 | **ASK FRANK** |
| junkremovalelmhurst.com | Elmhurst | (630) 780-5461 | **ASK FRANK** |
| junkremovalglenellyn.com | Glen Ellyn | (630) 780-5987 | **ASK FRANK** |
| junkremovalinaurora.com | Aurora | (630) 604-7373 | **ASK FRANK** |
| junkremovalitasca.com | Itasca | **none — buy + name** | **ASK FRANK** |
| junkremovalstcharles.net | St. Charles | (630) 780-4492 | **ASK FRANK** |
| junkremovalwarrenville.com | Warrenville | **none — buy + name** | **ASK FRANK** |
| junkremovalwayne.com | Wayne | (630) 780-4948 | **ASK FRANK** |
| junkremovalwheatonil.com | Wheaton | (630) 593-3827 | **ASK FRANK** |
| junkremovalwinfield.com | Winfield | (630) 780-4941 | **ASK FRANK** |

**Open inputs needed before building (the gate — §1 Discovery, minus GBP):**
- [ ] Business identity to present per site (a lead-gen brand name, or Frank's named business — decide once)
- [ ] **SMS-capable cell** where texts ultimately land (Frank's)
- [ ] Confirmed service list (which of the 16 services Frank actually does)
- [ ] Real per-city service-area towns (so location pages are true, not all-124)
- [ ] License / bond / insurance status (gates "licensed/insured" wording)
- [ ] Founding year (for "since 19XX" E-E-A-T)
- [ ] Any real reviews Frank will share (attributable) — else we go heritage-only

> Per §1 claims-discipline: anything unconfirmed gets marked and softened to neutral/market-range language — **we do not fabricate to fill a gap.**

---

## D. Site structure per EMD (the cannibalization kill)

Each site, built per playbook §2–§8, **city-focused**:

- **Homepage `/`** — "junk removal {city}" (root/transactional). Money page (§4a). `LocalBusiness` + `WebSite` + `Breadcrumb` schema, `areaServed` = city.
- **Service hubs** — cluster the real services (§2, one cluster = one page, no cannibalization): junk removal, dumpster rental, appliance removal, estate cleanout, garage cleanout, hot tub removal, shed removal, demolition, hoarder cleanout, construction debris, house cleanout, heavy-item pickup, same-day. **Trim to what Frank confirms.** `Service` schema.
- **AIO-bait** (§4b) — `/junk-removal-cost-{city}/`, a FAQ hub, and a small PAA cluster. H1 = the question verbatim, MCS H2s, Quick-Answer cache block.
- **Service-area** — **ONE** `/service-areas/` page listing Frank's *real* adjacent coverage near this city. **Kill the 124 cross-city location pages.** Build a neighbor-town page only where demand genuinely warrants (§3: "not every suburb"). Main-city consolidated to home (no main-city combo page).
- **Trust** — `/reviews/` (real only), `/our-work/` (AI placeholders, honestly framed per §10).
- **Legal** — `/privacy/` (SMS **STOP/HELP**, TCPA, no-marketing-texts), `/terms/`.
- **Contact** — multi-step quote form (§8) → Cloudflare Worker + Resend; consent line; **guard the double-submit bug** (§8 ⚠️).

**Cross-site rule:** each domain targets a *different* city, so there's zero inter-site cannibalization once the sprawl is gone.

---

## E. Conversion + tracking layer (wires in the GTM / Retreaver / SignalWire work)

- **Click-to-call** — per-site 630 number, prominent (§9). Calls route through **Retreaver** → lead-gen campaign (60s = qualified) → client-call campaign (revenue) → webhook → n8n.
- **Text-a-photo SMS funnel** (§9) — `sms:+1{site-number}?&body=` prefilled (e.g. *"Photo of my junk for a quick quote — {City}"*). The text hits the **per-city number → SignalWire inbound webhook → n8n →** forward to Frank (`[City] lead — {from} — {message}`) **+ log the lead** (city/from/body/time). This is your billing record for your #1 converter. Optional: SignalWire auto-reply for speed-to-lead.
- **GTM** — install container on all 10 (shared or per-site). Conversions: **phone-click**, **sms-click**, **form-submit** — reuse the guarded-push pattern from `dumpsterrescueusa` (`aee847d`).
- **Floating mobile CTA bar** (§9) — 📞 Call + 📷 Text a Photo, sitewide mobile-only.

---

## F. Build order (per §17, adapted)

1. **Discovery** — collect the §C open inputs from Frank. *(Gate — nothing clean builds without these.)*
2. **Keyword clustering per city** (§2) — reverse-engineer the top 2–3 ranking junk-removal sites in each city → page set + 5 seed fields per page.
3. **Scaffold ONE gold city build** (e.g. Wheaton) — static HTML, `style.css` tokens, header/footer, homepage. Nail it to the §19 QA bar.
4. **Money pages → AIO-bait → service-area** on the gold build (§6–8).
5. **Schema + audit scripts** (§5–6) green.
6. **Conversion + tracking** wired (§E) and tested end-to-end (call + SMS + form).
7. **Parameterize across the other 9** — port the BG Concrete §18 scripts (swap concrete→junk removal per §20), inject real per-city data, regenerate 85%+ unique content per city.
8. **Deploy** all 10 (VPS or S3); **QA each** against §19.
9. **SMS capture infra** (§E) live across all 10 numbers.
10. **Off-site light** (§B) — brand-mention baseline only.

---

## G. Who does what

- **Claude Code / Biggelsworth:** build the gold template + adapt the §18 scripts, parameterize ×10, deploy.
- **Biggelsworth:** SignalWire inbound-SMS → n8n forward-to-Frank + log; Retreaver lead-gen + client-call campaigns.
- **You / Frank:** supply the §C real-data inputs. This is the only true blocker.

---

## H. First action

Fill the §C table (real coverage per city) + the open-inputs checklist with Frank's data. The moment that's in, the gold build (step 3) starts — and one good city becomes ten.

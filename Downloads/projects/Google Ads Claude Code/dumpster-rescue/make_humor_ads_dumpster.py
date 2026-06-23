"""Add a SECOND (humor) RSA to each ENABLED Dumpster ad group for an A/B CTR test.
Existing ads are NEVER touched. Estate skipped (paused). Hoarder gets a warm, non-jokey tone.
Usage: python make_humor_ads_dumpster.py           # dry-run (prints plan)
       python make_humor_ads_dumpster.py --push     # actually create the ads
"""
import os, sys
sys.stdout.reconfigure(encoding="utf-8")
from dotenv import load_dotenv
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException
load_dotenv()
CID = "2253432096"
cfg = {"developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"), "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
       "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"), "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
       "login_customer_id": "6516751752", "use_proto_plus": True}
client = GoogleAdsClient.load_from_dict(cfg)
ga = client.get_service("GoogleAdsService")

SHARED_WITTY = ["We Give a Dump", "We Haul It All", "Out of Sight, Out of Mind", "Holy Junk, That Was Fast",
                "From Mess to Yes", "Cleanouts That Don't Suck"]
SHARED_CTA = ["Same-Day Pickup", "We Do the Heavy Lifting", "Upfront, Flat Pricing", "Text a Photo for a Quote",
              "We Sweep Up After", "Licensed & Insured", "Other Quotes? Call Us Last"]
DEFAULT_DESC = [
    "We give a dump - so you don't have to. Same-day pickup and we do the heavy lifting.",
    "Couch, fridge, or the whole garage - we haul it all. Flat pricing, no surprises.",
    "Snap a photo, text it, get a quote. Licensed, insured, gone before you know it.",
    "No job too big or too gross. Get your other quotes, then call us last.",
]
HOARDER_DESC = [
    "Compassionate, judgment-free cleanouts from start to finish. We handle it with care.",
    "Whole-home cleanouts done discreetly. Licensed, insured, and respectful of your space.",
    "Call or text a photo and we'll walk you through it. Flat pricing, no surprises.",
    "We do the heavy lifting so you don't have to. Same-day help available.",
]
CATS = {
    "junk_core": {"kw": ["Fast Junk Removal", "Junk Removal Done Right"], "witty": ["Your Junk, Our Problem", "Junk Gone in a Flash", "Make It Disappear"]},
    "same_day": {"kw": ["Same-Day Junk Removal"], "witty": ["Junk Gone Today", "Same-Day, We Mean It", "Booked & Gone Today"]},
    "hot_tub": {"kw": ["Hot Tub Removal"], "witty": ["That Hot Tub's Gotta Go", "Cold Feet on That Spa?", "Hot Tub? Consider It Gone"]},
    "shed": {"kw": ["Shed Removal & Teardown"], "witty": ["Shed Some Weight", "Tear-Down to Haul-Away", "That Shed's Seen Better Days"]},
    "debris": {"kw": ["Construction Debris Removal"], "witty": ["Post-Remodel? We're On It", "Haul the Drywall Away", "Debris Be Gone"]},
    "hauling": {"kw": ["Hauling Services"], "witty": ["Heavy? We Got It", "Hauling, Handled", "If It Fits, It Ships Out"]},
    "pergola": {"kw": ["Pergola Removal"], "witty": ["Down With the Pergola", "Tear It Down, Haul It Off", "Pergola's Gotta Go"]},
    "playset": {"kw": ["Play Set Removal"], "witty": ["Kids Outgrew the Swing Set?", "Empty Nest, Empty Yard", "Teardown & Haul-Away"]},
    "hoarder": {"kw": ["Hoarder Cleanouts"], "witty": ["Compassionate Cleanouts", "Judgment-Free, Discreet", "Handled With Care"], "desc": HOARDER_DESC},
    "house_cleanout": {"kw": ["House Cleanouts"], "witty": ["Whole-House, Hauled Away", "Empty It in a Day", "Clean Slate, Fast"]},
}


def detect(name):
    n = name.lower()
    if "estate" in n: return None       # paused — skip
    if "hot tub" in n: return "hot_tub"
    if "shed" in n: return "shed"
    if "construction" in n or "debris" in n: return "debris"
    if "pergola" in n: return "pergola"
    if "play set" in n or "playset" in n: return "playset"
    if "hoarder" in n or "hoarding" in n: return "hoarder"
    if "house clean" in n: return "house_cleanout"
    if "same day" in n or "same-day" in n: return "same_day"
    if "haul" in n and "junk" not in n: return "hauling"
    return "junk_core"


def build_hl(cat):
    c = CATS[cat]
    hl = list(c["kw"]) + list(c["witty"])
    for p in SHARED_WITTY + SHARED_CTA:
        if len(hl) >= 15: break
        if p not in hl: hl.append(p)
    return hl[:15]


groups = {}
for r in ga.search(customer_id=CID, query="""
    SELECT ad_group.resource_name, ad_group.name, ad_group_ad.ad.final_urls,
           ad_group_ad.ad.responsive_search_ad.path1, ad_group_ad.ad.responsive_search_ad.path2
    FROM ad_group_ad
    WHERE ad_group_ad.status='ENABLED' AND ad_group.status='ENABLED'
      AND campaign.status='ENABLED' AND campaign.advertising_channel_type='SEARCH'"""):
    rn = r.ad_group.resource_name
    if rn in groups: continue
    fu = list(r.ad_group_ad.ad.final_urls)
    if not fu: continue
    groups[rn] = {"name": r.ad_group.name, "final": fu,
                  "p1": r.ad_group_ad.ad.responsive_search_ad.path1, "p2": r.ad_group_ad.ad.responsive_search_ad.path2}

PUSH = "--push" in sys.argv
svc = client.get_service("AdGroupAdService")
created = skipped = 0
for rn, g in groups.items():
    cat = detect(g["name"])
    if not cat:
        print(f"  SKIP  {g['name'][:30]:30} (estate)"); skipped += 1; continue
    hl = build_hl(cat); desc = CATS[cat].get("desc", DEFAULT_DESC)
    print(f"  {g['name'][:30]:30} [{cat:13}] {len(hl)}HL/{len(desc)}d -> {g['final'][0]}")
    if not PUSH: continue
    op = client.get_type("AdGroupAdOperation"); aga = op.create
    aga.ad_group = rn; aga.status = client.enums.AdGroupAdStatusEnum.ENABLED
    ad = aga.ad; ad.final_urls.extend(g["final"])
    rsa = ad.responsive_search_ad
    if g["p1"]: rsa.path1 = g["p1"]
    if g["p2"]: rsa.path2 = g["p2"]
    for t in hl:
        a = client.get_type("AdTextAsset"); a.text = t; rsa.headlines.append(a)
    for t in desc:
        a = client.get_type("AdTextAsset"); a.text = t; rsa.descriptions.append(a)
    try:
        svc.mutate_ad_group_ads(customer_id=CID, operations=[op]); created += 1; print("       + CREATED")
    except GoogleAdsException as ex:
        print("       ERR:", "; ".join(e.message for e in ex.failure.errors)[:160])

print(f"\n{'PUSHED — created '+str(created)+' humor ads' if PUSH else 'DRY-RUN — '+str(len(groups)-skipped)+' would be created'} | {skipped} estate skipped")

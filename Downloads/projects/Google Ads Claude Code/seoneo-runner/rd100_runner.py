#!/usr/bin/env python3
"""
rd100_runner.py -- Hardened SEO Neo RD100 campaign runner.

Drives the SEO Neo desktop app (Electron 3.3.5) over the Chrome DevTools Protocol to
create RD100 link-building campaigns UNATTENDED. Designed to run as a Windows Scheduled
Task ON the SEO Neo box (box-to-itself: no human should click the app during a run).

  ACC build finishes  ->  a job (money site + keywords + bucket)  ->  this runner  ->
  RD100 wizard driven end-to-end  ->  Generate  ->  campaign live.

--------------------------------------------------------------------------------------
WHY THIS IS BUILT THE WAY IT IS  (the hardening lessons)
  * SEO Neo is launched with `--remote-debugging-port=9222`; we connect Playwright over
    CDP to the EXISTING Chromium (no browser download needed).
  * CDP SURVIVES the license "Max activations reached" login -- we clear it via CDP and
    keep the same debug session. NEVER kill/relaunch mid-run (that re-churns activations).
  * Playwright's `.click()` TIMES OUT on many MUI controls. Two reliable primitives:
      - nclick():   native in-page element.click() -- works for buttons / nav / options.
      - mouse_open(): a REAL mouse gesture at the element's coordinates -- opens the
                      MUI autocompletes & the custom pickers where .click() fails.
  * Field-type quirks:
      - Money Sites   = a CodeMirror editor (contenteditable), NOT a textarea -> keyboard.type
      - Primary Keywords = a React-controlled textarea -> native value setter + input event
      - Account Template / Captcha = MUI autocompletes -> mouse_open then nclick the option
      - Content Bucket = a CUSTOM two-panel picker (folder -> search -> radio), not a dropdown
  * RD100 REQUIRES the chosen content bucket to contain Articles + Descriptions + Bios.
    A bucket_ready() DB pre-check refuses to run against an incomplete bucket.
--------------------------------------------------------------------------------------

Usage:
    python rd100_runner.py --money https://site.com/ --keywords "kw1,kw2,kw3" \
                           --bucket "Junk Removal St Charles" --folder Uncategorized
    python rd100_runner.py --job job.json          # {money:[...],keywords:[...],bucket,folder,captcha}
    python rd100_runner.py --job job.json --dry-run # fill everything but DON'T click Generate
"""
import os, sys, json, time, re, argparse, sqlite3

CDP = "http://127.0.0.1:9222"
MAIN_DB = os.path.expandvars(r"%APPDATA%\seoneo\main.db")

# React-safe native value setter for <input>/<textarea> (bypasses controlled-component overwrite)
SETTER = ("(el,val)=>{const p=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;"
          "Object.getOwnPropertyDescriptor(p,'value').set.call(el,val);"
          "el.dispatchEvent(new Event('input',{bubbles:true}));"
          "el.dispatchEvent(new Event('change',{bubbles:true}));return el.value;}")


def log(msg):
    print("[%s] %s" % (time.strftime("%H:%M:%S"), msg), flush=True)


# ----------------------------------------------------------------------------- DB helpers
def _db():
    return sqlite3.connect("file:%s?mode=ro" % MAIN_DB, uri=True, timeout=8)


def bucket_id(name):
    with _db() as c:
        r = c.execute("SELECT id FROM content_buckets WHERE name=? ORDER BY id DESC", (name,)).fetchone()
        return r[0] if r else None


def bucket_ready(name):
    """RD100 needs Articles(type 1) + Descriptions(2) + Bios(3). Returns (ok, detail)."""
    bid = bucket_id(name)
    if not bid:
        return False, "bucket '%s' not found" % name
    with _db() as c:
        counts = dict(c.execute("SELECT contentTypeID, COUNT(*) FROM content WHERE bucketID=? GROUP BY contentTypeID", (bid,)).fetchall())
    need = {1: "Articles", 2: "Descriptions", 3: "Bios"}
    missing = [label for t, label in need.items() if counts.get(t, 0) == 0]
    return (not missing), ("ready (%s)" % counts if not missing else "MISSING: " + ", ".join(missing))


def campaign_exists_for(money_url):
    """Best-effort dedupe: is there already a moneysite row for this URL?"""
    with _db() as c:
        r = c.execute("SELECT id FROM moneysites WHERE url=?", (money_url,)).fetchone()
        return bool(r)


def latest_campaign_id():
    with _db() as c:
        r = c.execute("SELECT MAX(id) FROM campaigns").fetchone()
        return r[0] if r and r[0] else 0


def campaign_status(cid):
    """statusID of a campaign, or None. Conveyor semantics: 1 = active/running, 2 = finished."""
    with _db() as c:
        r = c.execute("SELECT statusID FROM campaigns WHERE id=?", (cid,)).fetchone()
        return r[0] if r else None


# ----------------------------------------------------------------------------- CDP / page
def find_page(ctx):
    for pg in ctx.pages:
        if "seoneo" in (pg.url or "").lower():
            return pg
    return ctx.pages[0] if ctx.pages else None


def nclick(page, text, timeout=8):
    """Native in-page click on first VISIBLE element whose trimmed innerText == text."""
    end = time.time() + timeout
    js = ("(t)=>{var e=[].slice.call(document.querySelectorAll('button,a,li,span,div,p,label,[role=option]'))"
          ".filter(x=>x.offsetParent&&x.innerText&&x.innerText.trim()===t);if(e.length){e[0].click();return true}return false}")
    while time.time() < end:
        if page.evaluate(js, text):
            return True
        time.sleep(0.3)
    return False


def mouse_open(page, selector, timeout=8000):
    """Real mouse-gesture click at an element's centre -- opens MUI autocompletes/pickers."""
    el = page.locator(selector).first
    el.wait_for(state="attached", timeout=timeout)
    try:
        el.scroll_into_view_if_needed(timeout=3000)
    except Exception:
        pass
    box = el.bounding_box()
    if not box:
        raise RuntimeError("no bounding box for %s" % selector)
    page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)


def set_react(page, selector, value):
    page.locator(selector).first.evaluate(SETTER, value)


def type_codemirror(page, text):
    """Money Sites is a CodeMirror editor. keyboard.type DISPLAYS text but does NOT commit
    to the form's validation state (Generate no-ops). insert_text() pastes the whole block in
    one input event, which CodeMirror + React register as a real change. Fallback: clipboard."""
    cm = page.locator(".cm-content").first
    cm.wait_for(state="attached", timeout=8000)
    box = cm.bounding_box()
    page.mouse.click(box["x"] + box["width"] / 2, box["y"] + box["height"] / 2)
    page.keyboard.press("Control+A")
    page.keyboard.press("Delete")
    page.keyboard.insert_text(text)          # paste-like commit (not char-by-char type)
    time.sleep(0.3)
    if text.split("\n")[0] not in (cm.inner_text() or ""):
        # last-resort: clipboard paste
        try:
            page.evaluate("(t)=>navigator.clipboard.writeText(t)", text)
            page.keyboard.press("Control+V")
        except Exception:
            pass


def goto_rd100_setup(page):
    """Reach the RD100 setup screen. DIRECT HASH NAV is reliable; the Wizards->RD100->Initialize
    click path lands on /wizards but never re-enters setup (SPA quirk)."""
    # 3 re-nav attempts × ~12s each — tolerates a heavily-loaded box (concurrent campaigns
    # slow the SPA render, so a single short poll can miss .cm-content).
    for _attempt in range(3):
        page.evaluate("()=>{window.location.hash='#/wizards/generate-strategy-RD100'}")
        for _ in range(30):
            time.sleep(0.4)
            try:
                if "generate-strategy-RD100" in (page.url or "") and page.locator(".cm-content").count():
                    time.sleep(1.0)
                    return True
            except Exception:
                pass  # transient CDP hiccup under load — keep polling
    return False


def pick_indexer(page, name):
    """Post Settings 'Indexer' select (e.g. Omega). Best-effort across MUI select/autocomplete."""
    if not name or name.lower() == "none":
        return
    for sel in ['input[name="indexerID"]', '#mui-component-select-indexerID', 'div[id*="indexer" i]']:
        try:
            if page.locator(sel).count():
                mouse_open(page, sel)
                time.sleep(0.6)
                if nclick(page, name):
                    return
        except Exception:
            continue
    # fallback: open any combobox near the "Indexer" label then click the option
    nclick(page, name)


def wait_hash(page, frag, timeout=10):
    end = time.time() + timeout
    while time.time() < end:
        if frag in (page.url or ""):
            return True
        time.sleep(0.3)
    return False


def clear_activation(page):
    """If 'Max activations reached' is showing, toggle this machine's session + Deactivate & Login.
    CDP survives this login. No-op if the modal isn't present."""
    txt = page.evaluate("()=>document.body.innerText||''")
    if "Max activations reached" not in txt:
        return False
    log("activation modal present -- clearing via CDP")
    page.evaluate("()=>{var i=[].slice.call(document.querySelectorAll('input[type=checkbox]'))"
                  ".filter(x=>(x.getAttribute('aria-labelledby')||'').indexOf('JoeyB')>=0)[0];if(i&&!i.checked)i.click();}")
    time.sleep(0.6)
    nclick(page, "Deactivate & Login")
    time.sleep(6)
    return True


def start_campaign(page, cid, timeout=60):
    """Auto-Start the campaign we JUST created — targeted by id, verified in the DB.

    Two properties make this safe to run unattended (no pause-incident risk):
      * NON-POSITIONAL selector — matches only a control whose accessible name/text is
        'Start'. It can never land on Pause/Stop (those aren't named 'Start'); worst case
        it matches nothing and the DB check below simply reports 'unconfirmed'.
      * DB-VERIFIED outcome — we poll campaigns.statusID for THIS cid until it goes to 1
        (running). We trust the DB, not the click. No false 'started'. If Generate already
        left it running (statusID=1), we confirm instantly and don't click anything.
    Returns True only when the DB confirms the campaign is running.
    """
    if campaign_status(cid) == 1:
        log("auto-start: campaign %d already running (Generate auto-ran it)" % cid); return True
    log("auto-start: campaign %d -> clicking Start (targeted, DB-verified)" % cid)
    deadline = time.time() + timeout
    while time.time() < deadline:
        # land on a screen that exposes the campaign's Start control
        page.evaluate("()=>{window.location.hash='#/campaigns'}"); time.sleep(1.5)
        clicked = False
        try:
            btn = page.get_by_role("button", name=re.compile(r"^\s*start", re.I)).first
            if btn.count():
                btn.click(timeout=4000); clicked = True
        except Exception:
            pass
        if not clicked:
            clicked = nclick(page, "Start", timeout=4)      # text-button fallback
        # verify by outcome, not by the click
        for _ in range(8):
            if campaign_status(cid) == 1:
                log("auto-start CONFIRMED: campaign %d running (statusID=1)" % cid); return True
            time.sleep(2)
    log("auto-start UNCONFIRMED for campaign %d (status=%s) — left idle for a manual Start"
        % (cid, campaign_status(cid)))
    return False


# ----------------------------------------------------------------------------- the RD100 flow
def run_rd100(page, spec, dry_run=False, auto_start=False):
    money = spec["money"] if isinstance(spec["money"], list) else [spec["money"]]
    keywords = spec["keywords"] if isinstance(spec["keywords"], list) else [k for k in spec["keywords"].split(",")]
    bucket = spec["bucket"]
    folder = spec.get("folder", "Uncategorized")
    captcha = spec.get("captcha", "2captcha")

    indexer = spec.get("indexer", "Omega")
    clear_activation(page)

    log("nav -> RD100 setup (direct hash)")
    if not goto_rd100_setup(page):
        raise RuntimeError("did not reach RD100 setup screen")

    log("Account Template = Default")
    mouse_open(page, 'input[name="accountTemplate"]'); time.sleep(0.6)
    if not nclick(page, "Default"):
        raise RuntimeError("could not pick account template")

    log("Money Sites (CodeMirror) = %d url(s)" % len(money))
    type_codemirror(page, "\n".join(money))

    log("Primary Keywords = %d" % len(keywords))
    set_react(page, 'textarea[name="primary.keywords"]', "\n".join(k.strip() for k in keywords))

    log("Content Bucket picker -> folder '%s' -> '%s'" % (folder, bucket))
    mouse_open(page, 'input[aria-label="Select content bucket"]'); time.sleep(0.9)
    nclick(page, folder); time.sleep(0.5)                 # left panel: folder
    page.keyboard.type(bucket[:16], delay=25); time.sleep(0.9)   # right panel: search
    if not nclick(page, bucket):
        raise RuntimeError("could not select content bucket '%s'" % bucket)
    time.sleep(0.4)
    page.mouse.click(1150, 250); time.sleep(0.5)          # click away to close popper

    log("Primary Captcha = %s" % captcha)
    mouse_open(page, 'input[name="primaryCaptchaServices"]'); time.sleep(0.7)
    if not (nclick(page, captcha) or nclick(page, "TWOCAPTCHA") or nclick(page, "2captcha")):
        raise RuntimeError("could not select captcha service")
    time.sleep(0.4)

    log("Indexer = %s" % indexer)
    pick_indexer(page, indexer)
    time.sleep(0.3)

    # uncheck auto-ticked "Add NAP/Blurb" if the bucket has no NAP items
    page.evaluate("()=>{var n=document.querySelector('input[name=addNap]');if(n&&n.checked)n.click()}")
    time.sleep(0.3)

    gen = page.get_by_role("button", name="Generate").first
    enabled = gen.is_enabled()
    log("Generate enabled = %s" % enabled)
    if dry_run:
        log("DRY RUN -- not clicking Generate")
        return {"dry_run": True, "generate_enabled": enabled}
    if not enabled:
        raise RuntimeError("Generate is disabled -- a required field is unset")

    before = latest_campaign_id()
    nclick(page, "Generate")
    time.sleep(7)
    after = latest_campaign_id()
    created = after - before
    log("campaigns before=%d after=%d (created ~%d)" % (before, after, created))
    started = False
    if auto_start and created >= 1:
        started = start_campaign(page, after)
    return {"generated": True, "new_campaigns": created, "campaign_id": after,
            "started": started, "money": money}


# ----------------------------------------------------------------------------- entrypoint
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--job", help="path to a job JSON")
    ap.add_argument("--money", help="money site URL(s), comma-separated")
    ap.add_argument("--keywords", help="keywords, comma-separated")
    ap.add_argument("--bucket", help="content bucket name")
    ap.add_argument("--folder", default="Uncategorized")
    ap.add_argument("--captcha", default="2captcha")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--auto-start", action="store_true",
                    help="after Generate, Start the new campaign (targeted by id, DB-verified)")
    ap.add_argument("--force", action="store_true", help="run even if a moneysite already exists")
    a = ap.parse_args()

    if a.job:
        spec = json.load(open(a.job, "r", encoding="utf-8"))
    elif a.money and a.keywords and a.bucket:
        spec = {"money": [m.strip() for m in a.money.split(",")],
                "keywords": [k.strip() for k in a.keywords.split(",")],
                "bucket": a.bucket, "folder": a.folder, "captcha": a.captcha}
    else:
        ap.error("provide --job OR (--money --keywords --bucket)")

    # ---- pre-flight guards (fail fast, no half-driven wizard) ----
    ready, detail = bucket_ready(spec["bucket"])
    log("bucket check: %s -> %s" % (spec["bucket"], detail))
    if not ready:
        log("ABORT: bucket not RD100-ready. Populate Articles+Descriptions+Bios first.")
        sys.exit(2)

    money0 = (spec["money"][0] if isinstance(spec["money"], list) else spec["money"])
    if not a.force and campaign_exists_for(money0):
        log("SKIP: a moneysite already exists for %s (use --force to re-run)" % money0)
        sys.exit(0)

    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.connect_over_cdp(CDP)
        page = find_page(browser.contexts[0])
        if not page:
            log("ABORT: no SEO Neo page on the CDP endpoint -- is it launched with --remote-debugging-port=9222?")
            sys.exit(3)
        page.set_default_timeout(20000)  # loaded box (concurrent campaigns) → give CDP calls headroom
        try:
            result = run_rd100(page, spec, dry_run=a.dry_run, auto_start=a.auto_start)
            log("RESULT: " + json.dumps(result))
        except Exception as e:
            log("FAILED: %s" % e)
            sys.exit(1)
        finally:
            browser.close()  # detaches CDP; leaves SEO Neo running


if __name__ == "__main__":
    main()

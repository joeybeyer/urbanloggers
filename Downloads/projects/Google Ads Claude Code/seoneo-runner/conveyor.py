#!/usr/bin/env python3
"""
conveyor.py — the 24/7 RD100 conveyor. Pulls its queue from ACC (what the VA queued in the builder),
drains it ONE site at a time, and reports results back so the ACC Campaigns dashboard updates.

Per run (Scheduled Task, ~every 15 min):
  INDEX : for each claimed job whose SEO Neo campaign has FINISHED posting -> sinbyte_index -> report done to ACC.
  LAUNCH: if active campaigns < MAX_ACTIVE and ACC has a queued job -> claim it -> ensure bucket (populate_bucket)
          -> generate RD100 (rd100_runner, indexer=none) -> leave IDLE for the owner's Start.

Config (box .env next to this script): ACC_API_URL, ACC_API_KEY, SINBYTE_API_KEY.
Local state: conveyor_state.json  { "<accJobId>": {domain, city, niche, generated, indexed} }
"""
import json, os, re, sys, subprocess, sqlite3, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
MAIN_DB = os.path.join(os.environ['APPDATA'], 'seoneo', 'main.db')
STATE_F = os.path.join(HERE, "conveyor_state.json")
PY = sys.executable or "python"
# Concurrency is GAUGED, not hardcoded. The ceiling is whatever the box + proxy pool actually allow:
#   * box freezing (CPU/RAM pegged)  = too many campaigns  -> lower the cap
#   * proxies failing (conn/proxy errors on tasks) = pool too small -> HOLD + flag "need more proxies"
#   * all green and running at the cap -> probe one higher (find the ceiling)
# MAX_ACTIVE below is only the STARTING cap; the learned cap lives in conveyor_state.json["_gauge"].
MAX_ACTIVE = int(os.environ.get("CONVEYOR_MAX_ACTIVE", "5"))


def envfile():
    e = {}
    p = os.path.join(HERE, ".env")
    if os.path.exists(p):
        for line in open(p, encoding="utf-8"):
            m = line.strip()
            if "=" in m and not m.startswith("#"):
                k, v = m.split("=", 1); e[k.strip()] = v.strip()
    return e
ENV = envfile()
ACC_URL = (ENV.get("ACC_API_URL") or "https://agencycommandcenter.ai").rstrip("/")
ACC_KEY = ENV.get("ACC_API_KEY", "")
MAX_ACTIVE = int(ENV.get("CONVEYOR_MAX_ACTIVE", str(MAX_ACTIVE)))  # STARTING cap; gauge learns from here
# gauge thresholds (box .env tunable)
FREEZE_CPU = int(ENV.get("CONVEYOR_FREEZE_CPU", "90"))   # sustained CPU% => "machine freezing" => too many
FREEZE_MEM = int(ENV.get("CONVEYOR_FREEZE_MEM", "90"))   # RAM% ceiling
HARD_MAX   = int(ENV.get("CONVEYOR_HARD_MAX", "24"))     # absolute ceiling (proxy-pool sanity: ~100 proxies)


def acc(path, method="GET", body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(ACC_URL + "/api/site-builder" + path, data=data, method=method,
                                 headers={"X-API-Key": ACC_KEY, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        print("  ACC %s %s -> %d %s" % (method, path, e.code, e.read().decode()[:150])); return None
    except Exception as e:
        print("  ACC %s %s -> %s" % (method, path, str(e)[:120])); return None


def load():
    try: return json.load(open(STATE_F, encoding="utf-8"))
    except Exception: return {}
def save(o): json.dump(o, open(STATE_F, "w", encoding="utf-8"), indent=2)
def db(): return sqlite3.connect("file:%s?mode=ro" % MAIN_DB, uri=True, timeout=8)


def active_count():
    c = db(); n = c.execute("SELECT COUNT(*) FROM campaigns WHERE statusID=1").fetchone()[0]; c.close(); return n


def box_load():
    """(cpu%, mem%) best-effort. psutil if present, else Windows wmic. None if unknown."""
    try:
        import psutil
        return int(psutil.cpu_percent(interval=1.0)), int(psutil.virtual_memory().percent)
    except Exception:
        pass
    cpu = mem = None
    try:
        o = subprocess.run(["wmic", "cpu", "get", "loadpercentage", "/value"],
                           capture_output=True, text=True, timeout=15).stdout
        m = re.search(r"LoadPercentage=(\d+)", o); cpu = int(m.group(1)) if m else None
    except Exception:
        pass
    try:
        o = subprocess.run(["wmic", "OS", "get", "FreePhysicalMemory,TotalVisibleMemorySize", "/value"],
                           capture_output=True, text=True, timeout=15).stdout
        free = int(re.search(r"FreePhysicalMemory=(\d+)", o).group(1))
        total = int(re.search(r"TotalVisibleMemorySize=(\d+)", o).group(1))
        mem = round((1 - free / total) * 100)
    except Exception:
        pass
    return cpu, mem


def proxy_fail_count():
    """# of failed tasks whose error text looks proxy/connection-related. Best-effort across schema."""
    c = db()
    try:
        cols = [r[1] for r in c.execute("PRAGMA table_info(tasks)").fetchall()]
        errcol = next((x for x in ("message", "error", "errorMessage", "log", "statusMessage", "note", "result")
                       if x in cols), None)
        if not errcol:
            return 0
        rows = c.execute("SELECT %s FROM tasks WHERE statusID=5 AND %s IS NOT NULL" % (errcol, errcol)).fetchall()
        pat = re.compile(r"proxy|connection|timed?\s*out|ECONN|refused|tunnel|socks|502|503|429", re.I)
        return sum(1 for (v,) in rows if v and pat.search(str(v)))
    except Exception:
        return 0
    finally:
        c.close()


def gauge(state, active):
    """Learn the concurrency ceiling from the box's live signals. Returns (effective_cap, note)."""
    g = state.get("_gauge", {})
    learned = int(g.get("learned_max", MAX_ACTIVE))
    prev_pf = int(g.get("proxy_fail", 0))
    cpu, mem = box_load()
    pf = proxy_fail_count()
    rising = pf > prev_pf and active > 0
    frozen = (cpu is not None and cpu >= FREEZE_CPU) or (mem is not None and mem >= FREEZE_MEM)

    if frozen:
        learned = max(1, min(learned, active) - 1)          # too many -> drop below current active
        note = "FREEZE cpu=%s%% mem=%s%% -> cap LOWERED to %d (backing off)" % (cpu, mem, learned)
        eff = 1                                              # launch nothing new this tick
    elif rising:
        note = ("PROXY FAILURES rising (%d, was %d) -> HOLDING cap at %d. If this persists, ADD MORE PROXIES."
                % (pf, prev_pf, learned))
        eff = learned
    elif active >= learned and learned < HARD_MAX and cpu is not None and cpu < FREEZE_CPU - 15:
        learned += 1                                        # healthy at cap -> probe the ceiling
        note = "healthy at cap (cpu=%s%% mem=%s%%) -> RAMP cap to %d (gauging ceiling)" % (cpu, mem, learned)
        eff = learned
    else:
        note = "steady cap=%d (cpu=%s%% mem=%s%% active=%d)" % (learned, cpu, mem, active)
        eff = learned

    state["_gauge"] = {"learned_max": learned, "cpu": cpu, "mem": mem,
                       "proxy_fail": pf, "note": note}
    return eff, note


def bucket_ready(name):
    c = db(); r = c.execute("SELECT id FROM content_buckets WHERE name=?", (name,)).fetchone()
    if not r: c.close(); return False
    cnt = dict(c.execute("SELECT contentTypeID,COUNT(*) FROM content WHERE bucketID=? GROUP BY contentTypeID", (r[0],)).fetchall())
    c.close(); return all(cnt.get(t, 0) > 0 for t in (1, 2, 3))


def campaign_for(domain):
    c = db()
    r = c.execute("""SELECT cm.campaignID, cc.statusID FROM campaign_moneysites cm JOIN campaigns cc ON cc.id=cm.campaignID
                     JOIN moneysites m ON m.id=cm.moneysiteID WHERE m.url LIKE ? ORDER BY cm.campaignID DESC LIMIT 1""",
                  ("%" + domain + "%",)).fetchone()
    c.close(); return r


def run(args):
    print("   $ " + " ".join(str(a) for a in args))
    r = subprocess.run([str(a) for a in args], cwd=HERE, capture_output=True, text=True)
    tail = ((r.stdout or "") + (r.stderr or ""))[-400:]
    if tail.strip(): print("     " + tail.replace("\n", "\n     "))
    return r.returncode == 0, (r.stdout or "")


def main():
    if not ACC_KEY:
        print("ERROR: set ACC_API_KEY in box .env"); return
    state = load()
    active = active_count()
    print("conveyor: active %d | ACC %s" % (active, ACC_URL))

    # ── INDEX loop: claimed jobs whose campaign finished -> Sinbyte -> report done to ACC ──
    for jid, st in list(state.items()):
        if st.get("indexed"):
            continue
        info = campaign_for(st["domain"])
        if info and info[1] == 2:  # finished
            print("[index] job %s (%s) campaign %d finished -> sinbyte" % (jid, st["domain"], info[0]))
            ok, out = run([PY, "sinbyte_index.py", "--campaign", info[0], "--name", "RD100 " + st["domain"]])
            # count posted backlinks for the dashboard
            c = db(); n = c.execute("SELECT COUNT(DISTINCT postedLink) FROM posted_site_link WHERE campaignID=?", (info[0],)).fetchone()[0]; c.close()
            if ok:
                st["indexed"] = True; save(state)
                acc("/rd100/%s/done" % jid, "POST", {"status": "done", "result": {"backlinks": n, "indexed": n, "campaign": info[0]}})

    # ── GAUGE: learn the concurrency ceiling from the box (freeze / proxy signals) ──
    eff_max, note = gauge(state, active)
    print("[gauge] %s" % note)
    if state["_gauge"].get("proxy_fail", 0) and state["_gauge"]["note"].startswith("PROXY"):
        acc("/rd100/alert", "POST", {"kind": "proxies", "message": note})  # best-effort surface to ACC

    # ── LAUNCH loop: claim + start next queued site if under the (gauged) cap ──
    if active >= eff_max:
        print("[launch] at gauged cap %d (active %d) — skip" % (eff_max, active)); save(state); return
    r = acc("/rd100/next")
    job = r and r.get("job")
    if not job:
        print("[launch] queue empty"); save(state); return
    jid = str(job["id"]); dom = (job["money"][0] if job.get("money") else "").replace("https://", "").replace("http://", "").strip("/")
    niche, city, stt, bname = job.get("niche", ""), job.get("city", ""), job.get("state", ""), job.get("bucket", "")
    print("[launch] claimed job %s: %s (%s / %s)" % (jid, dom, niche, city))
    # 1) bucket
    if bname and not bucket_ready(bname):
        print("  [bucket] populate %s" % bname)
        if niche and city:
            run([PY, "populate_bucket.py", "--niche", niche, "--city", city, "--state", stt])
    if bname and not bucket_ready(bname):
        print("  bucket not ready — reporting failed"); acc("/rd100/%s/done" % jid, "POST", {"status": "failed", "result": {"reason": "bucket not ready"}}); save(state); return
    # 2) generate RD100 (idle; indexer none = Sinbyte)
    rj = {"money": job["money"], "keywords": job.get("keywords", []), "bucket": bname,
          "folder": job.get("folder", "Uncategorized"), "captcha": job.get("captcha", "2captcha"),
          "indexer": job.get("indexer", "none")}
    jf = os.path.join(HERE, "jobs", dom.replace(".", "_") + ".json")
    os.makedirs(os.path.dirname(jf), exist_ok=True); json.dump(rj, open(jf, "w"), indent=2)
    print("  [generate+start] rd100_runner --auto-start (creates campaign AND Starts it, DB-verified)")
    ok, out = run([PY, "rd100_runner.py", "--job", jf, "--auto-start"])
    started = '"started": true' in (out or "").lower()
    state[jid] = {"domain": dom, "city": city, "niche": niche,
                  "generated": bool(ok), "started": started, "indexed": False}
    save(state)
    print("conveyor: done (generated=%s started=%s)" % (bool(ok), started))


if __name__ == "__main__":
    main()

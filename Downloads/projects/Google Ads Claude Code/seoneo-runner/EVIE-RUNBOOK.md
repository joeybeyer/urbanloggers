# RD100 Conveyor — Evie's Runbook (the whole job in 2 clicks)

You run the link-building machine entirely from the **ACC Site Builder**. You never touch the server.

## Your daily flow

1. **Build the site** in the Site Builder (same as always) → deploy it.
2. On the site's row, click the **`+ RD100`** chip → it turns **`○ queued`**.
   - That's it. You've queued it for a link campaign.
3. (Optional) Do this for as many sites as you want — queue them all.

That's your whole involvement. The machine does the rest.

## What happens automatically (you don't do this)

Behind the scenes, every ~15 minutes the conveyor:
- **Builds the content** for the site (articles, descriptions, bios).
- **Generates the RD100 campaign** in SEO Neo **and Starts it automatically** (no click needed).
- **Indexes** the backlinks (via Sinbyte).
- **Self-tunes how many run at once** — it speeds up while the box is healthy and backs off if the box
  gets overloaded or the proxies start failing (if proxies keep failing, that's the signal to buy more).
- Updates the status on the **🔗 Campaigns** tab: `queued → running → done`, with live **backlinks** + **indexed** counts.

## What to watch

- **🔗 Campaigns tab** — the status board. Every queued site shows here with its status + backlink/indexed counts.
- **📈 Ranks tab** — the Google rank movement per site (updates over 2–4 weeks as links land).

## When to ping Joey

- A site shows **`failed`** on the Campaigns tab (usually means the content bucket or emails need attention).
- A site sits at **`queued`** for a long time (the box may be busy or the queue is backed up — normal if many are queued; the machine paces itself to what the box + proxies can handle).
- The Campaigns tab shows a **proxy warning** (proxies are failing → time to buy more).
- Anything looks stuck or wrong.

## What you DON'T need to do

- ❌ Never log into the server / SEO Neo / DirectAdmin.
- ❌ Never touch emails, buckets, or indexers — all automatic.
- ❌ Never click anything in SEO Neo (the pause/stop buttons there are dangerous).

**In one line:** build → click `+ RD100` → watch the Campaigns tab. Ping Joey on `failed`.

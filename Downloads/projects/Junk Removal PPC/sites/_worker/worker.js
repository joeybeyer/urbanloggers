/* Shared lead-form Worker for the junk-removal EMD network.
 * One Worker serves all 10 city sites (keyed by the posted `city`/`page`).
 * Validates -> honeypot -> emails the lead to Frank via Resend -> CORS JSON.
 * Secrets:  RESEND_KEY (wrangler secret).   Vars: TO_EMAIL, FROM_EMAIL (wrangler.toml).
 */

const ALLOWED_ORIGINS = [
  "https://junkremovalwheatonil.com",   "https://www.junkremovalwheatonil.com",
  "https://junkremovalbartlett.net",    "https://www.junkremovalbartlett.net",
  "https://junkremovalelmhurst.com",    "https://www.junkremovalelmhurst.com",
  "https://junkremovalglenellyn.com",   "https://www.junkremovalglenellyn.com",
  "https://junkremovalinaurora.com",    "https://www.junkremovalinaurora.com",
  "https://junkremovalitasca.com",      "https://www.junkremovalitasca.com",
  "https://junkremovalstcharles.net",   "https://www.junkremovalstcharles.net",
  "https://junkremovalwarrenville.com", "https://www.junkremovalwarrenville.com",
  "https://junkremovalwayne.com",       "https://www.junkremovalwayne.com",
  "https://junkremovalwinfield.com",    "https://www.junkremovalwinfield.com",
];

function cors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(origin) });
    if (request.method !== "POST")
      return new Response(JSON.stringify({ error: "method" }), { status: 405, headers: cors(origin) });

    let d;
    try { d = await request.json(); } catch { return bad(origin); }

    // honeypot — bots fill `company`; silently accept (200) so they don't retry
    if (d.company) return ok(origin);

    const name = (d.name || "").trim();
    const phone = (d.phone || "").trim();
    const details = (d.details || "").trim();
    if (!name || !phone || !details) return bad(origin);

    // ----- attribution: which of Joey's properties produced this lead -----
    const site = (d.site || "").trim();                                   // e.g. junkremovalwheatonil.com
    const city = (d.city || (d.page || "").replace(/-contact$/, "") || "unknown").trim();
    const ts = new Date().toISOString();

    const subject = `New junk lead — ${city}${site ? ` (${site})` : ""} — ${name}`;
    const lines = [
      `LEAD-GEN SITE: ${site || city} — bill to Joey (lead-gen property)`,
      `City:          ${city}`,
      `Name:          ${name}`,
      `Phone:         ${phone}`,
      `Email:         ${d.email || "—"}`,
      `ZIP:           ${d.zip || "—"}`,
      `Details:       ${details}`,
      `UTM:           ${d.utm_source || "direct"} / ${d.utm_medium || "—"} / ${d.utm_campaign || "—"}`,
      `Received:      ${ts}`,
    ];
    console.log("LEAD", JSON.stringify({ site, city, name, phone, ts })); // observability

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: env.TO_EMAIL,
        reply_to: d.email || undefined,
        subject,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      console.log("RESEND_FAIL", res.status, await res.text());
      return new Response(JSON.stringify({ error: "send" }), { status: 502, headers: cors(origin) });
    }

    // Billing attribution: log to ACC warehouse / n8n web-leads pipe when configured.
    // Same tenant as the call pipeline (dumpster); channel=web; source flags it as Joey's property.
    if (env.LEADS_WEBHOOK_URL) {
      await fetch(env.LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant: "dumpster", channel: "web", source: "joey-leadgen",
          site, city, name, phone, email: d.email || "", zip: d.zip || "", details, receivedAt: ts,
          utm: { source: d.utm_source || "", medium: d.utm_medium || "", campaign: d.utm_campaign || "" },
        }),
      }).catch((e) => console.log("WEBHOOK_FAIL", String(e)));
    }

    return ok(origin);
  },
};

const ok  = (o) => new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors(o) });
const bad = (o) => new Response(JSON.stringify({ error: "invalid" }), { status: 400, headers: cors(o) });

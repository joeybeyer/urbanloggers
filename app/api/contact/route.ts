import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { COMPANY } from '@/data/company'

// Field caps — keeps the endpoint from being used to pipe novels into the inbox.
const MAX = { name: 100, phone: 25, email: 150, service: 80, scope: 80, zip: 10, city: 60, state: 4, message: 2000 }

// Photo limits. The real ceiling is Vercel's ~4.5 MB serverless request body, so the client
// compresses before upload; these are the backstop if someone posts to the route directly.
const MAX_PHOTOS = 4
const MAX_PHOTO_BYTES = 1_500_000 // per photo, decoded
const MAX_PHOTOS_TOTAL_BYTES = 3_500_000
const ALLOWED_PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Bots submit near-instantly. Anything faster than this is almost certainly not a human.
const MIN_ELAPSED_MS = 2500

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes. Resets on cold start,
// which is fine — it exists to blunt floods, not to be an audit trail.
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // crude memory bound
  return recent.length > MAX_PER_WINDOW
}

const clean = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

type Photo = { filename: string; content: Buffer; content_type: string }

/** Decode and validate the client's compressed photos. Bad entries are dropped, never fatal. */
function parsePhotos(raw: unknown): Photo[] {
  if (!Array.isArray(raw)) return []
  const photos: Photo[] = []
  let total = 0

  for (const item of raw.slice(0, MAX_PHOTOS)) {
    const contentType = clean(item?.contentType, 40).toLowerCase()
    const base64 = typeof item?.dataBase64 === 'string' ? item.dataBase64 : ''
    if (!ALLOWED_PHOTO_TYPES.includes(contentType) || !base64) continue

    let buf: Buffer
    try {
      buf = Buffer.from(base64, 'base64')
    } catch {
      continue
    }
    if (buf.length === 0 || buf.length > MAX_PHOTO_BYTES) continue
    if (total + buf.length > MAX_PHOTOS_TOTAL_BYTES) break
    total += buf.length

    const ext = contentType.split('/')[1]?.replace('jpeg', 'jpg') ?? 'jpg'
    photos.push({ filename: `tree-photo-${photos.length + 1}.${ext}`, content: buf, content_type: contentType })
  }
  return photos
}

export async function POST(req: NextRequest) {
  // Declared out here so the catch block can log the lead rather than lose it.
  let lead: Record<string, unknown> = {}

  try {
    const body = await req.json()
    const { _honeypot, gclid, gbraid, wbraid,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content } = body

    // Honeypot — silently succeed for bots
    if (_honeypot) {
      return NextResponse.json({ success: true })
    }
    // Time trap — a human cannot complete the wizard in under 2.5s.
    if (typeof body.elapsedMs === 'number' && body.elapsedMs < MIN_ELAPSED_MS) {
      return NextResponse.json({ success: true })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: `Too many requests. Please call us at ${COMPANY.phone}.` }, { status: 429 })
    }

    const photos = parsePhotos(body.photos)

    const name = clean(body.name, MAX.name)
    const phone = clean(body.phone, MAX.phone)
    const email = clean(body.email, MAX.email)
    const service = clean(body.service, MAX.service)
    const serviceSlug = clean(body.serviceSlug, MAX.service)
    const scope = clean(body.scope, MAX.scope)
    const zip = clean(body.zip, MAX.zip)
    const city = clean(body.city, MAX.city)
    const state = clean(body.state, MAX.state)
    const message = clean(body.message, MAX.message)
    const smsOptIn = Boolean(body.smsOptIn)

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    // Attribution — a Google Ads click ID means paid; otherwise organic (models Frank's
    // dumpsterrescueusa.com CRM). utm_campaign is stored so campaign-level reporting works too.
    const paid = Boolean(gclid || gbraid || wbraid)
    const leadSource = paid ? 'google-ads' : 'organic'
    const clickId = gclid || gbraid || wbraid || ''

    const digits = String(phone || '').replace(/\D/g, '').slice(-10)
    // Shared by the email footer and the CRM row so a lead can be traced across both.
    const externalId = `form-${Date.now()}-${digits}`

    lead = { name, phone, email, service, scope, zip, city, state, message, externalId, photoCount: photos.length }

    // Also warehouse the lead into the ACC CRM (tenant urban-loggers-llc) so form-fills show up
    // alongside the calls, attributed to the service-area business. Non-blocking — never fail the form.
    const syncToCrm = async () => {
      try {
        await fetch('https://agencycommandcenter.ai/api/leads/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tenant_id: 'urban-loggers-llc',
            external_id: externalId,
            vertical: 'tree-service',
            source: leadSource,
            source_detail: serviceSlug || service || 'Service-Area GBP',
            channel: 'form',
            contact_phone: phone || null,
            contact_email: email || null,
            geo_city: city || null,
            geo_state: state || null,
            geo_zip: zip || null,
            referrer: req.headers.get('referer') || null,
            lead_date: new Date().toISOString(),
            metadata: {
              name: name || null,
              service: service || null,
              serviceSlug: serviceSlug || null,
              scope: scope || null,
              message: message || null,
              smsOptIn,
              photoCount: photos.length,
              gclid: gclid || null,
              gbraid: gbraid || null,
              wbraid: wbraid || null,
              utm_source: utm_source || null,
              utm_medium: utm_medium || null,
              utm_campaign: utm_campaign || null,
              utm_term: utm_term || null,
              utm_content: utm_content || null,
              campaign: utm_campaign || null,
              paid,
              sourceBusiness: 'service-area',
            },
          }),
        })
      } catch (syncErr) {
        console.error('ACC CRM sync failed (non-blocking):', syncErr, JSON.stringify(lead))
      }
    }

    const location = [city, state].filter(Boolean).join(', ')
    const row = (label: string, value: string) => `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold;white-space:nowrap">${label}</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(value)}</td>
          </tr>`

    const attributionRows = `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td>
            <td style="padding:8px;border:1px solid #ddd">${leadSource}${utm_campaign ? ' · ' + escapeHtml(String(utm_campaign)) : ''}</td>
          </tr>${clickId ? `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Click ID</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(String(clickId))}</td>
          </tr>` : ''}`

    // No silent 'placeholder' key: without a real key every send fails, so log the lead
    // where it can be recovered instead of losing it behind a generic error.
    const apiKey = process.env.RESEND_KEY ?? process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('LEAD NOT EMAILED — RESEND_KEY/RESEND_API_KEY missing:', JSON.stringify(lead))
      await syncToCrm() // better the lead lands in one system than none
      return NextResponse.json({ error: `We couldn't send that. Please call us at ${COMPANY.phone}.` }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from: 'Urban Loggers Quote Form <noreply@urbanloggers.org>',
      to: ['urbanloggersllc@gmail.com'],
      // So Brian can hit reply and land in the customer's inbox.
      // Resend SDK v3 uses snake_case here; v4+ renamed it to replyTo.
      reply_to: email || undefined,
      subject: `New ${service || 'Quote'} Request — ${name}${zip ? ` (${zip})` : ''}`,
      attachments: photos.length
        ? photos.map((p) => ({ filename: p.filename, content: p.content, content_type: p.content_type }))
        : undefined,
      html: `
        <h2>New Quote Request — Urban Loggers LLC</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          ${row('Name', name)}
          ${row('Phone', phone)}
          ${row('Email', email || '(none)')}
          ${row('Service', service || 'Not specified')}
          ${row('Project Details', scope || 'Not specified')}
          ${row('Location', [zip, location].filter(Boolean).join(' — ') || 'Not specified')}
          ${row('Text me my quote', smsOptIn ? 'Yes' : 'No')}
          ${row('Photos', photos.length ? `${photos.length} attached` : 'None')}
          ${row('Message', message || '(none)')}${attributionRows}
        </table>
        <p style="margin-top:16px;color:#666;font-size:14px">
          Submitted via urbanloggers.org contact form. CRM ref: ${externalId}
        </p>
      `,
    })

    if (error) {
      // Log the whole lead, not just the error — otherwise a failed send loses the customer.
      console.error('LEAD NOT EMAILED — Resend error:', error, JSON.stringify(lead))
      await syncToCrm()
      return NextResponse.json({ error: `We couldn't send that. Please call us at ${COMPANY.phone}.` }, { status: 500 })
    }

    await syncToCrm()
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err, JSON.stringify(lead))
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

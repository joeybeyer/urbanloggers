import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, service, message, _honeypot, gclid, gbraid, wbraid,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content } = body

    // Honeypot — silently succeed for bots
    if (_honeypot) {
      return NextResponse.json({ success: true })
    }

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    // Attribution — a Google Ads click ID means paid; otherwise organic (models Frank's
    // dumpsterrescueusa.com CRM). utm_campaign is stored so campaign-level reporting works too.
    const paid = Boolean(gclid || gbraid || wbraid)
    const leadSource = paid ? 'google-ads' : 'organic'
    const clickId = gclid || gbraid || wbraid || ''
    const attributionRows = `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Source</td>
            <td style="padding:8px;border:1px solid #ddd">${leadSource}${utm_campaign ? ' · ' + escapeHtml(String(utm_campaign)) : ''}</td>
          </tr>${clickId ? `
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Click ID</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(String(clickId))}</td>
          </tr>` : ''}`

    const resend = new Resend(process.env.RESEND_KEY ?? process.env.RESEND_API_KEY ?? 'placeholder')
    const { error } = await resend.emails.send({
      from: 'Urban Loggers Quote Form <noreply@urbanloggers.org>',
      to: ['urbanloggersllc@gmail.com'],
      subject: `New Quote Request from ${name}`,
      html: `
        <h2>New Quote Request — Urban Loggers LLC</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(phone)}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(service || 'Not specified')}</td>
          </tr>
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td>
            <td style="padding:8px;border:1px solid #ddd">${escapeHtml(message || '(none)')}</td>
          </tr>${attributionRows}
        </table>
        <p style="margin-top:16px;color:#666;font-size:14px">
          Submitted via urbanloggers.org contact form.
        </p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
    }

    // Also warehouse the lead into the ACC CRM (tenant urban-loggers-llc) so form-fills show up
    // alongside the calls, attributed to the service-area business. Non-blocking — never fail the form.
    try {
      const digits = String(phone || '').replace(/\D/g, '').slice(-10)
      await fetch('https://agencycommandcenter.ai/api/leads/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenant_id: 'urban-loggers-llc',
          external_id: `form-${Date.now()}-${digits}`,
          source: leadSource,
          source_detail: service || 'Service-Area GBP',
          channel: 'form',
          contact_phone: phone || null,
          referrer: req.headers.get('referer') || null,
          lead_date: new Date().toISOString(),
          metadata: {
            name: name || null,
            service: service || null,
            message: message || null,
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
      console.error('ACC CRM sync failed (non-blocking):', syncErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact route error:', err)
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

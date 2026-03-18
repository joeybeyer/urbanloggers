import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, service, message, _honeypot } = body

    // Honeypot — silently succeed for bots
    if (_honeypot) {
      return NextResponse.json({ success: true })
    }

    // Basic validation
    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 })
    }

    const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
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
          </tr>
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

'use client'

import { useEffect } from 'react'

// Captures Google Ads click IDs AND utm_* on ANY landing page into a 90-day cookie, so a visitor who
// lands on (say) the homepage with ?gclid=…&utm_campaign=… and later submits the /contact form still
// carries the click ID + campaign. The form reads these cookies; the lead posts them to ACC so the
// source resolves to google-ads vs organic and the campaign is stored (offline-conversion attribution).
export function GclidCapture() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search)
      const maxAge = 60 * 60 * 24 * 90 // 90 days
      const keys = [
        'gclid', 'gbraid', 'wbraid',
        'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      ]
      for (const key of keys) {
        const v = q.get(key)
        // First-touch wins: only set if this landing carries the param (don't overwrite a prior click's
        // cookie on a later param-less page; a fresh landing with a new value does update it).
        if (v) document.cookie = `${key}=${encodeURIComponent(v)}; path=/; max-age=${maxAge}; SameSite=Lax`
      }
    } catch {
      /* no-op */
    }
  }, [])
  return null
}

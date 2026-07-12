'use client'

import { useEffect } from 'react'

// Captures Google Ads click IDs on ANY landing page into a 90-day cookie, so a visitor who lands on
// (say) the homepage with ?gclid=… and later submits the /contact form still carries the click ID.
// The form reads these cookies; the lead posts them to ACC for offline-conversion attribution.
export function GclidCapture() {
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search)
      const maxAge = 60 * 60 * 24 * 90 // 90 days
      for (const key of ['gclid', 'gbraid', 'wbraid']) {
        const v = q.get(key)
        if (v) document.cookie = `${key}=${encodeURIComponent(v)}; path=/; max-age=${maxAge}; SameSite=Lax`
      }
    } catch {
      /* no-op */
    }
  }, [])
  return null
}

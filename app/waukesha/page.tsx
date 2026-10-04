import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'
import { COMPANY } from '@/data/company'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Waukesha, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Waukesha, WI. Fully insured. Free estimates. Call (262) 205-4777.',
    '/waukesha/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Waukesha',
    'geo.position': '43.0117;-88.2315',
    'ICBM': '43.0117, -88.2315',
  },
}

export default function WaukeshaPage() {
  const location = getLocationBySlug('waukesha')!
  // Waukesha has its OWN Google Business Profile (the fourth, verified 2026-10-04), so this page
  // embeds and links that listing rather than the service-area business. See COMPANY.gbp.
  const schemas = [
    localBusinessSchema('Waukesha, WI', 'waukesha', COMPANY.gbp.waukesha.mapsUrl),
    faqSchema(location.faqs),
  ]

  return <CityPageTemplate location={location} schemas={schemas} gbpProfile="waukesha" />
}

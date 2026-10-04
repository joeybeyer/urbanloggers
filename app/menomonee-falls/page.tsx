import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'
import { COMPANY } from '@/data/company'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Menomonee Falls, WI | Urban Loggers LLC',
    'Professional tree removal, trimming, stump grinding & land clearing in Menomonee Falls, WI. Fully insured. Free estimates. Call (414) 240-4626.',
    '/menomonee-falls/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Menomonee Falls',
    'geo.position': '43.1789;-88.1173',
    'ICBM': '43.1789, -88.1173',
  },
}

export default function MenomoneeFallsPage() {
  const location = getLocationBySlug('menomonee-falls')!
  // This city has its OWN Google Business Profile (the third one, verified 2026-10-04), so the page
  // embeds and links that listing rather than the service-area business. See COMPANY.gbp.
  const schemas = [
    localBusinessSchema('Menomonee Falls, WI', 'menomonee-falls', COMPANY.gbp.menomoneeFalls.mapsUrl),
    faqSchema(location.faqs),
  ]

  return (
    <CityPageTemplate location={location} schemas={schemas} gbpProfile="menomoneeFalls" />
  )
}

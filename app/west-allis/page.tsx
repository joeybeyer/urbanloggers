import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service West Allis, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & emergency tree service in West Allis, WI. Fully insured. Call (414) 514-0750 for a free estimate.',
    '/west-allis/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'West Allis',
    'geo.position': '43.0167;-88.0070',
    'ICBM': '43.0167, -88.0070',
  },
}

export default function WestAllisPage() {
  const location = getLocationBySlug('west-allis')!
  const schemas = [
    localBusinessSchema('West Allis, WI', 'west-allis'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
      { name: 'West Allis', item: 'https://urbanloggers.org/west-allis/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

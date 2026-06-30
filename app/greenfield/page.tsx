import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Greenfield, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Greenfield, WI. Fully insured. Free estimates. Call (414) 240-4626.',
    '/greenfield/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Greenfield',
    'geo.position': '42.9614;-87.9898',
    'ICBM': '42.9614, -87.9898',
  },
}

export default function GreenfieldPage() {
  const location = getLocationBySlug('greenfield')!
  const schemas = [
    localBusinessSchema('Greenfield, WI', 'greenfield'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
      { name: 'Greenfield', item: 'https://urbanloggers.org/greenfield/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

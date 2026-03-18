import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Brookfield, WI | Urban Loggers LLC',
    'Expert tree removal, trimming & log milling in Brookfield, WI. Large hardwood specialists. Fully insured. Call (414) 514-0750.',
    '/brookfield/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Brookfield',
    'geo.position': '43.0606;-88.1065',
    'ICBM': '43.0606, -88.1065',
  },
}

export default function BrookfieldPage() {
  const location = getLocationBySlug('brookfield')!
  const schemas = [
    localBusinessSchema('Brookfield, WI', 'brookfield'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Waukesha', item: 'https://urbanloggers.org/waukesha/' },
      { name: 'Brookfield', item: 'https://urbanloggers.org/brookfield/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

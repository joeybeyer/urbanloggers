import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Pewaukee, WI | Urban Loggers LLC',
    'Expert tree removal & trimming in Pewaukee, WI. Shoreline specialists. Fully insured. Call (414) 514-0750 for a free estimate.',
    '/pewaukee/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Pewaukee',
    'geo.position': '43.0789;-88.2498',
    'ICBM': '43.0789, -88.2498',
  },
}

export default function PewaukeePage() {
  const location = getLocationBySlug('pewaukee')!
  const schemas = [
    localBusinessSchema('Pewaukee, WI', 'pewaukee'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Waukesha', item: 'https://urbanloggers.org/waukesha/' },
      { name: 'Pewaukee', item: 'https://urbanloggers.org/pewaukee/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

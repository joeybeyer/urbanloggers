import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Wauwatosa, WI | Urban Loggers LLC',
    'Expert tree removal, trimming & stump grinding in Wauwatosa, WI. Fully insured, free estimates. Call (414) 514-0750.',
    '/wauwatosa/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Wauwatosa',
    'geo.position': '43.0495;-88.0076',
    'ICBM': '43.0495, -88.0076',
  },
}

export default function WauwatosaPage() {
  const location = getLocationBySlug('wauwatosa')!
  const schemas = [
    localBusinessSchema('Wauwatosa, WI', 'wauwatosa'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
      { name: 'Wauwatosa', item: 'https://urbanloggers.org/wauwatosa/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

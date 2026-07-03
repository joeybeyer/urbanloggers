import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Mequon, WI | Urban Loggers LLC',
    'Expert tree removal, trimming & log milling in Mequon, WI. Large wooded lot specialists. Fully insured. Call (414) 240-4626.',
    '/mequon/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Mequon',
    'geo.position': '43.2344;-87.9845',
    'ICBM': '43.2344, -87.9845',
  },
}

export default function MequonPage() {
  const location = getLocationBySlug('mequon')!
  const schemas = [
    localBusinessSchema('Mequon, WI', 'mequon'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Mequon', item: 'https://urbanloggers.org/mequon/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

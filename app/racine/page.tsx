import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Racine, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & emergency tree service in Racine, WI. Fully insured. Free estimates. Call (414) 240-4626.',
    '/racine/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Racine',
    'geo.position': '42.7261;-87.7829',
    'ICBM': '42.7261, -87.7829',
  },
}

export default function RacinePage() {
  const location = getLocationBySlug('racine')!
  const schemas = [
    localBusinessSchema('Racine, WI', 'racine'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Racine', item: 'https://urbanloggers.org/racine/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

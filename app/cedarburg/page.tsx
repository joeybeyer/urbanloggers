import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Cedarburg, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & orchard pruning in Cedarburg, WI. Fully insured. Free estimates. Call (414) 240-4626.',
    '/cedarburg/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Cedarburg',
    'geo.position': '43.2969;-87.9884',
    'ICBM': '43.2969, -87.9884',
  },
}

export default function CedarburgPage() {
  const location = getLocationBySlug('cedarburg')!
  const schemas = [
    localBusinessSchema('Cedarburg, WI', 'cedarburg'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Mequon', item: 'https://urbanloggers.org/mequon/' },
      { name: 'Cedarburg', item: 'https://urbanloggers.org/cedarburg/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

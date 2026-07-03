import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service New Berlin, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in New Berlin, WI. Fully insured, free estimates. Call (414) 240-4626.',
    '/new-berlin/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'New Berlin',
    'geo.position': '42.9761;-88.1084',
    'ICBM': '42.9761, -88.1084',
  },
}

export default function NewBerlinPage() {
  const location = getLocationBySlug('new-berlin')!
  const schemas = [
    localBusinessSchema('New Berlin, WI', 'new-berlin'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Waukesha', item: 'https://urbanloggers.org/waukesha/' },
      { name: 'New Berlin', item: 'https://urbanloggers.org/new-berlin/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

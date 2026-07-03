import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Port Washington, WI | Urban Loggers LLC',
    'Expert tree removal & trimming in Port Washington, WI. Bluff property specialists. Fully insured. Call (414) 240-4626.',
    '/port-washington/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Port Washington',
    'geo.position': '43.3869;-87.8754',
    'ICBM': '43.3869, -87.8754',
  },
}

export default function PortWashingtonPage() {
  const location = getLocationBySlug('port-washington')!
  const schemas = [
    localBusinessSchema('Port Washington, WI', 'port-washington'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Mequon', item: 'https://urbanloggers.org/mequon/' },
      { name: 'Port Washington', item: 'https://urbanloggers.org/port-washington/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

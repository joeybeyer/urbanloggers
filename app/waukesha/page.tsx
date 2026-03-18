import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Waukesha, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Waukesha, WI. Fully insured. Free estimates. Call (414) 514-0750.',
    '/waukesha/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Waukesha',
    'geo.position': '43.0117;-88.2315',
    'ICBM': '43.0117, -88.2315',
  },
}

export default function WaukeshaPage() {
  const location = getLocationBySlug('waukesha')!
  const schemas = [
    localBusinessSchema('Waukesha, WI', 'waukesha'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Waukesha', item: 'https://urbanloggers.org/waukesha/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

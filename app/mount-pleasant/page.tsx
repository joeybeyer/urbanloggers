import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Mount Pleasant, WI | Urban Loggers LLC',
    'Expert tree removal, trimming & stump grinding in Mount Pleasant, WI. Fully insured. Free estimates. Call (414) 514-0750.',
    '/mount-pleasant/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Mount Pleasant',
    'geo.position': '42.7203;-87.8829',
    'ICBM': '42.7203, -87.8829',
  },
}

export default function MountPleasantPage() {
  const location = getLocationBySlug('mount-pleasant')!
  const schemas = [
    localBusinessSchema('Mount Pleasant, WI', 'mount-pleasant'),
    faqSchema(location.faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Racine', item: 'https://urbanloggers.org/racine/' },
      { name: 'Mount Pleasant', item: 'https://urbanloggers.org/mount-pleasant/' },
    ]),
  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

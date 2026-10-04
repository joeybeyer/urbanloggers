import type { Metadata } from 'next'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema } from '@/lib/schema'
import { CityPageTemplate } from '@/components/templates/CityPageTemplate'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service South Milwaukee, WI | Urban Loggers LLC',
    'Expert tree removal, trimming & stump grinding in South Milwaukee, WI. Fully insured, free estimates. Call (414) 240-4626.',
    '/south-milwaukee/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'South Milwaukee',
    'geo.position': '42.9106;-87.8606',
    'ICBM': '42.9106, -87.8606',
  },
}

export default function SouthMilwaukeePage() {
  const location = getLocationBySlug('south-milwaukee')!
  const schemas = [
    localBusinessSchema('South Milwaukee, WI', 'south-milwaukee'),
    faqSchema(location.faqs),

  ]

  return <CityPageTemplate location={location} schemas={schemas} />
}

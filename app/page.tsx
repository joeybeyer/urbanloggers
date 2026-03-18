import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { ServiceArea } from '@/components/sections/ServiceArea'
import { serviceSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Urban Loggers LLC | Tree Service Milwaukee, WI',
  description:
    'Professional tree removal, trimming, stump grinding & emergency service in Greater Milwaukee. 20+ years experience. Fully insured. Call (414) 514-0750 for a free quote.',
}

export default function HomePage() {
  const treeServiceSchema = serviceSchema(
    'Tree Service',
    'Professional tree removal, trimming, stump grinding, emergency tree service, and log milling in Greater Milwaukee, WI.',
    'https://urbanloggers.org'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treeServiceSchema) }}
      />
      <Hero />
      <ServicesGrid />
      <WhyUs />
      <Testimonials />
      <ServiceArea />
    </>
  )
}

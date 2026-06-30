import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

const baseMetadata = buildMetadata(
  'Stump Grinding in Milwaukee, WI | Urban Loggers LLC',
  'Affordable stump grinding in Milwaukee with below-grade removal and cleanup. Ideal for yards in Bay View, Riverwest, and beyond. Call (414) 240-4626.',
  '/milwaukee/stump-grinding/'
)

export const metadata: Metadata = {
  ...baseMetadata,
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Milwaukee, WI',
    'geo.position': '43.0389;-87.9065',
    ICBM: '43.0389, -87.9065',
  },
}

const faqs = [
  {
    question: 'How deep do you grind stumps in Milwaukee yards?',
    answer:
      'We typically grind 6–10 inches below grade, which is deep enough for most turf and landscaping needs. Deeper grinding is available if you plan to replant or install hardscaping.',
  },
  {
    question: 'Do you offer discounts for multiple stumps?',
    answer:
      'Yes. We offer multi-stump discounts when we can complete several stumps in one visit. It’s a common request for properties with multiple removals or storm damage.',
  },
  {
    question: 'Will the stump grindings be removed?',
    answer:
      'We can haul the grindings away or leave them on-site as mulch. Many Milwaukee homeowners choose to keep them for garden beds or to fill the hole.',
  },
  {
    question: 'Can you grind stumps in tight Milwaukee city lots?',
    answer:
      'Our equipment fits through standard gates and narrow side yards. We assess access up front so there are no surprises on the day of service.',
  },
]

export default function MilwaukeeStumpGrindingPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Stump Grinding', item: 'https://urbanloggers.org/milwaukee/stump-grinding/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Stump Grinding',
              'Professional stump grinding in Milwaukee, WI with below-grade removal and cleanup.',
              'https://urbanloggers.org/milwaukee/stump-grinding/',
              'Stump Grinding Service',
              '$$'
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="relative text-white py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/stump-grinding.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Stump Grinding in Milwaukee, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Clean, affordable stump removal that restores your yard and eliminates trip hazards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Stump Grinding — Quick Facts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Typical Cost', '$75–$400 depending on diameter and access'],
                  ['Timeline', 'Most stumps completed in 30–90 minutes'],
                  ['What’s Included', 'Grinding below grade, surface cleanup, optional haul-away'],
                  ['Discounts', 'Multi-stump pricing available'],
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">{label}</td>
                    <td className="px-4 py-3 text-gray-700">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose-brand">
          <h2>Stump Grinding for Milwaukee Homes and Businesses</h2>
          <p>
            After a tree is removed, the stump can be the most frustrating part of the job. It gets
            in the way of mowing, creates a tripping hazard, and can even attract insects. For
            Milwaukee homeowners in neighborhoods like Riverwest, Bay View, and the East Side, a
            lingering stump can also reduce valuable yard space. Our stump grinding service removes
            the stump below grade so your lawn can be restored or replanted quickly.
          </p>
          <p>
            Urban Loggers LLC uses compact, powerful grinders that fit through standard gates and tight
            side yards. That matters in Milwaukee’s older neighborhoods where lots are narrow and
            access is limited. We’ll assess the location, check for underground utilities, and protect
            surrounding landscaping before we start.
          </p>
          <p>
            Grinding is faster and less invasive than full stump excavation. Instead of tearing up a
            big section of your yard, we reduce the stump to mulch-like chips and leave the roots in
            place to naturally decompose. You can choose to keep the grindings for mulch or have us
            haul them away. Either way, we leave the surface smooth and ready for topsoil, seed, or
            sod.
          </p>
          <h3>Why Milwaukee Clients Choose Stump Grinding</h3>
          <p>
            Many Milwaukee properties have mature trees removed after storms or disease, which can
            leave multiple stumps across a yard. We offer multi-stump discounts because it’s more
            efficient to handle them in one visit. Whether you’re a homeowner in Walker’s Point or a
            business owner in the Menomonee Valley, we can schedule stump grinding in a way that keeps
            foot traffic and parking disruptions to a minimum.
          </p>
          <p>
            Stump grinding also helps prevent regrowth. Some species — like certain maples and elms —
            try to sprout from the stump for years. Grinding below grade removes the tissue that fuels
            new growth and reduces ongoing maintenance.
          </p>
          <h3>How Deep Should a Stump Be Ground?</h3>
          <p>
            For most Milwaukee lawns, grinding 6–10 inches below grade is enough for grass or garden
            beds. If you plan to plant a new tree, build a patio, or install a driveway extension, we
            can grind deeper so the area is stable. We’ll discuss your long-term plans during the
            estimate and tailor the grind depth accordingly.
          </p>
          <p>
            Our crew cleans the site after grinding, rakes the chips, and makes sure the area looks
            professional. If you need additional tree work, we can combine stump grinding with trimming
            or removal services for a more efficient project.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Stump Grinding FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Remove That Stump for Good</h2>
          <p className="text-gray-700 mb-6">
            Reclaim your yard with professional stump grinding from Urban Loggers LLC. Call for a
            fast, free estimate in Milwaukee.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Milwaukee services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Milwaukee services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">← Milwaukee hub</Link>
            <Link href="/milwaukee/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/milwaukee/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/milwaukee/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/milwaukee/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

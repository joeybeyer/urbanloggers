import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

const baseMetadata = buildMetadata(
  'Emergency Tree Service in Milwaukee, WI | Urban Loggers LLC',
  '24/7 emergency tree service in Milwaukee for storm damage, fallen trees, and power line hazards. Fast response in neighborhoods citywide. Call (414) 240-4626.',
  '/milwaukee/emergency/'
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
    question: 'Do you provide 24/7 emergency tree service in Milwaukee?',
    answer:
      'Yes. We’re on call for storm damage, fallen trees, and hazardous limbs. If your tree is on a home, vehicle, or blocking access, call us any time.',
  },
  {
    question: 'What should I do if a tree is touching power lines?',
    answer:
      'Stay away and call us immediately. We coordinate with utility providers when power lines are involved. Never attempt to remove or cut a tree that touches energized lines.',
  },
  {
    question: 'How fast can you respond after a Milwaukee storm?',
    answer:
      'We prioritize hazardous situations and typically arrive same-day or within 24 hours depending on storm volume. We’ll give you an honest ETA when you call.',
  },
  {
    question: 'Can you help with insurance documentation?',
    answer:
      'Yes. We can provide photos, written estimates, and invoices to support your insurance claim after storm damage or tree failure.',
  },
]

export default function MilwaukeeEmergencyTreeServicePage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Emergency Tree Service', item: 'https://urbanloggers.org/milwaukee/emergency/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Emergency Tree Service',
              '24/7 emergency tree service in Milwaukee, WI for storm damage, fallen trees, and power line hazards.',
              'https://urbanloggers.org/milwaukee/emergency/',
              'Emergency Tree Service',
              '$$$'
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/emergency.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Emergency Tree Service in Milwaukee, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            24/7 response for storm damage, fallen trees, and urgent safety hazards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Request Help
            </Link>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service — Quick Facts</h2>
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
                  ['Availability', '24/7 emergency response'],
                  ['Typical Cost', 'Varies by hazard level and access; quotes given on site'],
                  ['Timeline', 'Same-day or next-day response for critical hazards'],
                  ['What’s Included', 'Hazard assessment, safe removal, cleanup, debris haul-away'],
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
          <h2>Fast, Safe Emergency Tree Response Across Milwaukee</h2>
          <p>
            Milwaukee’s weather can shift fast. Heavy lake-effect winds, spring storms, and winter ice
            can bring down limbs or entire trees with little warning. When a tree lands on a roof,
            blocks a driveway, or tangles with power lines, you need a crew that can respond quickly
            and safely. Urban Loggers LLC offers 24/7 emergency tree service with the equipment and
            experience required for high-risk removals.
          </p>
          <p>
            We serve neighborhoods across the city — from Bay View and Walker’s Point to Shorewood and
            the North Side — and we know how to operate in tight residential streets. If a tree has
            fallen across an alley or a street, we can coordinate with local authorities to keep the
            area secure while we work. Our priority is always safety for your family, neighbors, and
            nearby property.
          </p>
          <p>
            Emergency work often involves unstable wood, hanging limbs, or compromised root systems.
            These situations are dangerous for anyone without professional training and equipment. We
            use rigging, specialized saws, and controlled lowering techniques to remove hazards without
            causing additional damage. If a tree is leaning on a structure, we’ll build a plan to lift
            and remove sections in a controlled sequence, reducing risk to the building.
          </p>
          <h3>What to Do After a Storm</h3>
          <p>
            The first step is to keep everyone away from the damaged tree — especially if power lines
            are involved. If you see wires down or sparking, call emergency services and your utility
            provider. Once the area is safe, contact Urban Loggers LLC. We’ll ask a few questions,
            gather key details, and send a crew as quickly as possible. We can also provide photos and
            documentation to support insurance claims.
          </p>
          <p>
            After we address the immediate hazard, we can help you plan next steps. That might include
            full tree removal, stump grinding, or pruning of nearby trees that were damaged by the
            storm. Our goal is to restore safety and help you get back to normal without unnecessary
            delays.
          </p>
          <h3>Why Milwaukee Calls Urban Loggers for Emergency Work</h3>
          <p>
            We’re local, fully insured, and led by Brian Smith, who has decades of experience with
            high-risk tree jobs. That experience matters when a tree is on a roof or pressed against a
            neighboring structure. We stay calm, move carefully, and communicate clearly so you know
            what’s happening at each stage of the job.
          </p>
          <p>
            Whether the emergency is caused by a thunderstorm in the Third Ward or heavy snow in
            Washington Heights, our team is ready to respond. Call any time and we’ll help you secure
            the property and resolve the hazard.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service FAQs</h2>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Emergency Tree Help — Call Now</h2>
          <p className="text-gray-700 mb-6">
            If a tree is down or threatening your property, call Urban Loggers LLC for 24/7 emergency
            service in Milwaukee.
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
            <Link href="/milwaukee/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/milwaukee/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

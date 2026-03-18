import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Removal in Mequon, WI | Urban Loggers LLC',
    'Reliable tree removal in Mequon, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 514-0750.',
    '/mequon/tree-removal/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Mequon',
  },
}

const faqs = [
  {
    "question": "Do I need a permit for removing a tree in Mequon?",
    "answer": "Requirements vary based on whether the tree is on private property or in the public right-of-way. We’ll help you understand local guidelines and timing so the job stays compliant and safe."
  },
  {
    "question": "How do you remove large trees in Mequon without damaging nearby homes?",
    "answer": "We use sectional removal with rigging so limbs and trunk pieces are lowered in controlled steps. That’s especially important on tight lots in areas like East Mequon, River Club, Range Line corridor where fences, garages, and nearby power lines leave little room for a full drop."
  },
  {
    "question": "What signs indicate removal is safer than trimming?",
    "answer": "Major cracks, severe lean, hollow trunks, or root plate lifting are red flags. We can evaluate the tree and explain whether removal is the safest long-term choice."
  },
  {
    "question": "Can you leave the wood on-site for firewood or milling?",
    "answer": "Yes. Many homeowners in Mequon request log lengths for milling or firewood. Let us know your goals during the estimate and we’ll stage and cut accordingly."
  }
]

export default function MequonTreeRemovalPage() {
  const crumbs = [
  {
    "name": "Home",
    "item": "https://urbanloggers.org/"
  },
  {
    "name": "Mequon",
    "item": "https://urbanloggers.org/mequon/"
  },
  {
    "name": "Tree Removal",
    "item": "https://urbanloggers.org/mequon/tree-removal/"
  }
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Tree Removal',
              'Safe tree removal with rigging, cleanup, and optional log milling. in Mequon, WI.',
              'https://urbanloggers.org/mequon/tree-removal/',
              'Tree Removal Service',
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tree-removal.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Removal in Mequon, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Safe, insured removals for storm-damaged trees, tight lots, and full canopy takedowns.
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
          <h2 className="text-2xl font-bold text-charcoal mb-6">Tree Removal — Quick Facts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[["Typical Cost","$300–$2,000+ depending on size, access, and rigging"],["Timeline","Most removals completed in 1 day; complex jobs may take 2 days"],["What’s Included","Sectional removal, rigging, debris cleanup, haul-away"],["Add-Ons","Stump grinding, log milling, firewood cutting"]].map(([label, value]) => (
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
          <h2>Mequon Tree Removal Focused on Safety and Results</h2>
          <p>Tree removal is rarely a simple cut-and-drop job in Mequon. Many properties have tight access, overhead utilities, and mature canopies that grew long before today’s home additions. We evaluate the tree’s lean, canopy weight, and root stability before making the first cut. That detailed planning keeps the job safe for your home and for neighbors in nearby blocks like East Mequon, River Club, Range Line corridor.</p>
          <p>Urban Loggers LLC is led by Brian Smith and backed by 20+ years of hands-on tree work. We’re fully insured and we show up with the right equipment—rigging systems, safety lines, and when necessary, cranes for large canopies. Our local experience means we know how to manage street parking, coordinate with neighbors, and keep the job tidy in busy parts of Mequon.</p>
          <h3>Why Mequon Homeowners Choose Urban Loggers</h3>
          <p>We don’t just cut a trunk and leave. Our removals include careful dismantling, brush chipping, and full debris haul-away. If you’d like the wood for milling or firewood, we’ll cut to your preferred lengths and stage the logs neatly.</p>
          <p>We also advise on post-removal options like replanting, adding a new shade tree, or opening up space for gardens and patios. Our team can point you toward species that thrive in Mequon and won’t outgrow the space too quickly.</p>
          <p>If access is limited, we can stage equipment to minimize impact on lawns and landscaping. Ground protection and careful rigging keep yards in Mequon clean and usable once the work is complete.</p>
          <h3>Local Considerations in Mequon</h3>
          <p>Because removals can impact neighboring properties, we coordinate access points and communicate clearly about timing. That extra planning keeps the work smooth in Mequon blocks where space is shared.</p>
          <p>Local soil conditions and drainage patterns matter when removing large trees. In parts of Mequon where the ground is softer, we take extra care around root plates and nearby landscaping to prevent shifting or rutting.</p>
          <h3>What to Expect During Your Tree Removal</h3>
          <p>If a tree is close to a shared driveway or alley, we plan staging and traffic flow in advance. Clear communication keeps neighbors safe and avoids surprises on removal day.</p>
          <p>If you’re unsure whether removal is necessary, we’ll give you an honest assessment. Sometimes trimming or cabling can extend the life of a tree. When removal is the safest option, we’ll provide a clear quote and a timeline that respects your schedule.</p>
          <p>On removal day, we confirm the plan, protect the surrounding area, and work efficiently until the tree is down and the yard is clean. If you add stump grinding, we’ll grind below grade and blend the area with fresh mulch so it’s ready for the next step.</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Tree Removal FAQs</h2>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Tree Removal in Mequon?</h2>
          <p className="text-gray-700 mb-6">
            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Mequon services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Mequon services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/mequon/" className="text-brand-green hover:underline text-sm">← Mequon hub</Link>
            <Link href="/mequon/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/mequon/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/mequon/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/mequon/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/mequon/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

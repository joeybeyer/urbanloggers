import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

const baseMetadata = buildMetadata(
  'Tree Removal in Milwaukee, WI | Urban Loggers LLC',
  'Trusted tree removal in Milwaukee neighborhoods like Bay View and Shorewood. Safe rigging near structures, full cleanup included. Call (414) 514-0750.',
  '/milwaukee/tree-removal/'
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
    question: 'How do you remove trees close to homes or garages in Milwaukee?',
    answer:
      'We use sectional removal and rigging to lower limbs and trunk pieces safely. That approach is ideal for tight lots in neighborhoods like Bay View or the East Side where trees sit close to roofs, fences, and utility lines.',
  },
  {
    question: 'Is tree removal more expensive for large oaks or maples?',
    answer:
      'Larger hardwoods usually require more labor, specialized rigging, and more haul-away. We provide a clear, itemized quote so you understand why a large canopy or heavy trunk increases cost.',
  },
  {
    question: 'Do you handle the city right-of-way rules for street trees?',
    answer:
      'If a tree touches the public right-of-way, we’ll help you understand the City of Milwaukee guidelines and whether a permit is required. We can coordinate timing so removal is compliant and safe.',
  },
  {
    question: 'Can you leave the wood on-site for milling or firewood?',
    answer:
      'Yes. Many Milwaukee homeowners ask us to stage logs for milling or firewood. Just let us know your preference during the estimate and we’ll plan the cut lengths accordingly.',
  },
]

export default function MilwaukeeTreeRemovalPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Tree Removal', item: 'https://urbanloggers.org/milwaukee/tree-removal/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Tree Removal',
              'Safe tree removal in Milwaukee, WI with rigging, cleanup, and optional log milling.',
              'https://urbanloggers.org/milwaukee/tree-removal/',
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Removal in Milwaukee, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Safe, insured removals for everything from storm-damaged limbs to full canopy takedowns.
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
                {[
                  ['Typical Cost', '$300–$2,000+ depending on size, access, and rigging'],
                  ['Timeline', 'Most removals completed in 1 day; complex jobs may take 2 days'],
                  ['What’s Included', 'Felling or sectional removal, rigging, debris cleanup, haul-away'],
                  ['Add-Ons', 'Stump grinding, log milling, firewood cutting'],
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
          <h2>Milwaukee Tree Removal Built for Tight Lots and Big Trees</h2>
          <p>
            Milwaukee’s neighborhoods are a mix of historic homes, narrow side yards, and mature trees
            that were planted generations ago. In places like Bay View, Riverwest, and the East Side,
            a massive maple can sit just feet from a garage or power line. Our tree removal process is
            designed for those tight spaces. We use rope-and-rigging systems to lower limbs in controlled
            sections, protecting roofs, fences, and landscaping while keeping pedestrians and vehicles
            safe along busy streets.
          </p>
          <p>
            Urban Loggers LLC is locally owned and led by Brian Smith, and we’re used to the unique
            challenges of Milwaukee’s canopy. Whether it’s a leaning ash in Shorewood, a split oak in
            Washington Heights, or a storm-damaged pine in the Menomonee Valley, we plan each job with
            a detailed safety checklist. We assess access, overhead lines, root stability, and the safest
            drop zones before the first cut is made.
          </p>
          <p>
            Tree removal isn’t just about cutting a trunk. It’s about managing weight, direction, and
            structure so the tree comes down without collateral damage. When we’re removing a large
            tree near a home, we’ll typically dismantle the canopy first, then remove the trunk in
            sections. This method is slower than a simple fell, but it’s the safest option for dense
            neighborhoods where one wrong move could damage a roof or a neighbor’s property.
          </p>
          <h3>Why Milwaukee Homeowners Choose Urban Loggers</h3>
          <p>
            Our crews are fully insured and show up with the equipment needed for serious removals —
            cranes when required, advanced rigging gear, and ground protection for lawns. We also
            understand the local expectations for cleanup. You won’t be left with a messy pile of brush
            at the curb. We chip branches, haul debris, and leave your yard looking tidy. If you want
            the trunk saved for milling or firewood, we’ll stage it safely and cut to your preferred
            lengths.
          </p>
          <p>
            We frequently work in neighborhoods like Walker’s Point, Brewer’s Hill, and Whitefish Bay,
            where the combination of older trees and tight spaces calls for precision. Our team is
            careful about traffic flow and pedestrian safety, and we’re happy to coordinate timing with
            neighbors when access is shared. That local experience is one reason our Milwaukee customers
            continue to recommend us.
          </p>
          <h3>When Is Tree Removal the Right Call?</h3>
          <p>
            Not every struggling tree needs to be removed, and we’ll tell you when trimming or cabling
            can extend the life of a tree. Removal becomes the right choice when a tree is structurally
            compromised, has advanced decay, or presents a clear safety hazard. Common signs include
            large cracks at the base, severe lean after storms, extensive crown dieback, or major root
            plate heaving. If you’re unsure, we’ll inspect and give a straight answer — no pressure.
          </p>
          <p>
            Milwaukee storms can turn weak trees into immediate hazards. If you see a split trunk,
            hanging limbs, or a tree contacting power lines, treat it as urgent. Our emergency crews can
            secure the site and remove hazardous sections quickly. For non-emergency removals, we’ll
            schedule a time that fits your week and finish the job efficiently with minimal disruption.
          </p>
          <h3>What to Expect on Removal Day</h3>
          <p>
            We start with a walkthrough to confirm the plan, set up a safe work zone, and protect your
            property. The removal itself may involve climbing, rigging, or controlled felling depending
            on the tree’s location. After the tree is down, we clean up, rake the area, and make sure
            you’re satisfied. If you add stump grinding, we’ll remove the stump below grade and blend
            the area with fresh mulch so it’s ready for seed or sod.
          </p>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Tree Removal in Milwaukee?</h2>
          <p className="text-gray-700 mb-6">
            Get a clear quote and an honest assessment from Urban Loggers LLC. Call today for a free
            on-site estimate.
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
            <Link href="/milwaukee/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/milwaukee/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/milwaukee/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/milwaukee/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

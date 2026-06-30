import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

const baseMetadata = buildMetadata(
  'Log Milling in Milwaukee, WI | Urban Loggers LLC',
  'Portable sawmill services in Milwaukee for custom slabs, beams, and lumber. Sustainable milling for storm-felled trees. Call (414) 240-4626.',
  '/milwaukee/log-milling/'
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
    question: 'What types of lumber can you mill in Milwaukee?',
    answer:
      'We can mill slabs, beams, live-edge boards, and dimensional lumber. We’ll help you choose thickness and cut patterns based on how you want to use the wood.',
  },
  {
    question: 'Do I need to transport logs to your shop?',
    answer:
      'No. Our portable sawmill comes to your property in Milwaukee. We set up on-site and mill the logs where they are, which saves you hauling costs.',
  },
  {
    question: 'Can you mill storm-damaged trees?',
    answer:
      'Often, yes. If the log is sound and not overly cracked or punky, we can turn storm-felled trees into valuable lumber instead of waste.',
  },
  {
    question: 'How long does it take to mill a log?',
    answer:
      'Time depends on log size and the number of cuts, but most projects can be completed in a day. We’ll give you a realistic timeline during the estimate.',
  },
]

export default function MilwaukeeLogMillingPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Log Milling', item: 'https://urbanloggers.org/milwaukee/log-milling/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Log Milling',
              'Portable sawmill log milling in Milwaukee, WI for custom slabs, beams, and lumber.',
              'https://urbanloggers.org/milwaukee/log-milling/',
              'Log Milling Service',
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/milling.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Log Milling in Milwaukee, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Portable sawmill services for custom slabs, beams, and sustainable local lumber.
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
          <h2 className="text-2xl font-bold text-charcoal mb-6">Log Milling — Quick Facts</h2>
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
                  ['Typical Cost', 'Varies by log size and milling time; quotes provided on site'],
                  ['Timeline', 'Most milling jobs completed in 1 day'],
                  ['What’s Included', 'On-site milling, slab stacking, cut planning'],
                  ['Best For', 'Live-edge slabs, beams, custom lumber projects'],
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
          <h2>Milwaukee Log Milling That Turns Trees Into Lumber</h2>
          <p>
            When a tree comes down, it doesn’t have to become waste. Urban Loggers LLC offers portable
            log milling in Milwaukee so you can turn your own trees into beautiful slabs, beams, and
            boards. Whether the log came from a planned removal or a storm event, we bring the sawmill
            to your property and process the wood on-site. It’s an efficient, sustainable way to keep
            valuable hardwoods in use.
          </p>
          <p>
            Milwaukee has a strong maker community, and we love helping homeowners, woodworkers, and
            contractors turn local trees into something special. We regularly mill in neighborhoods
            like Bay View, Riverwest, and the East Side, and we can adapt to tight access or uneven
            terrain. Our setup is designed to be portable, and we plan the work area to keep the
            milling process clean and safe.
          </p>
          <p>
            We’ll help you decide the best cuts based on your goals. Want live-edge dining table slabs?
            Need beams for a remodel in Walker’s Point? Looking for dimensional lumber for shelving or
            flooring? We can discuss log orientation, slab thickness, and drying considerations before
            the first cut is made. Good planning makes sure you get the maximum value out of each log.
          </p>
          <h3>Why Portable Sawmilling Makes Sense in Milwaukee</h3>
          <p>
            Transporting logs through the city can be expensive and complicated, especially if the
            tree came from a tight urban lot. Portable milling eliminates the need to haul heavy logs
            across Milwaukee. Instead, we set up on-site and mill where the log already sits. That
            reduces cost, saves time, and minimizes heavy equipment traffic on residential streets.
          </p>
          <p>
            Milling also supports sustainable tree care. Many trees removed for safety or construction
            are still solid inside, and milling preserves their value. It’s a great option for clients
            who want to honor a long-standing tree or reuse material from a family property.
          </p>
          <h3>What to Expect During a Milling Visit</h3>
          <p>
            We start by assessing the log’s condition and planning cut sizes. Our portable mill allows
            precise cuts with minimal waste. We’ll stack the slabs or boards neatly and discuss storage
            and drying. If you need advice on sealing ends or arranging air flow, we’ll provide
            practical guidance so your lumber stays in great shape while it dries.
          </p>
          <p>
            If you’re combining milling with removal or stump grinding, we can coordinate services to
            make the entire project efficient. Our goal is to help Milwaukee property owners get the
            most out of their trees — from safe removal to sustainable reuse.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Log Milling FAQs</h2>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Turn Milwaukee Trees Into Lumber</h2>
          <p className="text-gray-700 mb-6">
            Have a log you want milled into slabs or beams? Call Urban Loggers LLC to schedule a
            portable milling visit.
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
            <Link href="/milwaukee/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

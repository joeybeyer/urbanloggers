import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Log Milling in Brookfield, WI | Urban Loggers LLC',
    'Reliable log milling in Brookfield, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 514-0750.',
    '/brookfield/log-milling/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Brookfield',
  },
}

const faqs = [
  {
    "question": "Do you seal log ends to reduce cracking?",
    "answer": "We can recommend end-sealing products and storage methods that reduce checking while the slabs dry."
  },
  {
    "question": "Do you mill logs from trees you remove?",
    "answer": "Yes. If we’re already removing a tree, we can stage the logs and mill them into slabs during the same project."
  },
  {
    "question": "Can you cut live-edge slabs?",
    "answer": "Absolutely. Live-edge slabs are popular for tables, benches, and fireplace mantels."
  },
  {
    "question": "Which logs are best for milling in Brookfield?",
    "answer": "Hardwoods like oak and maple mill into beautiful slabs. We’ll inspect the log for straight grain and minimal decay before cutting."
  }
]

export default function BrookfieldLogMillingPage() {
  const crumbs = [
  {
    "name": "Home",
    "item": "https://urbanloggers.org/"
  },
  {
    "name": "Brookfield",
    "item": "https://urbanloggers.org/brookfield/"
  },
  {
    "name": "Log Milling",
    "item": "https://urbanloggers.org/brookfield/log-milling/"
  }
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Log Milling',
              'On-site log milling for custom slabs and lumber from removed trees. in Brookfield, WI.',
              'https://urbanloggers.org/brookfield/log-milling/',
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Log Milling in Brookfield, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Turn valuable logs into custom slabs for tables, mantels, and local woodworking projects.
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
                {[["Typical Cost","Varies by log size and slab thickness"],["Timeline","Milling often completed in a single visit"],["What’s Included","Log staging, slab cutting, stacking guidance"],["Best Species","Oak, maple, walnut, and cherry mill beautifully"]].map(([label, value]) => (
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
          <h2>Brookfield Log Milling Focused on Safety and Results</h2>
          <p>Log milling lets you keep the story of a tree alive. In Brookfield, homeowners often choose milling after removals so the wood can become a table, mantel, or heirloom piece. We evaluate the log, plan slab thickness, and cut for stability so the wood dries evenly. That planning helps prevent warping and creates more usable lumber.</p>
          <p>Milling is a great option when you have a straight, sound log with minimal decay. We’ll check the log for metal, rot, and stability before cutting. Then we plan slab thickness based on how you want to use the wood—tables, benches, shelving, or accent pieces. That step ensures you get the most value from every cut.</p>
          <h3>Why Brookfield Homeowners Choose Urban Loggers</h3>
          <p>We can mill logs from trees we remove or from trees that fell in storms. After milling, we’ll show you how to stack and sticker the slabs for proper airflow so they dry evenly over time. Proper drying reduces checking and keeps the slabs flat.</p>
          <p>We can guide you on slab thickness and cutting orientation so the grain pattern matches your project goals. That planning step helps minimize warping and highlights the best figure in the wood. It also makes it easier to match slab sizes to common furniture dimensions.</p>
          <p>For larger logs, we can break the milling into multiple passes to maximize yield. It’s a great way to turn a single tree into several usable slabs or boards. We’ll label slabs and explain the best storage approach for each piece.</p>
          <h3>Local Considerations in Brookfield</h3>
          <p>We’ve milled logs for homeowners, builders, and local artisans who want truly local lumber, not generic big-box material. If you have a specific project in mind, we can adjust slab size and thickness to match your plans. We can also note grain orientation so you can book-match slabs for larger tabletop projects.</p>
          <p>Moisture levels can vary across Brookfield, so we tailor drying guidance based on where the slabs will be stored. Good airflow and consistent stacking make a big difference in the final quality.</p>
          <h3>What to Expect During Your Log Milling</h3>
          <p>If you plan to use the wood for outdoor projects, we can suggest finishes and sealing options that hold up to Wisconsin’s changing weather.</p>
          <p>Milled slabs need time to dry, but the result is worth it: wood with character, grain, and local story. We’ll help you plan for drying and storage so the slabs stay flat and crack-free. If you want kiln drying, we can point you to local resources.</p>
          <p>Whether you’re a woodworker or simply want a one-of-a-kind piece, we can help you turn a local tree into something lasting. It’s a great way to honor a tree that’s been part of your property for decades and keep the material close to home.</p>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Log Milling in Brookfield?</h2>
          <p className="text-gray-700 mb-6">
            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Brookfield services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Brookfield services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/brookfield/" className="text-brand-green hover:underline text-sm">← Brookfield hub</Link>
            <Link href="/brookfield/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/brookfield/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/brookfield/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/brookfield/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/brookfield/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

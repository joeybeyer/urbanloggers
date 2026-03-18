import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Stump Grinding in Wauwatosa, WI | Urban Loggers LLC',
    'Reliable stump grinding in Wauwatosa, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 514-0750.',
    '/wauwatosa/stump-grinding/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Wauwatosa',
  },
}

const faqs = [
  {
    "question": "What happens to the stump grindings?",
    "answer": "The chips can be used as mulch or hauled away. Many Wauwatosa homeowners like to reuse the grindings in garden beds."
  },
  {
    "question": "How deep do you grind stumps in Wauwatosa?",
    "answer": "We typically grind 6–12 inches below grade, which is deep enough for sod or most landscape plans. If you need deeper clearance for a patio or replanting, let us know."
  },
  {
    "question": "Is stump grinding safe near utilities?",
    "answer": "We call for utility locates before grinding and work carefully around buried lines and irrigation."
  },
  {
    "question": "Can you remove surface roots along sidewalks or driveways?",
    "answer": "Yes. We can grind surface roots that are causing trip hazards or lifting concrete, especially in older neighborhoods like East Tosa, Wauwatosa Village, Washington Highlands."
  }
]

export default function WauwatosaStumpGrindingPage() {
  const crumbs = [
  {
    "name": "Home",
    "item": "https://urbanloggers.org/"
  },
  {
    "name": "Wauwatosa",
    "item": "https://urbanloggers.org/wauwatosa/"
  },
  {
    "name": "Stump Grinding",
    "item": "https://urbanloggers.org/wauwatosa/stump-grinding/"
  }
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Stump Grinding',
              'Stump grinding and root flare cleanup to reclaim lawn and landscape space. in Wauwatosa, WI.',
              'https://urbanloggers.org/wauwatosa/stump-grinding/',
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Stump Grinding in Wauwatosa, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            We grind stumps below grade so you can replant, sod, or landscape without tripping hazards.
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
                {[["Typical Cost","$150–$600 depending on stump diameter and access"],["Timeline","Most stumps ground in 1–2 hours"],["What’s Included","Grinding 6–12 inches below grade, cleanup, mulch backfill"],["Optional Add-Ons","Surface root grinding and full debris haul-away"]].map(([label, value]) => (
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
          <h2>Wauwatosa Stump Grinding Focused on Safety and Results</h2>
          <p>A leftover stump can attract pests and throw off your landscape plans. In Wauwatosa, we see stumps lingering for years because homeowners are unsure what to do next. Our stump grinding service clears the space cleanly, removes surface roots when needed, and keeps your yard level for future projects.</p>
          <p>Stump grinding is also about what’s below the surface. We can address surface roots that cause uneven lawns or push up sidewalks, which is a common issue in established areas of Wauwatosa. We’ll walk the area first so the grinding depth matches your landscaping plans.</p>
          <h3>Why Wauwatosa Homeowners Choose Urban Loggers</h3>
          <p>Our equipment fits through most residential gates, and we protect turf with careful staging. After grinding, we’ll backfill with mulch and rake the area smooth. If you want full haul-away, we can remove the grindings so the site is ready for new soil.</p>
          <p>If you plan to plant a new tree, we can recommend spacing and stump placement so the new root system has room to grow. Clearing old stumps helps new plantings establish faster.</p>
          <p>Grinding also removes the barrier for hardscape projects like walkways or patios. It’s a small step that unlocks a lot of landscaping flexibility for Wauwatosa homeowners.</p>
          <h3>Local Considerations in Wauwatosa</h3>
          <p>If you’re planning a new landscaping design, we can coordinate stump grinding with trimming or removal so the project stays on schedule.</p>
          <p>Stump size and location vary a lot across Wauwatosa. Older neighborhoods often have larger trunks and more established root systems, which can require deeper grinding or additional passes.</p>
          <h3>What to Expect During Your Stump Grinding</h3>
          <p>If your stump is near sidewalks or utility boxes, we can adjust our approach to keep everything protected while still clearing the area cleanly.</p>
          <p>Grinding the stump is often the final step after a removal, but it can also be done years later to reclaim space. Either way, we’ll help you plan what comes next—new plantings, sod, or hardscape.</p>
          <p>We leave the site tidy and level. Many homeowners in Wauwatosa appreciate that the area is ready for immediate landscaping without additional prep work.</p>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Stump Grinding in Wauwatosa?</h2>
          <p className="text-gray-700 mb-6">
            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Wauwatosa services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Wauwatosa services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/wauwatosa/" className="text-brand-green hover:underline text-sm">← Wauwatosa hub</Link>
            <Link href="/wauwatosa/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/wauwatosa/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/wauwatosa/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/wauwatosa/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/wauwatosa/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Stump Grinding Milwaukee, WI | Urban Loggers LLC',
  'Affordable stump grinding and removal in Greater Milwaukee. Commercial grinder, complete cleanup, multi-stump discounts. Call (414) 514-0750.',
  '/stump-grinding/'
)

export default function StumpGrindingPage() {
  const service = getServiceBySlug('stump-grinding')!
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Stump Grinding', item: 'https://urbanloggers.org/stump-grinding/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/stump-grinding/', 'Stump Grinding and Removal', '$$')
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="relative text-white py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/stump-grinding.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Stump Grinding in Milwaukee, WI
          </h1>
          <p className="text-xl text-green-100 mb-8">{service.shortDesc}</p>
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

      {/* Summary table */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
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
                  ['Typical Cost', '$75–$400 per stump (size-dependent)'],
                  ['Grinding Depth', 'Down to 12 inches below grade'],
                  ['Multi-Stump', 'Discount available'],
                  ['What&apos;s Left', 'Wood chips (usable as mulch)'],
                  ['Can Replant?', 'Yes — after chip removal & settling'],
                  ['Service Area', 'Greater Milwaukee, WI'],
                ].map(([label, value]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal" dangerouslySetInnerHTML={{ __html: label }} />
                    <td className="px-4 py-3 text-gray-700" dangerouslySetInnerHTML={{ __html: value }} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <h2>Complete Stump Removal in Greater Milwaukee</h2>
          <p>{service.longDesc}</p>
          <h2>Why Remove Stumps?</h2>
          <ul>
            <li>Trip and safety hazard for children and adults</li>
            <li>Attracts carpenter ants, termites, and wood borers</li>
            <li>Prevents mowing and lawn maintenance</li>
            <li>Detracts from curb appeal and property value</li>
            <li>Some species (cottonwood, elm) will resprout vigorously</li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Related services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/tree-trimming-pruning/" className="text-brand-green hover:underline text-sm">Trimming & Pruning</Link>
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">Milwaukee</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

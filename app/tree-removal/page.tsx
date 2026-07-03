import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Tree Removal Milwaukee, WI | Urban Loggers LLC',
  'Professional tree removal in Greater Milwaukee. Any size tree, fully insured, free on-site estimates. Call (414) 240-4626.',
  '/tree-removal/'
)

export default function TreeRemovalPage() {
  const service = getServiceBySlug('tree-removal')!
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Tree Removal', item: 'https://urbanloggers.org/tree-removal/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/tree-removal/', 'Tree Removal Service', '$$$')
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/tree-removal.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tree Removal in Milwaukee, WI
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

      {/* Summary table — BERT optimization */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
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
                  ['Typical Cost', '$300–$2,000+ depending on size & complexity'],
                  ['Estimate', 'Free on-site visit'],
                  ['Cleanup', 'Full debris removal included'],
                  ['Log Milling', 'Available — turn logs into lumber'],
                  ['Insurance', 'Fully insured, docs provided'],
                  ['Service Area', 'Greater Milwaukee, WI'],
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

      {/* Description */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <h2>Professional Tree Removal in Greater Milwaukee</h2>
          <p>{service.longDesc}</p>
          <h2>What&rsquo;s Included</h2>
          <ul>
            <li>Free on-site assessment and written quote</li>
            <li>Safe felling or sectional removal as needed</li>
            <li>Complete debris cleanup and haul-away</li>
            <li>Optional stump grinding (quoted separately)</li>
            <li>Optional log milling — turn hardwoods into lumber</li>
            <li>Insurance documentation if needed</li>
          </ul>
          <h2>When to Remove a Tree</h2>
          <p>
            Not every dead or diseased tree needs to come down immediately, but some do. Signs
            that a tree poses immediate risk include major trunk cracks, significant lean toward
            structures, extensive root damage, and more than 50% crown loss. Brian will give
            you an honest assessment — he won&rsquo;t recommend removal if the tree can be saved.
          </p>
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
            <Link href="/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">Emergency Service</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

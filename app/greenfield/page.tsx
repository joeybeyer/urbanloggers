import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getLocationBySlug } from '@/data/locations'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Greenfield, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Greenfield, WI. Fully insured. Free estimates. Call (414) 514-0750.',
    '/greenfield/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Greenfield',
    'geo.position': '42.9614;-87.9898',
    'ICBM': '42.9614, -87.9898',
  },
}

export default function GreenfieldPage() {
  const location = getLocationBySlug('greenfield')!
  const lbSchema = localBusinessSchema('Greenfield, WI', 'greenfield')
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Greenfield', item: 'https://urbanloggers.org/greenfield/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(location.faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="bg-brand-green text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tree Service in Greenfield, WI
          </h1>
          <p className="text-xl text-green-100 mb-8">{location.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Services table */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Tree Services in Greenfield</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">Learn More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Tree Removal', '/tree-removal/'],
                  ['Trimming & Pruning', '/tree-trimming-pruning/'],
                  ['Stump Grinding', '/stump-grinding/'],
                  ['Emergency Tree Service', '/emergency-tree-service/'],
                  ['Log Milling', '/log-milling/'],
                ].map(([name, href]) => (
                  <tr key={name} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-charcoal">{name}</td>
                    <td className="px-4 py-3">
                      <Link href={href} className="text-brand-green hover:underline text-sm">
                        View service →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <h2>Tree Care in Greenfield &amp; Hales Corners</h2>
          <p>
            Greenfield is home to Greenfield Park — one of Milwaukee County&rsquo;s largest parks —
            and a dense mix of residential neighborhoods with mature trees. Urban Loggers LLC serves
            all of Greenfield including the areas along 27th Street, Layton Avenue corridor,
            and the communities bordering Hales Corners and Greendale.
          </p>
          <p>
            We specialize in precision removals in tight residential lots, where protecting your
            home, fence, and landscaping is just as important as safely felling the tree.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Greenfield Tree Service FAQ</h2>
          <div className="space-y-4">
            {location.faqs.map((faq) => (
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
          <p className="text-sm text-gray-500 mb-3">Related pages:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">← Milwaukee</Link>
            <Link href="/west-allis/" className="text-brand-green hover:underline text-sm">West Allis</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Get a Quote</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

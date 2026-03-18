import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Log Milling & Portable Sawmill Milwaukee, WI | Urban Loggers LLC',
  "Don't chip your trees — mill them. Urban Loggers LLC turns felled hardwoods into live-edge slabs, custom lumber & beams in Greater Milwaukee. Call (414) 514-0750.",
  '/log-milling/'
)

export default function LogMillingPage() {
  const service = getServiceBySlug('log-milling')!
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Log Milling', item: 'https://urbanloggers.org/log-milling/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/log-milling/', 'Portable Log Milling', '$$')
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
      <section className="relative text-white py-14 px-4 min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/milling.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🪵</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Portable Log Milling in Milwaukee
          </h1>
          <p className="text-xl text-green-100 mb-8">
            We bring the sawmill to you — turning your felled trees into beautiful, usable lumber.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Ask About Milling
            </Link>
          </div>
        </div>
      </section>

      {/* What we can mill */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">What We Can Mill for You</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold">Best Species</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Live-edge slabs', 'Walnut, maple, cherry, oak'],
                  ['Dimensional lumber', 'Oak, ash, pine, elm'],
                  ['Fireplace mantels', 'Walnut, oak, maple'],
                  ['Custom beams', 'Oak, pine, elm'],
                  ['Turning blanks', 'Cherry, maple, walnut, fruitwood'],
                  ['Fence boards', 'Cedar, pine, oak'],
                ].map(([product, species]) => (
                  <tr key={product} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">{product}</td>
                    <td className="px-4 py-3 text-gray-700">{species}</td>
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
          <h2>The Urban Loggers Approach to Milling</h2>
          <p>{service.longDesc}</p>

          <h2>Sustainability in Action</h2>
          <p>
            Every year, millions of board-feet of high-quality hardwood are chipped, mulched, or
            landfilled because tree services don&rsquo;t offer an alternative. Urban Loggers does.
            We believe a 100-year-old walnut deserves better than the chipper — and so do you.
          </p>
          <p>
            Whether it&rsquo;s a spectacular live-edge dining table, a custom mantel for your fireplace,
            or rough-sawn lumber for a barn project, we&rsquo;ll work with you to get the cut that
            makes the most of your tree.
          </p>

          <h2>How the Process Works</h2>
          <ul>
            <li>We assess the log for quality and mill-ability during your tree removal</li>
            <li>Our portable bandsaw mill is set up alongside the log</li>
            <li>You choose the cuts — slabs, dimensional, beams, or mixed</li>
            <li>Green lumber is stickered and stacked for air drying (or kiln-connected)</li>
            <li>You keep the lumber — or we can arrange delivery and storage</li>
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
            <Link href="/about/" className="text-brand-green hover:underline text-sm">About Brian</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Get a Quote</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

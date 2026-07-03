import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Tree Trimming & Pruning Milwaukee, WI | Urban Loggers LLC',
  'Expert tree trimming and pruning in Greater Milwaukee. Crown thinning, deadwood removal, orchard pruning. Call (414) 240-4626 for a free estimate.',
  '/tree-trimming-pruning/'
)

export default function TreeTrimmingPage() {
  const service = getServiceBySlug('tree-trimming-pruning')!
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Tree Trimming & Pruning', item: 'https://urbanloggers.org/tree-trimming-pruning/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/tree-trimming-pruning/', 'Tree Trimming and Pruning', '$$')
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/trimming.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tree Trimming &amp; Pruning in Milwaukee
          </h1>
          <p className="text-xl text-green-100 mb-8">{service.shortDesc}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Get Free Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Summary table */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Trimming &amp; Pruning Services</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Crown Thinning', 'Reduces wind resistance, improves light penetration'],
                  ['Crown Raising', 'Removes lower branches for clearance'],
                  ['Deadwood Removal', 'Eliminates hazardous dead branches'],
                  ['Structural Pruning', 'Shapes young trees for long-term stability'],
                  ['Orchard Pruning', 'Maximizes fruit production and tree health'],
                  ['Vista Pruning', 'Opens sight lines without harming the tree'],
                ].map(([svc, purpose]) => (
                  <tr key={svc} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">{svc}</td>
                    <td className="px-4 py-3 text-gray-700">{purpose}</td>
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
          <h2>Expert Tree Pruning in Greater Milwaukee</h2>
          <p>{service.longDesc}</p>
          <h2>Orchard &amp; Specialty Pruning</h2>
          <p>
            Brian has a particular passion for orchard work — the careful, species-specific
            pruning that keeps apple, pear, cherry, and other fruit trees productive for decades.
            This is slow, deliberate work that most tree services don&rsquo;t offer. We do.
          </p>
          <h2>When to Prune in Wisconsin</h2>
          <p>
            Most deciduous trees are best pruned in late winter (February–March) while dormant.
            Oaks should only be pruned October–March to prevent oak wilt. Spring-flowering shrubs
            are pruned right after bloom. Brian will advise on the optimal timing for your specific trees.
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
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/about/" className="text-brand-green hover:underline text-sm">About Brian</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { serviceSchema, faqSchema } from '@/lib/schema'

interface ServiceHubTemplateProps {
  slug: string
  h1: string
  heroSub: string
  heroImage: string
  serviceType: string
  priceRange: string
  ctaLabel: string
  tableTitle: string
  tableHeaders: [string, string]
  tableRows: [string, string][]
  related: { href: string; label: string }[]
  /** Optional bolded key answer rendered as the first body paragraph, before longDesc. */
  keyFact?: string
  children: React.ReactNode
}

/** Hub page layout shared by the newer service pages: hero → table (BERT) → prose → FAQ → related links. */
export function ServiceHubTemplate({
  slug,
  h1,
  heroSub,
  heroImage,
  serviceType,
  priceRange,
  ctaLabel,
  tableTitle,
  tableHeaders,
  tableRows,
  related,
  keyFact,
  children,
}: ServiceHubTemplateProps) {
  const service = getServiceBySlug(slug)!
  const url = `https://urbanloggers.org/${slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(service.name, service.shortDesc, url, serviceType, priceRange)),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(service.faqs)) }} />

      {/* Hero */}
      <section className="relative text-white py-14 px-4 min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImage}')` }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{h1}</h1>
          <p className="text-xl text-green-100 mb-8">{heroSub}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* Summary table — BERT optimization */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">{tableTitle}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">{tableHeaders[0]}</th>
                  <th className="text-left px-4 py-3 font-semibold">{tableHeaders[1]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableRows.map(([a, b]) => (
                  <tr key={a} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">{a}</td>
                    <td className="px-4 py-3 text-gray-700">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto prose-brand">
          {keyFact && (
            <p>
              <strong>{keyFact}</strong>
            </p>
          )}
          <p>{service.longDesc}</p>
          {children}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal mb-2 faq-question">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links — 1 up + 2-3 across */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Related services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            {related.map((r) => (
              <Link key={r.href} href={r.href} className="text-brand-green hover:underline text-sm">
                {r.label}
              </Link>
            ))}
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Get a Quote</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

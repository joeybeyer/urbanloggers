import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getServiceBySlug } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Emergency Tree Service Milwaukee, WI | 24/7 Storm Response | Urban Loggers LLC',
  'Fallen tree on your home? Storm damage in Milwaukee? Urban Loggers LLC responds 24/7. Call (414) 514-0750 now for emergency tree removal.',
  '/emergency-tree-service/'
)

export default function EmergencyTreeServicePage() {
  const service = getServiceBySlug('emergency-tree-service')!
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Emergency Tree Service', item: 'https://urbanloggers.org/emergency-tree-service/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(service.name, service.shortDesc, 'https://urbanloggers.org/emergency-tree-service/', '24/7 Emergency Tree Removal', '$$-$$$')
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

      {/* Emergency hero — phone CTA above fold */}
      <section className="bg-red-700 text-white py-14 px-4">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-4">🚨</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            24/7 Emergency Tree Service in Milwaukee
          </h1>
          <p className="text-xl text-red-100 mb-8">
            Fallen tree on your home? Hazardous limb over your driveway? We respond now.
          </p>
          <PhoneButton size="lg" label="Call (414) 514-0750 Now" className="bg-white !text-red-700 hover:bg-red-50" />
          <p className="mt-4 text-red-200 text-sm">Available 24 hours, 7 days a week</p>
        </div>
      </section>

      {/* Quick reference table — BERT optimization */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service — At a Glance</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-red-700 text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Availability', '24/7 — 365 days a year'],
                  ['Response Time', '2–4 hours for urgent situations'],
                  ['Service Area', 'Greater Milwaukee, WI'],
                  ['Insurance Docs', 'Yes — we provide for your claim'],
                  ['Power Line Trees', 'We coordinate with We Energies'],
                  ['Phone', '(414) 514-0750'],
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
          <h2>What We Handle in an Emergency</h2>
          <p>{service.longDesc}</p>
          <ul>
            <li>Trees fallen on homes, garages, or vehicles</li>
            <li>Hazardous hanging limbs (widow-makers)</li>
            <li>Storm-damaged trees blocking roads or driveways</li>
            <li>Trees contacting power or utility lines (we coordinate with utilities)</li>
            <li>Root failures in saturated soil after heavy rain</li>
          </ul>
          <h2>Insurance Documentation</h2>
          <p>
            We provide itemized invoices and before/after documentation to support your homeowner&rsquo;s
            insurance claim. Most policies cover emergency removal when a tree strikes a structure.
            We&rsquo;ve worked with all major Wisconsin insurers.
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

      {/* CTA */}
      <section className="py-12 px-4 bg-red-700 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Don&rsquo;t Wait — Call Now</h2>
          <p className="text-red-100 mb-6">
            Every minute a damaged tree rests on your home risks further structural damage.
            Call Urban Loggers LLC for immediate response.
          </p>
          <PhoneButton size="lg" label="Call (414) 514-0750" className="bg-white !text-red-700 hover:bg-red-50" />
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
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">Milwaukee Service Area</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

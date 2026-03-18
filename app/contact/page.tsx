import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { QuoteForm } from '@/components/ui/QuoteForm'
import { COMPANY } from '@/data/company'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'Get a Free Tree Service Quote | Urban Loggers LLC Milwaukee',
  'Request a free tree removal, trimming, or stump grinding quote in Greater Milwaukee. Call (414) 514-0750 or submit online — Brian responds within 24 hours.',
  '/contact/'
)

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Contact', item: 'https://urbanloggers.org/contact/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      {/* Hero */}
      <section className="bg-brand-green text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get a Free Quote</h1>
          <p className="text-xl text-green-100 mb-6">
            Brian visits every job site in person before quoting. No surprises.
          </p>
          <PhoneButton size="lg" label={`Call ${COMPANY.phone}`} />
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6">Request a Quote Online</h2>
            <QuoteForm />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-lg text-charcoal mb-4">Contact Directly</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <a href={COMPANY.phoneHref} className="text-brand-green font-semibold text-lg hover:underline">
                    {COMPANY.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${COMPANY.email}`} className="text-brand-green hover:underline text-sm">
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Service Area</p>
                  <p className="text-sm text-gray-700">{COMPANY.address.full}</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-green text-white rounded-xl p-6">
              <h3 className="font-semibold text-lg mb-3">Emergency? Call Now.</h3>
              <p className="text-green-100 text-sm mb-4">
                Storm damage, fallen trees on structures, hazardous limbs — we respond 24/7.
              </p>
              <PhoneButton size="md" className="w-full justify-center" />
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-charcoal mb-3">What to Expect</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {[
                  'Free on-site visit within 48 hours',
                  'Written, itemized quote',
                  'No-pressure estimate',
                  'Insurance docs provided',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-brand-green font-bold mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Our services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">Emergency Service</Link>
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">Milwaukee</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

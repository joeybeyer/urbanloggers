import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { getLocationBySlug } from '@/data/locations'
import { services } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Milwaukee, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Milwaukee, WI. 20+ years experience, fully insured. Free estimates. Call (414) 514-0750.',
    '/milwaukee/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Milwaukee',
    'geo.position': '43.0389;-87.9065',
    'ICBM': '43.0389, -87.9065',
  },
}

export default function MilwaukeePage() {
  const location = getLocationBySlug('milwaukee')!
  const lbSchema = localBusinessSchema('Milwaukee, WI', 'milwaukee')
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
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
            Tree Service in Milwaukee, WI
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

      {/* Services in Milwaukee */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Tree Services We Offer in Milwaukee
          </h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((s) => (
                  <tr key={s.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      <Link href={`/${s.slug}/`} className="text-brand-green hover:underline">
                        {s.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{s.shortDesc}</td>
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
          <h2>Milwaukee&rsquo;s Urban Forest</h2>
          <p>
            Milwaukee&rsquo;s urban tree canopy is a prized community asset — and a significant
            maintenance responsibility. From the towering elms of the East Side to the ash-lined
            streets of Bay View, the city&rsquo;s trees face ongoing challenges: emerald ash borer,
            storm damage, age-related decline, and development pressure.
          </p>
          <p>
            Urban Loggers LLC has worked Milwaukee&rsquo;s neighborhoods for over two decades.
            Brian Smith knows the common species, the permit requirements, the right pruning windows,
            and the local contractors who can handle related work when needed.
          </p>
          <h2>Serving All Milwaukee Neighborhoods</h2>
          <ul>
            <li>East Side, Brady Street, Riverwest</li>
            <li>Bay View, Walker&rsquo;s Point, Historic Third Ward</li>
            <li>Wauwatosa, West Allis, Greenfield (surrounding suburbs)</li>
            <li>North Shore: Shorewood, Whitefish Bay, Fox Point</li>
            <li>South Side: Mitchell Street, Bay View, St. Francis</li>
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Milwaukee Tree Service — FAQ
          </h2>
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

      {/* Nearby cities */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Nearby Service Areas</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/wauwatosa/', label: 'Wauwatosa' },
              { href: '/west-allis/', label: 'West Allis' },
              { href: '/greenfield/', label: 'Greenfield' },
              { href: '/shorewood/', label: 'Shorewood' },
            ].map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="bg-warm-white border border-gray-200 text-brand-green px-4 py-2 rounded-md hover:bg-brand-green hover:text-white transition-colors text-sm font-medium"
              >
                {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Related pages:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">Emergency Service</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Contact</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

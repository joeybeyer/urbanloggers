import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { services } from '@/data/services'
import type { Location } from '@/data/locations'

interface CityPageTemplateProps {
  location: Location
  schemas: object[]
}

export function CityPageTemplate({ location, schemas }: CityPageTemplateProps) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-brand-green text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-green-200 text-sm font-medium mb-2 uppercase tracking-wide">
            {location.county}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Tree Service in {location.name}, WI
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

      {/* Services targeting this city */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Tree Services in {location.name}
          </h2>
          <p className="text-gray-600 mb-6">
            Urban Loggers LLC provides all of the following services throughout {location.name} and {location.county}.
          </p>

          {/* Summary table — BERT optimization */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">What&rsquo;s Included</th>
                  <th className="text-left px-4 py-3 font-semibold">Learn More</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {services.map((s) => (
                  <tr key={s.slug} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-charcoal">
                      {s.icon} {s.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-sm">{s.shortDesc}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/${s.slug}/`}
                        className="text-brand-green hover:underline text-sm font-medium"
                      >
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className="group bg-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green transition-all duration-200"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="text-lg font-semibold text-charcoal mb-1 group-hover:text-brand-green transition-colors">
                  {s.name} in {location.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            {location.name} Tree Service — FAQ
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq) => (
              <div key={faq.question} className="bg-warm-white rounded-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Find Urban Loggers LLC</h2>
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d885448.0302412213!2d-87.8306425!3d43.04447795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880516dbeab8a99f%3A0x1874332308ed51c8!2sUrban%20Loggers%20LLC!5e1!3m2!1sen!2sus!4v1773871772090!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Urban Loggers LLC serving ${location.name}, WI`}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-brand-green text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">
            Ready for a Free Estimate in {location.name}?
          </h2>
          <p className="text-green-100 mb-6">
            Brian visits every job site in person before quoting. No pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Related pages:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">Milwaukee</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">Emergency Service</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Get a Quote</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

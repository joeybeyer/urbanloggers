import Link from 'next/link'
import { locations } from '@/data/locations'

export function ServiceArea() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Serving Greater Milwaukee
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Urban Loggers LLC provides professional tree service throughout Milwaukee County
              and surrounding communities. From the urban lots of the East Side to the
              wooded suburbs of Shorewood and beyond, we cover it all.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}/`}
                  className="flex items-center gap-2 text-brand-green hover:text-brand-green-dark font-medium transition-colors"
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {loc.name}
                </Link>
              ))}
              <span className="text-gray-500 text-sm col-span-2 mt-2">
                + Surrounding Milwaukee County communities
              </span>
            </div>
          </div>

          <div className="bg-brand-green rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready for a Free Quote?</h3>
            <p className="mb-6 text-green-100">
              Brian personally visits every job site before quoting. No pressure, no obligation.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Free on-site estimates',
                'Usually scheduled within 48 hours',
                'Written, itemized quotes',
                'Insurance documentation provided',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-6 py-3 rounded-md hover:bg-green-50 transition-colors"
            >
              Request Your Free Quote
            </Link>
          </div>
        </div>

        {/* Google Business Profile — service-area map (ties the site to the verified GBP) */}
        <div className="mt-12">
          <div className="relative w-full overflow-hidden rounded-xl shadow-sm" style={{ paddingTop: '42%' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1106081.0740005595!2d-87.8306425!3d43.04447795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880516dbeab8a99f%3A0x1874332308ed51c8!2sUrban%20Loggers%20LLC!5e1!3m2!1sen!2sus!4v1782786060386!5m2!1sen!2sus"
              title="Urban Loggers LLC service area map — Greater Milwaukee"
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

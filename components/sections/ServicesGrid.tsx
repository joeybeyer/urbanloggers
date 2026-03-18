import Link from 'next/link'
import { services } from '@/data/services'

export function ServicesGrid() {
  return (
    <section className="py-16 px-4 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-3">
          Tree Services in Greater Milwaukee
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          From emergency storm response to custom log milling — we handle every aspect of tree care.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}/`}
              className="group bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green transition-all duration-200"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-brand-green transition-colors">
                {service.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.shortDesc}</p>
              <span className="inline-block mt-4 text-brand-green text-sm font-medium group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

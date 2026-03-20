import Link from 'next/link'
import { services } from '@/data/services'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { AnimatedCard } from '@/components/ui/AnimatedCard'

export function ServicesGrid() {
  return (
    <section className="py-16 px-4 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <p className="text-center text-sm font-semibold text-brand-green uppercase tracking-wider mb-2">Our Services</p>
          <h2 className="text-3xl font-bold text-center text-charcoal mb-3">
            Tree Services in Greater Milwaukee
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            From emergency storm response to custom log milling &mdash; we handle every aspect of tree care.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <AnimatedSection key={service.slug} delay={idx * 0.1}>
              <AnimatedCard className="h-full">
                <Link
                  href={`/${service.slug}/`}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green transition-all duration-200 h-full block"
                >
                  {service.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-charcoal mb-2 group-hover:text-brand-green transition-colors">
                      {service.icon} {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{service.shortDesc}</p>
                    <span className="inline-block mt-4 text-brand-green text-sm font-medium group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              </AnimatedCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

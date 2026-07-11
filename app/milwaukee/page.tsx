import type { Metadata } from 'next'
import Link from 'next/link'
import { services } from '@/data/services'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { PhoneButton } from '@/components/ui/PhoneButton'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Milwaukee, WI | Urban Loggers LLC',
    'Professional tree removal, trimming & stump grinding in Milwaukee, WI. 20+ years experience, fully insured. Free estimates. Call (414) 240-4626.',
    '/milwaukee/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Milwaukee',
    'geo.position': '43.0389;-87.9065',
    'ICBM': '43.0389, -87.9065',
  },
}

const faqs = [
  {
    question: 'Do I need a permit to remove a tree in Milwaukee?',
    answer:
      'Milwaukee requires permits for many removals on city right-of-way trees, and the city also regulates removals of larger trees on some properties. As a rule of thumb, if a tree is 12" DBH (diameter at breast height) or greater or is in the public terrace, you should call the city forestry office before removal. Urban Loggers can help you understand when a permit is required and handle the paperwork during your estimate.',
  },
  {
    question: 'How much does tree removal cost in Milwaukee?',
    answer:
      'Most Milwaukee tree removals range from $300 to $2,000+ depending on size, access, hazards, and whether a crane is needed. We provide on-site quotes with clear options, including disposal or log milling, so you can choose the best fit for your budget.',
  },
  {
    question: 'Is emerald ash borer still affecting Milwaukee trees?',
    answer:
      'Yes. Emerald ash borer continues to impact ash trees across Milwaukee County. If you have an ash in East Side, Riverwest, or Shorewood, it should be inspected annually. We can advise whether pruning, treatment, or removal is the safest path.',
  },
  {
    question: 'When is the best time to prune trees in Milwaukee?',
    answer:
      'Late winter through early spring is ideal for most pruning because it minimizes stress and reduces disease pressure. However, storm-damaged or hazardous limbs should be addressed immediately, regardless of season.',
  },
  {
    question: 'Do you offer emergency tree service in Milwaukee 24/7?',
    answer:
      'Yes. Urban Loggers provides 24/7 emergency response for storm damage, fallen trees, and dangerous hanging limbs. We prioritize safety and can work with insurance documentation when needed.',
  },
  {
    question: 'Can you grind stumps after removal?',
    answer:
      'Absolutely. Stump grinding in Milwaukee typically ranges from $75 to $400 depending on size and access. We grind below grade to make replanting or landscaping easy.',
  },
  {
    question: 'What happens to the wood after a tree is removed?',
    answer:
      'You can choose full haul-away, firewood processing, or our unique log milling option. Our portable sawmill can turn valuable logs into custom lumber, a great option for oaks, maples, and other hardwoods common in Milwaukee.',
  },
  {
    question: 'Are you fully insured and experienced for city work?',
    answer:
      'Yes. Urban Loggers LLC has been serving Milwaukee since 2003 with 20+ years of experience. We are fully insured, and every estimate is handled by owner Brian Smith to ensure safety and clear communication.',
  },
  {
    question: 'Do you work in neighborhoods like Bay View and Wauwatosa (Tosa)?',
    answer:
      'We do. Our crews serve East Side, Bay View, Riverwest, Walker’s Point, Third Ward, Shorewood, Wauwatosa (Tosa), and the entire Milwaukee metro area.',
  },
]

// Real, verbatim 5-star Google reviews from the business's Google Business Profile.
const testimonials = [
  {
    name: 'Katy Peshman',
    quote:
      'The first meeting with Urban Loggers was not at all what I expected — no sales pitch, no extreme marketing. Once I got past that, they were extremely knowledgeable, easy to work with, and very reasonably priced. They made quick work of all the trees that needed to be removed and I would highly recommend them.',
  },
  {
    name: 'Mary Wacker',
    quote:
      'Urban Loggers are the best! After WE Energies left me with an enormous pile of debris, it was Urban Loggers to the rescue — they chipped the wood pile in a couple hours, leaving me with beautiful wood chips for landscaping. They go above and beyond.',
  },
  {
    name: 'Karen Sparapani',
    quote:
      'Brian came right away and got the fallen tree out of the fence, then gave me an estimate for a whole bunch of other work. They cleaned up beautifully and were well under the estimate. Took this city girl’s fear of the cost of tree removal away for good!',
  },
]

export default function MilwaukeePage() {
  const schemas = [
    localBusinessSchema('Milwaukee, WI', 'milwaukee'),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    ]),
  ]

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
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Milwaukee County Tree Experts
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Service Milwaukee, WI</h1>
            <p className="text-xl text-green-100 mb-6">
              When you need dependable tree service Milwaukee homeowners trust, Urban Loggers LLC delivers safe, tidy, and
              honest work. We’ve served the Milwaukee area since 2003 with 20+ years of experience, fully insured crews,
              and owner-led estimates from Brian Smith. From emergency storm cleanup to precision pruning, our goal is to
              protect your property and keep Milwaukee’s urban canopy thriving.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PhoneButton size="lg" />
              <Link
                href="/contact/"
                className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
              >
                Free Estimate
              </Link>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-2">
            <img
              src="/images/tree-service-milwaukee-hero.jpg"
              alt="Tree service Milwaukee crew performing safe removal"
              className="rounded-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Local Tree Care Built for Milwaukee Weather
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Milwaukee’s lakefront winds, heavy winter snow, and summer storms can be rough on trees. Whether you live in
            the East Side, Bay View, Riverwest, Walker’s Point, Third Ward, Shorewood, or Tosa, you need a partner who
            understands local conditions, city regulations, and the unique mix of hardwoods and evergreens across the
            metro. Urban Loggers LLC provides professional tree removal, trimming, stump grinding, emergency response,
            and log milling that helps you get the best possible outcome from every job.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our team focuses on safety, communication, and clean job sites. We show up on time, explain the plan, and
            make sure you know what to expect before any cuts are made. If a tree can be saved through structural
            pruning, we’ll tell you. If removal is the safest option, we’ll handle it with the right equipment and
            careful protection of your home, driveway, and landscaping.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-2">Tree Services in Milwaukee</h2>
          <p className="text-gray-600 mb-6">
            We provide comprehensive tree care for residential and commercial properties throughout Milwaukee County.
            Below is a quick overview of our core services.
          </p>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Service</th>
                  <th className="text-left px-4 py-3 font-semibold">What’s Included</th>
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
                      <Link href={`/${s.slug}/`} className="text-brand-green hover:underline text-sm font-medium">
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className="group bg-warm-white rounded-lg p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-brand-green transition-all duration-200"
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="text-lg font-semibold text-charcoal mb-1 group-hover:text-brand-green transition-colors">
                  {s.name} in Milwaukee
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.shortDesc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EMQ H2 */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Why Urban Loggers is the Tree Service Milwaukee Homeowners Recommend
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are a local, owner-operated company with deep Milwaukee roots. Brian Smith personally visits every job
            site to evaluate tree health, access points, and any risks to nearby structures. This hands-on approach lets
            us deliver clear options, honest pricing, and results that keep your property safe.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From historic homes in the Third Ward to family yards in Shorewood and Wauwatosa, we tailor every plan to the
            property’s layout, tree species, and the goals of the homeowner. You’ll get professional equipment, careful
            rigging, and a clean finish every time.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">How Our Milwaukee Tree Service Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-warm-white p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-charcoal mb-2">1) On-site evaluation</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We inspect tree health, targets, and access. You’ll receive a clear explanation of the safest approach,
                including pruning options or full removal, plus any city permit considerations for trees over 12" DBH or
                right-of-way locations.
              </p>
            </div>
            <div className="bg-warm-white p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-charcoal mb-2">2) Transparent estimate</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                We provide a detailed quote with optional add-ons like stump grinding, haul-away, or log milling. No
                pressure, no surprises—just straightforward pricing and a schedule that fits your needs.
              </p>
            </div>
            <div className="bg-warm-white p-6 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-charcoal mb-2">3) Safe, tidy completion</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Our insured crew handles all cutting, rigging, and cleanup. We protect lawns, driveways, and structures,
                then leave the site clean so you can enjoy the improved safety and curb appeal right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Milwaukee Tree Service Pricing & Cost Guide</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Every tree is different, so we quote each project based on size, access, hazards, and the services required.
            The ranges below reflect typical Milwaukee jobs, but a quick on-site visit will give you an exact number.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-charcoal mb-2">Common price ranges</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>Tree removal: <strong>$300 – $2,000+</strong> depending on size, proximity to structures, and crane needs</li>
                <li>Tree trimming & pruning: <strong>$200 – $800</strong> based on crown size and access</li>
                <li>Stump grinding: <strong>$75 – $400</strong> based on diameter and root flare</li>
                <li>Emergency tree service: <strong>Varies</strong> based on urgency and complexity</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-charcoal mb-2">What affects the cost?</h3>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>Tree height and trunk diameter</li>
                <li>Condition (dead, storm-damaged, or leaning)</li>
                <li>Access constraints in tight Milwaukee neighborhoods</li>
                <li>Whether rigging, climbing, or crane support is required</li>
                <li>Optional services like log milling or full haul-away</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Milling */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">Portable Sawmill & Log Milling in Milwaukee</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Urban Loggers LLC is one of the few Milwaukee tree service companies offering on-site log milling. When a
              healthy hardwood must come down, we can turn that tree into custom lumber for shelves, tables, mantels, or
              future projects. It’s a sustainable option that preserves the character of your property and keeps the
              value of the wood in your hands.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our portable sawmill is perfect for oaks, maples, and other common Milwaukee species. Ask about milling
              during your estimate and we’ll advise whether your tree is a good candidate.
            </p>
          </div>
          <div className="bg-warm-white rounded-2xl p-2">
            <img
              src="/images/tree-service-milwaukee-milling.jpg"
              alt="Portable sawmill log milling in Milwaukee"
              className="rounded-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Neighborhoods We Serve Across Milwaukee</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We’re local, so we understand the access challenges of narrow alleys, mature tree lines, and historic homes.
            Our crews regularly work in the East Side, Bay View, Riverwest, Walker’s Point, Third Ward, Shorewood, and
            Wauwatosa (Tosa), plus the surrounding Milwaukee suburbs. Whether you need routine pruning or a high-risk
            removal, we show up with the right plan.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you’re unsure whether a tree is in the public right-of-way, we can help you confirm boundaries and guide
            you through the city’s forestry requirements. Our goal is to keep you compliant while protecting your home
            and your neighborhood’s canopy.
          </p>
        </div>
      </section>

      {/* Permits & pests */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Permits, Emerald Ash Borer, and Local Regulations</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Milwaukee’s forestry rules are designed to protect the city’s urban canopy. In many situations, trees over
            12" DBH or those in the public terrace require a permit before removal. This is especially common in older
            neighborhoods with mature boulevard trees. We can help you navigate these requirements so your project
            moves forward without delays.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The emerald ash borer continues to threaten ash trees across Milwaukee County. If you’re seeing canopy
            thinning, bark splitting, or woodpecker activity, schedule an inspection. In some cases, selective pruning
            and treatment can buy time; in others, proactive removal may be the safest and most cost-effective choice.
          </p>
        </div>
      </section>

      {/* Emergency */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">24/7 Emergency Tree Service in Milwaukee</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Storms off Lake Michigan can produce sudden wind damage, split trunks, and fallen limbs. Our emergency
            response team is on call 24/7 to clear hazards, stabilize damaged trees, and restore safety to your property.
            We act quickly, document the work for insurance needs, and keep you informed at every step.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If a tree is resting on a roof, power lines are involved, or a limb is hanging over a driveway, call us
            immediately at (414) 240-4626. We will prioritize safety and coordinate with utility providers when required.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Milwaukee Reviews for Urban Loggers LLC</h2>
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-warm-white rounded-lg p-6 border border-gray-100">
                <p className="text-gray-700 leading-relaxed">“{t.quote}”</p>
                <p className="text-sm font-semibold text-charcoal mt-3">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Milwaukee Tree Service — FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 border border-gray-100">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 bg-white">
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
              title="Urban Loggers LLC serving Milwaukee, WI"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-brand-green text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Ready for a Free Estimate in Milwaukee?</h2>
          <p className="text-green-100 mb-6">
            Call Urban Loggers LLC today for a clear, professional quote. Brian visits every job site in person before
            pricing, and we never recommend work you don’t need.
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
            <Link href="/" className="text-brand-green hover:underline text-sm">
              ← Home
            </Link>
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">
              Milwaukee
            </Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">
              Tree Removal
            </Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">
              Emergency Service
            </Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">
              Get a Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { services } from '@/data/services'
import { locations, type Location } from '@/data/locations'
import { localContext } from '@/data/local-context'
import { ExtLink } from '@/components/ui/ExtLink'
import { GbpMap } from '@/components/ui/GbpMap'
import { napForProfile, type GbpProfile } from '@/lib/gbp'

interface CityPageTemplateProps {
  location: Location
  schemas: object[]
  /**
   * The GBP that serves this city. Only pass it for a city that has its OWN profile
   * (menomonee-falls); every other city is served by the service-area business.
   */
  gbpProfile?: GbpProfile
}

export function CityPageTemplate({ location, schemas, gbpProfile }: CityPageTemplateProps) {
  // The NAP this page may publish — its own profile's, or the service-area business's (no street).
  const nap = napForProfile(gbpProfile)
  // 2-3 ACROSS: same-county sibling cities (hub-and-spoke silo linking)
  const siblings = locations
    .filter((l) => l.county === location.county && l.slug !== location.slug)
    .slice(0, 3)
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
          {/*
            `intro` holds two paragraphs separated by a blank line. Rendering the whole string in
            ONE <p> collapsed the newline, making the opening paragraph 87-119 words on every city
            page against the 75-word rule (tactics 04/11: the answer sits directly under the H1 and
            stays short). Split into real paragraphs so the first one IS the answer — no copy
            changes, and the second paragraph keeps its supporting detail.
          */}
          {location.intro
            .split(/\n\s*\n/)
            .map((para) => para.trim())
            .filter(Boolean)
            .map((para, i) => (
              <p key={i} className={`text-xl text-green-100 ${i === 0 ? 'mb-4' : 'mb-8'}`}>
                {para}
              </p>
            ))}
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

      {/* Quick cost guide — AIO/PAA extractable, city-local */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-3">
            What Tree Work Typically Costs
          </h2>
          <p className="faq-answer text-gray-700 mb-4">
            Tree service in {location.name}, WI typically costs <strong>$300 to $2,000+ per project</strong> — small
            trimming jobs start around $100–$500 and full removals run $700–$2,500+ depending on size,
            location, and access. Urban Loggers provides free, no-obligation on-site estimates.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
            <li className="bg-warm-white rounded-md px-4 py-2"><strong>Tree removal:</strong> $300–$2,000+</li>
            <li className="bg-warm-white rounded-md px-4 py-2"><strong>Stump grinding:</strong> $75–$400 per stump</li>
            <li className="bg-warm-white rounded-md px-4 py-2"><strong>Trimming &amp; pruning:</strong> $100–$500 per tree</li>
            <li className="bg-warm-white rounded-md px-4 py-2"><strong>Emergency / storm:</strong> 24/7, priced on scope</li>
          </ul>
        </div>
      </section>

      {/* Services targeting this city */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-2">
            Tree Service in {location.name}, WI
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

      {/* How it works — AIO "how" framing */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            How a Job Works, Start to Finish
          </h2>
          <ol className="space-y-3 text-gray-700">
            <li><strong>1. Free on-site assessment</strong> — Brian visits your property, usually within 48 hours.</li>
            <li><strong>2. Written, itemized quote</strong> — clear pricing, no pressure, no hidden fees.</li>
            <li><strong>3. Insurance documentation</strong> — provided for your records or claims if needed.</li>
            <li><strong>4. Clean, professional work</strong> — full debris cleanup and a post-job walkthrough.</li>
          </ol>
        </div>
      </section>

      {/* Local context + cited sources — unique per city, followed in-sentence links */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <h2>Wisconsin Tree Health and Safety Notes</h2>
          {localContext[location.slug] && <p>{localContext[location.slug]}</p>}
          <p>
            Most tree trouble here follows a few patterns. Ash trees across {location.county} are still being lost to
            the emerald ash borer, which the{' '}
            <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">Wisconsin DNR</ExtLink> tracks
            statewide, and the{' '}
            <ExtLink href="https://www.aphis.usda.gov/">USDA APHIS</ExtLink> runs the federal response. Oaks are
            pruned only in the dormant season to avoid spreading oak wilt, a disease the{' '}
            <ExtLink href="https://www.fs.usda.gov/">U.S. Forest Service</ExtLink> also studies.
          </p>
          <p>
            When we prune, we follow the standards and guidance published by the{' '}
            <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>, and homeowners
            can read plain-language tree care advice at{' '}
            <ExtLink href="https://www.treesaregood.org/">Trees Are Good</ExtLink>. If a storm is forecast, check the{' '}
            <ExtLink href="https://www.weather.gov/mkx/">National Weather Service Milwaukee/Sullivan office</ExtLink>,
            and never touch a tree in contact with a line: report it to{' '}
            <ExtLink href="https://www.we-energies.com/">We Energies</ExtLink>. For more on caring for the trees on your
            lot, <ExtLink href="https://extension.wisc.edu/">UW–Madison Extension</ExtLink> is a reliable local source.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">
            Common Questions From Homeowners
          </h2>
          <div className="space-y-4">
            {location.faqs.map((faq) => (
              <div key={faq.question} className="bg-warm-white rounded-lg p-6 border border-gray-100">
                <h3 className="faq-question font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="faq-answer text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Where to Find Us</h2>

          {/*
            L1: a page that has its OWN Google Business Profile must carry that profile's street
            address, phone and opening hours as VISIBLE text — not only in schema — and must show
            no other profile's. Cities served by the service-area business render nothing here:
            that listing hides its address, so publishing one would contradict the profile.
          */}
          {nap.address && (
            <div
              className="mb-6 rounded-xl border border-gray-200 bg-white p-5 text-sm"
              itemScope
              itemType="https://schema.org/LocalBusiness"
            >
              <meta itemProp="name" content="Urban Loggers LLC" />
              <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-[8rem_1fr]">
                <dt className="font-semibold text-charcoal">Address</dt>
                <dd
                  className="text-gray-700"
                  itemProp="address"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <span itemProp="streetAddress">{nap.address.street}</span>,{' '}
                  <span itemProp="addressLocality">{nap.address.city}</span>,{' '}
                  <span itemProp="addressRegion">{nap.address.state}</span>{' '}
                  <span itemProp="postalCode">{nap.address.zip}</span>
                </dd>

                <dt className="font-semibold text-charcoal">Phone / Text</dt>
                <dd className="text-gray-700">
                  <a
                    href={nap.phoneHref}
                    className="font-medium text-brand-green"
                    itemProp="telephone"
                  >
                    {nap.phone}
                  </a>{' '}
                  · text a photo for a quote
                </dd>

                <dt className="font-semibold text-charcoal">Hours</dt>
                <dd className="text-gray-700">Open 24 hours · owner-led estimates by Brian Smith</dd>
              </dl>
            </div>
          )}

          <GbpMap
            profile={gbpProfile}
            serving={`${location.name}, WI`}
            height={400}
            className="shadow-sm"
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-brand-green text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">
            Ready for a Free Estimate?
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
          {siblings.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-3">Tree service in nearby {location.county} cities:</p>
              <div className="flex flex-wrap gap-3 mb-5">
                {siblings.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className="text-brand-green hover:underline text-sm">
                    {s.name} Tree Service
                  </Link>
                ))}
              </div>
            </>
          )}
          <p className="text-sm text-gray-500 mb-3">Explore our services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/tree-trimming-pruning/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/emergency-tree-service/" className="text-brand-green hover:underline text-sm">Emergency Service</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Get a Quote</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

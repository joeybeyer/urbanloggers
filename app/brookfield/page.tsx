import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { TextButton } from '@/components/ui/TextButton'
import { COMPANY } from '@/data/company'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Service Brookfield, WI | Urban Loggers LLC',
    'Tree removal, trimming, stump grinding & log milling in Brookfield, WI. Local crew based in Brookfield, fully insured, owner-led estimates. Call (414) 240-4626 or text a photo for a quote.',
    '/brookfield/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Brookfield',
    'geo.position': '43.0606;-88.1065',
    'ICBM': '43.0606, -88.1065',
  },
}

// Brookfield is Urban Loggers' home base (17000 W North Ave) — the primary silo. FAQs are Brookfield-specific
// so this page owns its own cluster and does not overlap the Milwaukee page's terms.
const faqs = [
  {
    question: 'How much does tree removal cost in Brookfield?',
    answer:
      'Most Brookfield tree removals run $300 to $2,000+ depending on the tree’s size, access around the home, and whether a crane is needed. Large, mature oaks and maples common in older Elmbrook subdivisions sit at the higher end. Urban Loggers gives a written, itemized on-site quote before any work begins — no hidden fees.',
  },
  {
    question: 'Do I need a permit to remove a tree in Brookfield?',
    answer:
      'The City of Brookfield regulates trees in the public right-of-way and terrace, and some removals near wetlands or the Fox River corridor require review. Trees fully on your private property are usually your call, but it is worth confirming before removal. Because we are based in Brookfield, we can advise you on local requirements during the estimate.',
  },
  {
    question: 'Is emerald ash borer a problem in Brookfield?',
    answer:
      'Yes. Emerald ash borer is established across Waukesha County, and untreated ash trees in Brookfield neighborhoods are declining and becoming brittle. If you have an ash on your property, it should be inspected annually — we will tell you honestly whether treatment, pruning, or removal is the safest path.',
  },
  {
    question: 'Do you offer 24/7 emergency tree service in Brookfield?',
    answer:
      'Yes. We provide 24/7 emergency response for storm damage, fallen trees, and hanging limbs throughout Brookfield and the surrounding Waukesha County area. We prioritize safety and can provide documentation for insurance claims.',
  },
  {
    question: 'Can you grind the stump after removal in Brookfield?',
    answer:
      'Absolutely. Stump grinding in Brookfield typically runs $75 to $400 depending on size and access. We grind below grade so you can replant, sod, or landscape cleanly afterward.',
  },
  {
    question: 'What do you do with the wood after removal?',
    answer:
      'You choose: full haul-away, firewood processing, or our portable log-milling service. For valuable Brookfield hardwoods — mature oak, walnut, and maple — we can mill the logs into custom lumber and slabs instead of hauling them to the chipper.',
  },
]

export default function BrookfieldPage() {
  const schemas = [
    // This page is siloed to the verified Brookfield GMB (CID 6929671209341908664), not the main service-area listing.
    localBusinessSchema('Brookfield, WI', 'brookfield', 'https://www.google.com/maps?cid=6929671209341908664'),
    faqSchema(faqs),
    breadcrumbSchema([
      { name: 'Home', item: 'https://urbanloggers.org/' },
      { name: 'Brookfield', item: 'https://urbanloggers.org/brookfield/' },
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
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-4">
              <span className="text-yellow-300">★★★★★</span>
              <span className="text-sm font-semibold">
                Rated {COMPANY.rating} · {COMPANY.reviewCount}+ Google reviews
              </span>
            </div>
            <p className="text-green-200 text-sm font-medium mb-2 uppercase tracking-wide">
              Based in Brookfield · Waukesha County
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Service Brookfield, WI</h1>
            <p className="text-xl text-green-100 mb-6">
              Urban Loggers LLC is a Brookfield-based tree service at 17000 W North Ave, serving Elmbrook and
              the surrounding Waukesha County area. Owner Brian Smith personally quotes every job — safe removals,
              precision trimming, stump grinding, 24/7 emergency response, and on-site log milling. Fully insured,
              honest assessments, and a spotless cleanup on every visit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PhoneButton size="lg" />
              <TextButton size="lg" label="Text a Photo" />
            </div>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-green-100">
              <span>✓ Fully insured</span>
              <span>✓ 20+ years</span>
              <span>✓ 24/7 emergency</span>
              <span>✓ Free estimates</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-2xl p-2">
            <img
              src="/images/tree-service-milwaukee-hero.jpg"
              alt="Urban Loggers crew performing tree service in Brookfield, WI"
              className="rounded-xl w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Answer-first summary + quick facts (BERT zone: table before prose) */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-lg text-gray-800 leading-relaxed mb-6">
            <strong>Tree service in Brookfield, WI</strong> — Urban Loggers LLC is a locally based, fully insured
            crew handling tree removal, trimming, stump grinding, storm cleanup, and log milling across Brookfield
            and Waukesha County. Most removals run $300–$2,000+ with a written on-site quote before work begins.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white"><td className="p-3 font-semibold w-1/3">Location</td><td className="p-3">17000 W North Ave, Brookfield, WI 53005</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Phone / Text</td><td className="p-3"><a href={COMPANY.phoneHref} className="text-brand-green font-medium">{COMPANY.phone}</a> · text a photo for a quote</td></tr>
                <tr className="bg-white"><td className="p-3 font-semibold">Services</td><td className="p-3">Tree removal · trimming &amp; pruning · stump grinding · emergency (24/7) · log milling</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Typical removal cost</td><td className="p-3">$300–$2,000+ (size, access, crane)</td></tr>
                <tr className="bg-white"><td className="p-3 font-semibold">Stump grinding</td><td className="p-3">$75–$400</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Rating</td><td className="p-3">{COMPANY.rating}★ · {COMPANY.reviewCount}+ Google reviews · fully insured</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Local intro */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-4">Tree Care Built for Brookfield&rsquo;s Mature Canopy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Brookfield&rsquo;s established neighborhoods — Elmbrook, Ruby Isle, the areas around Fox Brook Park, Wirth
            Park, and the Bluemound Road corridor — are full of large, mature oaks, maples, and ash. Those big
            hardwoods are beautiful, but they need experienced care: heavy limbs over roofs and driveways, ash
            declining from emerald ash borer, and storm-loosened branches after Wisconsin&rsquo;s freeze-thaw winters
            and summer wind events. Because we&rsquo;re based right here in Brookfield, we know the property styles,
            the tree species, and the local conditions.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Every job starts with owner Brian Smith walking the property in person, giving you a straight assessment
            and a written quote — no pressure and no upsell on work you don&rsquo;t need. For prized hardwoods, we can
            even mill the logs into custom lumber on-site instead of chipping them.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Our Tree Services in Brookfield</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { href: '/tree-removal/', title: 'Tree Removal', desc: 'Safe removal of hazardous, dead, or overgrown trees — including large hardwoods near homes.' },
              { href: '/tree-trimming-pruning/', title: 'Tree Trimming & Pruning', desc: 'Structural pruning and canopy thinning to protect your home and keep trees healthy.' },
              { href: '/stump-grinding/', title: 'Stump Grinding', desc: 'Below-grade grinding so you can replant, sod, or landscape cleanly.' },
              { href: '/emergency-tree-service/', title: '24/7 Emergency Service', desc: 'Storm damage, fallen trees, and hanging limbs — rapid response, insurance docs available.' },
              { href: '/log-milling/', title: 'Log Milling', desc: 'Turn valuable Brookfield oak, walnut, and maple into custom slabs and lumber on-site.' },
              { href: '/contact/', title: 'Free On-Site Estimate', desc: 'Owner-led, written, itemized quote before any work begins.' },
            ].map((s) => (
              <Link key={s.href} href={s.href} className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-brand-green transition-colors">
                <h3 className="font-semibold text-charcoal mb-1">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Common Tree Service Questions in Brookfield</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="bg-warm-white border border-gray-200 rounded-lg p-5">
                <summary className="faq-question font-semibold text-charcoal cursor-pointer">{f.question}</summary>
                <p className="faq-answer text-gray-700 mt-3 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Map — the verified Brookfield GMB (this page only) */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Find Urban Loggers LLC in Brookfield</h2>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2915.043721436626!2d-88.1235279!3d43.061547999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880507432e635c89%3A0x602b233ffb1376b8!2sUrban%20Loggers%20LLC!5e0!3m2!1sen!2sus!4v1783799361027!5m2!1sen!2sus"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Urban Loggers LLC — 17000 W North Ave, Brookfield, WI"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-brand-green text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Ready for a Free Estimate in Brookfield?</h2>
          <p className="text-green-100 mb-6">Brian visits every job site in person before quoting. No pressure, no obligation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" className="!bg-white !text-brand-green" />
            <TextButton size="lg" label="Text a Photo" className="!border-white !text-white hover:!bg-white hover:!text-brand-green" />
          </div>
        </div>
      </section>
    </>
  )
}

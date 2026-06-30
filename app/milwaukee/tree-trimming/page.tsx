import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

const baseMetadata = buildMetadata(
  'Tree Trimming in Milwaukee, WI | Urban Loggers LLC',
  'Expert tree trimming in Milwaukee for crown thinning, deadwood removal, and structural pruning. Serving neighborhoods like Wauwatosa and the East Side. Call (414) 240-4626.',
  '/milwaukee/tree-trimming/'
)

export const metadata: Metadata = {
  ...baseMetadata,
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Milwaukee, WI',
    'geo.position': '43.0389;-87.9065',
    ICBM: '43.0389, -87.9065',
  },
}

const faqs = [
  {
    question: 'How often should trees be trimmed in Milwaukee?',
    answer:
      'Most mature trees benefit from trimming every 3–5 years, but fast-growing species like maples may need more frequent attention. We’ll recommend a schedule based on tree type, age, and site conditions.',
  },
  {
    question: 'Can trimming improve storm resistance?',
    answer:
      'Yes. Strategic crown thinning reduces wind resistance and removes weak or dead limbs that are most likely to fail during Milwaukee storms and heavy snow loads.',
  },
  {
    question: 'Do you offer pruning for young trees?',
    answer:
      'Absolutely. Structural pruning for young trees helps them develop strong branch architecture and prevents costly issues later. It’s a smart investment for new plantings in newer neighborhoods.',
  },
  {
    question: 'Will trimming harm my tree?',
    answer:
      'Proper trimming improves tree health. We follow industry standards and avoid topping, which can damage the tree. Our goal is to keep the canopy healthy, balanced, and safe.',
  },
]

export default function MilwaukeeTreeTrimmingPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Milwaukee', item: 'https://urbanloggers.org/milwaukee/' },
    { name: 'Tree Trimming', item: 'https://urbanloggers.org/milwaukee/tree-trimming/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Tree Trimming',
              'Professional tree trimming in Milwaukee, WI including crown thinning, deadwood removal, and pruning.',
              'https://urbanloggers.org/milwaukee/tree-trimming/',
              'Tree Trimming Service',
              '$$'
            )
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="relative text-white py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/trimming.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Trimming in Milwaukee, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Crown thinning, deadwood removal, and precision pruning for healthier, safer trees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Tree Trimming — Quick Facts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['Typical Cost', '$200–$800 depending on tree size and canopy density'],
                  ['Timeline', 'Most trims completed in a few hours to one day'],
                  ['What’s Included', 'Crown thinning, deadwood removal, structural pruning'],
                  ['Seasonal Timing', 'Winter and early spring are ideal, but we trim year-round'],
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

      {/* Content */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose-brand">
          <h2>Milwaukee Tree Trimming That Keeps Canopies Healthy</h2>
          <p>
            Milwaukee’s urban canopy is one of the city’s best assets, but those trees need regular
            care to stay strong. In neighborhoods like Wauwatosa, the East Side, and Washington
            Heights, mature trees overhang sidewalks, alleys, and power lines. Strategic trimming helps
            maintain clearance, reduces storm risk, and keeps your property looking sharp. Our trimming
            approach focuses on tree health — not just appearance — so your trees grow with a stable,
            balanced structure.
          </p>
          <p>
            We never “top” trees. Topping creates weak, fast-growing shoots that are more likely to
            fail and can shorten the life of the tree. Instead, we use crown thinning to reduce weight,
            crown raising to improve clearance, and deadwood removal to eliminate hazards. Each cut is
            made with a purpose, guided by the tree’s natural growth pattern and your goals for shade
            and aesthetics.
          </p>
          <p>
            Milwaukee’s weather — heavy snow, high winds off the lake, and summer storms — puts stress
            on branches. Removing dead or crossing limbs makes a big difference when gusts hit the
            canopy. Homeowners in Shorewood and Bay View often call us after a wind event, but proactive
            trimming can prevent those emergency calls altogether.
          </p>
          <h3>Why Professional Pruning Matters</h3>
          <p>
            A clean cut in the right place helps a tree seal over naturally. Poor cuts, especially
            flush cuts or stub cuts, invite decay and insect activity. Our team uses proper pruning
            techniques to protect the branch collar and maintain long-term tree health. That matters
            for older trees in historic neighborhoods like Brewers Hill, where homeowners want to
            preserve the canopy rather than remove it.
          </p>
          <p>
            Trimming also improves safety and visibility. Overgrown branches can block street lights,
            signage, or driveway sightlines — especially on tight residential streets. We can target
            those problem areas without stripping the canopy. If you have young trees in newer
            developments near the Menomonee River corridor, we can shape their growth early so they
            mature with strong structure and a balanced crown.
          </p>
          <h3>Our Process for Milwaukee Tree Trimming</h3>
          <p>
            We start with a walk-through to identify goals: reduce risk, improve aesthetics, add
            clearance, or all three. We’ll then recommend the right blend of crown thinning, deadwood
            removal, and structural pruning. Most trimming jobs are completed the same day, and we
            always include debris cleanup and haul-away so your yard is left clean.
          </p>
          <p>
            If the trimming reveals deeper issues like decay or a significant lean, we’ll explain the
            options clearly. Sometimes corrective pruning is enough; sometimes a removal plan is the
            safer long-term solution. Either way, you get honest guidance from a local crew that knows
            Milwaukee’s trees.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Tree Trimming FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-4">Schedule Tree Trimming in Milwaukee</h2>
          <p className="text-gray-700 mb-6">
            Keep your canopy healthy and your property safe. Call Urban Loggers LLC for a free
            trimming assessment.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Milwaukee services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Milwaukee services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/milwaukee/" className="text-brand-green hover:underline text-sm">← Milwaukee hub</Link>
            <Link href="/milwaukee/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/milwaukee/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/milwaukee/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/milwaukee/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Tree Trimming in Mount Pleasant, WI | Urban Loggers LLC',
    'Reliable tree trimming in Mount Pleasant, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 240-4626.',
    '/mount-pleasant/tree-trimming/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'Mount Pleasant',
  },
}

const faqs = [
  {
    "question": "Will trimming harm my tree?",
    "answer": "Not when it’s done correctly. We avoid topping and follow industry standards so the tree stays healthy and balanced."
  },
  {
    "question": "Do you offer structural pruning for young trees?",
    "answer": "Absolutely. Proper early pruning helps trees develop strong branch architecture and prevents costly issues later on."
  },
  {
    "question": "Can trimming reduce storm damage in Mount Pleasant?",
    "answer": "Yes. Crown thinning reduces wind resistance and removes weak or dead limbs that are most likely to fail during severe weather."
  },
  {
    "question": "How often should trees be trimmed in Mount Pleasant?",
    "answer": "Most mature trees benefit from trimming every 3–5 years, but fast-growing species may need more frequent attention. We’ll recommend a schedule based on tree type, age, and site conditions."
  }
]

export default function MountPleasantTreeTrimmingPage() {
  const crumbs = [
  {
    "name": "Home",
    "item": "https://urbanloggers.org/"
  },
  {
    "name": "Mount Pleasant",
    "item": "https://urbanloggers.org/mount-pleasant/"
  },
  {
    "name": "Tree Trimming",
    "item": "https://urbanloggers.org/mount-pleasant/tree-trimming/"
  }
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Tree Trimming',
              'Professional tree trimming including crown thinning, deadwood removal, and pruning. in Mount Pleasant, WI.',
              'https://urbanloggers.org/mount-pleasant/tree-trimming/',
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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tree Trimming in Mount Pleasant, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Crown thinning, deadwood removal, and precision pruning for healthier, safer canopies.
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
                {[["Typical Cost","$200–$800 depending on tree size and canopy density"],["Timeline","Most trims completed in a few hours to one day"],["What’s Included","Crown thinning, deadwood removal, structural pruning"],["Seasonal Timing","Winter and early spring are ideal, but we trim year-round"]].map(([label, value]) => (
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
          <h2>Mount Pleasant Tree Trimming Focused on Safety and Results</h2>
          <p>Trimming in Mount Pleasant isn’t about making trees look uniform—it’s about keeping them safe and structurally sound. Our pruning targets deadwood, crossing limbs, and heavy over-extended branches. That approach helps trees withstand high winds and heavy snow, which are common along the Gorney Park and Mount Pleasant Community Center and Highway 20 corridor corridor. It also prevents small issues from turning into costly removals later.</p>
          <p>Proper pruning protects tree health. We avoid topping and focus on crown thinning, deadwood removal, and structural pruning. These techniques help trees seal over wounds naturally and reduce the likelihood of future failure. That matters for long-term canopy health in Mount Pleasant neighborhoods where mature trees are a core part of the landscape. It also preserves shade coverage without over-stressing the canopy.</p>
          <h3>Why Mount Pleasant Homeowners Choose Urban Loggers</h3>
          <p>We tailor trimming to your goals—clearance over sidewalks, better light for gardens, or risk reduction before storm season. Every cut has a purpose, and we clean up thoroughly so your yard looks better when we leave than when we arrived.</p>
          <p>Seasonal trimming is especially helpful for trees that overhang roofs or driveways. By reducing weight in the right places, we decrease the chance of limb failure during the next heavy wind or snow event. This proactive step often saves money compared to emergency cleanup later.</p>
          <p>We can also improve light levels for lawns and gardens without stripping the canopy. Thoughtful pruning keeps shade where you want it and sunlight where you need it.</p>
          <h3>Local Considerations in Mount Pleasant</h3>
          <p>We can also set up ongoing maintenance plans for properties with multiple mature trees, helping Mount Pleasant homeowners stay ahead of seasonal risks. Consistent care keeps trees stronger year after year.</p>
          <p>Trimming schedules can also be influenced by local tree species. Some Mount Pleasant neighborhoods have a high concentration of maples and ashes, and those species benefit from more frequent deadwood removal. We’ll note any disease or stress patterns we see during the visit.</p>
          <h3>What to Expect During Your Tree Trimming</h3>
          <p>We also consider sightlines for intersections and driveways. In busier parts of Mount Pleasant, improved visibility can be just as important as canopy health. That extra clearance keeps pedestrians and drivers safer year-round.</p>
          <p>We start with a walkthrough to identify priorities and any problem limbs. Then we trim with the tree’s long-term structure in mind. The result is a safer canopy, better light, and a cleaner overall look.</p>
          <p>If trimming reveals deeper issues like decay or a severe lean, we’ll explain the options. You get straightforward guidance from a local crew that knows Mount Pleasant trees and property styles.</p>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Tree Trimming in Mount Pleasant?</h2>
          <p className="text-gray-700 mb-6">
            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related Mount Pleasant services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more Mount Pleasant services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/mount-pleasant/" className="text-brand-green hover:underline text-sm">← Mount Pleasant hub</Link>
            <Link href="/mount-pleasant/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/mount-pleasant/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/mount-pleasant/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/mount-pleasant/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/mount-pleasant/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

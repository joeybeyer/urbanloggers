import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { buildMetadata } from '@/lib/metadata'
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  ...buildMetadata(
    'Emergency Tree Service in New Berlin, WI | Urban Loggers LLC',
    'Reliable emergency tree service in New Berlin, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 514-0750.',
    '/new-berlin/emergency/'
  ),
  other: {
    'geo.region': 'US-WI',
    'geo.placename': 'New Berlin',
  },
}

const faqs = [
  {
    "question": "What counts as an emergency tree situation?",
    "answer": "Split trunks, hanging limbs over homes, and uprooted trees after storms are emergencies. If a tree is contacting power lines, keep clear and call immediately."
  },
  {
    "question": "How fast can you respond to storm damage in New Berlin?",
    "answer": "We prioritize active hazards and typically respond same-day or next-day depending on weather conditions and access."
  },
  {
    "question": "Can you do temporary stabilization before full removal?",
    "answer": "Yes. We can secure hazards first and return for full removal once the site is safe."
  },
  {
    "question": "Do you coordinate with insurance or city services?",
    "answer": "We can document damage with photos and provide clear invoices that help with insurance claims or municipal requirements."
  }
]

export default function NewBerlinEmergencyTreeServicePage() {
  const crumbs = [
  {
    "name": "Home",
    "item": "https://urbanloggers.org/"
  },
  {
    "name": "New Berlin",
    "item": "https://urbanloggers.org/new-berlin/"
  },
  {
    "name": "Emergency Tree Service",
    "item": "https://urbanloggers.org/new-berlin/emergency/"
  }
]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema(
              'Emergency Tree Service',
              'Emergency tree service for storm damage, hanging limbs, and urgent removals. in New Berlin, WI.',
              'https://urbanloggers.org/new-berlin/emergency/',
              'Emergency Tree Service Service',
              '$$$'
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/emergency.jpg')" }} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Emergency Tree Service in New Berlin, WI</h1>
          <p className="text-xl text-green-100 mb-8">
            Fast response for storm damage, hanging limbs, and hazardous trees after high winds.
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
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service — Quick Facts</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-brand-green text-white">
                  <th className="text-left px-4 py-3 font-semibold">Detail</th>
                  <th className="text-left px-4 py-3 font-semibold">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[["Response Window","Same-day or next-day for active hazards"],["Common Hazards","Split trunks, hanging limbs, uprooted trees"],["What’s Included","Site stabilization, hazard removal, debris cleanup"],["After-Hours","Available during severe weather events"]].map(([label, value]) => (
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
          <h2>New Berlin Emergency Tree Service Focused on Safety and Results</h2>
          <p>When a tree comes down or threatens a home in New Berlin, fast action matters. We prioritize active hazards, secure unstable limbs, and coordinate safe access. That’s especially important in neighborhoods like City Center, Regal Manors, National Parkway where trees sit close to homes, garages, and sidewalks.</p>
          <p>Safety is the priority. We set up a clear work zone, manage debris, and coordinate with utility providers if lines are involved. After the immediate hazard is removed, we can return for full cleanup or stump grinding so the property is completely restored.</p>
          <h3>Why New Berlin Homeowners Choose Urban Loggers</h3>
          <p>We understand that emergencies are stressful. Our team communicates clearly, documents the damage with photos if needed, and gives you a straightforward plan for next steps.</p>
          <p>We keep emergency equipment ready during storm season, including saws, rigging gear, and cleanup trailers. That preparation helps us respond quickly when multiple calls come in after a weather event.</p>
          <p>If the tree is still standing but unstable, we can reduce weight and remove hazards immediately, then schedule a full removal once conditions are safer.</p>
          <h3>Local Considerations in New Berlin</h3>
          <p>Our crews are trained to work safely around unstable trees and shifting limbs, which is critical during high-wind events in New Berlin.</p>
          <p>Emergency work often happens with limited access and unpredictable debris. We bring additional safety gear and take a methodical approach to stabilize hazards without causing more damage.</p>
          <h3>What to Expect During Your Emergency Tree Service</h3>
          <p>After the immediate danger is addressed, we can return for full removal or pruning so the property is fully restored and ready for the next storm season.</p>
          <p>After we secure the site, we’ll discuss whether you want full removal, trimming, or temporary stabilization. Our goal is to make your property safe quickly and then leave it in better shape than we found it.</p>
          <p>When storms hit New Berlin, we keep our schedule flexible to handle urgent calls. Save our number so you can reach us quickly if a tree becomes a hazard.</p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 px-4 bg-warm-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-charcoal mb-6">Emergency Tree Service FAQs</h2>
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
          <h2 className="text-3xl font-bold text-charcoal mb-4">Need Emergency Tree Service in New Berlin?</h2>
          <p className="text-gray-700 mb-6">
            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.
          </p>
          <PhoneButton size="lg" />
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related New Berlin services" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore more New Berlin services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/new-berlin/" className="text-brand-green hover:underline text-sm">← New Berlin hub</Link>
            <Link href="/new-berlin/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/new-berlin/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>
            <Link href="/new-berlin/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>
            <Link href="/new-berlin/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>
            <Link href="/new-berlin/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

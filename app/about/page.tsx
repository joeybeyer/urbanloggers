import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { COMPANY } from '@/data/company'
import { buildMetadata } from '@/lib/metadata'
import { personSchema, localBusinessSchema, breadcrumbSchema, organizationSchema } from '@/lib/schema'

export const metadata: Metadata = buildMetadata(
  'About Brian Smith | Urban Loggers LLC Milwaukee',
  "Meet Brian Smith — 20+ years of tree care experience in Greater Milwaukee. SAM registered, fully insured, and passionate about trees and sustainable milling.",
  '/about/'
)

export default function AboutPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'About', item: 'https://urbanloggers.org/about/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />

      {/* Hero */}
      <section className="bg-brand-green text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">About Urban Loggers LLC</h1>
          <p className="text-xl text-green-100">
            Brian Smith — Greater Milwaukee&rsquo;s tree service craftsman
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-warm-white">
        <div className="max-w-3xl mx-auto prose-brand">
          <h2>The Urban Loggers Story</h2>
          <p>
            Brian Smith didn&rsquo;t fall into tree work — he grew up in it. Raised around Greater
            Milwaukee, Brian spent his teens climbing trees and working alongside seasoned arborists
            who taught him that a tree is a living system, not just a liability. That perspective
            has guided every job he&rsquo;s taken on for over 20 years.
          </p>

          <h2>More Than Just Removal</h2>
          <p>
            Most tree services see a dead tree and reach for a chainsaw. Brian sees an opportunity.
            Urban Loggers LLC is one of the few Milwaukee-area companies that brings a portable
            sawmill to every applicable job — milling felled hardwoods into live-edge slabs,
            dimensional lumber, and custom beams that clients actually want to keep. It&rsquo;s
            sustainable, it&rsquo;s beautiful, and it turns a painful loss into something meaningful.
          </p>

          <h2>Orchard & Specialty Pruning</h2>
          <p>
            Brian has a particular passion for orchard work and specialty pruning — the kind of
            careful, species-specific shaping that keeps fruit trees productive and mature ornamentals
            structurally sound for decades. It&rsquo;s slower, more thoughtful work than bulk tree
            removal, and Brian wouldn&rsquo;t have it any other way.
          </p>

          <h2>Credentials & Insurance</h2>
          <ul>
            {COMPANY.credentials.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p>
            {COMPANY.name} carries full general liability and workers&rsquo; compensation insurance.
            We&rsquo;re SAM (System for Award Management) registered and can provide all documentation
            your insurance company or municipality requires.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-4">
            Ready to Work with Brian?
          </h2>
          <p className="text-gray-600 mb-6">
            Every job starts with a free on-site estimate. No pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-block bg-white border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white font-semibold px-8 py-4 rounded-md text-xl transition-colors duration-200"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <nav aria-label="Related pages" className="py-8 px-4 bg-warm-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Explore our services:</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/" className="text-brand-green hover:underline text-sm">← Home</Link>
            <Link href="/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>
            <Link href="/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>
            <Link href="/contact/" className="text-brand-green hover:underline text-sm">Contact</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

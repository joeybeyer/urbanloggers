import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { COMPANY } from '@/data/company'

export const metadata: Metadata = buildMetadata(
  'Licensed & Insured Tree Service | Urban Loggers LLC',
  'Urban Loggers LLC is a fully insured, licensed tree service in Brookfield & Greater Milwaukee. General liability + workers’ compensation coverage. Certificate of insurance available on request.',
  '/insurance/'
)

export default function InsurancePage() {
  return (
    <>
      <section className="bg-brand-green text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Licensed &amp; Fully Insured</h1>
          <p className="text-xl text-green-100">
            Hiring an uninsured tree service puts your property — and your wallet — at risk. Urban Loggers LLC
            carries the coverage that protects you on every job.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-warm-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-charcoal text-lg mb-2">General Liability Insurance</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Covers accidental property damage that can happen during removals and large-limb work — your home,
                fence, driveway, and landscaping are protected if the unexpected occurs.
              </p>
            </div>
            <div className="bg-warm-white border border-gray-200 rounded-xl p-6">
              <h2 className="font-bold text-charcoal text-lg mb-2">Workers&rsquo; Compensation</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                Tree work is dangerous. Workers&rsquo; comp means that if a crew member is injured on your property,
                you are not held liable — a critical protection many low-cost operators skip.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mb-10">
            <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden text-sm">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white"><td className="p-3 font-semibold w-1/3">Business</td><td className="p-3">{COMPANY.name}</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Location</td><td className="p-3">17000 W North Ave, Brookfield, WI 53005</td></tr>
                <tr className="bg-white"><td className="p-3 font-semibold">Coverage</td><td className="p-3">General liability + workers&rsquo; compensation</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Certificate of insurance</td><td className="p-3">Available on request before any work begins</td></tr>
                <tr className="bg-white"><td className="p-3 font-semibold">Experience</td><td className="p-3">20+ years · owner-led by Brian Smith</td></tr>
                <tr className="bg-gray-50"><td className="p-3 font-semibold">Reputation</td><td className="p-3">
                  <a href={COMPANY.social.google} target="_blank" rel="noopener noreferrer" className="text-brand-green font-medium">{COMPANY.rating}★ · {COMPANY.reviewCount}+ Google reviews</a>
                </td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-warm-white border border-gray-200 rounded-xl p-6 mb-10">
            <h2 className="font-bold text-charcoal text-lg mb-2">Need a certificate of insurance?</h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              We&rsquo;re happy to provide a current certificate of insurance (COI) — including for HOAs, property
              managers, and commercial clients — before your job starts. Just ask when you request your estimate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <PhoneButton />
              <Link href="/contact/" className="inline-flex items-center justify-center bg-white text-brand-green font-semibold px-6 py-3 rounded-md border border-brand-green hover:bg-green-50 transition-colors">
                Request COI with Your Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

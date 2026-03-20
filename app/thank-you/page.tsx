import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { COMPANY } from '@/data/company'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Thank You | Urban Loggers LLC Milwaukee',
  'Thanks for reaching out to Urban Loggers LLC. Brian will be in touch within 24 hours with your free tree service quote.',
  '/thank-you/'
)

export default function ThankYouPage() {
  return (
    <>
      <section className="bg-brand-green text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Thank You!</h1>
          <p className="text-xl text-green-100">
            Your quote request has been received. Brian will personally review your project and get back to you within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-charcoal mb-6">What Happens Next</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            <div>
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-charcoal mb-2">1. We Call You</h3>
              <p className="text-gray-600 text-sm">Brian will reach out within 24 hours to discuss your project and schedule an on-site visit.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-semibold text-charcoal mb-2">2. Free Estimate</h3>
              <p className="text-gray-600 text-sm">We visit your property, assess the job, and provide a clear, no-obligation quote.</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🌳</div>
              <h3 className="font-semibold text-charcoal mb-2">3. Get It Done</h3>
              <p className="text-gray-600 text-sm">Once approved, our crew handles everything — safe, fast, and professional.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <p className="text-gray-700 mb-2">Need something sooner? Call Brian directly:</p>
            <p className="text-2xl font-bold text-charcoal mb-4">{COMPANY.phone}</p>
            <PhoneButton size="lg" label="Call Now" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-charcoal text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/gallery/"
              className="px-6 py-3 bg-gray-100 text-charcoal rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

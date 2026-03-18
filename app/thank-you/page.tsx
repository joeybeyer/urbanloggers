import type { Metadata } from 'next'
import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { COMPANY } from '@/data/company'

export const metadata: Metadata = {
  title: 'Thank You | Urban Loggers LLC',
  description: 'Your quote request has been received. Brian will be in touch within 24 hours.',
  robots: { index: false, follow: false },
}

export default function ThankYouPage() {
  return (
    <>
      <section className="bg-charcoal text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Thank You!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your quote request has been received. Brian will review your project details and get back to you within 24 hours.
          </p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-6 mb-8 text-left max-w-md mx-auto">
            <h2 className="font-semibold text-lg mb-4">What happens next?</h2>
            <ol className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="bg-brand-green text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">1</span>
                <span>Brian reviews your request (within 24 hrs)</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-brand-green text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">2</span>
                <span>He&rsquo;ll call to schedule a free on-site visit</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-brand-green text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">3</span>
                <span>You receive a written, itemized quote</span>
              </li>
            </ol>
          </div>
          <p className="text-gray-400 mb-6">
            Need help sooner? Call Brian directly:
          </p>
          <PhoneButton size="lg" />
          <div className="mt-10 flex flex-wrap gap-4 justify-center text-sm">
            <Link href="/" className="text-brand-green-light hover:text-white transition-colors">
              ← Back to Home
            </Link>
            <Link href="/tree-removal/" className="text-brand-green-light hover:text-white transition-colors">
              Tree Removal
            </Link>
            <Link href="/log-milling/" className="text-brand-green-light hover:text-white transition-colors">
              Log Milling
            </Link>
            <Link href="/emergency-tree-service/" className="text-brand-green-light hover:text-white transition-colors">
              Emergency Service
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

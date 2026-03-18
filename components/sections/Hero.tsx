import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-brand-green-dark via-brand-green to-brand-green-light text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Milwaukee&rsquo;s Tree Service<br />
          <span className="text-green-200">Done Right</span>
        </h1>
        <p className="text-xl sm:text-2xl text-green-100 mb-8 max-w-2xl mx-auto">
          20+ years of expert tree removal, trimming, and emergency response.
          Fully insured. SAM registered. Brian Smith and crew.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <PhoneButton size="lg" />
          <Link
            href="/contact/"
            className="inline-block bg-white text-brand-green hover:bg-green-50 font-semibold px-8 py-4 rounded-md text-xl transition-colors duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
        <p className="mt-6 text-green-200 text-sm">
          Available 24/7 for emergencies &mdash; Greater Milwaukee &amp; surrounding areas
        </p>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'

export function Hero() {
  return (
    <section className="bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 lg:py-20">
          {/* Left — Copy */}
          <div className="text-white">
            {/* Kicker — bold social proof */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-white font-semibold text-sm sm:text-base">Trusted by 1,000+ Milwaukee Homeowners</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Milwaukee&rsquo;s Tree Service<br />
              <span className="text-brand-green-light">Done Right</span>
            </h1>

            {/* Description — ragged right */}
            <p className="text-lg sm:text-xl text-gray-300 mb-4 max-w-md leading-relaxed">
              Expert removal, trimming &amp; emergency response.
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-lg">
              Plus a portable sawmill that turns your<br className="hidden sm:inline" />
              felled trees into custom lumber.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <PhoneButton size="lg" />
              <Link
                href="/log-milling/"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 border-2 border-white/30"
              >
                See Our Custom Lumber
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span> SAM Registered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span> Licensed &amp; Insured
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span> 24/7 Emergency
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span> Free Estimates
              </span>
            </div>
          </div>

          {/* Right — Image in holder */}
          <div className="relative hidden lg:block">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="/images/hero.jpg"
                alt="Brian Smith, Urban Loggers LLC — Milwaukee tree service professional"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Mobile image — below headline */}
          <div className="lg:hidden rounded-xl overflow-hidden shadow-xl">
            <img
              src="/images/hero.jpg"
              alt="Brian Smith, Urban Loggers LLC — Milwaukee tree service professional"
              className="w-full h-64 object-cover object-top"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

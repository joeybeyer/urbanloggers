import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { COMPANY } from '@/data/company'

export function Hero() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[650px] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/75 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="max-w-2xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-white text-sm font-medium">5.0 Google Rating &middot; 20+ Years &middot; Fully Insured</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Milwaukee&rsquo;s Tree Service<br />
            <span className="text-green-300">Done Right</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
            Expert tree removal, trimming, and emergency response &mdash; plus a
            portable sawmill that turns your felled trees into custom lumber.
            Brian Smith and crew, serving Greater Milwaukee since 2003.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <PhoneButton size="lg" />
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200 border-2 border-white/30"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Trust signals row */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> Licensed &amp; Insured
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> 24/7 Emergency Service
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-green-400">✓</span> Free Estimates
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

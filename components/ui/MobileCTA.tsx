'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { COMPANY } from '@/data/company'

export function MobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-brand-green p-3 shadow-2xl">
          <a
            href={COMPANY.phoneHref}
            data-cta="mobile-call"
            className="flex items-center justify-center rounded-xl bg-white text-brand-green font-semibold py-3 text-sm shadow-md"
          >
            📞 Call
          </a>
          <a
            href={COMPANY.smsHref}
            data-cta="mobile-text-photo"
            className="flex items-center justify-center rounded-xl bg-white text-brand-green font-semibold py-3 text-sm shadow-md"
          >
            💬 Text Photo
          </a>
          <Link
            href="/contact/"
            data-cta="mobile-quote"
            className="flex items-center justify-center rounded-xl bg-white/15 text-white font-semibold py-3 text-sm border border-white/30"
          >
            📋 Quote
          </Link>
        </div>
      </div>
    </div>
  )
}

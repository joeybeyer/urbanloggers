import Link from 'next/link'
import Image from 'next/image'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.webp"
              alt="Urban Loggers LLC - Milwaukee Tree Service"
              width={240}
              height={153}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <Nav />

          {/* Mobile CTA */}
          <div className="flex md:hidden">
            <PhoneButton size="sm" label="Call Now" />
          </div>
        </div>
      </div>
    </header>
  )
}

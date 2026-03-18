import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-charcoal text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="text-xl font-bold text-white group-hover:text-green-300 transition-colors">
              Urban Loggers LLC
            </span>
            <span className="text-xs text-gray-400">Milwaukee Tree Service</span>
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

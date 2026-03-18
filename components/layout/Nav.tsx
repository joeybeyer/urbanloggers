import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'

const serviceLinks = [
  { href: '/tree-removal/', label: 'Tree Removal' },
  { href: '/tree-trimming-pruning/', label: 'Trimming & Pruning' },
  { href: '/stump-grinding/', label: 'Stump Grinding' },
  { href: '/emergency-tree-service/', label: 'Emergency Service' },
  { href: '/log-milling/', label: 'Log Milling' },
]

const cityLinks = [
  { href: '/milwaukee/', label: 'Milwaukee' },
  { href: '/wauwatosa/', label: 'Wauwatosa' },
  { href: '/west-allis/', label: 'West Allis' },
]

export function Nav() {
  return (
    <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
      {/* Services dropdown */}
      <div className="relative group">
        <button className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1 py-2">
          Services
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 hidden group-hover:block bg-white text-charcoal shadow-xl rounded-md py-2 w-52 z-50">
          {serviceLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-brand-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* City links */}
      {cityLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-gray-300 hover:text-white text-sm font-medium"
        >
          {link.label}
        </Link>
      ))}

      <Link href="/about/" className="text-gray-300 hover:text-white text-sm font-medium">
        About
      </Link>

      <PhoneButton size="sm" />
    </nav>
  )
}

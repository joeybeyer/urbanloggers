import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { TextButton } from '@/components/ui/TextButton'

const serviceLinks = [
  { href: '/tree-removal/', label: 'Tree Removal' },
  { href: '/tree-trimming-pruning/', label: 'Trimming & Pruning' },
  { href: '/stump-grinding/', label: 'Stump Grinding' },
  { href: '/emergency-tree-service/', label: 'Emergency Service' },
  { href: '/log-milling/', label: 'Log Milling' },
]

const locationGroups = [
  {
    county: 'Milwaukee County',
    cities: [
      { href: '/milwaukee/', label: 'Milwaukee' },
      { href: '/wauwatosa/', label: 'Wauwatosa' },
      { href: '/west-allis/', label: 'West Allis' },
      { href: '/greenfield/', label: 'Greenfield' },
      { href: '/south-milwaukee/', label: 'South Milwaukee' },
    ],
  },
  {
    county: 'Waukesha County',
    cities: [
      { href: '/waukesha/', label: 'Waukesha' },
      { href: '/brookfield/', label: 'Brookfield' },
      { href: '/new-berlin/', label: 'New Berlin' },
      { href: '/pewaukee/', label: 'Pewaukee' },
    ],
  },
  {
    county: 'Racine County',
    cities: [
      { href: '/racine/', label: 'Racine' },
      { href: '/mount-pleasant/', label: 'Mount Pleasant' },
    ],
  },
  {
    county: 'Ozaukee County',
    cities: [
      { href: '/mequon/', label: 'Mequon' },
      { href: '/cedarburg/', label: 'Cedarburg' },
      { href: '/port-washington/', label: 'Port Washington' },
    ],
  },
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

      {/* Locations dropdown */}
      <div className="relative group">
        <button className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1 py-2">
          Locations
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className="absolute top-full left-0 hidden group-hover:block bg-white text-charcoal shadow-xl rounded-md py-3 w-64 z-50">
          {locationGroups.map((group) => (
            <div key={group.county} className="mb-2 last:mb-0">
              <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{group.county}</p>
              {group.cities.map((city) => (
                <Link
                  key={city.href}
                  href={city.href}
                  className="block px-4 py-1.5 text-sm hover:bg-gray-50 hover:text-brand-green transition-colors"
                >
                  {city.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Link href="/about/" className="text-gray-300 hover:text-white text-sm font-medium">
        About
      </Link>

      <Link href="/gallery/" className="text-gray-300 hover:text-white text-sm font-medium">
        Gallery
      </Link>

      <TextButton size="sm" className="hidden lg:inline-flex" label="Text a Photo" />
      <PhoneButton size="sm" />
    </nav>
  )
}

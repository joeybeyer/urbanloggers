import Link from 'next/link'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { TextButton } from '@/components/ui/TextButton'
import { services } from '@/data/services'
import { countyGroups } from '@/data/locations'

const chevron = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Plain <nav> → <ul> → <li> → <a href> so the links exist in the server HTML (dropdowns are CSS-only).
export function Nav() {
  return (
    <nav className="hidden md:block" aria-label="Main navigation">
      <ul className="flex items-center gap-6">
        {/* Services dropdown */}
        <li className="relative group">
          <span className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1 py-2 cursor-default">
            Services
            {chevron}
          </span>
          <ul className="absolute top-full left-0 hidden group-hover:block group-focus-within:block bg-white text-charcoal shadow-xl rounded-md py-2 w-56 z-50">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/${s.slug}/`}
                  className="block px-4 py-2 text-sm hover:bg-gray-50 hover:text-brand-green transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Locations dropdown */}
        <li className="relative group">
          <span className="text-gray-300 hover:text-white text-sm font-medium flex items-center gap-1 py-2 cursor-default">
            Locations
            {chevron}
          </span>
          <ul className="absolute top-full left-0 hidden group-hover:block group-focus-within:block bg-white text-charcoal shadow-xl rounded-md py-3 w-64 z-50">
            {countyGroups.map((group) => (
              <li key={group.county} className="mb-2 last:mb-0">
                <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">{group.county}</p>
                <ul>
                  {group.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        href={`/${city.slug}/`}
                        className="block px-4 py-1.5 text-sm hover:bg-gray-50 hover:text-brand-green transition-colors"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link href="/about/" className="text-gray-300 hover:text-white text-sm font-medium">
            About
          </Link>
        </li>

        <li>
          <Link href="/gallery/" className="text-gray-300 hover:text-white text-sm font-medium">
            Gallery
          </Link>
        </li>

        <li className="hidden lg:block">
          <TextButton size="sm" label="Text a Photo" />
        </li>
        <li>
          <PhoneButton size="sm" />
        </li>
      </ul>
    </nav>
  )
}

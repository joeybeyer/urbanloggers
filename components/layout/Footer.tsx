import Link from 'next/link'
import { COMPANY } from '@/data/company'

const serviceLinks = [
  { href: '/tree-removal/', label: 'Tree Removal' },
  { href: '/tree-trimming-pruning/', label: 'Tree Trimming & Pruning' },
  { href: '/stump-grinding/', label: 'Stump Grinding' },
  { href: '/emergency-tree-service/', label: 'Emergency Tree Service' },
  { href: '/log-milling/', label: 'Log Milling' },
]

const cityLinks = [
  { href: '/milwaukee/', label: 'Milwaukee' },
  { href: '/wauwatosa/', label: 'Wauwatosa' },
  { href: '/west-allis/', label: 'West Allis' },
  { href: '/greenfield/', label: 'Greenfield' },
  { href: '/brookfield/', label: 'Brookfield' },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-3">{COMPANY.name}</h3>
            <p className="text-sm leading-relaxed mb-4">
              Professional tree service in Greater Milwaukee. 20+ years experience,
              fully insured.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-brand-green text-white text-xs px-2 py-1 rounded">Fully Insured</span>
              <span className="bg-brand-green text-white text-xs px-2 py-1 rounded">20+ Years</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="text-white font-semibold mb-3">Service Area</h4>
            <ul className="space-y-2">
              {cityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={COMPANY.phoneHref} className="hover:text-white transition-colors font-medium">
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="text-gray-400">{COMPANY.address.full}</li>
              <li>
                <Link href="/contact/" className="text-brand-green-light hover:text-white transition-colors">
                  Request a Free Quote →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust stack — real, verifiable trust nodes (add BBB/Yelp/Angi/social/podcast links as those profiles go live) */}
        <div className="border-t border-gray-700 pt-6 mb-6">
          <h4 className="text-white font-semibold mb-3 text-sm">Verify Us &amp; Read Reviews</h4>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={COMPANY.social.google} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              ★ {COMPANY.rating} on Google · {COMPANY.reviewCount}+ reviews
            </a>
            <Link href="/insurance/" className="hover:text-white transition-colors">Licensed &amp; Insured — Coverage &amp; Policy</Link>
            <a href={`https://www.google.com/maps?cid=1762089579775349192`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Google Business Profile
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-sm text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/about/" className="hover:text-gray-300 transition-colors">About</Link>
            <Link href="/insurance/" className="hover:text-gray-300 transition-colors">Insurance</Link>
            <Link href="/contact/" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

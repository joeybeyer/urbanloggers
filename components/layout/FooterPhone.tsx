'use client'

import { usePathname } from 'next/navigation'
import { napForPath } from '@/lib/gbp'

// The footer renders on every page, so it cannot hardcode a number: three of the four profiles
// have their own. A page whose body shows (262) 205-4777 while the footer shows (414) 240-4626 is
// a page with two phone numbers, which fails L3 in audit/fixes/00-local.md and splits the NAP
// signal for the listing that page is meant to reinforce.
//
// Client component purely so it can read the pathname; the footer itself stays a server component.

export function FooterPhone() {
  const nap = napForPath(usePathname())

  return (
    <a href={nap.phoneHref} className="hover:text-white transition-colors font-medium">
      {nap.phone}
    </a>
  )
}

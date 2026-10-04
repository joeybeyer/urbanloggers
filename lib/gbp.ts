import { COMPANY } from '@/data/company'

// Which Google Business Profile serves which page.
//
// Three of the four profiles have their own phone number, so "the phone" is a property of the
// PAGE, not of the company. A page that shows two numbers fails L3 in audit/fixes/00-local.md —
// which is exactly what happens if the body uses the city's number while the shared header and
// footer keep rendering COMPANY.phone.
//
// Every component that renders a number resolves it through here from the current pathname, so a
// new profile is one entry in PROFILE_BY_PATH and nothing else changes.

export type GbpProfile = keyof typeof COMPANY.gbp

/** Pages that belong to a profile other than the service-area business. */
const PROFILE_BY_PATH: Record<string, GbpProfile> = {
  '/brookfield': 'brookfield',
  '/menomonee-falls': 'menomoneeFalls',
  '/waukesha': 'waukesha',
}

/** The profile serving `pathname`. Everything not listed is the service-area business. */
export function profileForPath(pathname: string | null | undefined): GbpProfile {
  if (!pathname) return 'serviceArea'
  const clean = pathname.replace(/\/+$/, '') || '/'
  return PROFILE_BY_PATH[clean] ?? 'serviceArea'
}

/** The NAP a page must show: its own profile's, never another's. */
export function napForPath(pathname: string | null | undefined) {
  return COMPANY.gbp[profileForPath(pathname)]
}

export function napForProfile(profile: GbpProfile = 'serviceArea') {
  return COMPANY.gbp[profile]
}

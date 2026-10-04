import { COMPANY } from '@/data/company'

// The Google Business Profile map embed.
//
// Urban Loggers has THREE profiles (COMPANY.gbp): the service-area business, Brookfield, and
// Menomonee Falls. A page embeds exactly one — the profile that serves it. Pass `profile` to pick;
// the default is the service-area business, which is correct for the homepage, /contact/ and any
// city page that has no profile of its own.
//
// This component exists so no page hardcodes a place ID. All three render as "Urban Loggers LLC",
// so a wrong paste is invisible by eye and only shows up when something measures it.
//
// Why embed a map at all: `Has an embedded video or iframe` is All Positive at 167 in the tested
// factor set, and L1 in audit/fixes/00-local.md requires a GBP map embed on each profile's page.

export type GbpProfile = keyof typeof COMPANY.gbp

interface GbpMapProps {
  /** Which profile to embed. Defaults to the service-area business. */
  profile?: GbpProfile
  /** City this page serves — used only for the iframe's accessible title. */
  serving?: string
  /** Frame height in px. Defaults to 360. Ignored when `ratio` is set. */
  height?: number
  /** Render responsively at this aspect ratio (height as a % of width) instead of a fixed height. */
  ratio?: number
  className?: string
}

export function GbpMap({
  profile = 'serviceArea',
  serving,
  height = 360,
  ratio,
  className = '',
}: GbpMapProps) {
  const gbp = COMPANY.gbp[profile]
  const title = serving
    ? `Urban Loggers LLC on Google Maps — serving ${serving}`
    : 'Urban Loggers LLC on Google Maps'
  const src = `https://www.google.com/maps/embed?pb=${gbp.embedPb}`

  if (ratio) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl ${className}`}
        style={{ paddingTop: `${ratio}%` }}
      >
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    )
  }

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-200 ${className}`}>
      <iframe
        src={src}
        title={title}
        width="100%"
        height={height}
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}

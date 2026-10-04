import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Land Clearing Milwaukee, WI — Small & Medium Lots | Urban Loggers LLC',
  'Small and medium land clearing in Greater Milwaukee: trees, brush and stumps removed, good hardwood milled instead of chipped. Free on-site estimates. Call (414) 240-4626.',
  '/land-clearing/'
)

export default function LandClearingPage() {
  return (
    <ServiceHubTemplate
      slug="land-clearing"
      h1="Land Clearing in Milwaukee, WI"
      heroSub="Small and medium lot clearing — and the best hardwood gets milled, not chipped."
      heroImage="/images/stump-grinding.jpg"
      serviceType="Land Clearing"
      priceRange="$$$"
      ctaLabel="Get a Free Estimate"
      tableTitle="Land Clearing — Quick Facts"
      tableHeaders={['Detail', 'Info']}
      tableRows={[
        ['Job Size', 'Small and medium lots: backyards, building sites, fence lines, acreage'],
        ['Includes', 'Tree removal, stump grinding, brush chipping or haul-off'],
        ['Hardwood', 'Sound logs set aside and milled into lumber and slabs'],
        ['Estimate', 'Free on-site walk-through — priced after we see the lot'],
        ['Insurance', 'Fully insured, docs provided'],
        ['Service Area', 'Greater Milwaukee, WI'],
      ]}
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/stump-grinding/', label: 'Stump Grinding' },
        { href: '/hardwood-slabs/', label: 'Hardwood Slabs' },
      ]}
    >
      <h2>Small &amp; Medium Land Clearing Done Right</h2>
      <p>
        Plenty of lots need clearing that don&rsquo;t need a full excavation crew: a wooded back
        third of an acre, a building site, an overgrown fence line, or a yard you want to open up
        for sun, a garage, or a pool. That&rsquo;s the work we&rsquo;re built for. You get one
        crew handling the trees, the stumps, and the cleanup.
      </p>

      <h2>What&rsquo;s Included</h2>
      <ul>
        <li>Free on-site walk-through and a written quote</li>
        <li>Tree felling and sectional removal, including trees near structures</li>
        <li>Brush and small-diameter wood chipped or hauled away</li>
        <li>Stump grinding below grade, so the lot is ready to grade or seed</li>
        <li>Valuable hardwood logs saved for milling, when the quality is there</li>
      </ul>

      <h2>Why the Wood Matters</h2>
      <p>
        Most clearing contractors burn, chip, or haul everything. Because Brian runs a portable
        sawmill, the good hardwood coming off your land can have a second life as lumber, and
        that can offset part of what clearing costs you. Oak, walnut, maple, cherry, and ash are
        the species we look for. Read more on our{' '}
        <Link href="/log-milling/">log milling</Link> page, or see what we do with the lumber on our{' '}
        <Link href="/hardwood-slabs/">hardwood slabs</Link> page.
      </p>

      <h2>Honest About Fit</h2>
      <p>
        We take on small and medium clearing. If a project is bigger than what makes sense for
        our crew and equipment, or if it&rsquo;s a job where you don&rsquo;t actually need
        everything removed, we&rsquo;ll tell you. Before work starts, check whether your
        municipality requires a permit for tree removal or clearing on your lot.
      </p>
    </ServiceHubTemplate>
  )
}

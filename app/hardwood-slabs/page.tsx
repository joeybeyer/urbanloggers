import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Hardwood Slabs & Woodworking Lumber Milwaukee, WI | Urban Loggers LLC',
  'Locally milled Wisconsin hardwood slabs for woodworkers: walnut, oak, maple, cherry and more, from trees we take down in Greater Milwaukee. Ask about available slabs: (414) 240-4626.',
  '/hardwood-slabs/'
)

export default function HardwoodSlabsPage() {
  return (
    <ServiceHubTemplate
      slug="hardwood-slabs"
      h1="Hardwood Slabs for Woodworkers in Milwaukee"
      heroSub="Wisconsin hardwood, milled from local trees we take down — with a known story behind every slab."
      heroImage="/images/milling.jpg"
      serviceType="Hardwood Slabs and Lumber"
      priceRange="$$"
      ctaLabel="Ask About Slabs"
      tableTitle="Hardwood Slabs — Quick Facts"
      tableHeaders={['Species (varies by season)', 'Typically Used For']}
      tableRows={[
        ['Black walnut', 'Dining and conference tables, mantels, live-edge shelves'],
        ['Red / white oak', 'Tabletops, benches, beams, flooring stock'],
        ['Hard / soft maple', 'Tables, countertops, cutting boards, turning'],
        ['Cherry', 'Furniture, mantels, cabinet and trim stock'],
        ['Ash, elm, hickory', 'Benches, shelves, tool handles, rustic furniture'],
        ['Custom cuts', 'Thickness and length on request, from logs still uncut'],
      ]}
      related={[
        { href: '/log-milling/', label: 'Log Milling' },
        { href: '/land-clearing/', label: 'Land Clearing' },
        { href: '/tree-removal/', label: 'Tree Removal' },
      ]}
    >
      <h2>Local Hardwood, Direct From the Tree</h2>
      <p>
        Slabs aren&rsquo;t something Urban Loggers buys in from a distributor. They come from
        the trees we take down on tree-removal and{' '}
        <Link href="/land-clearing/">land-clearing</Link> jobs around Greater Milwaukee. When a
        tree has sound, straight hardwood in it, it goes on the portable mill instead of into the
        chipper. If you&rsquo;re a woodworker, furniture maker, or hobbyist looking for local
        hardwood, that makes us a source you can ask directly.
      </p>

      <h2>What We Can Tell You About Any Slab</h2>
      <ul>
        <li>The species, and roughly where it grew</li>
        <li>How it was cut: live-edge or flat-sawn, thickness, and length</li>
        <li>Whether it&rsquo;s green, air-drying, or further along, and for how long</li>
        <li>Any defects, checks, or character you should know about before you buy</li>
      </ul>

      <h2>Tell Us What You&rsquo;re Looking For</h2>
      <p>
        Our inventory depends on what comes down, so it changes. The best way to get what you want is
        to call or send a message with the species, thickness, and size you need and what it&rsquo;s
        for. If we have something that fits we&rsquo;ll say so, and if not we&rsquo;ll keep your request in mind
        for upcoming jobs. For a specific project you can also ask about reserving a slab from a
        tree <em>before</em> it comes down.
      </p>

      <h2>Have a Tree of Your Own?</h2>
      <p>
        If you&rsquo;re removing a good hardwood from your property, ask about having it milled
        instead of hauled off. See{' '}
        <Link href="/log-milling/">portable log milling</Link> for how it works.
      </p>
    </ServiceHubTemplate>
  )
}

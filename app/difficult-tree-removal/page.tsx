import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Hard-to-Reach & Precarious Tree Removal Milwaukee, WI | Urban Loggers LLC',
  'Leaning, precarious, and hard-to-reach trees removed safely with climbing and rigging, no lift access needed. Fully insured, free estimates in Greater Milwaukee. Call (414) 240-4626.',
  '/difficult-tree-removal/'
)

export default function DifficultTreeRemovalPage() {
  return (
    <ServiceHubTemplate
      slug="difficult-tree-removal"
      h1="Hard-to-Reach & Precarious Tree Removal"
      heroSub="Leaning, tangled, or locked behind a fence — we climb, rig, and lower it safely."
      heroImage="/images/tree-removal.jpg"
      serviceType="Hazardous Tree Removal"
      priceRange="$$$"
      ctaLabel="Send Photos for a Quote"
      tableTitle="Tough Tree Situations — How We Handle Them"
      tableHeaders={['Situation', 'Our Approach']}
      tableRows={[
        ['Leaning toward a house', 'Assess lean and roots, then rig and lower in controlled sections'],
        ['Hung up in another tree', 'Climb or rig to release the load safely, no pulling it down blind'],
        ['Backyard with no truck or lift access', 'Climb and remove in sections; debris carried or chipped out'],
        ['Over a fence, shed, or pool', 'Rope-lowered pieces so nothing drops on what it shouldn’t'],
        ['Near power lines', 'Never touch it — we coordinate with We Energies'],
        ['Steep slope or soft ground', 'Rigging and hand work instead of heavy equipment'],
      ]}
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/emergency-tree-service/', label: 'Emergency Tree Service' },
        { href: '/land-clearing/', label: 'Land Clearing' },
      ]}
    >
      <h2>When a Standard Removal Won&rsquo;t Work</h2>
      <p>
        A tree you can drop in an open yard is a simple job. The jobs people struggle to find help
        for are the others: the tree that leans over the roof, the one wedged into its neighbor
        after a storm, or the one in a backyard with a three-foot gate and no way in for a bucket
        truck. These are the jobs we&rsquo;re comfortable with.
      </p>

      <h2>How We Work Around Access</h2>
      <ul>
        <li>Climbing and sectional takedowns when no lift can reach the tree</li>
        <li>Rigging and lowering lines so pieces never free-fall onto your property</li>
        <li>Hand-carry and chip-out for yards with narrow or no vehicle access</li>
        <li>A plan for every cut before the first one is made</li>
      </ul>

      <h2>Send Us Photos</h2>
      <p>
        With a hard job, photos help a lot. Use the <Link href="/contact/">quote form</Link> to
        attach pictures, or text a photo to the number at the top of the page. Brian can often
        tell you what the job involves from a photo, and he confirms the price on site before
        any work starts.
      </p>

      <h2>If It&rsquo;s Already Down or Hanging</h2>
      <p>
        If the tree has already come down on a structure or a limb is hanging in the canopy, that is
        an <Link href="/emergency-tree-service/">emergency</Link>. Call right away, and keep people
        and pets clear of the area.
      </p>
    </ServiceHubTemplate>
  )
}

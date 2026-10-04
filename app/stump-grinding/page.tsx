import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { ExtLink } from '@/components/ui/ExtLink'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Stump Grinding Milwaukee, WI | Urban Loggers LLC',
  'Affordable stump grinding and removal in Greater Milwaukee. Commercial grinder, complete cleanup, multi-stump discounts. Call (414) 240-4626.',
  '/stump-grinding/'
)

export default function StumpGrindingPage() {
  return (
    <ServiceHubTemplate
      slug="stump-grinding"
      h1="Stump Grinding in Milwaukee, WI"
      heroSub="Complete stump removal below grade so you can replant or sod over the area."
      heroImage="/images/stump-grinding.jpg"
      serviceType="Stump Grinding and Removal"
      priceRange="$$"
      ctaLabel="Get Free Quote"
      tableTitle="Stump Grinding — Quick Facts"
      tableHeaders={['Detail', 'Info']}
      tableRows={[
        ['Typical Cost', '$75–$400 per stump (size-dependent)'],
        ['Grinding Depth', 'Down to 12 inches below grade'],
        ['Multi-Stump', 'Discount available'],
        ['What’s Left', 'Wood chips (usable as mulch)'],
        ['Can Replant?', 'Yes — after chip removal & settling'],
        ['Service Area', 'Greater Milwaukee, WI'],
      ]}
      keyFact="Expect $75 to $400 per stump, with the grinder taking each one down to 12 inches below grade and leaving a pile of mulch-ready chips."
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/tree-trimming-pruning/', label: 'Trimming & Pruning' },
        { href: '/milwaukee/', label: 'Milwaukee' },
        { href: '/land-clearing/', label: 'Land Clearing' },
        { href: '/difficult-tree-removal/', label: 'Hard-to-Reach Trees' },
        { href: '/emergency-tree-service/', label: 'Emergency Service' },
      ]}
    >
      <h2>What Sets the Price per Stump</h2>
      <ul>
        <li>Diameter: measured across the top at ground level; the bigger the stump, the more wood the cutter wheel has to chew.</li>
        <li>Root flare: large surface roots on silver maple, oak, and cottonwood add cutting time beyond the visible stump.</li>
        <li>Hardness: dense oak and locust wear teeth faster than soft poplar or pine.</li>
        <li>Access: a gate narrower than the machine, steep ground, or a stump pinned against a foundation or fence changes the setup.</li>
        <li>Count: several stumps on the same visit share the trip and setup, which is why multi-stump jobs are discounted.</li>
      </ul>
      <p>
        Brian measures and prices in person during the free estimate. A photo helps for a rough
        number, but root spread and ground conditions are what actually move the price.
      </p>

      <h2>How the Grinding Works</h2>
      <p>
        A commercial stump grinder swings a toothed wheel through the wood in overlapping passes,
        starting at the edge and working across, then following the main roots outward. The
        machine removes the stump to about 12 inches below grade, which is deep enough to sod,
        seed, or plant over without the lawn sinking in a year or two. What is left is a mix of
        wood chips and soil. You can have it raked flat, mixed back into the hole with topsoil, or
        hauled off for an additional charge.
      </p>
      <p>
        Before cutting, the area is checked for hidden hazards. Call 811 before any digging so
        buried lines are marked, and rocks, wire fencing, and old concrete near the base are
        flagged because they can damage the cutter wheel. If sprinkler heads or low-voltage
        lighting sit near the stump, point them out during the estimate. The{' '}
        <ExtLink href="https://www.osha.gov/">Occupational Safety and Health Administration</ExtLink>{' '}
        sets rules for powered cutting equipment, and the operator stays clear of bystanders
        while the machine runs.
      </p>

      <h2>Why Stumps Are Worth Removing</h2>
      <ul>
        <li>Trip and safety hazard for children and adults</li>
        <li>Attracts carpenter ants, termites, and wood borers</li>
        <li>Prevents mowing and lawn maintenance</li>
        <li>Detracts from curb appeal and property value</li>
        <li>Some species (cottonwood, elm) will resprout vigorously</li>
      </ul>
      <p>
        Pest pressure is the one people underestimate. A decaying stump is easy habitat for
        carpenter ants, and the University of Wisconsin Extension has plenty of homeowner
        material on insects that move from rotting wood into houses; start with the{' '}
        <ExtLink href="https://extension.wisc.edu/">Extension home and garden resources</ExtLink>.
      </p>

      <h2>Ash Stumps and Diseased Wood</h2>
      <p>
        Emerald ash borer has taken down thousands of ash trees across southeast Wisconsin, and
        the stumps they leave behind are common calls. Grinding these stumps is fine, but do not
        haul infested ash wood or chips long distances. The state{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">emerald ash borer page</ExtLink>{' '}
        explains the movement rules, and the{' '}
        <ExtLink href="https://www.aphis.usda.gov/">USDA Animal and Plant Health Inspection Service</ExtLink>{' '}
        maintains the national program. Oak wilt works differently, but chips from diseased red
        oaks should also stay on site or go to a proper disposal location, not be spread around
        healthy oaks.
      </p>

      <h2>Roots, Resprouting, and Replanting</h2>
      <p>
        Grinding removes the stump and the major surface roots, not the entire root system. Most
        remaining roots rot out slowly over several years. Cottonwood, elm, locust, and silver
        maple can send up suckers from what is left, and a cut-surface herbicide application
        right after grinding or on the fresh cut is the usual control. Read the label of any
        product you use, since the{' '}
        <ExtLink href="https://www.epa.gov/">U.S. Environmental Protection Agency</ExtLink>{' '}
        regulates how pesticides are applied and the label is the law.
      </p>
      <p>
        If you want a new tree in the same spot, shift it a couple of feet or wait 6 to 12 months
        for the remaining roots to settle. Fill the hole with clean topsoil, since a pile of
        chips will tie up nitrogen and starve new roots. Pick a species suited to the site; the{' '}
        <ExtLink href="https://www.treesaregood.org/">tree planting advice from the International Society of Arboriculture</ExtLink>{' '}
        is a good starting point.
      </p>

      <h2>Timing in a Milwaukee Year</h2>
      <p>
        Stumps can be ground any time the machine can reach them. Frozen ground in winter is
        actually easier on lawns, because the tracks do not rut the turf, though deep snow has to
        be shoveled off first. After a heavy rain the ground is soft and the machine can leave
        ruts, so a dry week is better. If you are doing a patio, fence, or sod project this
        season, get the stump out before the hardscape goes in.
      </p>

      <h2>When Grinding Is Not the Answer</h2>
      <p>
        If a stump sits on a slope that can slide, hard against a basement wall, or tangled
        in a shared utility corridor, Brian will say so and suggest options. A very large stump
        left after a <Link href="/tree-removal/">tree removal</Link> can also cost less to leave
        and plant around than to grind. Some people want one as a bench, a planter base, or a
        carving blank. If you are clearing a whole lot, bundle the work with{' '}
        <Link href="/land-clearing/">land clearing</Link>, and for trimming what is left of the
        old tree line, see <Link href="/tree-trimming-pruning/">trimming and pruning</Link>.
        Urban Loggers is fully insured, and a certificate is available on request.
      </p>
    </ServiceHubTemplate>
  )
}

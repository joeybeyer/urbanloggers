import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { ExtLink } from '@/components/ui/ExtLink'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Tree Trimming & Pruning Milwaukee, WI | Urban Loggers LLC',
  'Expert tree trimming and pruning in Greater Milwaukee. Crown thinning, deadwood removal, orchard pruning. Call (414) 240-4626 for a free estimate.',
  '/tree-trimming-pruning/'
)

export default function TreeTrimmingPage() {
  return (
    <ServiceHubTemplate
      slug="tree-trimming-pruning"
      h1="Tree Trimming & Pruning in Milwaukee"
      heroSub="Crown thinning, deadwood removal, and structural pruning to keep trees healthy."
      heroImage="/images/trimming.jpg"
      serviceType="Tree Trimming and Pruning"
      priceRange="$$"
      ctaLabel="Get Free Estimate"
      tableTitle="Tree Trimming & Pruning Services"
      tableHeaders={['Service', 'Purpose']}
      tableRows={[
        ['Crown Thinning', 'Reduces wind resistance, improves light penetration'],
        ['Crown Raising', 'Removes lower branches for clearance'],
        ['Deadwood Removal', 'Eliminates hazardous dead branches'],
        ['Structural Pruning', 'Shapes young trees for long-term stability'],
        ['Orchard Pruning', 'Maximizes fruit production and tree health'],
        ['Vista Pruning', 'Opens sight lines without harming the tree'],
      ]}
      keyFact="Most jobs run $100 to $500, and late winter (February to March) is the best window for the majority of Wisconsin species, with oaks cut only from October through March."
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/stump-grinding/', label: 'Stump Grinding' },
        { href: '/about/', label: 'About Brian' },
        { href: '/emergency-tree-service/', label: 'Emergency Service' },
        { href: '/log-milling/', label: 'Log Milling' },
        { href: '/difficult-tree-removal/', label: 'Hard-to-Reach Trees' },
      ]}
    >
      <h2>Cost and What Drives It</h2>
      <ul>
        <li>Typical range: $100 to $500 per tree for routine work.</li>
        <li>Higher end: tall canopy trees that need climbing or a lift, and trees over roofs or wires.</li>
        <li>Lower end: small ornamentals and young trees reachable from the ground or a ladder.</li>
        <li>Multiple trees on one visit cost less per tree because setup and cleanup are shared.</li>
        <li>Cleanup is included: brush is chipped and hauled unless you want the chips left for mulch.</li>
      </ul>
      <p>
        These are ranges, not promises; Brian looks at the actual canopy before quoting. The{' '}
        <ExtLink href="https://www.treesaregood.org/">consumer tree care site run by the International Society of Arboriculture</ExtLink>{' '}
        is a useful reference for what a written pruning quote should specify, such as which
        branches come out and how much live crown stays.
      </p>

      <h2>Pruning Done to a Standard</h2>
      <p>
        Good pruning is a series of small, deliberate cuts. Each cut is made just outside the
        branch collar so the tree can seal the wound, never flush to the trunk and never leaving a
        long stub. The work follows ANSI A300 practice, and the{' '}
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>{' '}
        publishes the best-practice guidance that standard is built on. Climbing spurs stay off
        live trees you plan to keep, since spikes wound the bark.
      </p>
      <p>
        The goal on a mature tree is to remove dead, crossing, rubbing, and weakly attached
        branches, then lighten the crown only as much as needed. Topping, which means cutting
        main limbs back to stubs, is not on the menu. It starves the tree, invites rot, and
        produces weak regrowth that breaks in the next storm.
      </p>

      <h2>When to Prune in Wisconsin</h2>
      <p>
        Most deciduous trees are best pruned in late winter while dormant. The tree&rsquo;s
        structure is visible without leaves, insects and fungal spores are inactive, and frozen
        ground protects the lawn from equipment. Spring-flowering shrubs and trees such as lilac
        and crabapple are pruned right after bloom so you do not cut off next year&rsquo;s
        flowers. Evergreens can be shaped in early summer after new growth hardens.
      </p>
      <p>
        Oaks are the exception that matters most. Beetles that carry oak wilt are drawn to fresh
        cuts from spring through mid-summer, so oaks should only be pruned from October through
        March. The Wisconsin DNR&rsquo;s{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/OakWilt">oak wilt page</ExtLink>{' '}
        covers the timing and what to do if a limb breaks during the high-risk months. Ash trees
        are a similar story with a different threat: the{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">emerald ash borer</ExtLink>{' '}
        has killed most untreated ash across southeast Wisconsin, and a declining ash is often a
        removal job, not a pruning job.
      </p>

      <h2>Orchard &amp; Specialty Work</h2>
      <p>
        Brian has a particular passion for orchard work: the careful, species-specific pruning
        that keeps apple, pear, cherry, and other fruit trees productive for decades. It means
        opening the center for light and air, selecting the strongest scaffold limbs, and
        renewing fruiting wood each year. This is slow, deliberate work that many tree services
        do not offer. We do. The{' '}
        <ExtLink href="https://extension.wisc.edu/">University of Wisconsin Extension</ExtLink>{' '}
        publishes fruit tree pruning calendars that line up with the late-winter schedule used
        here.
      </p>

      <h2>Storm-Proofing Before the Season</h2>
      <p>
        Wisconsin trees take a beating: ice loads in winter, wet heavy snow, and summer
        thunderstorms with straight-line winds that the{' '}
        <ExtLink href="https://www.weather.gov/mkx/">National Weather Service in Milwaukee/Sullivan</ExtLink>{' '}
        tracks every year. Crown thinning and removing co-dominant leaders and dead limbs reduces
        the sail area and the weight that fails first. It will not make a tree storm-proof, but a
        pruned tree has a far better chance than a neglected one.
      </p>

      <h2>Trees Near Power Lines</h2>
      <p>
        We prune around your service drop and structures, but branches that touch or grow into
        the energized primary lines are for the utility&rsquo;s own line-clearance crews. Contact{' '}
        <ExtLink href="https://www.we-energies.com/">We Energies</ExtLink>{' '}
        about tree work near its lines, and keep ladders and pole saws well away from any wire.
      </p>

      <h2>Safety and Insurance</h2>
      <p>
        Pruning from a ladder or climbing a large tree is a leading source of serious falls and
        chainsaw injuries, and it is the reason{' '}
        <ExtLink href="https://www.osha.gov/">OSHA</ExtLink>{' '}
        regulates tree care. Urban Loggers is fully insured with liability and workers&rsquo;
        compensation coverage, and we use climbing gear and aerial lifts so the work stays off
        ladders. If you are comparing bids, ask every company for proof of insurance.
      </p>

      <h2>When Cutting Less Is Right</h2>
      <p>
        If your tree is healthy and merely looks full, Brian will usually tell you to leave it.
        Never remove more than about a quarter of the live crown in a season, and avoid pruning
        stressed trees during drought. When a tree is hollow, leaning over a structure, or
        mostly dead, pruning only delays the inevitable, and we will say so and refer you to{' '}
        <Link href="/tree-removal/">tree removal</Link>. For the stump that follows, see{' '}
        <Link href="/stump-grinding/">stump grinding</Link>, and read{' '}
        <Link href="/about/">about Brian</Link> if you want to know who will be in your yard.
      </p>
    </ServiceHubTemplate>
  )
}

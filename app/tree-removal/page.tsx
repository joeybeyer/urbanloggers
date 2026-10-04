import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { ExtLink } from '@/components/ui/ExtLink'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Tree Removal Milwaukee, WI | Urban Loggers LLC',
  'Professional tree removal in Greater Milwaukee. Any size tree, fully insured, free on-site estimates. Call (414) 240-4626.',
  '/tree-removal/'
)

export default function TreeRemovalPage() {
  return (
    <ServiceHubTemplate
      slug="tree-removal"
      h1="Tree Removal in Milwaukee, WI"
      heroSub="Safe, efficient removal of hazardous or unwanted trees of any size."
      heroImage="/images/tree-removal.jpg"
      serviceType="Tree Removal Service"
      priceRange="$$$"
      ctaLabel="Get Free Quote"
      tableTitle="Tree Removal in Milwaukee, WI — Quick Facts"
      tableHeaders={['Detail', 'Info']}
      tableRows={[
        ['Typical Cost', '$300–$2,000+ depending on size & complexity'],
        ['Estimate', 'Free on-site visit'],
        ['Cleanup', 'Full debris removal included'],
        ['Log Milling', 'Available — turn logs into lumber'],
        ['Insurance', 'Fully insured, docs provided'],
        ['Service Area', 'Greater Milwaukee, WI'],
      ]}
      keyFact="Most residential jobs in Greater Milwaukee run $300 to $2,000+, and the price is set by the tree's size, what is under it, and how hard it is to reach."
      related={[
        { href: '/stump-grinding/', label: 'Stump Grinding' },
        { href: '/log-milling/', label: 'Log Milling' },
        { href: '/difficult-tree-removal/', label: 'Hard-to-Reach Trees' },
        { href: '/land-clearing/', label: 'Land Clearing' },
        { href: '/emergency-tree-service/', label: 'Emergency Service' },
        { href: '/tree-trimming-pruning/', label: 'Trimming & Pruning' },
        { href: '/hardwood-slabs/', label: 'Hardwood Slabs' },
      ]}
    >
      <h2>What Decides the Price</h2>
      <ul>
        <li>Height and trunk diameter: a 40-foot maple costs far less to take down than a 90-foot silver maple with a split trunk.</li>
        <li>Targets: houses, garages, fences, pools, and utility lines all slow the work because pieces must be roped down instead of dropped.</li>
        <li>Access: a driveway-side tree is quick; a backyard tree behind a fence means more hand-carrying and a smaller chipper position.</li>
        <li>Condition: dead and decayed wood is unpredictable and takes more rigging and more care.</li>
        <li>Extras: stump grinding, log milling, and firewood splitting are quoted on top of the takedown.</li>
      </ul>
      <p>
        Brian prices every job after standing under the tree, which is why the estimate is free and
        why a phone quote based on a photo is only a ballpark. The{' '}
        <ExtLink href="https://www.treesaregood.org/">Tree Care Industry resources from the International Society of Arboriculture</ExtLink>{' '}
        also point out that a written, itemized quote with proof of insurance is the baseline for
        comparing bids.
      </p>

      <h2>How a Takedown Works</h2>
      <p>
        Open-space trees can be felled whole in a planned direction. Anything near a structure is
        taken down in sections: a climber works from the top down, cuts a limb or trunk piece, and
        lowers it on a rope so nothing lands on a roof or garden. Branches go through the chipper
        as they come down, the trunk is bucked into manageable rounds, and the site is raked and
        blown clean. On most jobs the crew is on site for two to six hours.
      </p>
      <p>
        Climbing and rigging are among the more dangerous jobs in the trades, which is why
        <ExtLink href="https://www.osha.gov/"> OSHA</ExtLink> has specific rules for tree care
        operations. Urban Loggers carries liability and workers&rsquo; compensation coverage, and
        we will email the certificate before work starts if you or your HOA asks for it.
      </p>

      <h2>Wisconsin Reasons Trees Come Down</h2>
      <p>
        Emerald ash borer is the biggest driver in southeast Wisconsin. Ash that has lost more than
        a third of its canopy goes brittle fast, and the wood becomes dangerous to climb. The
        state&rsquo;s{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">emerald ash borer program</ExtLink>{' '}
        explains the signs, including D-shaped exit holes, bark splitting, and woodpecker damage.
        Do not move ash firewood out of the area, since the{' '}
        <ExtLink href="https://www.aphis.usda.gov/">USDA&rsquo;s Animal and Plant Health Inspection Service</ExtLink>{' '}
        tracks how quickly the insect spreads on hauled wood.
      </p>
      <p>
        Oak wilt is the other one. Red oaks infected with the fungus can die within weeks, and it
        spreads through root grafts to neighboring oaks. The DNR&rsquo;s{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/OakWilt">oak wilt guidance</ExtLink>{' '}
        is the place to confirm a diagnosis. Beyond disease, the freeze-thaw cycle splits weak
        crotches and old wounds each winter, ice storms load branches until they snap, and
        summer straight-line winds topple shallow-rooted silver maples and cottonwoods.
      </p>

      <h2>Storm Damage and Insurance</h2>
      <p>
        When a tree has already hit something, the first priority is safety. Stay away from any
        tree or limb touching a wire and call the utility; that is the job of line crews, not a
        tree service. Photograph the tree and the damage before anyone cuts, because your adjuster
        will want it. The{' '}
        <ExtLink href="https://www.weather.gov/mkx/">National Weather Service Milwaukee/Sullivan office</ExtLink>{' '}
        publishes the wind and ice reports that insurers often reference, and the{' '}
        <ExtLink href="https://www.fema.gov/">Federal Emergency Management Agency</ExtLink>{' '}
        explains what documentation is needed after a declared disaster. For a tree that is on
        the ground or on the house right now, see our{' '}
        <Link href="/emergency-tree-service/">emergency tree service</Link> page.
      </p>

      <h2>What&rsquo;s Included</h2>
      <ul>
        <li>Free on-site assessment and written quote</li>
        <li>Safe felling or sectional takedown as needed</li>
        <li>Complete debris cleanup and haul-away</li>
        <li>Optional stump grinding, quoted separately</li>
        <li>Optional log milling, so good hardwood becomes lumber</li>
        <li>Insurance documentation on request</li>
      </ul>

      <h2>When a Tree Should Stay</h2>
      <p>
        Not every dead-looking or ugly tree needs to come down. Signs that a tree poses immediate
        risk include major trunk cracks, significant lean toward structures, heaved or damaged
        roots, fungal conks at the base, and more than 50% crown loss. A tree with one dead limb,
        some storm-torn branches, or a thin crown after a dry summer can often be saved with
        pruning. Brian will give you an honest assessment and will not recommend a takedown if the
        tree can be saved. The{' '}
        <ExtLink href="https://extension.wisc.edu/">University of Wisconsin Extension</ExtLink>{' '}
        publishes species-specific guidance if you want a second source before deciding.
      </p>

      <h2>Timing and Season</h2>
      <p>
        Removals happen year-round. Winter can be a good time: frozen ground carries equipment
        without tearing up the lawn, and with the leaves gone the structure is easy to read. Summer
        and fall are busy, and storm weeks book up quickly. If the tree is not an immediate hazard,
        scheduling in late winter often gets you a shorter wait and lets the crew plan around soft
        ground.
      </p>

      <h2>What Happens to the Wood</h2>
      <p>
        Brush is chipped and hauled or left as mulch if you want it. Firewood-grade rounds can be
        left in your yard or taken away. Straight, sound hardwood logs, including oak, walnut,
        maple, and cherry, are worth more as lumber than as a load for the chipper, and Brian can
        mill them with his portable sawmill. See{' '}
        <Link href="/log-milling/">log milling</Link> and{' '}
        <Link href="/hardwood-slabs/">hardwood slabs</Link> for what that looks like. The{' '}
        <ExtLink href="https://www.fs.usda.gov/">U.S. Forest Service</ExtLink>{' '}
        research on urban wood utilization is one reason more homeowners are choosing this route
        over a landfill load.
      </p>
      <p>
        For a stump left behind, <Link href="/stump-grinding/">stump grinding</Link> is quoted
        separately. If the whole lot needs opening up, see{' '}
        <Link href="/land-clearing/">land clearing</Link>, and for trees wedged behind houses or
        over structures, our{' '}
        <Link href="/difficult-tree-removal/">difficult tree work</Link> page covers the rigging
        side. Before you hire anyone, including us, you can also search for credentialed
        arborists through the{' '}
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>.
      </p>
    </ServiceHubTemplate>
  )
}

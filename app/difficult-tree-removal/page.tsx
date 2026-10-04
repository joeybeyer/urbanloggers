import type { Metadata } from 'next'
import Link from 'next/link'
import { ExtLink } from '@/components/ui/ExtLink'
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
      tableTitle="Difficult Tree Removal — How We Handle Tough Situations"
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
      <p>
        <strong>
          Short answer: if a bucket truck or crane cannot reach the tree, or the tree cannot simply be
          dropped, we climb it and take it down in sections on ropes.
        </strong>{' '}
        Brian confirms the price on site before any work starts, and photos usually get you a
        reasonable idea of the job first.
      </p>

      <h2>When a Standard Removal Won&rsquo;t Work</h2>
      <p>
        A tree you can drop in an open yard is a simple job. The jobs people struggle to find help
        for are the others: the tree that leans over the roof, the one wedged into its neighbor after
        a storm, or the one in a backyard with a three-foot gate and no way in for a bucket truck.
        These are the jobs we&rsquo;re comfortable with.
      </p>

      <h2>How We Work Around Access</h2>
      <ul>
        <li>Climbing and sectional takedowns when no lift can reach the tree</li>
        <li>Rigging and lowering lines so pieces never free-fall onto your property</li>
        <li>Hand-carry and chip-out for yards with narrow or no vehicle access</li>
        <li>A plan for every cut before the first one is made</li>
      </ul>

      <h2>How a Precarious Tree Gets Planned</h2>
      <p>
        The first thing we look at is why the tree is difficult. A lean that has been stable for
        thirty years is a different problem from a lean that appeared after last week&rsquo;s wind.
        We check for lifted soil at the base, cracked or split trunks, hollow sections, dead limbs,
        and anything the tree is leaning on, because a hung-up tree is under load and can move when
        you cut it. Then we decide where each piece will go. The{' '}
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>{' '}
        and its homeowner site, <ExtLink href="https://www.treesaregood.org/">Trees Are Good</ExtLink>,
        both explain what a risky tree looks like and why a plan matters before cutting.
      </p>

      <h2>Rigging, Ropes, and Equipment</h2>
      <p>
        On a tight job, most of the work happens in the tree. A climber goes up, limbs are cut
        and lowered on ropes through a rigging point, and the trunk is taken down in short sections
        that can be controlled the whole way. Over a fence, a roof, or a pool, nothing is allowed to
        free-fall. On the ground we use a chipper for brush and carry logs out by hand where a truck
        cannot get close. A hand-carried, rope-lowered job takes more labor than
        an open-yard drop, which is why it costs more, and we would rather say that plainly than
        surprise you. Chainsaw and climbing work carries serious injury risk, and the{' '}
        <ExtLink href="https://www.osha.gov/">Occupational Safety and Health Administration</ExtLink>{' '}
        sets the workplace safety rules for it. That is also the reason we say no to anyone asking
        us to take shortcuts on a dangerous cut.
      </p>

      <h2>Trees Near Power Lines</h2>
      <p>
        A tree in contact with a line, or close enough that a limb could reach one, is not a
        homeowner job and not a job to start on without the utility. Stay well back and do not touch
        the tree or anything it is touching. Call us, and for lines in our part of southeast
        Wisconsin we coordinate with{' '}
        <ExtLink href="https://www.we-energies.com/">We Energies</ExtLink>. We will work near lines
        only once they have been made safe. If a line is down, treat it as live and call the utility
        first.
      </p>

      <h2>Storm Leans, Wind, and Wisconsin Weather</h2>
      <p>
        Wind is the thing that makes tough trees tougher. A tree that sat quietly for years may
        shift after a derecho, a heavy wet snow, or a thaw that leaves roots in saturated soil. We
        will not climb a tree in gusty conditions, so jobs get rescheduled when the forecast turns.
        The{' '}
        <ExtLink href="https://www.weather.gov/mkx/">National Weather Service office in Milwaukee</ExtLink>{' '}
        posts wind advisories and storm outlooks worth checking while you wait. Frozen ground in
        winter can actually help on a hard job, since it holds a crew and equipment without ruts,
        but ice on bark and limbs slows the climb, so we plan extra time.
      </p>

      <h2>Species and Condition Matter</h2>
      <p>
        What the tree is decides how it behaves. Dead ash is brittle and can break unexpectedly, which
        is why emerald ash borer damage turns many ordinary removals into rigging jobs; the{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/OakWilt">
          Wisconsin DNR oak wilt page
        </ExtLink>{' '}
        also explains why oaks should not be pruned or wounded in spring and early summer, which can
        affect when we schedule the work. Willow and silver maple tend to have weak, hollow unions.
        If you are unsure what you have or whether it is worth keeping, the{' '}
        <ExtLink href="https://extension.wisc.edu/">UW&ndash;Madison Division of Extension</ExtLink>{' '}
        has identification and tree-health resources, and we will give you our opinion either way.
      </p>

      <h2>Send Us Photos</h2>
      <p>
        With a hard job, photos help a lot. Use the <Link href="/contact/">quote form</Link> to
        attach pictures, or text a photo to the number at the top of the page. Show the tree from
        two sides, the gate or path in, and whatever sits underneath it. Brian can often tell you
        what the job involves from a photo, and he confirms the price on site before any work
        starts.
      </p>

      <h2>What Raises or Lowers the Price</h2>
      <p>
        Height and trunk size matter, but access and what is underneath matter more. A short tree
        over a glass sunroom can cost more than a tall tree in an empty lot. Hand-carry distance,
        the number of rigging points needed, rotted wood, nearby lines, and whether the wood is
        chipped or milled all change the number. We do not quote blind, and we will not promise a
        figure we have not seen. If a tree can be kept, pruned, or cabled instead, we will say that
        before we say remove it.
      </p>

      <h2>If It&rsquo;s Already Down or Hanging</h2>
      <p>
        If the tree has already come down on a structure or a limb is hanging in the canopy, that is
        an <Link href="/emergency-tree-service/">emergency</Link>. Call right away, and keep people
        and pets clear of the area. Do not stand under a hung-up tree and do not try to pull it
        down with a truck or rope. If you are dealing with a larger disaster or insurance claims, the{' '}
        <ExtLink href="https://www.fema.gov/">Federal Emergency Management Agency</ExtLink>{' '}
        publishes recovery guidance, and for wooded lots we also do{' '}
        <Link href="/land-clearing/">small-lot clearing</Link>.
      </p>
    </ServiceHubTemplate>
  )
}

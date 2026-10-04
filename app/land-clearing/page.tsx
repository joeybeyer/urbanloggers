import type { Metadata } from 'next'
import Link from 'next/link'
import { ExtLink } from '@/components/ui/ExtLink'
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
        ['Permits', 'Your municipality decides; check with them before work starts'],
        ['Insurance', 'Fully insured, docs provided'],
        ['Service Area', 'Greater Milwaukee, WI'],
      ]}
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/stump-grinding/', label: 'Stump Grinding' },
        { href: '/hardwood-slabs/', label: 'Hardwood Slabs' },
      ]}
    >
      <p>
        <strong>
          Short answer: we clear small and medium Greater Milwaukee lots, usually a few trees up to a
          few acres, with one crew handling felling, stumps, brush, and the logs worth saving.
        </strong>{' '}
        Every job is priced after a free walk-through, and the permit question belongs to your
        municipality, not to us.
      </p>

      <h2>What a Small Lot Job Looks Like</h2>
      <p>
        Plenty of lots need opening up without needing an excavation crew: a wooded back third of an
        acre, a building site, an overgrown fence line, or a yard you want clear for sun, a garage,
        or a pool. The sequence is the same on nearly every job. We walk the lot with you and mark
        what stays and what goes. Trees come down first, in sections near structures and whole where
        there is room. Logs are sorted from brush. Stumps are ground below grade. Brush is chipped or
        hauled, and the ground is raked out so it is ready for a grading contractor or seed.
      </p>

      <h2>What&rsquo;s Included</h2>
      <ul>
        <li>Free on-site walk-through and a written quote</li>
        <li>Tree felling and sectional removal, including trees near structures</li>
        <li>Brush and small-diameter wood chipped or hauled away</li>
        <li>Stump grinding below grade, so the lot is ready to grade or seed</li>
        <li>Valuable hardwood logs saved for milling, when the quality is there</li>
      </ul>

      <h2>Honest About Fit</h2>
      <p>
        We take on small and medium jobs only. If a project is bigger than our crew and equipment
        can do efficiently, such as a large commercial tract, we will say so and point you to a
        contractor with the machinery for it. We will also tell you if you do not need everything
        removed. Keeping a healthy shade tree at the edge of a new patio is often better for the
        property than a bare lot.
      </p>

      <h2>Equipment and Access Methods</h2>
      <p>
        Most of our clearing is done with climbing, rigging, chainsaws, a chipper, and a stump
        grinder rather than a bulldozer. That keeps the footprint small, which matters when the lot
        is behind a house, beside a neighbor&rsquo;s fence, or reached through a narrow gate. Where a
        chipper can reach, brush is chipped on site. Where it cannot, we carry it out or haul it.
        Chainsaws, chippers, and falling timber are real hazards, and the{' '}
        <ExtLink href="https://www.osha.gov/">Occupational Safety and Health Administration</ExtLink>{' '}
        publishes the workplace safety rules this kind of work is held to. Tree-care climbing and
        rigging practice is documented by groups such as the{' '}
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>,
        which is a good reference if you want to understand how a crew should be working.
      </p>

      <h2>Winter, Frozen Ground, and Wet Springs</h2>
      <p>
        Wisconsin gives clearing crews a real advantage in winter: frozen ground carries the weight
        of a crew and a chipper without rutting your lawn or leaving a muddy trench. Hard-frozen soil
        is often the best window for lots that stay soft and wet the rest of the year. The tradeoffs
        are short days, snow to shovel before grinding, and the occasional stump we cannot finish the
        same day because the ground is locked up. Early spring thaw is the opposite: soft soil, deep
        ruts, and a slower job. Summer is workable, but dense leaf cover makes it harder to judge
        lean and balance. Check the forecast from the{' '}
        <ExtLink href="https://www.weather.gov/mkx/">National Weather Service in Milwaukee</ExtLink>{' '}
        before you commit to a start date, because high wind will postpone felling.
      </p>

      <h2>Permits and Rules to Check First</h2>
      <p>
        Whether you need a permit depends on your municipality, your lot size, and what is on the
        lot. We can tell you what we have typically seen locally, but the decision is theirs, so call
        your city or village hall before work starts. Lots near a lake, river, or stream may fall
        under state{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/shoreland">shoreland zoning rules</ExtLink>,
        and wetlands or protected trees can change what is allowed. If you are disturbing soil on a
        larger site, the{' '}
        <ExtLink href="https://www.epa.gov/">U.S. Environmental Protection Agency</ExtLink>{' '}
        outlines construction-site erosion and stormwater expectations, and your municipality may
        enforce its own version. Utility lines on or near the lot are a separate item: tell us up
        front and we coordinate with{' '}
        <ExtLink href="https://www.we-energies.com/">We Energies</ExtLink>{' '}
        rather than working near lines ourselves.
      </p>

      <h2>Species, Ash, and Moving Wood</h2>
      <p>
        Southeast Wisconsin lots are often full of box elder, buckthorn, cottonwood, ash, and a few
        good oaks and maples. Buckthorn and box elder are mostly brush and firewood. Ash deserves a
        second thought because of the emerald ash borer, and the{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">
          Wisconsin Department of Natural Resources
        </ExtLink>{' '}
        tracks where it has spread. Moving ash firewood or logs long distances is how the insect
        travels, so infested wood should stay local. Federal quarantine information comes from{' '}
        <ExtLink href="https://www.aphis.usda.gov/">USDA APHIS</ExtLink>. For broader guidance on
        managing a wooded lot, the{' '}
        <ExtLink href="https://extension.wisc.edu/">UW&ndash;Madison Division of Extension</ExtLink>{' '}
        is a good place to read before you decide what stays.
      </p>

      <h2>Why the Wood Matters</h2>
      <p>
        Most clearing contractors burn, chip, or haul everything. Because Brian runs a portable
        sawmill, sound oak, walnut, maple, cherry, and ash logs can be set aside and milled into
        lumber or live-edge slabs, and the value of that wood can offset part of what clearing
        costs. Not every log qualifies. Rot, embedded metal from old fences, and short crooked
        trunks get chipped. Read more on our <Link href="/log-milling/">log milling</Link> page, or
        see what we do with the lumber on our <Link href="/hardwood-slabs/">hardwood slabs</Link>{' '}
        page.
      </p>

      <h2>What Affects the Cost, and What Not to Expect</h2>
      <p>
        Price follows tree count and size, stump count, how far brush must be moved, whether debris
        is chipped on site or hauled, how soft or steep the ground is, and how many logs are worth
        milling. We do not price a lot we have not seen, so do not expect a firm number over the
        phone for a wooded lot. Do not expect us to grade, excavate, pull a foundation, or haul in
        fill either. We clear the trees and stumps; a grading or excavation contractor takes it from
        there. If you want the land opened with no leftover stumps, say so at the walk-through.
        Leaving some natural material in place is also an option and can lower the price.
      </p>
    </ServiceHubTemplate>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { ExtLink } from '@/components/ui/ExtLink'
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
      <p>
        <strong>
          Short answer: our slabs come from Greater Milwaukee trees we remove and mill ourselves,
          so inventory changes with the jobs, and the way to get one is to tell us the species,
          thickness, and size you need.
        </strong>{' '}
        Slabs come off the mill green and need to dry before they are ready for a finished piece.
      </p>

      <h2>Local Hardwood, Direct From the Tree</h2>
      <p>
        Slabs aren&rsquo;t something Urban Loggers buys in from a distributor. They come from
        the trees we take down on tree-removal and{' '}
        <Link href="/land-clearing/">land-clearing</Link> jobs around Greater Milwaukee. When a
        tree has sound, straight hardwood in it, it goes on the portable mill instead of into the
        chipper. If you&rsquo;re a woodworker, furniture maker, or hobbyist looking for local
        hardwood, that makes us a source you can ask directly.
      </p>
      <p>
        A slab from a city or suburban tree has a different history than lumberyard stock.
        Yard trees grow in open sun, which often means wider growth rings, bigger limbs, and more
        figure, and also more surprises such as old nail holes, ingrown wire, and wound scars.
        Some woodworkers want exactly that character. Others want clean, quiet boards. Telling us
        which you prefer helps us point you to the right log.
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
        tree <em>before</em> it comes down. We do not post prices or a fixed list here because
        no two logs are alike; any quote comes after we know the piece you are asking about.
      </p>

      <h2>Live-Edge or Flat-Sawn</h2>
      <p>
        A live-edge slab keeps the natural outline of the trunk on one or both sides, with the
        bark either left on or removed. It suits tabletops, benches, mantels, and floating
        shelves where the shape of the tree is the point. Flat-sawn boards have straight edges
        and are easier to join into panels, build cabinets from, or use as trim.
      </p>
      <p>
        Thickness depends on the job. Thin boards dry sooner but give you less to work with when
        you flatten them. Thick slabs let you plane away warp and still finish heavy, but they
        take much longer to dry. Tell us the finished thickness you want and we can recommend a
        starting thickness that leaves room for flattening.
      </p>

      <h2>Green Wood, Drying Time, and Honest Expectations</h2>
      <p>
        Fresh-cut slabs are full of water and are not ready for indoor furniture. Air drying
        takes roughly one year per inch of thickness, so a two-inch slab needs about two years
        before it approaches stability. The{' '}
        <ExtLink href="https://www.fpl.fs.usda.gov/">USDA Forest Products Laboratory</ExtLink>{' '}
        publishes the standard guidance on wood moisture and drying, and the basics are worth
        reading before you buy any green lumber.
      </p>
      <p>
        Drying does not rule out cracking. Large slabs can still check at the ends or
        across the face, especially with pith in the board, and Wisconsin&rsquo;s swing between
        humid summers and dry heated winters moves wood all year. Always ask for the current
        moisture content and drying stage of any slab so you know exactly what you are buying.
        Before a slab goes into a finished piece, let it sit in the room where it will live and
        check it with a moisture meter, and plan joinery that lets the wood move with the seasons.
      </p>

      <h2>Species You Are Likely to See</h2>
      <p>
        Walnut, red and white oak, hard and soft maple, cherry, ash, elm, and hickory are the
        hardwoods we come across most. Ash deserves a note. Many Wisconsin ash trees have died or
        been removed because of the emerald ash borer, which is why more ash is being milled
        than in the past. The{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">
          Wisconsin DNR
        </ExtLink>{' '}
        explains the quarantine, and the{' '}
        <ExtLink href="https://www.aphis.usda.gov/">USDA APHIS</ExtLink> tracks the insect at
        the national level. Oak timing matters too: because of{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/OakWilt">oak wilt</ExtLink>,
        the DNR advises against cutting oaks in the spring and early summer window, so some oak
        removals wait for later in the year.
      </p>

      <h2>Have a Tree of Your Own?</h2>
      <p>
        If you&rsquo;re removing a good hardwood from your property, ask about having it milled
        instead of hauled off. See{' '}
        <Link href="/log-milling/">portable log milling</Link> for how it works. For help
        judging whether a tree is healthy or hazardous before you decide, the{' '}
        <ExtLink href="https://www.treesaregood.org/">Trees Are Good</ExtLink> site from the
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink> is a plain-language starting point, and{' '}
        <ExtLink href="https://extension.wisc.edu/">UW Extension</ExtLink> has guidance for
        owners managing trees on larger properties. Whatever the tree, our{' '}
        <Link href="/tree-removal/">tree removal</Link> crew can take it down safely and tell
        you honestly whether the wood is worth saving.
      </p>
    </ServiceHubTemplate>
  )
}

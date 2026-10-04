import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceHubTemplate } from '@/components/templates/ServiceHubTemplate'
import { ExtLink } from '@/components/ui/ExtLink'
import { buildMetadata } from '@/lib/metadata'

export const metadata: Metadata = buildMetadata(
  'Log Milling & Portable Sawmill Milwaukee, WI | Urban Loggers LLC',
  "Don't chip your trees — mill them. Urban Loggers LLC turns felled hardwoods into live-edge slabs, custom lumber & beams in Greater Milwaukee. Call (414) 240-4626.",
  '/log-milling/'
)

// Answer-first: `keyFact` renders as the bolded opening paragraph of the body, like the other
// service hubs. This page's short answer used to sit below longDesc, which pushed the only bolded
// text 3,105 chars past the H1 — outside the opening section the audit measures (threshold 3,000).
export default function LogMillingPage() {
  return (
    <ServiceHubTemplate
      slug="log-milling"
      h1="Portable Log Milling in Milwaukee"
      heroSub="We bring the sawmill to you, turning your felled trees into beautiful, usable lumber."
      heroImage="/images/milling.jpg"
      serviceType="Portable Log Milling"
      priceRange="$$"
      ctaLabel="Ask About Milling"
      keyFact="Short answer: Urban Loggers sets up a portable sawmill beside your tree, usually in a clear area about 20 by 20 feet, and cuts sound trunks into slabs, beams, or boards."
      tableTitle="Log Milling — What We Can Mill for You"
      tableHeaders={['Product', 'Best Species']}
      tableRows={[
        ['Live-edge slabs', 'Walnut, maple, cherry, oak'],
        ['Dimensional lumber', 'Oak, ash, pine, elm'],
        ['Fireplace mantels', 'Walnut, oak, maple'],
        ['Custom beams', 'Oak, pine, elm'],
        ['Turning blanks', 'Cherry, maple, walnut, fruitwood'],
        ['Fence boards', 'Cedar, pine, oak'],
      ]}
      related={[
        { href: '/tree-removal/', label: 'Tree Removal' },
        { href: '/hardwood-slabs/', label: 'Hardwood Slabs' },
        { href: '/land-clearing/', label: 'Land Clearing' },
      ]}
    >
      <p>
        Fresh-cut lumber then air dries for roughly one year per inch of thickness before it is
        ready for furniture or trim.
      </p>

      <h2>Why Mill a Tree Instead of Chipping It</h2>
      <p>
        Most tree services chip or landfill the trunk once the tree is on the ground. That is the
        quickest way to clear a yard, but it turns a hardwood that took decades to grow into
        mulch. Every year, a lot of good Wisconsin oak, walnut, and maple is chipped or hauled to
        a landfill because the crew has no way to cut it into anything else. Brian Smith runs a
        portable bandsaw mill, so a healthy trunk has another option. You can end up with a
        mantel, a tabletop, shelving, or rough-sawn boards for a barn or shop project, cut from a
        tree you already knew.
      </p>
      <p>
        There is also a practical side. When the wood has real value, milling can offset part of
        what the removal costs you, and it keeps heavy trunks from being trucked out. The{' '}
        <ExtLink href="https://www.isa-arbor.com/">International Society of Arboriculture</ExtLink>{' '}
        is where certified arborists look for standards on safe tree work, and a tree that has to
        come down should not be wasted if the wood is sound. Not every tree qualifies, and we
        will say so before the saw starts.
      </p>

      <h2>What Makes a Trunk Worth Milling</h2>
      <p>
        The sawmill can only cut what the tree grew. Before we commit to a mill day, we look at
        the trunk for the things that decide how much usable lumber it holds.
      </p>
      <ul>
        <li>Straightness and length of the clear trunk before the first big limb</li>
        <li>Diameter, since wider trunks give wider slabs</li>
        <li>Rot, hollow centers, or cavities from old storm damage</li>
        <li>Embedded metal such as fence wire, nails, or old tree hardware</li>
        <li>Species, because walnut, cherry, oak, and maple are the usual favorites</li>
      </ul>
      <p>
        Metal is the one that surprises people. A wire fence grown into a maple decades ago can
        ruin a bandsaw blade, so a log with hidden metal may be cut differently or skipped. A
        tree that is hollow or soft in the middle may still give a few useful boards from the
        outer wood, and sometimes it gives none. A short walk around the tree usually tells us
        which one you have.
      </p>

      <h2>How a Milling Day Works</h2>
      <p>
        The steps below are the same whether the tree is in a backyard, a driveway, or a rural
        lot. The mill is portable and runs beside the log, so the heavy trunk never has to be
        moved far.
      </p>
      <ul>
        <li>We assess the log for quality and mill-ability, ideally during your tree removal</li>
        <li>The portable bandsaw mill is set up alongside the log on level ground</li>
        <li>You choose the cuts: slabs, dimensional lumber, beams, or a mix</li>
        <li>Green lumber is stickered and stacked for air drying, or connected to a kiln</li>
        <li>You keep the lumber, or we can talk through delivery and storage</li>
      </ul>
      <p>
        Thickness matters more than most people expect. Tabletop slabs are usually cut thick
        enough to be flattened later, and lumber for shop projects is cut a little over its final
        size to allow for shrinkage. Tell us what the wood is for and we will suggest a cut that
        leaves you room to finish it properly.
      </p>

      <h2>Drying Green Lumber Without Cracking It</h2>
      <p>
        Freshly sawn lumber is wet. As it dries it shrinks, and uneven drying is what causes
        checks, cups, and splits. Wood science from the{' '}
        <ExtLink href="https://www.fpl.fs.usda.gov/">USDA Forest Products Laboratory</ExtLink>{' '}
        is the standard reference on this, and its basic point is simple: dry slowly, evenly, and
        out of direct sun and wind.
      </p>
      <p>
        For air drying, the working rule is about one year per inch of thickness, so a two-inch
        slab needs around two years before it is close to stable. After that, lumber meant for
        indoor furniture is usually brought down further in a heated space or a kiln. We can
        kiln-dry smaller batches or connect you with local kiln services when you need results
        sooner. Stack boards flat on level supports, put thin spacers called stickers between
        layers, keep the pile covered from rain, and add weight on top to hold the boards flat.
      </p>
      <p>
        If you already have logs on your property, keep them shaded and off the ground until
        they are milled. Logs left lying in damp soil start to stain and rot, and logs left in
        full sun can crack at the ends. Sealing the cut ends helps slow moisture loss while they
        wait.
      </p>

      <h2>Ash, Oak, and the Rules That Affect Your Wood</h2>
      <p>
        Wisconsin has two tree health problems that touch milling directly. Ash trees across the
        state have been hit by the emerald ash borer, and the{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/EmeraldAshBorer">
          Wisconsin DNR emerald ash borer page
        </ExtLink>{' '}
        explains the quarantine and why moving ash wood carries restrictions. Dead ash can also
        become brittle, so an ash that has been standing dead for a few years may be better for
        firewood than for lumber. Federal pest programs such as those run by{' '}
        <ExtLink href="https://www.aphis.usda.gov/">USDA APHIS</ExtLink> track invasive insects
        that travel in logs and firewood, which is another reason to keep wood local.
      </p>
      <p>
        Oak wilt is the other concern. The disease spreads through fresh wounds on oaks, and the{' '}
        <ExtLink href="https://dnr.wisconsin.gov/topic/ForestHealth/OakWilt">
          Wisconsin DNR oak wilt guidance
        </ExtLink>{' '}
        advises against pruning or cutting oaks during the spring and early summer risk window.
        That can affect when an oak is removed, and it is a good reason to call before you start
        cutting. Lumber from an oak wilt tree should be handled with care and not moved far.
      </p>

      <h2>Safety and Setup on Your Property</h2>
      <p>
        Logs are heavy, and a rolling trunk is dangerous. Keep children and pets away from the
        mill area, and do not try to roll or lift large logs yourself. Workplace safety rules from{' '}
        <ExtLink href="https://www.osha.gov/">OSHA</ExtLink> cover commercial sawmill and
        logging operations. We need level, clear ground
        about 20 by 20 feet, a way for the crew to reach the log, and room to stack the finished
        lumber. We work in backyards, driveways, and rural lots. Homeowners can also learn more
        about tree care in general from{' '}
        <ExtLink href="https://www.treesaregood.org/">Trees Are Good</ExtLink>, the consumer site
        run by the ISA.
      </p>

      <h2>Where the Lumber Goes Next</h2>
      <p>
        Plenty of customers keep their lumber for a project of their own, from a dining table to
        shelves to a bench. If you would rather buy locally milled wood than mill your own tree,
        see our{' '}
        <Link href="/hardwood-slabs/">hardwood slabs</Link> page for how inventory requests work.
        If the tree still needs to come down, start with{' '}
        <Link href="/tree-removal/">tree removal</Link>, and for bigger lots with several trees
        look at <Link href="/land-clearing/">land clearing</Link>, where the best hardwood is
        saved for the mill. University of Wisconsin{' '}
        <ExtLink href="https://extension.wisc.edu/">Extension</ExtLink> also publishes guides on
        woodland care for owners with larger properties.
      </p>
    </ServiceHubTemplate>
  )
}

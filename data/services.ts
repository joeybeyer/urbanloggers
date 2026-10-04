export interface FAQ {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  shortDesc: string
  longDesc: string
  icon: string
  image?: string
  faqs: FAQ[]
}

export const services: Service[] = [
  {
    slug: 'tree-removal',
    name: 'Tree Removal',
    shortDesc: 'Safe, efficient removal of hazardous or unwanted trees of any size.',
    icon: '🌲',
    image: '/images/tree-removal.jpg',
    longDesc:
      'Whether a tree is dead, diseased, storm-damaged, or simply in the wrong place, Urban Loggers LLC removes it safely and efficiently. Brian\'s 20+ years of experience means every job is assessed for the safest felling method — sectional takedowns, rigging, or full directional felling depending on your property.',
    faqs: [
      {
        question: 'How much does tree removal cost in Milwaukee?',
        answer:
          'Tree removal in Milwaukee typically ranges from $300 to $2,000+ depending on tree size, location, and complexity. Contact us for a free on-site estimate.',
      },
      {
        question: 'Do you haul away the wood and debris?',
        answer:
          'Yes. We offer full cleanup and debris removal. We can also mill usable logs on-site with our portable sawmill — turning your tree into lumber rather than landfill.',
      },
      {
        question: 'Are you insured for tree removal in Wisconsin?',
        answer:
          'Absolutely. Urban Loggers LLC is fully insured. We carry liability and workers\' comp so you\'re protected.',
      },
      {
        question: 'How long does tree removal take?',
        answer:
          'Most residential tree removals take 2–6 hours. Large or complex jobs may take a full day. We\'ll give you a timeline when we assess the tree.',
      },
    ],
  },
  {
    slug: 'tree-trimming-pruning',
    name: 'Tree Trimming & Pruning',
    shortDesc: 'Crown thinning, deadwood removal, and structural pruning to keep trees healthy.',
    icon: '✂️',
    image: '/images/trimming.jpg',
    longDesc:
      'Proper pruning keeps trees healthy, safe, and beautiful. Urban Loggers LLC follows ANSI A300 pruning standards — we don\'t just cut branches, we shape trees for long-term structural integrity. Services include crown thinning, crown raising, deadwood removal, and fruit tree/orchard pruning.',
    faqs: [
      {
        question: 'When is the best time to trim trees in Wisconsin?',
        answer:
          'Late winter (February–March) is ideal for most species — trees are dormant, pests are inactive, and structure is visible. Some species like oaks should be pruned only in winter to prevent oak wilt.',
      },
      {
        question: 'What\'s the difference between trimming and pruning?',
        answer:
          'Trimming typically means cutting for aesthetics and clearance. Pruning is targeted removal of specific branches to improve tree health, structure, and safety. We do both.',
      },
      {
        question: 'Can you prune large mature trees?',
        answer:
          'Yes. We\'re equipped for large canopy trees using climbing gear and aerial lifts. No tree is too big for a proper pruning assessment.',
      },
    ],
  },
  {
    slug: 'stump-grinding',
    name: 'Stump Grinding',
    shortDesc: 'Complete stump removal below grade so you can replant or sod over the area.',
    icon: '⚙️',
    image: '/images/stump-grinding.jpg',
    longDesc:
      'Left-over stumps are trip hazards, eyesores, and breeding grounds for pests. Our commercial stump grinder removes stumps to 12 inches below grade, leaving nothing but wood chips you can use as mulch. We can grind a single stump or clear an entire lot.',
    faqs: [
      {
        question: 'How much does stump grinding cost in Milwaukee?',
        answer:
          'Stump grinding typically costs $75–$400 per stump depending on diameter and root complexity. Multi-stump jobs get a discount.',
      },
      {
        question: 'Will stump grinding kill the roots?',
        answer:
          'Grinding removes the stump and major surface roots. Some species (like cottonwood or elm) may resprout from remaining roots — we can treat with herbicide if needed.',
      },
      {
        question: 'Can I plant a new tree where the stump was?',
        answer:
          'Yes, after grinding to proper depth and removing wood chip debris, you can replant. We recommend waiting 6–12 months for the remaining root system to decompose.',
      },
    ],
  },
  {
    slug: 'emergency-tree-service',
    name: 'Emergency Tree Service',
    shortDesc: '24/7 storm response — fallen trees on homes, vehicles, and power lines.',
    icon: '🚨',
    image: '/images/emergency.jpg',
    longDesc:
      'Storm damage doesn\'t wait for business hours. Urban Loggers LLC responds to emergency calls throughout Greater Milwaukee — fallen trees on roofs, vehicles, or blocking access. We stabilize the situation, document for insurance, and complete cleanup. Call anytime.',
    faqs: [
      {
        question: 'Do you offer 24/7 emergency tree service?',
        answer:
          'Yes. Call (414) 240-4626 any time for emergency response. We prioritize calls where a tree is on a structure or blocking access.',
      },
      {
        question: 'Does homeowner\'s insurance cover emergency tree removal?',
        answer:
          'Usually yes, if the tree hit a structure. We can document the damage and provide itemized invoices for your insurance claim.',
      },
      {
        question: 'What if a tree is near a power line?',
        answer:
          'Do not attempt to remove trees touching power lines yourself. Call us — we coordinate with We Energies for safe clearance and can work around de-energized lines.',
      },
      {
        question: 'How fast can you respond to an emergency?',
        answer:
          'We aim to be on-site within 2–4 hours for urgent situations in Greater Milwaukee. Response time depends on storm volume and your location.',
      },
    ],
  },
  {
    slug: 'log-milling',
    name: 'Log Milling',
    shortDesc: 'Portable sawmill turns your felled trees into usable lumber — slabs, beams, and boards.',
    icon: '🪵',
    image: '/images/milling.jpg',
    longDesc:
      'Most tree services chip or landfill your trees. Urban Loggers LLC brings a portable sawmill to your property and mills felled logs into usable lumber — live-edge slabs, dimensional lumber, fireplace mantels, and custom beams. It\'s sustainable, beautiful, and turns a loss into an asset.',
    faqs: [
      {
        question: 'What species can you mill?',
        answer:
          'We mill virtually any hardwood or softwood — oak, maple, walnut, cherry, ash, elm, pine, and more. Walnut and cherry slabs are especially popular.',
      },
      {
        question: 'How long does milled lumber need to dry?',
        answer:
          'Green lumber needs 1 year of air drying per inch of thickness. We can kiln-dry smaller batches or connect you with local kiln services for faster results.',
      },
      {
        question: 'Can you mill a tree I already had removed?',
        answer:
          'Yes — if you have logs stored on your property, we can schedule a milling session. Logs should be kept shaded and off the ground to preserve quality.',
      },
      {
        question: 'Do I need a large property for portable milling?',
        answer:
          'We need enough space to set up the mill alongside the log — typically a 20×20 ft clear area is sufficient. We work in backyards, driveways, and rural lots.',
      },
    ],
  },
  {
    slug: 'land-clearing',
    name: 'Land Clearing',
    shortDesc: 'Small and mid-size lot clearing — trees, brush, and stumps removed, with the best hardwood saved for milling.',
    icon: '🚜',
    image: '/images/stump-grinding.jpg',
    longDesc:
      'Urban Loggers LLC clears small and medium-sized lots across Greater Milwaukee — building sites, overgrown backyards, fence lines, and acreage that needs to be opened up. We take down the trees, grind the stumps, and haul or chip the brush. And because Brian runs a portable sawmill, the good hardwood that comes off your land doesn\'t get chipped: it gets milled into lumber and live-edge slabs.',
    faqs: [
      {
        question: 'How much does land clearing cost in Wisconsin?',
        answer:
          'Small residential lot clearing commonly runs from a few thousand dollars up, depending on tree density, stump count, access, and whether debris is hauled or chipped on site. Every job is priced after a free on-site walk-through — we won\'t quote a lot we haven\'t seen.',
      },
      {
        question: 'How big a job do you take on?',
        answer:
          'We specialize in small and medium clearing — backyards, building lots, fence lines, and acreage that a crew and a portable mill can handle efficiently. For very large commercial tracts we\'ll tell you honestly if another contractor is a better fit.',
      },
      {
        question: 'What happens to the trees and brush?',
        answer:
          'Brush is chipped or hauled. Straight, sound hardwood logs — oak, walnut, maple, cherry, ash — can be set aside and milled into lumber or slabs. Depending on the quality of the logs, that can reduce your cost.',
      },
      {
        question: 'Do you grind the stumps too?',
        answer:
          'Yes. We can grind every stump to below grade so the lot is ready for grading, building, or seed. Stump grinding is quoted as part of the clearing job.',
      },
      {
        question: 'Do I need a permit to clear land?',
        answer:
          'It depends on your municipality, lot size, and whether there are protected trees, wetlands, or shoreland zones. Check with your city or county before work begins — we can tell you what we\'ve typically seen locally, but the permit decision is the municipality\'s.',
      },
    ],
  },
  {
    slug: 'difficult-tree-removal',
    name: 'Difficult Tree Removal',
    shortDesc: 'Precarious, leaning, and hard-to-reach trees — removed with rigging and climbing where machines can\'t go.',
    icon: '🧗',
    image: '/images/tree-removal.jpg',
    longDesc:
      'Some trees can\'t be dropped the easy way. They lean over a house, hang over power lines, sit behind a fence, or stand in a backyard no truck or lift can reach. Urban Loggers LLC specializes in exactly these jobs — climbing, sectional rigging, and controlled lowering so every piece comes down where we want it, not where gravity does.',
    faqs: [
      {
        question: 'What makes a tree "precarious"?',
        answer:
          'A tree is precarious when it\'s leaning, split, partially uprooted, hung up in another tree, or heavy on one side over something valuable. These need a different plan than a standard removal — often climbing and rigging instead of felling.',
      },
      {
        question: 'Can you remove a tree my backyard has no access to?',
        answer:
          'Usually, yes. When no lift or truck can reach the tree — a fenced yard, a narrow side gate, a steep slope — we climb it and take it down in sections, lowering each piece with ropes. Hand-carried and rigged removal costs more than open-access work, and we\'ll quote it clearly up front.',
      },
      {
        question: 'Is it safe to remove a tree that\'s leaning toward my house?',
        answer:
          'It\'s safe when done correctly, which means a plan, not a guess. We assess the lean and any root or trunk damage, then rig the tree so sections are controlled the whole way down. Don\'t attempt a leaning tree yourself.',
      },
      {
        question: 'What about trees near power lines?',
        answer:
          'Never touch a tree that is in contact with power lines. Call us and we coordinate with We Energies where lines are involved, and work around de-energized lines when cleared.',
      },
      {
        question: 'Is a precarious tree an emergency?',
        answer:
          'If it has already fallen on or against a structure, or a limb is hanging, yes — see our emergency tree service page and call right away. If it\'s leaning and stable, we\'ll schedule a prompt assessment.',
      },
    ],
  },
  {
    slug: 'hardwood-slabs',
    name: 'Hardwood Slabs',
    shortDesc: 'Locally sourced hardwood slabs and lumber for woodworkers — milled from Wisconsin trees, never imported.',
    icon: '🪑',
    image: '/images/milling.jpg',
    longDesc:
      'Urban Loggers LLC takes down hardwoods across Greater Milwaukee every week, and the best of them end up on our sawmill instead of in a chipper. That means locally sourced live-edge and flat-sawn slabs for woodworkers, furniture makers, and homeowners — with a known story for every board. If you\'re looking for a specific species or size, tell us and we\'ll keep an eye out on upcoming jobs.',
    faqs: [
      {
        question: 'What hardwood species do you have?',
        answer:
          'Availability depends on the trees we take down, so it changes. Common Wisconsin hardwoods we come across include red and white oak, hard and soft maple, black walnut, cherry, ash, elm, and hickory. Tell us what you\'re after and we\'ll let you know what\'s in stock or coming.',
      },
      {
        question: 'Are the slabs dry and ready to use?',
        answer:
          'Slabs come off the mill green and need to air dry roughly one year per inch of thickness, then be conditioned before use. Ask us about the current moisture content and drying stage of any slab so you know exactly what you\'re buying.',
      },
      {
        question: 'Can I get a slab custom-cut to my thickness?',
        answer:
          'Often, yes — if the log is still available and uncut. Tell us the species, thickness, and approximate length you need and we\'ll see whether an upcoming log fits.',
      },
      {
        question: 'Can I reserve a slab from a tree before it comes down?',
        answer:
          'Yes, and that\'s often the best route for a specific project. If you\'d like a slab from a particular tree, or from your own tree being removed, contact us before the removal so we can plan the cuts.',
      },
      {
        question: 'Can I buy lumber from a tree removed on my own property?',
        answer:
          'Yes. Many customers have a tree milled from their own yard into a table, mantel, or shelves. See our log milling page for how that works.',
      },
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

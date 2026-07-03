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
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

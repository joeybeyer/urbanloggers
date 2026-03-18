export interface LocationFAQ {
  question: string
  answer: string
}

export interface Location {
  slug: string
  name: string
  county: string
  intro: string
  faqs: LocationFAQ[]
}

export const locations: Location[] = [
  {
    slug: 'milwaukee',
    name: 'Milwaukee',
    county: 'Milwaukee County',
    intro:
      'Urban Loggers LLC is Greater Milwaukee\'s trusted tree service. From the urban canopy of the East Side to the mature oaks of Wauwatosa and beyond, Brian Smith and his crew handle every job with craft and care.',
    faqs: [
      {
        question: 'Do you serve all Milwaukee neighborhoods?',
        answer:
          'Yes — we serve all Milwaukee neighborhoods including the East Side, Bay View, Riverwest, Walker\'s Point, Menomonee Falls, and surrounding suburbs.',
      },
      {
        question: 'Are you licensed to work in Milwaukee city limits?',
        answer:
          'Yes. We hold all required Wisconsin licenses and insurance to work in Milwaukee city limits and surrounding municipalities.',
      },
      {
        question: 'Does Milwaukee have tree removal permits?',
        answer:
          'Milwaukee requires a permit to remove trees larger than 12" DBH on public property. We handle permit applications as part of our service for qualifying jobs.',
      },
    ],
  },
  {
    slug: 'wauwatosa',
    name: 'Wauwatosa',
    county: 'Milwaukee County',
    intro:
      'Wauwatosa\'s mature tree canopy is one of its most prized assets — and one of its biggest maintenance responsibilities. Urban Loggers LLC provides expert tree removal, trimming, and stump grinding throughout Wauwatosa, treating every tree with the respect a 100-year-old oak deserves.',
    faqs: [
      {
        question: 'Do you handle Wauwatosa\'s emerald ash borer problem?',
        answer:
          'Yes. We assess ash trees for EAB damage and can treat salvageable trees or safely remove and mill infested ash into lumber.',
      },
      {
        question: 'Do you work in Wauwatosa Village and surrounding areas?',
        answer:
          'We serve all of Wauwatosa including the Village, Hart Park area, and neighborhoods bordering Brookfield and Milwaukee.',
      },
    ],
  },
  {
    slug: 'west-allis',
    name: 'West Allis',
    county: 'Milwaukee County',
    intro:
      'West Allis homeowners trust Urban Loggers LLC for fast, professional tree service. Whether it\'s a dying silver maple threatening your garage or storm cleanup after a derecho, we respond quickly and clean up completely.',
    faqs: [
      {
        question: 'Do you offer emergency tree service in West Allis?',
        answer:
          'Yes — 24/7 emergency response throughout West Allis and West Milwaukee. Call (414) 514-0750 any time.',
      },
      {
        question: 'Can you remove trees near West Allis utility lines?',
        answer:
          'We coordinate with utility companies for safe clearance near power lines. Never attempt to remove a tree touching a live line yourself.',
      },
    ],
  },
  {
    slug: 'greenfield',
    name: 'Greenfield',
    county: 'Milwaukee County',
    intro:
      'From Greenfield Park to the neighborhoods along 27th Street, Urban Loggers LLC serves Greenfield homeowners with professional tree removal, pruning, and stump grinding. Locally rooted, fully insured.',
    faqs: [
      {
        question: 'Do you service Greenfield and Hales Corners?',
        answer:
          'Yes — we serve Greenfield, Hales Corners, Greendale, and surrounding southern Milwaukee suburbs.',
      },
      {
        question: 'Can you remove a tree close to my Greenfield home\'s foundation?',
        answer:
          'Yes. We specialize in precision removals in tight spaces — sectional takedowns and rigging protect your home and landscaping.',
      },
    ],
  },
  {
    slug: 'shorewood',
    name: 'Shorewood',
    county: 'Milwaukee County',
    intro:
      'Shorewood\'s dense urban lots and mature street trees require a careful touch. Urban Loggers LLC works in tight spaces, coordinates with the village on right-of-way trees, and leaves your property cleaner than we found it.',
    faqs: [
      {
        question: 'Does Shorewood have rules about street tree removal?',
        answer:
          'Yes — Shorewood Village owns street trees and requires a permit for removal or significant trimming. We work with the village DPW on your behalf.',
      },
      {
        question: 'Do you work in Whitefish Bay and Fox Point too?',
        answer:
          'Yes — we serve the entire North Shore corridor including Whitefish Bay, Fox Point, Bayside, and River Hills.',
      },
    ],
  },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

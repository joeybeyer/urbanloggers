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
  // Milwaukee County
  {
    slug: 'milwaukee',
    name: 'Milwaukee',
    county: 'Milwaukee County',
    intro:
      'Urban Loggers LLC is Greater Milwaukee\'s trusted tree service. From the urban canopy of the East Side to the mature oaks of Bay View and beyond, Brian Smith and his crew handle every job with craft and care.',
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
    slug: 'south-milwaukee',
    name: 'South Milwaukee',
    county: 'Milwaukee County',
    intro:
      'South Milwaukee homeowners rely on Urban Loggers LLC for expert tree removal, trimming, and stump grinding. We serve the entire South Milwaukee area with the same care and expertise we bring to every job across Greater Milwaukee.',
    faqs: [
      {
        question: 'Do you serve South Milwaukee and Cudahy?',
        answer:
          'Yes — we cover South Milwaukee, Cudahy, St. Francis, and the surrounding lakefront communities.',
      },
      {
        question: 'How quickly can you respond to storm damage in South Milwaukee?',
        answer:
          'We aim to be on-site within 2–4 hours for emergency situations. Call (414) 514-0750 any time for urgent tree hazards.',
      },
    ],
  },
  // Waukesha County
  {
    slug: 'waukesha',
    name: 'Waukesha',
    county: 'Waukesha County',
    intro:
      'Urban Loggers LLC brings professional tree care to Waukesha and the western suburbs. With mature hardwoods throughout the Fox River corridor and residential neighborhoods, Waukesha homeowners need a tree service that knows the species and the terrain.',
    faqs: [
      {
        question: 'Do you serve Waukesha County?',
        answer:
          'Yes — we serve Waukesha, Brookfield, New Berlin, Pewaukee, and surrounding Waukesha County communities.',
      },
      {
        question: 'What tree services do you offer in Waukesha?',
        answer:
          'We offer tree removal, trimming and pruning, stump grinding, emergency tree service, and portable log milling throughout the Waukesha area.',
      },
    ],
  },
  {
    slug: 'brookfield',
    name: 'Brookfield',
    county: 'Waukesha County',
    intro:
      'Brookfield\'s wooded lots and established neighborhoods are home to some of the most impressive hardwood canopy in the Milwaukee metro. Urban Loggers LLC has the equipment and experience to handle large-scale removals and precision pruning in Brookfield\'s tight suburban settings.',
    faqs: [
      {
        question: 'Do you remove large oak trees in Brookfield?',
        answer:
          'Yes — we specialize in large canopy hardwoods including oaks, maples, and ashes. We use sectional takedown techniques to protect your home and landscaping.',
      },
      {
        question: 'Can you mill a felled tree on my Brookfield property?',
        answer:
          'Absolutely. Our portable sawmill comes to you — we can turn your felled hardwood into live-edge slabs, beams, or dimensional lumber on-site.',
      },
    ],
  },
  {
    slug: 'new-berlin',
    name: 'New Berlin',
    county: 'Waukesha County',
    intro:
      'New Berlin\'s mix of wooded residential lots and open properties means varied tree care challenges. Urban Loggers LLC serves New Berlin with expert removal, trimming, and stump grinding — whether you\'re on a half-acre lot or a rural parcel.',
    faqs: [
      {
        question: 'Do you serve New Berlin and surrounding areas?',
        answer:
          'Yes — we serve New Berlin, Muskego, Big Bend, and the rural areas of southern Waukesha County.',
      },
      {
        question: 'Do you handle large-lot tree removal in New Berlin?',
        answer:
          'Yes — we work on properties of all sizes, from tight city lots to multi-acre rural parcels with heavy equipment access.',
      },
    ],
  },
  {
    slug: 'pewaukee',
    name: 'Pewaukee',
    county: 'Waukesha County',
    intro:
      'Lake Pewaukee\'s shoreline properties and the surrounding community have unique tree care needs — shoreline trees, wind exposure, and lot setbacks all factor into safe removal and pruning. Urban Loggers LLC brings the expertise to handle it all.',
    faqs: [
      {
        question: 'Do you remove trees near the shoreline in Pewaukee?',
        answer:
          'Yes — we\'re familiar with Wisconsin DNR setback requirements for shoreline work and can advise on permit requirements for trees near the water.',
      },
      {
        question: 'Do you serve the Pewaukee Lake area?',
        answer:
          'Yes — we serve Pewaukee, Village of Pewaukee, and the Lake Pewaukee shoreline communities.',
      },
    ],
  },
  // Racine County
  {
    slug: 'racine',
    name: 'Racine',
    county: 'Racine County',
    intro:
      'Urban Loggers LLC provides professional tree removal, trimming, and emergency response throughout Racine and Racine County. Racine\'s lakefront setting and aging tree canopy demand an experienced crew — that\'s exactly what Brian Smith delivers.',
    faqs: [
      {
        question: 'Do you offer tree service in Racine, WI?',
        answer:
          'Yes — we serve Racine, Mount Pleasant, Sturtevant, and surrounding Racine County communities.',
      },
      {
        question: 'Can you handle storm damage cleanup in Racine?',
        answer:
          'Yes — we respond to storm emergencies 24/7. Call (414) 514-0750 any time for downed trees, hazardous limbs, or trees on structures.',
      },
    ],
  },
  {
    slug: 'mount-pleasant',
    name: 'Mount Pleasant',
    county: 'Racine County',
    intro:
      'Mount Pleasant is one of the fastest-growing communities in Southeast Wisconsin, with established neighborhoods and new developments both needing quality tree care. Urban Loggers LLC serves Mount Pleasant with the same expertise we bring to all of Greater Milwaukee.',
    faqs: [
      {
        question: 'Do you remove trees in Mount Pleasant and Sturtevant?',
        answer:
          'Yes — we serve Mount Pleasant, Sturtevant, Caledonia, and surrounding areas of Racine County.',
      },
      {
        question: 'Can you grind stumps on new construction lots in Mount Pleasant?',
        answer:
          'Yes — lot clearing and stump grinding for new construction is a common service. We can grind multiple stumps efficiently and leave the site ready for grading.',
      },
    ],
  },
  // Ozaukee County
  {
    slug: 'mequon',
    name: 'Mequon',
    county: 'Ozaukee County',
    intro:
      'Mequon\'s large wooded lots and Lake Michigan shoreline properties are home to mature hardwoods that require expert care. Urban Loggers LLC serves Mequon homeowners with precision tree removal, pruning, and log milling on properties of all sizes.',
    faqs: [
      {
        question: 'Do you serve Mequon and Thiensville?',
        answer:
          'Yes — we serve Mequon, Thiensville, and the surrounding North Shore communities of Ozaukee County.',
      },
      {
        question: 'Can you mill walnut or oak from my Mequon property?',
        answer:
          'Absolutely — Mequon properties often have exceptional hardwoods. Our portable sawmill turns your felled trees into beautiful slabs and lumber on-site.',
      },
    ],
  },
  {
    slug: 'cedarburg',
    name: 'Cedarburg',
    county: 'Ozaukee County',
    intro:
      'Cedarburg\'s historic character and wooded neighborhoods call for a tree service that\'s precise and respectful of the surroundings. Urban Loggers LLC has worked throughout Ozaukee County and brings the same craftsmanship to Cedarburg that we bring everywhere.',
    faqs: [
      {
        question: 'Do you serve Cedarburg and Grafton?',
        answer:
          'Yes — we serve Cedarburg, Grafton, Port Washington, and surrounding Ozaukee County communities.',
      },
      {
        question: 'Do you prune fruit trees in Cedarburg?',
        answer:
          'Yes — Brian has a passion for orchard and specialty pruning. We work with homeowners and small orchards throughout the area.',
      },
    ],
  },
  {
    slug: 'port-washington',
    name: 'Port Washington',
    county: 'Ozaukee County',
    intro:
      'Port Washington\'s lakefront bluffs and historic neighborhoods have trees that require careful, experienced hands. Urban Loggers LLC serves Port Washington with expert tree removal, trimming, and emergency response — handling the unique challenges of bluff-side properties with care.',
    faqs: [
      {
        question: 'Can you remove trees on bluff properties in Port Washington?',
        answer:
          'Yes — bluff-side removals require specialized rigging and sectional techniques. We assess every job for the safest approach before starting.',
      },
      {
        question: 'Do you serve Port Washington and Belgium?',
        answer:
          'Yes — we serve Port Washington, Belgium, Saukville, and the surrounding northern Ozaukee County communities.',
      },
    ],
  },
]

// Milwaukee County cities (primary hub spoke)
export const milwaukeeCountyCities = locations.filter(
  (l) => l.county === 'Milwaukee County'
)

// All county hubs
export const countyGroups = [
  { county: 'Milwaukee County', cities: locations.filter((l) => l.county === 'Milwaukee County') },
  { county: 'Waukesha County', cities: locations.filter((l) => l.county === 'Waukesha County') },
  { county: 'Racine County', cities: locations.filter((l) => l.county === 'Racine County') },
  { county: 'Ozaukee County', cities: locations.filter((l) => l.county === 'Ozaukee County') },
]

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}

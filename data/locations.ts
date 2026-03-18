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
      'Milwaukee’s dense neighborhoods and street-tree canopy create constant tree-care needs, from the East Side and Riverwest to Bay View, Walker’s Point, and the Historic Third Ward. Urban Loggers LLC handles the city’s most common jobs — emerald ash borer removals, safety pruning over alleys, and careful trimming around duplexes on tight lots near Humboldt Boulevard, Lake Park, and Washington Park.' +
      '\n\n' +
      'Brian Smith’s crew understands the city’s rules for public trees and the realities of urban access, whether we’re rigging a large ash off a narrow Riverwest driveway or staging equipment near the Kinnickinnic River Parkway. We’re fully insured and bring 20+ years of experience to Milwaukee’s mix of historic homes, condo developments, and busy commercial corridors.',
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Milwaukee?',
        answer:
          'Milwaukee requires a permit for trees larger than 12" DBH that are on public property (such as the terrace or boulevard). We can help confirm whether a tree is public or private and handle the permit process when needed. For private trees, permits are usually not required unless there are special historic or development conditions.',
      },
      {
        question: 'How do you handle alley access and parking in dense neighborhoods?',
        answer:
          'In areas like Riverwest, the East Side, and Walker’s Point, we often use sectional removals and small-footprint equipment to avoid blocking alleys. When street staging is required, we coordinate placement to keep parking impacts minimal and protect overhead utilities. We plan every job around the lot layout and the neighborhood’s traffic flow.',
      },
      {
        question: 'What tree problems are most common in Milwaukee?',
        answer:
          'Emerald ash borer has hit Milwaukee hard, so ash removals and replanting plans are frequent. We also see older silver maples with storm-damaged limbs and large oaks that need structural pruning. Our crew can identify species issues and recommend the safest, most cost-effective solution.',
      },
    ],
  },
  {
    slug: 'wauwatosa',
    name: 'Wauwatosa',
    county: 'Milwaukee County',
    intro:
      'Wauwatosa’s tree-lined streets — from the Village to Washington Highlands and East Tosa — are known for mature elms, oaks, and maples that need skilled pruning and occasional removals. Urban Loggers LLC works throughout Hart Park, along the Menomonee River Parkway, and near the County Grounds, where older trees can overhang homes, sidewalks, and power lines.' +
      '\n\n' +
      'Because many Tosa neighborhoods feature historic homes and narrow driveways, we rely on precision rigging and clean cleanup to protect landscaping and masonry. Brian Smith brings 20+ years of experience and full insurance to keep Wauwatosa’s canopy healthy while handling storm-damaged or declining trees safely.',
    faqs: [
      {
        question: 'Are permits required for removing boulevard trees in Wauwatosa?',
        answer:
          'Trees in the terrace or boulevard are generally city-owned in Wauwatosa, and removal usually requires approval. We can help you determine ownership and coordinate the necessary permit or inspection. For private yard trees, permits are less common, but we still confirm before work starts.',
      },
      {
        question: 'Do you handle Dutch elm disease concerns in Tosa?',
        answer:
          'Yes. Wauwatosa still has mature elms, so we inspect for early signs of Dutch elm disease and recommend pruning or removal when appropriate. Timing matters; we typically avoid pruning elms during peak beetle season to reduce risk.',
      },
      {
        question: 'Can you work around tight driveways and historic homes?',
        answer:
          'Absolutely. Many homes near the Village and Washington Highlands have limited access, so we use sectional takedowns and rope rigging to control every piece. This keeps roofs, gutters, and landscaping safe while still completing the job efficiently.',
      },
    ],
  },
  {
    slug: 'west-allis',
    name: 'West Allis',
    county: 'Milwaukee County',
    intro:
      'West Allis combines older housing stock with hardworking neighborhoods like Six Points, West Milwaukee, and areas around the State Fair Park and Greenfield Avenue. Urban Loggers LLC is often called for storm-damaged silver maples, clearance pruning near garages, and removals on narrow lots where driveways and fences leave little room for error.' +
      '\n\n' +
      'We’re equipped to handle tight access off Becher Street or Lincoln Avenue and to coordinate safe removals around overhead lines. With 20+ years of experience, Brian Smith delivers fast, clean work and 24/7 emergency response when storms roll through the West Allis corridor.',
    faqs: [
      {
        question: 'How quickly can you respond to storm damage in West Allis?',
        answer:
          'For hazardous trees or limbs after a storm, we prioritize West Allis calls and often respond the same day. If a tree is on a structure or blocking a driveway, call us at (414) 514-0750 for emergency scheduling. We’ll secure the site and remove debris safely.',
      },
      {
        question: 'Do you recommend replacing old silver maples?',
        answer:
          'Yes, many West Allis neighborhoods have aging silver maples with weak branch structure and decay. We can remove high-risk trees and suggest replacements that fit the lot size, such as smaller ornamental or native species. Proper replanting helps avoid future storm damage.',
      },
      {
        question: 'Can you remove trees near power lines in West Allis?',
        answer:
          'We handle removals near service lines and can coordinate with the utility when primary lines are involved. Safety is critical, and we never advise homeowners to cut near energized lines. Our crew uses controlled rigging and clearance techniques to keep the worksite safe.',
      },
    ],
  },
  {
    slug: 'greenfield',
    name: 'Greenfield',
    county: 'Milwaukee County',
    intro:
      'Greenfield’s neighborhoods stretch from the 27th Street corridor to Greenfield Park and Konkel Park, with mature maples, basswood, and cottonwoods that often need thinning or storm cleanup. Urban Loggers LLC handles routine pruning, hazard removals, and stump grinding for homeowners near the Root River Parkway and the Hales Corners border.' +
      '\n\n' +
      'Lots here are a mix of mid-century homes and newer builds, so access varies — we plan for tight side yards as well as larger corner properties. Brian Smith’s crew is fully insured and known for clean work that protects driveways, patios, and lawns.',
    faqs: [
      {
        question: 'Do I need a permit to remove a tree in Greenfield?',
        answer:
          'Permits may be required for trees in the public right-of-way or parkway areas. We can help confirm whether a tree is city-owned and guide you through any required approvals. For private yard trees, permits are typically not necessary unless a subdivision has specific rules.',
      },
      {
        question: 'Can you grind stumps near underground utilities?',
        answer:
          'Yes, but we always call Diggers Hotline (811) before grinding to mark utilities. We can adjust grind depth based on nearby lines, irrigation, or shallow services. This protects both your property and the utility infrastructure.',
      },
      {
        question: 'What’s the best season for pruning in Greenfield?',
        answer:
          'Dormant-season pruning in late winter is ideal for most species, improving structure and reducing stress. However, storm-damaged limbs should be removed immediately, regardless of season. We also plan around species-specific concerns like oak wilt restrictions in summer.',
      },
    ],
  },
  {
    slug: 'south-milwaukee',
    name: 'South Milwaukee',
    county: 'Milwaukee County',
    intro:
      'South Milwaukee’s lakefront character — from Grant Park and the Oak Creek Parkway to neighborhoods near Milwaukee Avenue and Chicago Avenue — brings wind exposure and smaller lots that demand careful tree work. Urban Loggers LLC commonly handles storm-damaged limbs, shoreline-prone maples, and removals where garages and fences sit close to mature trees.' +
      '\n\n' +
      'We use controlled rigging for tight spaces and keep staging efficient on narrow driveways and older infrastructure. Brian Smith’s fully insured crew provides removal, trimming, stump grinding, and 24/7 emergency service for South Milwaukee homeowners.',
    faqs: [
      {
        question: 'Do you handle wind-related damage near the lakefront?',
        answer:
          'Yes. Lake Michigan winds can split large limbs or push trees toward homes, especially near Grant Park and the parkway. We provide emergency removals, cabling for high-value trees, and structural pruning to reduce future risk.',
      },
      {
        question: 'How do you work on small lots in South Milwaukee?',
        answer:
          'Many properties here have narrow side yards and short driveways, so we rely on sectional removals and compact equipment. This approach protects fences, sheds, and landscaping while keeping cleanup tidy. We always plan access before the crew arrives.',
      },
      {
        question: 'Can you mill a tree into lumber after removal?',
        answer:
          'Yes. If you have a quality hardwood, our portable sawmill can turn it into slabs or beams right on-site. We frequently do this for homeowners who want to repurpose a large maple or oak instead of hauling it away.',
      },
    ],
  },
  // Waukesha County
  {
    slug: 'waukesha',
    name: 'Waukesha',
    county: 'Waukesha County',
    intro:
      'Waukesha’s mix of historic neighborhoods and newer developments along the Fox River creates diverse tree-care needs, from Frame Park and the downtown riverwalk to homes near Les Paul Parkway and UW–Waukesha. Urban Loggers LLC frequently handles pruning and removals for mature maples and oaks that overhang roofs, sidewalks, and riverbank lots.' +
      '\n\n' +
      'We’re experienced with tight access near older homes as well as larger properties west of the city, and we can manage storm damage along the river corridor. Brian Smith brings 20+ years of insured, professional tree service to Waukesha homeowners.',
    faqs: [
      {
        question: 'Is special care needed for trees near the Fox River?',
        answer:
          'Yes. Riverbank trees can contribute to erosion control, so we assess stability and recommend selective pruning instead of full removal when possible. If removal is necessary, we stage equipment to protect the bank and reduce soil disturbance.',
      },
      {
        question: 'Does Waukesha require permits for terrace or sidewalk trees?',
        answer:
          'Trees in the terrace area may be city-owned and can require approval before removal. We can help determine ownership and coordinate any necessary permits. For private yard trees, permits are usually not required unless a development plan is involved.',
      },
      {
        question: 'Can you mill large oaks from Waukesha properties?',
        answer:
          'Absolutely. Waukesha has many mature oaks and walnuts, and our portable sawmill can convert a felled tree into lumber or slabs. It’s a great option for homeowners who want to reuse high-value wood instead of hauling it away.',
      },
    ],
  },
  {
    slug: 'brookfield',
    name: 'Brookfield',
    county: 'Waukesha County',
    intro:
      'Brookfield’s large lots and wooded pockets — from neighborhoods near Brookfield Square and Mitchell Park to the Calhoun Road corridor and the Elm Grove border — are known for mature oaks, hickories, and black walnuts. Urban Loggers LLC is often called for high-value removals and precision pruning where trees sit close to expansive homes, pools, and landscaped yards.' +
      '\n\n' +
      'We plan crane and rigging access to protect long driveways, patios, and ornamental plantings, and we keep clean job sites that match Brookfield’s high property standards. Brian Smith is fully insured and brings 20+ years of experience to every project.',
    faqs: [
      {
        question: 'Do Brookfield HOAs have rules about tree removal?',
        answer:
          'Some subdivisions do, especially for large front-yard trees or planned landscaping. We recommend checking HOA guidelines before removal, and we can provide documentation or arborist notes if the HOA requests them. This helps avoid delays once work is scheduled.',
      },
      {
        question: 'How do you protect long driveways and landscaping?',
        answer:
          'We use ground protection mats and careful equipment placement to prevent ruts and damage. For large trees, we often rely on sectional removals and controlled lowering to keep lawns and patios intact. Cleanup is thorough so properties look finished when we leave.',
      },
      {
        question: 'Can you prune or remove black walnut trees safely?',
        answer:
          'Yes. Black walnuts are common in Brookfield and can be heavy with wide canopies. We can prune them for structure and clearance or remove them safely while managing the weight of large limbs and protecting nearby structures.',
      },
    ],
  },
  {
    slug: 'new-berlin',
    name: 'New Berlin',
    county: 'Waukesha County',
    intro:
      'New Berlin blends suburban neighborhoods along National and Greenfield Avenues with larger rural parcels near Malone Park, the New Berlin Trail, and the edge of Minooka Park. Urban Loggers LLC regularly handles removal and trimming for big maples, ash, and pine on acre-sized properties, along with stump grinding for homeowners planning additions or new garages.' +
      '\n\n' +
      'Access can range from tight subdivisions to long private drives, so we tailor equipment and rigging to the site. Brian Smith’s fully insured crew delivers clean, efficient work across New Berlin’s diverse property types.',
    faqs: [
      {
        question: 'Can you access rural lots with long private drives?',
        answer:
          'Yes. We work on rural properties throughout New Berlin and can bring equipment suited for longer access routes. We’ll assess drive width and surface conditions during the estimate to ensure safe staging and minimal disturbance.',
      },
      {
        question: 'How deep do you grind stumps for new construction?',
        answer:
          'For most construction and lawn restoration, we grind 6–12 inches below grade. If you’re planning a foundation or utility trench, we can coordinate a deeper grind in specific areas. We’ll discuss your site plans during the estimate.',
      },
      {
        question: 'Are ash trees still a concern in New Berlin?',
        answer:
          'Yes, emerald ash borer continues to impact ash across Waukesha County. We can inspect for canopy thinning and bark damage, and recommend removal or treatment options. Early action helps prevent hazardous failures.',
      },
    ],
  },
  {
    slug: 'pewaukee',
    name: 'Pewaukee',
    county: 'Waukesha County',
    intro:
      'Pewaukee’s lakefront homes and rolling neighborhoods around Oakton Avenue, Lakefront Park, and the Pewaukee River require specialized tree care due to wind exposure and shoreline conditions. Urban Loggers LLC often handles pruning and removals for willows, cottonwoods, and maples that lean toward the lake or drop heavy limbs after storms.' +
      '\n\n' +
      'We’re familiar with shoreland considerations and plan work to protect retaining walls, docks, and waterfront landscaping. Brian Smith’s insured crew delivers safe, efficient service for both year-round homes and seasonal properties around Pewaukee Lake.',
    faqs: [
      {
        question: 'Do shoreland permits apply to tree work near Pewaukee Lake?',
        answer:
          'In many cases, yes — especially within the shoreland zoning setback. We can help you determine whether a permit or approval is needed and plan the work accordingly. This keeps projects compliant and avoids delays.',
      },
      {
        question: 'What trees cause the most mess on the lakefront?',
        answer:
          'Willows and cottonwoods are common culprits, dropping seed fluff and brittle limbs. We can prune them to reduce litter and improve structure, or remove problem trees that are too close to the shoreline. Proper pruning also helps with storm resilience.',
      },
      {
        question: 'Do you handle winter ice-storm damage near the lake?',
        answer:
          'Yes. Lake winds and ice can snap large limbs, and we offer 24/7 emergency response for hazardous trees. We prioritize safety first, then remove debris and stabilize remaining trees.',
      },
    ],
  },
  // Racine County
  {
    slug: 'racine',
    name: 'Racine',
    county: 'Racine County',
    intro:
      'Racine’s mix of lakefront neighborhoods, older urban canopy, and river corridors — from North Beach and Washington Park to the Root River and the historic district — creates steady demand for skilled tree care. Urban Loggers LLC commonly handles aging maples and elms, storm-damaged limbs, and removals on lots where houses sit close to the sidewalk and street.' +
      '\n\n' +
      'We’re equipped for tight access in older neighborhoods as well as larger properties on the city’s west side, and we respond quickly when lake winds bring down trees. Brian Smith’s insured crew provides removal, trimming, stump grinding, and emergency service across Racine.',
    faqs: [
      {
        question: 'How do you work around older sidewalks and historic homes in Racine?',
        answer:
          'We use sectional removals and controlled lowering to avoid impact on masonry, sidewalks, and older foundations. Many Racine homes sit close to the curb, so staging and rigging are planned carefully. Cleanup is thorough to keep streets and walkways clear.',
      },
      {
        question: 'What about cottonwoods along the Root River?',
        answer:
          'Cottonwoods grow fast and can become brittle near the riverbanks. We often recommend structural pruning to reduce limb failures or removal when decay is advanced. Work is planned to protect the riverbank and reduce erosion risk.',
      },
      {
        question: 'Do you offer 24/7 emergency service in Racine?',
        answer:
          'Yes. When storms or lake winds cause hazardous trees, call (414) 514-0750 anytime. We prioritize safety, secure the site, and remove dangerous limbs or fallen trees quickly.',
      },
    ],
  },
  {
    slug: 'mount-pleasant',
    name: 'Mount Pleasant',
    county: 'Racine County',
    intro:
      'Mount Pleasant is growing fast along the Highway 20 and Highway 31 corridors, with new construction blending into established neighborhoods near Lamphere Park and the Pike River Pathway. Urban Loggers LLC often handles lot clearing, stump grinding, and safety pruning for newly built homes as well as mature shade trees that predate development.' +
      '\n\n' +
      'Because property layouts vary from compact subdivisions to larger semi-rural lots, we tailor access and equipment to the site. Brian Smith’s fully insured crew provides removals, trimming, emergency service, and on-site log milling for Mount Pleasant residents.',
    faqs: [
      {
        question: 'Can you clear lots and grind stumps for new construction?',
        answer:
          'Yes. We frequently handle stump grinding and selective clearing for new builds in Mount Pleasant. We can leave the site clean and ready for grading while protecting any trees you plan to keep.',
      },
      {
        question: 'How do you protect newly planted street trees?',
        answer:
          'We use careful equipment routing and protective mats to avoid compacting soil around new plantings. If pruning is needed, we focus on establishing strong structure without over-thinning. This helps young trees establish quickly after construction.',
      },
      {
        question: 'Do you coordinate with builders or property managers?',
        answer:
          'Yes. We can schedule around construction timelines and provide documentation for site plans or inspections. Coordinating early helps prevent delays and keeps the project moving smoothly.',
      },
    ],
  },
  // Ozaukee County
  {
    slug: 'mequon',
    name: 'Mequon',
    county: 'Ozaukee County',
    intro:
      'Mequon’s large wooded lots, horse properties, and conservation areas — from Cedarburg Road to Mequon Nature Preserve, Pigeon Creek, and Virmond Park — are home to mature oaks, hickories, and walnuts. Urban Loggers LLC specializes in high-value removals, structural pruning, and storm-response work where trees are large and properties are expansive.' +
      '\n\n' +
      'We plan access for long drives and delicate landscaping, and we can mill premium hardwoods on-site with our portable sawmill. Brian Smith’s insured team brings 20+ years of experience to Mequon’s premium tree-care needs.',
    faqs: [
      {
        question: 'Do conservation areas affect tree removal in Mequon?',
        answer:
          'Some properties near preserves or environmental corridors may have additional rules or easements. We can help review property documentation and recommend the safest, compliant approach. When needed, we coordinate with local guidelines to avoid issues.',
      },
      {
        question: 'Can you mill large hardwoods from Mequon properties?',
        answer:
          'Yes. Mequon often has exceptional walnut and oak, and our portable sawmill can convert a felled tree into slabs or beams. It’s a great way to preserve the value of a tree you have to remove.',
      },
      {
        question: 'How do you handle very large trees near estates or barns?',
        answer:
          'We use advanced rigging and, when needed, crane support to control heavy limbs and protect buildings. Each job gets a site-specific plan to keep structures, fences, and pastures safe. Cleanup is meticulous, which is especially important on premium properties.',
      },
    ],
  },
  {
    slug: 'cedarburg',
    name: 'Cedarburg',
    county: 'Ozaukee County',
    intro:
      'Cedarburg’s historic character — from Washington Avenue and the Cedar Creek Settlement to the Covered Bridge area and the Ozaukee Interurban Trail — means mature hardwoods grow close to older homes and tight streets. Urban Loggers LLC often handles careful pruning and removals for maples, basswood, and ash that overhang roofs or conflict with sidewalks in the downtown and nearby neighborhoods.' +
      '\n\n' +
      'We’re experienced in protecting stone foundations, brick facades, and landscaped yards while completing clean, controlled removals. Brian Smith’s insured crew delivers the precision Cedarburg homeowners expect, with options for stump grinding and on-site milling.',
    faqs: [
      {
        question: 'Can you work on trees near historic homes in Cedarburg?',
        answer:
          'Yes. We use low-impact rigging and careful piece-by-piece removal to protect older masonry and landscaping. Planning the drop zone and access route is key in Cedarburg’s tight streets and historic lots.',
      },
      {
        question: 'Do you handle roots affecting sidewalks or old foundations?',
        answer:
          'We can evaluate root conflicts and recommend pruning or removal when roots are lifting walks or threatening foundations. For removals, stump grinding helps prevent future heaving. We’ll discuss the safest option for the specific site.',
      },
      {
        question: 'How do you schedule work during busy downtown events?',
        answer:
          'Cedarburg’s festivals can limit access, so we coordinate timing to avoid closures and heavy foot traffic. We’ll work with your schedule and local event calendars to keep the job safe and efficient. This is especially important near Washington Avenue and the creek district.',
      },
    ],
  },
  {
    slug: 'port-washington',
    name: 'Port Washington',
    county: 'Ozaukee County',
    intro:
      'Port Washington’s lakefront bluffs, harbor neighborhoods, and historic downtown create unique tree-care challenges, especially along the shoreline near Coal Dock Park, the lighthouse, and the marina district. Urban Loggers LLC commonly handles wind-damaged limbs, removals on steep lots, and pruning for evergreens and hardwoods exposed to Lake Michigan weather.' +
      '\n\n' +
      'We plan access carefully on hillside properties and use controlled rigging to protect retaining walls and bluff edges. Brian Smith’s fully insured team provides removal, trimming, stump grinding, and emergency response for Port Washington homeowners.',
    faqs: [
      {
        question: 'Are there special considerations for bluff-side tree work?',
        answer:
          'Yes. Bluffs can be unstable, so we assess soil conditions and limit heavy equipment near edges. We may use rope systems or crane support to reduce ground pressure and protect retaining structures.',
      },
      {
        question: 'How do lake winds affect tree care in Port Washington?',
        answer:
          'Persistent winds can cause crown thinning and limb breakage, especially in exposed evergreens and large maples. We recommend structural pruning to reduce sail effect and remove weak limbs before storm season. Emergency service is available if wind damage occurs.',
      },
      {
        question: 'Can you access steep or narrow lots near downtown?',
        answer:
          'Yes. We adapt equipment to the site and often use sectional removals when access is limited. This is common near the historic district and harbor neighborhoods where lots are compact. Our goal is safe removal without damaging nearby structures.',
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

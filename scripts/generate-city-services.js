const fs = require('fs');
const path = require('path');

const cities = [
  {
    slug: 'wauwatosa',
    name: 'Wauwatosa',
    county: 'Milwaukee',
    neighborhoods: ['East Tosa', 'Wauwatosa Village', 'Washington Highlands', 'Hawthorne Glen', 'Honey Creek', 'Lincoln Highlands'],
    landmarks: ['Hart Park', 'Hoyt Park', 'Menomonee River Parkway'],
    treeTypes: ['oak', 'maple', 'ash', 'linden'],
  },
  {
    slug: 'west-allis',
    name: 'West Allis',
    county: 'Milwaukee',
    neighborhoods: ['Liberty Heights', 'Layton Park', 'Lincoln Park', 'Greenfield Park', 'Beecher', 'West Milwaukee edge'],
    landmarks: ['State Fair Park', 'McCarty Park', 'Root River Parkway'],
    treeTypes: ['maple', 'elm', 'spruce', 'honeylocust'],
  },
  {
    slug: 'greenfield',
    name: 'Greenfield',
    county: 'Milwaukee',
    neighborhoods: ['Olde Greenfield', 'Root River Corridor', 'Konkel Park area', 'Alverno', 'S 27th Street corridor', 'Loomis'],
    landmarks: ['Konkel Park', 'Greenfield Park', 'Root River Trail'],
    treeTypes: ['oak', 'maple', 'pine', 'birch'],
  },
  {
    slug: 'south-milwaukee',
    name: 'South Milwaukee',
    county: 'Milwaukee',
    neighborhoods: ['Downtown South Milwaukee', 'Grant Park', 'Rawson Avenue', 'Lake Parkway', 'Oak Creek edge', 'Carnegie'],
    landmarks: ['Grant Park', 'Seven Bridges', 'Oak Creek Parkway'],
    treeTypes: ['oak', 'maple', 'cottonwood', 'spruce'],
  },
  {
    slug: 'waukesha',
    name: 'Waukesha',
    county: 'Waukesha',
    neighborhoods: ['Downtown Waukesha', 'Prairieville', 'Buchner', 'Spring City', 'Les Paul Parkway area', 'Frame Park'],
    landmarks: ['Fox River', 'Frame Park', 'Waukesha County Expo'],
    treeTypes: ['oak', 'maple', 'walnut', 'cedar'],
  },
  {
    slug: 'brookfield',
    name: 'Brookfield',
    county: 'Waukesha',
    neighborhoods: ['Brookfield Hills', 'Calhoun', 'Deer Creek', 'Fox Brook Park area', 'Emerald City', 'Brookfield Lakes'],
    landmarks: ['Fox Brook Park', 'Brookfield Square', 'Poplar Creek'],
    treeTypes: ['oak', 'maple', 'spruce', 'crabapple'],
  },
  {
    slug: 'new-berlin',
    name: 'New Berlin',
    county: 'Waukesha',
    neighborhoods: ['City Center', 'Regal Manors', 'National Parkway', 'Sunnyslope', 'Malone', 'Arboretum corridor'],
    landmarks: ['New Berlin Recreation Trail', 'Regal Park', 'Hale Parkway'],
    treeTypes: ['oak', 'maple', 'elm', 'pine'],
  },
  {
    slug: 'pewaukee',
    name: 'Pewaukee',
    county: 'Waukesha',
    neighborhoods: ['Pewaukee Lake', 'Downtown Pewaukee', 'Highwood', 'Springdale', 'Lakeview', 'Whispering Ridge'],
    landmarks: ['Pewaukee Lake', 'Lakefront Park', 'Fox River Park'],
    treeTypes: ['oak', 'maple', 'birch', 'cedar'],
  },
  {
    slug: 'racine',
    name: 'Racine',
    county: 'Racine',
    neighborhoods: ['Downtown Racine', 'North Beach', 'College Heights', 'West Racine', 'Southside', 'Johnson Park'],
    landmarks: ['Lake Michigan shoreline', 'North Beach', 'Root River'],
    treeTypes: ['maple', 'oak', 'cottonwood', 'pine'],
  },
  {
    slug: 'mount-pleasant',
    name: 'Mount Pleasant',
    county: 'Racine',
    neighborhoods: ['Mount Pleasant Village', 'Gorney Park area', 'Lammer', 'Parklane', 'Elmwood Park', 'Franksville edge'],
    landmarks: ['Gorney Park', 'Mount Pleasant Community Center', 'Highway 20 corridor'],
    treeTypes: ['oak', 'maple', 'cedar', 'spruce'],
  },
  {
    slug: 'mequon',
    name: 'Mequon',
    county: 'Ozaukee',
    neighborhoods: ['East Mequon', 'River Club', 'Range Line corridor', 'Highland Road area', 'Pioneer Village', 'Thiensville edge'],
    landmarks: ['Mequon Nature Preserve', 'Milwaukee River', 'Virmond Park'],
    treeTypes: ['oak', 'maple', 'basswood', 'pine'],
  },
  {
    slug: 'cedarburg',
    name: 'Cedarburg',
    county: 'Ozaukee',
    neighborhoods: ['Historic Downtown', 'Cedar Creek', 'Hamilton', 'Pleasant Valley', 'Green Bay Road corridor', 'Interurban Trail area'],
    landmarks: ['Cedar Creek Park', 'Interurban Trail', 'Mill Museum area'],
    treeTypes: ['maple', 'oak', 'birch', 'evergreen'],
  },
  {
    slug: 'port-washington',
    name: 'Port Washington',
    county: 'Ozaukee',
    neighborhoods: ['Downtown Port', 'South Beach', 'Lake Michigan bluffs', 'Upper Lake Park area', 'Columbia Street corridor', 'Saukville edge'],
    landmarks: ['South Beach Park', 'Lake Michigan harbor', 'Upper Lake Park'],
    treeTypes: ['oak', 'maple', 'pine', 'spruce'],
  },
];

const services = {
  'tree-removal': {
    name: 'Tree Removal',
    image: '/images/tree-removal.jpg',
    slug: 'tree-removal',
    price: '$$$',
    hero: 'Safe, insured removals for storm-damaged trees, tight lots, and full canopy takedowns.',
    schemaDesc: 'Safe tree removal with rigging, cleanup, and optional log milling.',
    quickFacts: [
      ['Typical Cost', '$300–$2,000+ depending on size, access, and rigging'],
      ['Timeline', 'Most removals completed in 1 day; complex jobs may take 2 days'],
      ['What’s Included', 'Sectional removal, rigging, debris cleanup, haul-away'],
      ['Add-Ons', 'Stump grinding, log milling, firewood cutting'],
    ],
  },
  'tree-trimming': {
    name: 'Tree Trimming',
    image: '/images/trimming.jpg',
    slug: 'tree-trimming',
    price: '$$',
    hero: 'Crown thinning, deadwood removal, and precision pruning for healthier, safer canopies.',
    schemaDesc: 'Professional tree trimming including crown thinning, deadwood removal, and pruning.',
    quickFacts: [
      ['Typical Cost', '$200–$800 depending on tree size and canopy density'],
      ['Timeline', 'Most trims completed in a few hours to one day'],
      ['What’s Included', 'Crown thinning, deadwood removal, structural pruning'],
      ['Seasonal Timing', 'Winter and early spring are ideal, but we trim year-round'],
    ],
  },
  'stump-grinding': {
    name: 'Stump Grinding',
    image: '/images/stump-grinding.jpg',
    slug: 'stump-grinding',
    price: '$$',
    hero: 'We grind stumps below grade so you can replant, sod, or landscape without tripping hazards.',
    schemaDesc: 'Stump grinding and root flare cleanup to reclaim lawn and landscape space.',
    quickFacts: [
      ['Typical Cost', '$150–$600 depending on stump diameter and access'],
      ['Timeline', 'Most stumps ground in 1–2 hours'],
      ['What’s Included', 'Grinding 6–12 inches below grade, cleanup, mulch backfill'],
      ['Optional Add-Ons', 'Surface root grinding and full debris haul-away'],
    ],
  },
  emergency: {
    name: 'Emergency Tree Service',
    image: '/images/emergency.jpg',
    slug: 'emergency',
    price: '$$$',
    hero: 'Fast response for storm damage, hanging limbs, and hazardous trees after high winds.',
    schemaDesc: 'Emergency tree service for storm damage, hanging limbs, and urgent removals.',
    quickFacts: [
      ['Response Window', 'Same-day or next-day for active hazards'],
      ['Common Hazards', 'Split trunks, hanging limbs, uprooted trees'],
      ['What’s Included', 'Site stabilization, hazard removal, debris cleanup'],
      ['After-Hours', 'Available during severe weather events'],
    ],
  },
  'log-milling': {
    name: 'Log Milling',
    image: '/images/milling.jpg',
    slug: 'log-milling',
    price: '$$',
    hero: 'Turn valuable logs into custom slabs for tables, mantels, and local woodworking projects.',
    schemaDesc: 'On-site log milling for custom slabs and lumber from removed trees.',
    quickFacts: [
      ['Typical Cost', 'Varies by log size and slab thickness'],
      ['Timeline', 'Milling often completed in a single visit'],
      ['What’s Included', 'Log staging, slab cutting, stacking guidance'],
      ['Best Species', 'Oak, maple, walnut, and cherry mill beautifully'],
    ],
  },
};

const faqTemplates = {
  'tree-removal': [
    {
      q: 'How do you remove large trees in {city} without damaging nearby homes?',
      a: 'We use sectional removal with rigging so limbs and trunk pieces are lowered in controlled steps. That’s especially important on tight lots in areas like {neighborhoods} where fences, garages, and nearby power lines leave little room for a full drop.'
    },
    {
      q: 'Do I need a permit for removing a tree in {city}?',
      a: 'Requirements vary based on whether the tree is on private property or in the public right-of-way. We’ll help you understand local guidelines and timing so the job stays compliant and safe.'
    },
    {
      q: 'Can you leave the wood on-site for firewood or milling?',
      a: 'Yes. Many homeowners in {city} request log lengths for milling or firewood. Let us know your goals during the estimate and we’ll stage and cut accordingly.'
    },
    {
      q: 'What signs indicate removal is safer than trimming?',
      a: 'Major cracks, severe lean, hollow trunks, or root plate lifting are red flags. We can evaluate the tree and explain whether removal is the safest long-term choice.'
    },
  ],
  'tree-trimming': [
    {
      q: 'How often should trees be trimmed in {city}?',
      a: 'Most mature trees benefit from trimming every 3–5 years, but fast-growing species may need more frequent attention. We’ll recommend a schedule based on tree type, age, and site conditions.'
    },
    {
      q: 'Can trimming reduce storm damage in {city}?',
      a: 'Yes. Crown thinning reduces wind resistance and removes weak or dead limbs that are most likely to fail during severe weather.'
    },
    {
      q: 'Do you offer structural pruning for young trees?',
      a: 'Absolutely. Proper early pruning helps trees develop strong branch architecture and prevents costly issues later on.'
    },
    {
      q: 'Will trimming harm my tree?',
      a: 'Not when it’s done correctly. We avoid topping and follow industry standards so the tree stays healthy and balanced.'
    },
  ],
  'stump-grinding': [
    {
      q: 'How deep do you grind stumps in {city}?',
      a: 'We typically grind 6–12 inches below grade, which is deep enough for sod or most landscape plans. If you need deeper clearance for a patio or replanting, let us know.'
    },
    {
      q: 'What happens to the stump grindings?',
      a: 'The chips can be used as mulch or hauled away. Many {city} homeowners like to reuse the grindings in garden beds.'
    },
    {
      q: 'Can you remove surface roots along sidewalks or driveways?',
      a: 'Yes. We can grind surface roots that are causing trip hazards or lifting concrete, especially in older neighborhoods like {neighborhoods}.'
    },
    {
      q: 'Is stump grinding safe near utilities?',
      a: 'We call for utility locates before grinding and work carefully around buried lines and irrigation.'
    },
  ],
  emergency: [
    {
      q: 'How fast can you respond to storm damage in {city}?',
      a: 'We prioritize active hazards and typically respond same-day or next-day depending on weather conditions and access.'
    },
    {
      q: 'What counts as an emergency tree situation?',
      a: 'Split trunks, hanging limbs over homes, and uprooted trees after storms are emergencies. If a tree is contacting power lines, keep clear and call immediately.'
    },
    {
      q: 'Do you coordinate with insurance or city services?',
      a: 'We can document damage with photos and provide clear invoices that help with insurance claims or municipal requirements.'
    },
    {
      q: 'Can you do temporary stabilization before full removal?',
      a: 'Yes. We can secure hazards first and return for full removal once the site is safe.'
    },
  ],
  'log-milling': [
    {
      q: 'Which logs are best for milling in {city}?',
      a: 'Hardwoods like {species} mill into beautiful slabs. We’ll inspect the log for straight grain and minimal decay before cutting.'
    },
    {
      q: 'Do you mill logs from trees you remove?',
      a: 'Yes. If we’re already removing a tree, we can stage the logs and mill them into slabs during the same project.'
    },
    {
      q: 'How should I dry slabs after milling?',
      a: 'We’ll show you how to sticker and stack slabs for proper airflow. Air-drying takes time, but it preserves the wood’s character.'
    },
    {
      q: 'Can you cut live-edge slabs?',
      a: 'Absolutely. Live-edge slabs are popular for tables, benches, and fireplace mantels.'
    },
    {
      q: 'Do you seal log ends to reduce cracking?',
      a: 'We can recommend end-sealing products and storage methods that reduce checking while the slabs dry.'
    },
  ],
};

const introTemplates = {
  'tree-removal': [
    'In {city}, mature {species} and maples often tower over homes, garages, and tight side yards. In neighborhoods like {neighborhoods}, that means removals have to be planned with precision. We use controlled rigging and sectional dismantling so heavy limbs are lowered safely without damaging roofs, fences, or landscaping. Our crew maps out drop zones, protects turf, and keeps pedestrian areas clear—especially near busier streets and shared driveways.',
    'Tree removal is rarely a simple cut-and-drop job in {city}. Many properties have tight access, overhead utilities, and mature canopies that grew long before today’s home additions. We evaluate the tree’s lean, canopy weight, and root stability before making the first cut. That detailed planning keeps the job safe for your home and for neighbors in nearby blocks like {neighborhoods}.',
  ],
  'tree-trimming': [
    'Healthy canopies are a huge part of what makes {city} look and feel established. In areas like {neighborhoods}, trees overhang sidewalks, alleys, and roofs. Strategic trimming keeps that canopy strong while improving clearance and reducing storm risk. We focus on clean cuts that respect how trees grow so they stay healthy for decades. The goal is balanced, long-lived trees—not quick cosmetic fixes.',
    'Trimming in {city} isn’t about making trees look uniform—it’s about keeping them safe and structurally sound. Our pruning targets deadwood, crossing limbs, and heavy over-extended branches. That approach helps trees withstand high winds and heavy snow, which are common along the {landmarks} corridor. It also prevents small issues from turning into costly removals later.',
  ],
  'stump-grinding': [
    'Stumps take up valuable space and create trip hazards, especially on tighter {city} lots. Whether the stump is in a front yard along {landmarks} or a backyard in {neighborhoods}, grinding it out is the quickest way to restore usable space. We grind below grade and leave the area ready for sod, seed, or new plantings.',
    'A leftover stump can attract pests and throw off your landscape plans. In {city}, we see stumps lingering for years because homeowners are unsure what to do next. Our stump grinding service clears the space cleanly, removes surface roots when needed, and keeps your yard level for future projects.',
  ],
  emergency: [
    'Storms can turn a healthy-looking tree into a hazard overnight. In {city}, high winds along {landmarks} often lead to split trunks, hanging limbs, and uprooted trees. Our emergency response team focuses on making the site safe first, then removing dangerous sections so you can protect your home and family.',
    'When a tree comes down or threatens a home in {city}, fast action matters. We prioritize active hazards, secure unstable limbs, and coordinate safe access. That’s especially important in neighborhoods like {neighborhoods} where trees sit close to homes, garages, and sidewalks.',
  ],
  'log-milling': [
    'Many of the {species} and hardwoods in {city} can be transformed into beautiful slabs instead of being hauled away. If you have a downed tree in {neighborhoods} or a removal project near {landmarks}, we can mill the log on-site and help you keep that wood for furniture, shelving, or local woodworking projects. It’s a practical way to save material that would otherwise be chipped or dumped. You also get the satisfaction of reusing a tree that grew on your own property.',
    'Log milling lets you keep the story of a tree alive. In {city}, homeowners often choose milling after removals so the wood can become a table, mantel, or heirloom piece. We evaluate the log, plan slab thickness, and cut for stability so the wood dries evenly. That planning helps prevent warping and creates more usable lumber.',
  ],
};

const midTemplates = {
  'tree-removal': [
    'Urban Loggers LLC is led by Brian Smith and backed by 20+ years of hands-on tree work. We’re fully insured and we show up with the right equipment—rigging systems, safety lines, and when necessary, cranes for large canopies. Our local experience means we know how to manage street parking, coordinate with neighbors, and keep the job tidy in busy parts of {city}.',
    'We don’t just cut a trunk and leave. Our removals include careful dismantling, brush chipping, and full debris haul-away. If you’d like the wood for milling or firewood, we’ll cut to your preferred lengths and stage the logs neatly.',
  ],
  'tree-trimming': [
    'Proper pruning protects tree health. We avoid topping and focus on crown thinning, deadwood removal, and structural pruning. These techniques help trees seal over wounds naturally and reduce the likelihood of future failure. That matters for long-term canopy health in {city} neighborhoods where mature trees are a core part of the landscape. It also preserves shade coverage without over-stressing the canopy.',
    'We tailor trimming to your goals—clearance over sidewalks, better light for gardens, or risk reduction before storm season. Every cut has a purpose, and we clean up thoroughly so your yard looks better when we leave than when we arrived.',
  ],
  'stump-grinding': [
    'Stump grinding is also about what’s below the surface. We can address surface roots that cause uneven lawns or push up sidewalks, which is a common issue in established areas of {city}. We’ll walk the area first so the grinding depth matches your landscaping plans.',
    'Our equipment fits through most residential gates, and we protect turf with careful staging. After grinding, we’ll backfill with mulch and rake the area smooth. If you want full haul-away, we can remove the grindings so the site is ready for new soil.',
  ],
  emergency: [
    'Safety is the priority. We set up a clear work zone, manage debris, and coordinate with utility providers if lines are involved. After the immediate hazard is removed, we can return for full cleanup or stump grinding so the property is completely restored.',
    'We understand that emergencies are stressful. Our team communicates clearly, documents the damage with photos if needed, and gives you a straightforward plan for next steps.',
  ],
  'log-milling': [
    'Milling is a great option when you have a straight, sound log with minimal decay. We’ll check the log for metal, rot, and stability before cutting. Then we plan slab thickness based on how you want to use the wood—tables, benches, shelving, or accent pieces. That step ensures you get the most value from every cut.',
    'We can mill logs from trees we remove or from trees that fell in storms. After milling, we’ll show you how to stack and sticker the slabs for proper airflow so they dry evenly over time. Proper drying reduces checking and keeps the slabs flat.',
  ],
};

const extraTemplates = {
  'tree-removal': [
    'We also advise on post-removal options like replanting, adding a new shade tree, or opening up space for gardens and patios. Our team can point you toward species that thrive in {city} and won’t outgrow the space too quickly.',
    'If access is limited, we can stage equipment to minimize impact on lawns and landscaping. Ground protection and careful rigging keep yards in {city} clean and usable once the work is complete.',
  ],
  'tree-trimming': [
    'Seasonal trimming is especially helpful for trees that overhang roofs or driveways. By reducing weight in the right places, we decrease the chance of limb failure during the next heavy wind or snow event. This proactive step often saves money compared to emergency cleanup later.',
    'We can also improve light levels for lawns and gardens without stripping the canopy. Thoughtful pruning keeps shade where you want it and sunlight where you need it.',
  ],
  'stump-grinding': [
    'If you plan to plant a new tree, we can recommend spacing and stump placement so the new root system has room to grow. Clearing old stumps helps new plantings establish faster.',
    'Grinding also removes the barrier for hardscape projects like walkways or patios. It’s a small step that unlocks a lot of landscaping flexibility for {city} homeowners.',
  ],
  emergency: [
    'We keep emergency equipment ready during storm season, including saws, rigging gear, and cleanup trailers. That preparation helps us respond quickly when multiple calls come in after a weather event.',
    'If the tree is still standing but unstable, we can reduce weight and remove hazards immediately, then schedule a full removal once conditions are safer.',
  ],
  'log-milling': [
    'We can guide you on slab thickness and cutting orientation so the grain pattern matches your project goals. That planning step helps minimize warping and highlights the best figure in the wood. It also makes it easier to match slab sizes to common furniture dimensions.',
    'For larger logs, we can break the milling into multiple passes to maximize yield. It’s a great way to turn a single tree into several usable slabs or boards. We’ll label slabs and explain the best storage approach for each piece.',
  ],
};

const bonusTemplates = {
  'tree-removal': [
    'Because removals can impact neighboring properties, we coordinate access points and communicate clearly about timing. That extra planning keeps the work smooth in {city} blocks where space is shared.',
  ],
  'tree-trimming': [
    'We can also set up ongoing maintenance plans for properties with multiple mature trees, helping {city} homeowners stay ahead of seasonal risks. Consistent care keeps trees stronger year after year.',
  ],
  'stump-grinding': [
    'If you’re planning a new landscaping design, we can coordinate stump grinding with trimming or removal so the project stays on schedule.',
  ],
  emergency: [
    'Our crews are trained to work safely around unstable trees and shifting limbs, which is critical during high-wind events in {city}.',
  ],
  'log-milling': [
    'We’ve milled logs for homeowners, builders, and local artisans who want truly local lumber, not generic big-box material. If you have a specific project in mind, we can adjust slab size and thickness to match your plans. We can also note grain orientation so you can book-match slabs for larger tabletop projects.',
  ],
};

const localTemplates = {
  'tree-removal': [
    'Local soil conditions and drainage patterns matter when removing large trees. In parts of {city} where the ground is softer, we take extra care around root plates and nearby landscaping to prevent shifting or rutting.',
    'If a tree is close to a shared driveway or alley, we plan staging and traffic flow in advance. Clear communication keeps neighbors safe and avoids surprises on removal day.',
  ],
  'tree-trimming': [
    'Trimming schedules can also be influenced by local tree species. Some {city} neighborhoods have a high concentration of maples and ashes, and those species benefit from more frequent deadwood removal. We’ll note any disease or stress patterns we see during the visit.',
    'We also consider sightlines for intersections and driveways. In busier parts of {city}, improved visibility can be just as important as canopy health. That extra clearance keeps pedestrians and drivers safer year-round.',
  ],
  'stump-grinding': [
    'Stump size and location vary a lot across {city}. Older neighborhoods often have larger trunks and more established root systems, which can require deeper grinding or additional passes.',
    'If your stump is near sidewalks or utility boxes, we can adjust our approach to keep everything protected while still clearing the area cleanly.',
  ],
  emergency: [
    'Emergency work often happens with limited access and unpredictable debris. We bring additional safety gear and take a methodical approach to stabilize hazards without causing more damage.',
    'After the immediate danger is addressed, we can return for full removal or pruning so the property is fully restored and ready for the next storm season.',
  ],
  'log-milling': [
    'Moisture levels can vary across {city}, so we tailor drying guidance based on where the slabs will be stored. Good airflow and consistent stacking make a big difference in the final quality.',
    'If you plan to use the wood for outdoor projects, we can suggest finishes and sealing options that hold up to Wisconsin’s changing weather.',
  ],
};

const closeTemplates = {
  'tree-removal': [
    'If you’re unsure whether removal is necessary, we’ll give you an honest assessment. Sometimes trimming or cabling can extend the life of a tree. When removal is the safest option, we’ll provide a clear quote and a timeline that respects your schedule.',
    'On removal day, we confirm the plan, protect the surrounding area, and work efficiently until the tree is down and the yard is clean. If you add stump grinding, we’ll grind below grade and blend the area with fresh mulch so it’s ready for the next step.',
  ],
  'tree-trimming': [
    'We start with a walkthrough to identify priorities and any problem limbs. Then we trim with the tree’s long-term structure in mind. The result is a safer canopy, better light, and a cleaner overall look.',
    'If trimming reveals deeper issues like decay or a severe lean, we’ll explain the options. You get straightforward guidance from a local crew that knows {city} trees and property styles.',
  ],
  'stump-grinding': [
    'Grinding the stump is often the final step after a removal, but it can also be done years later to reclaim space. Either way, we’ll help you plan what comes next—new plantings, sod, or hardscape.',
    'We leave the site tidy and level. Many homeowners in {city} appreciate that the area is ready for immediate landscaping without additional prep work.',
  ],
  emergency: [
    'After we secure the site, we’ll discuss whether you want full removal, trimming, or temporary stabilization. Our goal is to make your property safe quickly and then leave it in better shape than we found it.',
    'When storms hit {city}, we keep our schedule flexible to handle urgent calls. Save our number so you can reach us quickly if a tree becomes a hazard.',
  ],
  'log-milling': [
    'Milled slabs need time to dry, but the result is worth it: wood with character, grain, and local story. We’ll help you plan for drying and storage so the slabs stay flat and crack-free. If you want kiln drying, we can point you to local resources.',
    'Whether you’re a woodworker or simply want a one-of-a-kind piece, we can help you turn a local tree into something lasting. It’s a great way to honor a tree that’s been part of your property for decades and keep the material close to home.',
  ],
};

const serviceLabels = ['tree-removal', 'tree-trimming', 'stump-grinding', 'emergency', 'log-milling'];

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = Math.imul(31, h) + str.charCodeAt(i) | 0;
  return Math.abs(h);
}

function pick(arr, count, seed) {
  const result = [];
  const used = new Set();
  let i = 0;
  while (result.length < count && i < arr.length * 3) {
    const idx = (seed + i * 7) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    i++;
  }
  return result;
}

function fill(template, city, service) {
  const neighborhoods = city.neighborhoods.slice(0, 3).join(', ');
  const species = city.treeTypes.slice(0, 2).join(' and ');
  const landmarks = city.landmarks.join(' and ');
  return template
    .replaceAll('{city}', city.name)
    .replaceAll('{neighborhoods}', neighborhoods)
    .replaceAll('{species}', species)
    .replaceAll('{landmarks}', landmarks);
}

function buildFAQs(city, serviceKey) {
  const seed = hash(`${city.slug}-${serviceKey}`);
  const templates = faqTemplates[serviceKey];
  const count = 4;
  return pick(templates, count, seed).map((item) => ({
    question: fill(item.q, city),
    answer: fill(item.a, city),
  }));
}

function paragraphBlock(city, serviceKey) {
  const seed = hash(`${city.slug}-${serviceKey}`);
  const intro = pick(introTemplates[serviceKey], 1, seed)[0];
  const mid = pick(midTemplates[serviceKey], 2, seed + 11);
  const extra = pick(extraTemplates[serviceKey], 2, seed + 15);
  const bonus = pick(bonusTemplates[serviceKey], 1, seed + 17);
  const local = pick(localTemplates[serviceKey], 2, seed + 23);
  const close = pick(closeTemplates[serviceKey], 2, seed + 29);
  const paras = [intro, ...mid, ...extra, ...bonus, ...local, ...close].map((p) => fill(p, city));
  return paras;
}

function buildPage(city, serviceKey) {
  const service = services[serviceKey];
  const faqs = buildFAQs(city, serviceKey);
  const paras = paragraphBlock(city, serviceKey);
  const pageName = `${city.name}${service.name.replace(/\s/g, '')}Page`;
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: city.name, item: `https://urbanloggers.org/${city.slug}/` },
    { name: service.name, item: `https://urbanloggers.org/${city.slug}/${service.slug}/` },
  ];

  return `import type { Metadata } from 'next'\nimport Link from 'next/link'\nimport { PhoneButton } from '@/components/ui/PhoneButton'\nimport { buildMetadata } from '@/lib/metadata'\nimport { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'\n\nexport const metadata: Metadata = {\n  ...buildMetadata(\n    '${service.name} in ${city.name}, WI | Urban Loggers LLC',\n    'Reliable ${service.name.toLowerCase()} in ${city.name}, WI with Urban Loggers LLC. Fully insured crews, 20+ years of experience. Call (414) 514-0750.',\n    '/${city.slug}/${service.slug}/'\n  ),\n  other: {\n    'geo.region': 'US-WI',\n    'geo.placename': '${city.name}',\n  },\n}\n\nconst faqs = ${JSON.stringify(faqs, null, 2)}\n\nexport default function ${pageName}() {\n  const crumbs = ${JSON.stringify(crumbs, null, 2)}\n\n  return (\n    <>\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{\n          __html: JSON.stringify(\n            serviceSchema(\n              '${service.name}',\n              '${service.schemaDesc} in ${city.name}, WI.',\n              'https://urbanloggers.org/${city.slug}/${service.slug}/',\n              '${service.name} Service',\n              '${service.price}'\n            )\n          ),\n        }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}\n      />\n      <script\n        type="application/ld+json"\n        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}\n      />\n\n      {/* Hero */}\n      <section className="relative text-white py-14 px-4 overflow-hidden">\n        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: \"url('${service.image}')\" }} />\n        <div className="absolute inset-0 bg-black/60" />\n        <div className="relative z-10 max-w-4xl mx-auto text-center">\n          <h1 className="text-4xl sm:text-5xl font-bold mb-4">${service.name} in ${city.name}, WI</h1>\n          <p className="text-xl text-green-100 mb-8">\n            ${service.hero}\n          </p>\n          <div className="flex flex-col sm:flex-row gap-4 justify-center">\n            <PhoneButton size="lg" />\n            <Link\n              href="/contact/"\n              className="inline-block bg-white text-brand-green font-semibold px-8 py-4 rounded-md text-xl hover:bg-green-50 transition-colors"\n            >\n              Get Free Quote\n            </Link>\n          </div>\n        </div>\n      </section>\n\n      {/* Quick facts */}\n      <section className="py-12 px-4 bg-warm-white">\n        <div className="max-w-4xl mx-auto">\n          <h2 className="text-2xl font-bold text-charcoal mb-6">${service.name} — Quick Facts</h2>\n          <div className="overflow-x-auto">\n            <table className="w-full text-sm border-collapse bg-white shadow-sm rounded-lg overflow-hidden">\n              <thead>\n                <tr className="bg-brand-green text-white">\n                  <th className="text-left px-4 py-3 font-semibold">Detail</th>\n                  <th className="text-left px-4 py-3 font-semibold">Info</th>\n                </tr>\n              </thead>\n              <tbody className="divide-y divide-gray-100">\n                {${JSON.stringify(service.quickFacts)}.map(([label, value]) => (\n                  <tr key={label} className="hover:bg-gray-50">\n                    <td className="px-4 py-3 font-medium text-charcoal">{label}</td>\n                    <td className="px-4 py-3 text-gray-700">{value}</td>\n                  </tr>\n                ))}\n              </tbody>\n            </table>\n          </div>\n        </div>\n      </section>\n\n      {/* Content */}\n      <section className="py-12 px-4 bg-white">\n        <div className="max-w-4xl mx-auto prose-brand">\n          <h2>${city.name} ${service.name} Focused on Safety and Results</h2>\n          <p>${paras[0]}</p>\n          <p>${paras[1]}</p>\n          <h3>Why ${city.name} Homeowners Choose Urban Loggers</h3>\n          <p>${paras[2]}</p>\n          <p>${paras[3]}</p>\n          <p>${paras[4]}</p>\n          <h3>Local Considerations in ${city.name}</h3>\n          <p>${paras[5]}</p>\n          <p>${paras[6]}</p>\n          <h3>What to Expect During Your ${service.name}</h3>\n          <p>${paras[7]}</p>\n          <p>${paras[8]}</p>\n          <p>${paras[9]}</p>\n        </div>\n      </section>\n\n      {/* FAQs */}\n      <section className="py-12 px-4 bg-warm-white">\n        <div className="max-w-4xl mx-auto">\n          <h2 className="text-2xl font-bold text-charcoal mb-6">${service.name} FAQs</h2>\n          <div className="space-y-4">\n            {faqs.map((faq) => (\n              <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">\n                <h3 className="font-semibold text-charcoal mb-2">{faq.question}</h3>\n                <p className="text-gray-700 text-sm leading-relaxed">{faq.answer}</p>\n              </div>\n            ))}\n          </div>\n        </div>\n      </section>\n\n      {/* CTA */}\n      <section className="py-12 px-4 bg-white">\n        <div className="max-w-4xl mx-auto text-center">\n          <h2 className="text-3xl font-bold text-charcoal mb-4">Need ${service.name} in ${city.name}?</h2>\n          <p className="text-gray-700 mb-6">\n            Call Urban Loggers LLC for an honest assessment and a clear plan. We’re fully insured and ready to help.\n          </p>\n          <PhoneButton size="lg" />\n        </div>\n      </section>\n\n      {/* Internal links */}\n      <nav aria-label="Related ${city.name} services" className="py-8 px-4 bg-warm-white border-t border-gray-100">\n        <div className="max-w-4xl mx-auto">\n          <p className="text-sm text-gray-500 mb-3">Explore more ${city.name} services:</p>\n          <div className="flex flex-wrap gap-3">\n            <Link href="/${city.slug}/" className="text-brand-green hover:underline text-sm">← ${city.name} hub</Link>\n            <Link href="/${city.slug}/tree-removal/" className="text-brand-green hover:underline text-sm">Tree Removal</Link>\n            <Link href="/${city.slug}/tree-trimming/" className="text-brand-green hover:underline text-sm">Tree Trimming</Link>\n            <Link href="/${city.slug}/stump-grinding/" className="text-brand-green hover:underline text-sm">Stump Grinding</Link>\n            <Link href="/${city.slug}/emergency/" className="text-brand-green hover:underline text-sm">Emergency Tree Service</Link>\n            <Link href="/${city.slug}/log-milling/" className="text-brand-green hover:underline text-sm">Log Milling</Link>\n          </div>\n        </div>\n      </nav>\n    </>\n  )\n}\n`;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const root = path.join(__dirname, '..', 'app');

cities.forEach((city) => {
  serviceLabels.forEach((serviceKey) => {
    const dir = path.join(root, city.slug, serviceKey);
    ensureDir(dir);
    const page = buildPage(city, serviceKey);
    fs.writeFileSync(path.join(dir, 'page.tsx'), page);
  });
});

// Update hub page links
cities.forEach((city) => {
  const hubPath = path.join(root, city.slug, 'page.tsx');
  if (!fs.existsSync(hubPath)) return;
  let content = fs.readFileSync(hubPath, 'utf8');
  content = content
    .replaceAll('/tree-removal/', `/${city.slug}/tree-removal/`)
    .replaceAll('/tree-trimming-pruning/', `/${city.slug}/tree-trimming/`)
    .replaceAll('/stump-grinding/', `/${city.slug}/stump-grinding/`)
    .replaceAll('/emergency-tree-service/', `/${city.slug}/emergency/`)
    .replaceAll('/log-milling/', `/${city.slug}/log-milling/`);
  fs.writeFileSync(hubPath, content);
});

console.log('Generated service pages and updated hub links.');

export const COMPANY = {
  name: 'Urban Loggers LLC',
  owner: 'Brian Smith',
  // Tracking number (SignalWire) — forwards calls AND texts to Brian's cell. Same number for call + SMS,
  // like Frank's setup, so every call/text is attributed. Set this same number as the GMB primary.
  phone: '(414) 240-4626',
  phoneHref: 'tel:+14142404626',
  smsHref: 'sms:+14142404626',
  email: 'urbanloggersllc@gmail.com',
  address: {
    street: '17000 W North Ave',
    city: 'Brookfield',
    state: 'WI',
    zip: '53005',
    full: '17000 W North Ave, Brookfield, WI 53005',
  },
  geo: { lat: 43.0606, lng: -88.1065 }, // verified GBP location (Brookfield)
  // THREE Google Business Profiles — one silo each. Every value below is the profile's own
  // "Share > Embed a map" output; that is the only authority for a place ID.
  //
  // A page must embed and link ONE profile: the one that serves it. Mixing them is the L1/L2/L3
  // failure in audit/fixes/00-local.md — a Brookfield pin on a Menomonee Falls page tells Google
  // that page is about Brookfield.
  //
  // Reach these only through <GbpMap profile="..." /> and GBP[...].mapsUrl. Never paste an iframe:
  // the place IDs are indistinguishable by eye (all three render as "Urban Loggers LLC") and a
  // wrong paste is invisible until it is measured.
  gbp: {
    // The service-area business — the umbrella listing. Default for the homepage, /contact/ and
    // any city page without its own profile. Wide satellite view, no street pin.
    serviceArea: {
      placeId: '0x880516dbeab8a99f:0x1874332308ed51c8',
      cid: '1762089579775349192',
      mapsUrl: 'https://www.google.com/maps?cid=1762089579775349192',
      // A service-area listing hides its street address on the profile, so the site must not
      // publish one for it. `address` is null here on purpose — see L2 in audit/fixes/00-local.md.
      //
      // DISPLAY number is the main SignalWire line (414) 240-4626 — Joey owns it, so calls and
      // texts from the homepage and the 12 cities without their own profile stay attributed.
      // This is a deliberate choice of call tracking over a literal NAP match: the service-area
      // listing itself is registered as (414) 514-0750 (`gbpListedPhone` below), the standard
      // tracking-number-as-GBP-primary arrangement.
      phone: '(414) 240-4626',
      phoneHref: 'tel:+14142404626',
      smsHref: 'sms:+14142404626',
      /** The number on the listing itself. Recorded for NAP checks; not rendered. */
      gbpListedPhone: '(414) 514-0750',
      address: null,
      embedPb:
        '!1m18!1m12!1m3!1d885448.0302412213!2d-87.8306425!3d43.04447795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880516dbeab8a99f%3A0x1874332308ed51c8!2sUrban%20Loggers%20LLC!5e1!3m2!1sen!2sus!4v1773871772090!5m2!1sen!2sus',
    },
    // Brookfield — the 17000 W North Ave listing. Street-level pin. /brookfield/ only.
    brookfield: {
      placeId: '0x880507432e635c89:0x602b233ffb1376b8',
      cid: '6929671209341908664',
      mapsUrl: 'https://www.google.com/maps?cid=6929671209341908664',
      // Confirmed 2026-10-04: (414) 240-4626 is the BROOKFIELD location's number. Each listing has
      // its own: Brookfield 414 · Menomonee Falls (262) 205-4670 · Waukesha (262) 205-4777.
      phone: '(414) 240-4626',
      phoneHref: 'tel:+14142404626',
      smsHref: 'sms:+14142404626',
      address: {
        street: '17000 W North Ave',
        city: 'Brookfield',
        state: 'WI',
        zip: '53005',
        full: '17000 W North Ave, Brookfield, WI 53005',
      },
      embedPb:
        '!1m18!1m12!1m3!1d2915.043721436626!2d-88.1235279!3d43.061547999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880507432e635c89%3A0x602b233ffb1376b8!2sUrban%20Loggers%20LLC!5e0!3m2!1sen!2sus!4v1783799361027!5m2!1sen!2sus',
    },
    // Waukesha — the fourth profile, verified 2026-10-04. Street-level pin. /waukesha/ only.
    // Sited on demand measured from a second property: milwaukeetreeguys.com's Waukesha page takes
    // 6,839 impressions over 3 months for 1 click, while this site's /waukesha/ captures none of it.
    waukesha: {
      placeId: '0x8805a5209c2b9135:0xb7454492cdd1efc6',
      cid: '13206036879642849222',
      mapsUrl: 'https://www.google.com/maps?cid=13206036879642849222',
      // This profile has its OWN number and address. They must match the listing exactly, and
      // /waukesha/ must show these and NOT the (414) — a page showing two numbers fails L3.
      phone: '(262) 205-4777',
      phoneHref: 'tel:+12622054777',
      smsHref: 'sms:+12622054777',
      address: {
        street: '1915 Mac Arthur Rd',
        city: 'Waukesha',
        state: 'WI',
        zip: '53188',
        full: '1915 Mac Arthur Rd, Waukesha, WI 53188',
      },
      embedPb:
        '!1m18!1m12!1m3!1d2918.129971787051!2d-88.256134!3d42.996597699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8805a5209c2b9135%3A0xb7454492cdd1efc6!2sUrban%20Loggers%20LLC!5e0!3m2!1sen!2sus!4v1791139056075!5m2!1sen!2sus',
    },
    // Menomonee Falls — the third profile, verified 2026-10-04. /menomonee-falls/ only.
    menomoneeFalls: {
      placeId: '0x8804fde3dd82c641:0x6609d89c8f704226',
      cid: '7352646033592042022',
      mapsUrl: 'https://www.google.com/maps?cid=7352646033592042022',
      phone: '(262) 205-4670',
      phoneHref: 'tel:+12622054670',
      smsHref: 'sms:+12622054670',
      address: {
        street: 'N88W13901 Main St',
        city: 'Menomonee Falls',
        state: 'WI',
        zip: '53051',
        full: 'N88W13901 Main St, Menomonee Falls, WI 53051',
      },
      embedPb:
        '!1m14!1m8!1m3!1d186462.60594253847!2d-88.2072758!3d43.094464!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8804fde3dd82c641%3A0x6609d89c8f704226!2sUrban%20Loggers%20LLC!5e0!3m2!1sen!2sus!4v1791130156615!5m2!1sen!2sus',
    },
  },
  serviceArea: 'Greater Milwaukee, WI',
  credentials: [
    '20+ years experience',
    'Fully insured',
    'Licensed arborist',
  ],
  social: {
    angi: 'https://www.angi.com',
    nextdoor: 'https://nextdoor.com',
    google: 'https://www.google.com/maps?cid=1762089579775349192', // == gbp.serviceArea.mapsUrl
    // add real profile URLs when available: yelp, facebook, instagram
  },
  rating: 4.9, // Google Business Profile rating
  reviewCount: 30, // Google Business Profile review count
} as const

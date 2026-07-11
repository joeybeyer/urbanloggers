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
  serviceArea: 'Greater Milwaukee, WI',
  credentials: [
    '20+ years experience',
    'Fully insured',
    'Licensed arborist',
  ],
  social: {
    angi: 'https://www.angi.com',
    nextdoor: 'https://nextdoor.com',
    google: 'https://www.google.com/maps?cid=1762089579775349192',
    // add real profile URLs when available: yelp, facebook, instagram
  },
  rating: 4.9, // Google Business Profile rating
  reviewCount: 30, // Google Business Profile review count
} as const

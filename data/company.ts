export const COMPANY = {
  name: 'Urban Loggers LLC',
  owner: 'Brian Smith',
  phone: '(414) 240-4626',
  phoneHref: 'tel:4142404626',
  email: 'urbanloggersllc@gmail.com',
  address: {
    street: '',
    city: 'Milwaukee',
    state: 'WI',
    zip: '53202',
    full: 'Greater Milwaukee, WI',
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
    google: 'https://www.google.com/maps?cid=1762089579775349192',
    // add real profile URLs when available: yelp, facebook, instagram
  },
  rating: 4.9, // Google Business Profile rating
  reviewCount: 30, // Google Business Profile review count
} as const

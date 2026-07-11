import { COMPANY } from '@/data/company'

export interface FAQ {
  question: string
  answer: string
}

const BASE_URL = 'https://urbanloggers.org'
const BUSINESS_ID = `${BASE_URL}/#business`

export function localBusinessSchema(areaServed?: string, citySlug?: string, mapUrl?: string) {
  // Use unique @id per city page to avoid duplicate @id errors
  const id = citySlug ? `${BASE_URL}/#business-${citySlug}` : BUSINESS_ID
  // Optional per-page GMB override: e.g. /brookfield references the Brookfield listing instead of the
  // main service-area listing (COMPANY.social.google), so that page is fully siloed to its own GMB.
  const sameAs = mapUrl
    ? [mapUrl, ...Object.values(COMPANY.social).filter((u) => u !== COMPANY.social.google)]
    : Object.values(COMPANY.social)

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'TreeService'],
    '@id': id,
    name: COMPANY.name,
    description:
      'Professional tree removal, trimming, stump grinding, emergency tree service, and log milling in Greater Milwaukee, WI.',
    telephone: COMPANY.phone,
    email: COMPANY.email,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    hasMap: mapUrl ?? COMPANY.social.google,
    areaServed: areaServed
      ? { '@type': 'City', name: areaServed }
      : { '@type': 'AdministrativeArea', name: 'Greater Milwaukee, WI' },
    // NOTE: confirm Urban Loggers' real business hours — these are typical defaults. 24/7 emergency
    // availability is conveyed in page copy, not as literal all-day schema hours (which read as fake).
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    founder: {
      '@type': 'Person',
      name: COMPANY.owner,
    },
    hasCredential: COMPANY.credentials,
    knowsAbout: [
      'Tree Removal',
      'Tree Trimming',
      'Tree Pruning',
      'Stump Grinding',
      'Emergency Tree Service',
      'Storm Damage Cleanup',
      'Log Milling',
      'Portable Sawmill',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY.rating,
      reviewCount: COMPANY.reviewCount,
      bestRating: 5,
    },
    sameAs,
  }
}

export function serviceSchema(
  serviceName: string,
  description: string,
  url: string,
  serviceType?: string,
  priceRange?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description,
    serviceType: serviceType ?? serviceName,
    provider: {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: COMPANY.name,
      telephone: COMPANY.phone,
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Greater Milwaukee, WI',
    },
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceRange: priceRange ?? '$$',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: COMPANY.rating,
      reviewCount: COMPANY.reviewCount,
      bestRating: 5,
    },
  }
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.faq-question', '.faq-answer'],
    },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function breadcrumbSchema(
  crumbs: { name: string; item: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: COMPANY.owner,
    jobTitle: 'Owner & Lead Arborist',
    worksFor: {
      '@type': 'LocalBusiness',
      '@id': BUSINESS_ID,
      name: COMPANY.name,
    },
    description:
      'Brian Smith has 20+ years of professional tree care experience in Greater Milwaukee. Fully insured.',
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: COMPANY.name,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description:
      'Professional tree removal, trimming, stump grinding, emergency tree service, and log milling in Greater Milwaukee, WI.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.address.street,
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: COMPANY.phone,
      contactType: 'customer service',
    },
    sameAs: Object.values(COMPANY.social),
  }
}

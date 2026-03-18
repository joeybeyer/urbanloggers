import { COMPANY } from '@/data/company'

export interface FAQ {
  question: string
  answer: string
}

const BASE_URL = 'https://urbanloggers.org'
const BUSINESS_ID = `${BASE_URL}/#business`

export function localBusinessSchema(areaServed?: string, citySlug?: string) {
  // Use unique @id per city page to avoid duplicate @id errors
  const id = citySlug ? `${BASE_URL}/#business-${citySlug}` : BUSINESS_ID

  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
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
      addressLocality: COMPANY.address.city,
      addressRegion: COMPANY.address.state,
      postalCode: COMPANY.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.0389,
      longitude: -87.9065,
    },
    areaServed: areaServed
      ? { '@type': 'City', name: areaServed }
      : { '@type': 'AdministrativeArea', name: 'Greater Milwaukee, WI' },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
    founder: {
      '@type': 'Person',
      name: COMPANY.owner,
    },
    hasCredential: COMPANY.credentials,
    sameAs: [
      'https://www.angi.com',
      'https://nextdoor.com',
    ],
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
      '@type': 'City',
      name: 'Milwaukee, WI',
    },
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      priceRange: priceRange ?? '$$',
      availability: 'https://schema.org/InStock',
    },
  }
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
      'Brian Smith has 20+ years of professional tree care experience in Greater Milwaukee. SAM registered and fully insured.',
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
    sameAs: [
      'https://www.angi.com',
      'https://nextdoor.com',
    ],
  }
}

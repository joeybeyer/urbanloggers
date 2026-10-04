import { COMPANY } from '@/data/company'
import { napForPath } from '@/lib/gbp'

export interface FAQ {
  question: string
  answer: string
}

const BASE_URL = 'https://urbanloggers.org'
const BUSINESS_ID = `${BASE_URL}/#business`

export function localBusinessSchema(areaServed?: string, citySlug?: string, mapUrl?: string) {
  // Use unique @id per city page to avoid duplicate @id errors
  const id = citySlug ? `${BASE_URL}/#business-${citySlug}` : BUSINESS_ID

  // The NAP of the profile serving this page, resolved from the city slug. Three of the four
  // profiles have their own phone and street, so a page that emits COMPANY.phone and the
  // Brookfield address contradicts its own listing — the opposite of what LocalBusiness is for.
  const nap = napForPath(citySlug ? `/${citySlug}` : '/')

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
    telephone: nap.phone,
    email: COMPANY.email,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    priceRange: '$$',
    // A service-area listing hides its street on the profile, so pages it serves emit the locality
    // without a streetAddress rather than borrowing Brookfield's. Pages with their own profile
    // emit that profile's real street.
    address: nap.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: nap.address.street,
          addressLocality: nap.address.city,
          addressRegion: nap.address.state,
          postalCode: nap.address.zip,
          addressCountry: 'US',
        }
      : {
          '@type': 'PostalAddress',
          addressLocality: areaServed?.split(',')[0] ?? 'Milwaukee',
          addressRegion: 'WI',
          addressCountry: 'US',
        },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.lat,
      longitude: COMPANY.geo.lng,
    },
    hasMap: mapUrl ?? nap.mapsUrl,
    areaServed: areaServed
      ? { '@type': 'City', name: areaServed }
      : { '@type': 'AdministrativeArea', name: 'Greater Milwaukee, WI' },
    // Open 24 hours — confirmed 2026-10-04 for ALL FOUR profiles, which is why this is one spec
    // rather than per-profile. The Brookfield page and the site FAQ ("24/7") already said so.
    //
    // This replaces a guessed Mon-Fri 07:00-18:00 / Sat 08:00-16:00 block whose own comment
    // admitted it was a placeholder. It contradicted the visible "Hours: Open 24 hours" on the
    // profile pages, so every one of those pages was telling visitors and Google different things.
    // 00:00-23:59 across all seven days is how schema.org expresses always-open.
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
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

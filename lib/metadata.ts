import type { Metadata } from 'next'

const BASE_URL = 'https://urbanloggers.org'

export function buildMetadata(
  title: string,
  description: string,
  path: string,
  options?: {
    noIndex?: boolean
  }
): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    // absolute bypasses the layout's `%s | Urban Loggers LLC` template — page titles already include the
    // brand once, so the template was doubling it ("… | Urban Loggers LLC | Urban Loggers LLC").
    title: { absolute: title },
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Urban Loggers LLC',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    robots: options?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

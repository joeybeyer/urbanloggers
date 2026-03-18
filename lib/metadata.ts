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
    title,
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

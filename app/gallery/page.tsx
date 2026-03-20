import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { GalleryPageClient } from './GalleryPageClient'

export const metadata: Metadata = buildMetadata(
  'Gallery | Urban Loggers LLC Milwaukee',
  'See Urban Loggers LLC in action — tree removal, sawmilling, and custom work across Greater Milwaukee.',
  '/gallery/'
)

export default function GalleryPage() {
  const crumbs = [
    { name: 'Home', item: 'https://urbanloggers.org/' },
    { name: 'Gallery', item: 'https://urbanloggers.org/gallery/' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <GalleryPageClient />
    </>
  )
}

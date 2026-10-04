import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { GalleryPageClient } from './GalleryPageClient'

export const metadata: Metadata = buildMetadata(
  'Gallery | Urban Loggers LLC Milwaukee',
  'See Urban Loggers LLC in action — tree removal, sawmilling, and custom work across Greater Milwaukee.',
  '/gallery/'
)

export default function GalleryPage() {

  return (
    <>

      <GalleryPageClient />
    </>
  )
}

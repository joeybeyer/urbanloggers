'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

const categories = ['All', 'Tree Removal', 'Sawmilling & Lumber', 'Custom Work', 'Our Crew'] as const

const galleryImages = [
  { src: '/images/gallery/gallery-01.webp', alt: 'Crew member on job site', category: 'Our Crew', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-02.webp', alt: 'Professional arborist at work', category: 'Our Crew', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-03.webp', alt: 'Large tree removal on residential property', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-04.webp', alt: 'Log milling with portable sawmill', category: 'Sawmilling & Lumber', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-05.webp', alt: 'Professional tree cutting with heavy equipment', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-06.webp', alt: 'Precision tree removal near structures', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-07.webp', alt: 'Tree trimming and branch removal', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-08.webp', alt: 'Completed tree removal cleanup', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-09.webp', alt: 'Arborist climbing for safe tree removal', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-10.webp', alt: 'Custom lumber processing from felled trees', category: 'Sawmilling & Lumber', width: 1200, height: 554 },
  { src: '/images/gallery/gallery-11.webp', alt: 'Large trunk sectioning during removal', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-12.webp', alt: 'Tree assessment before removal', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-13.webp', alt: 'Tree climber using ropes for safe residential removal', category: 'Our Crew', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-14.webp', alt: 'Crew sawmilling a large tree stump into lumber', category: 'Sawmilling & Lumber', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-15.webp', alt: 'Urban Loggers team photo with chainsaws and cut logs', category: 'Our Crew', width: 678, height: 492 },
  { src: '/images/gallery/gallery-16.webp', alt: 'Arborist in safety gear high in tree for controlled removal', category: 'Tree Removal', width: 1200, height: 675 },
  { src: '/images/gallery/gallery-17.webp', alt: 'Climber working in large tree with ground crew support', category: 'Tree Removal', width: 900, height: 1600 },
  { src: '/images/gallery/gallery-18.webp', alt: 'Tree marked for removal on residential deck', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-19.webp', alt: 'Custom rustic furniture crafted from tree rounds', category: 'Custom Work', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-20.webp', alt: 'Lumber yard with stacked logs and processing equipment', category: 'Sawmilling & Lumber', width: 1153, height: 2048 },
  { src: '/images/gallery/gallery-21.webp', alt: 'Ground crew cutting large tree trunk with chainsaw', category: 'Sawmilling & Lumber', width: 1153, height: 2048 },
]

function isPortrait(img: { width: number; height: number }) {
  return img.height > img.width
}

export function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[number] | null>(null)

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return galleryImages
    return galleryImages.filter((img) => img.category === activeCategory)
  }, [activeCategory])

  const portraitImages = useMemo(() => filteredImages.filter(isPortrait), [filteredImages])
  const landscapeImages = useMemo(() => filteredImages.filter((img) => !isPortrait(img)), [filteredImages])

  const closeLightbox = useCallback(() => setSelectedImage(null), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeLightbox])

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From emergency storm response to custom log milling — see what 20+ years of tree expertise looks like.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-green text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1 text-xs opacity-70">
                  ({galleryImages.filter((img) => img.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500 mb-6">{filteredImages.length} photos</p>

          {/* Portrait images — horizontal scroll row at top */}
          {portraitImages.length > 0 && (
            <div className="mb-8">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin">
                {portraitImages.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(img)}
                    className="flex-none snap-start relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white group focus:outline-none focus:ring-2 focus:ring-brand-green"
                    style={{ width: '200px', height: '360px' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="200px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx < 4 ? 'eager' : 'lazy'}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-xs font-medium">{img.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Landscape images — standard grid */}
          {landscapeImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {landscapeImages.map((img, idx) => (
                <button
                  key={img.src}
                  onClick={() => setSelectedImage(img)}
                  className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white group focus:outline-none focus:ring-2 focus:ring-brand-green"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx < 6 ? 'eager' : 'lazy'}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">{img.category}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 z-50"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm px-4">
            {selectedImage.alt}
          </p>
        </div>
      )}
    </>
  )
}

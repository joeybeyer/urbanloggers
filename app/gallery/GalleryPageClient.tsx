'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'

const categories = ['All', 'Tree Removal', 'Sawmilling & Lumber', 'Custom Work', 'Our Crew'] as const

const galleryImages = [
  { src: '/images/gallery/gallery-03.webp', alt: 'Large residential tree removal service by Urban Loggers LLC in Milwaukee WI', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-04.webp', alt: 'Portable sawmill log milling operation producing custom lumber from felled trees in Milwaukee', category: 'Sawmilling & Lumber', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-05.webp', alt: 'Professional tree cutting and removal with heavy equipment in Greater Milwaukee area', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-06.webp', alt: 'Precision tree removal near residential structures by certified Milwaukee arborist', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-07.webp', alt: 'Milwaukee arborist performing safe tree trimming with chainsaw and professional climbing gear', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-08.webp', alt: 'Experienced tree service crew completing residential tree removal cleanup in Milwaukee WI', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-09.webp', alt: 'ISA certified arborist climbing tall tree for safe branch removal in Milwaukee neighborhood', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-10.webp', alt: 'Custom lumber and live edge slabs produced from Milwaukee tree removal projects', category: 'Sawmilling & Lumber', width: 1200, height: 554 },
  { src: '/images/gallery/gallery-11.webp', alt: 'Large tree trunk sectioning during emergency tree removal service in Milwaukee', category: 'Tree Removal', width: 1200, height: 900 },
  { src: '/images/gallery/gallery-12.webp', alt: 'Professional tree assessment and safety preparation before residential tree removal in Milwaukee', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-13.webp', alt: 'Certified arborist using rope rigging techniques for safe residential tree removal in Milwaukee', category: 'Our Crew', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-14.webp', alt: 'Urban Loggers crew operating log milling equipment to create custom lumber from tree stumps', category: 'Sawmilling & Lumber', width: 946, height: 2048 },
  { src: '/images/gallery/gallery-15.webp', alt: 'Urban Loggers LLC professional tree service crew with chainsaws and felled logs in Milwaukee WI', category: 'Our Crew', width: 678, height: 492 },
  { src: '/images/gallery/gallery-16.webp', alt: 'Professional arborist using chainsaw for precision tree trimming secured with safety ropes in Milwaukee', category: 'Tree Removal', width: 1200, height: 675 },
  { src: '/images/gallery/gallery-17.webp', alt: 'Tree service crew performing residential tree removal with professional climbing techniques in Milwaukee', category: 'Tree Removal', width: 900, height: 1600 },
  { src: '/images/gallery/gallery-18.webp', alt: 'Milwaukee tree removal service preparing large tree for safe cutting near residential home', category: 'Tree Removal', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-19.webp', alt: 'Custom rustic outdoor furniture handcrafted from milled tree rounds by Urban Loggers LLC Milwaukee', category: 'Custom Work', width: 1200, height: 1600 },
  { src: '/images/gallery/gallery-20.webp', alt: 'Log milling yard with stacked lumber ready for custom production after Milwaukee tree removal', category: 'Sawmilling & Lumber', width: 1153, height: 2048 },
  { src: '/images/gallery/gallery-21.webp', alt: 'Professional tree service crew member using chainsaw for stump grinding and tree cutting in Milwaukee', category: 'Sawmilling & Lumber', width: 1153, height: 2048 },
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

  const goNext = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.src === selectedImage.src)
    const next = (idx + 1) % filteredImages.length
    setSelectedImage(filteredImages[next])
  }, [selectedImage, filteredImages])

  const goPrev = useCallback(() => {
    if (!selectedImage) return
    const idx = filteredImages.findIndex((img) => img.src === selectedImage.src)
    const prev = (idx - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prev])
  }, [selectedImage, filteredImages])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeLightbox, goNext, goPrev])

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

          {/* Portrait images — single-row carousel at top */}
          {portraitImages.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-charcoal">Action Shots</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById('portrait-carousel')
                      if (el) el.scrollBy({ left: -220, behavior: 'smooth' })
                    }}
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-colors"
                    aria-label="Scroll left"
                  >‹</button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('portrait-carousel')
                      if (el) el.scrollBy({ left: 220, behavior: 'smooth' })
                    }}
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-brand-green hover:text-white flex items-center justify-center text-lg transition-colors"
                    aria-label="Scroll right"
                  >›</button>
                </div>
              </div>
              <div id="portrait-carousel" className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {portraitImages.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedImage(img)}
                    className="flex-none relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white group focus:outline-none focus:ring-2 focus:ring-brand-green"
                    style={{ width: '180px', height: '300px' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="180px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={idx < 6 ? 'eager' : 'lazy'}
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
          <h2 className="text-lg font-semibold text-charcoal mb-4">Project Gallery</h2>
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
          {/* Previous button */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl hover:text-gray-300 z-50 bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            ‹
          </button>
          {/* Next button */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white text-4xl sm:text-5xl hover:text-gray-300 z-50 bg-black/40 hover:bg-black/60 rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            ›
          </button>
          <div className="flex items-center justify-center max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width}
              height={selectedImage.height}
              className="max-h-[85vh] w-auto h-auto object-contain rounded"
              sizes="90vw"
              priority
            />
          </div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-white text-sm px-4">
            {selectedImage.alt} — {filteredImages.findIndex((img) => img.src === selectedImage.src) + 1} / {filteredImages.length}
          </p>
        </div>
      )}
    </>
  )
}

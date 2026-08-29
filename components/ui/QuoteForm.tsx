'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { COMPANY } from '@/data/company'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

type ServiceCategory = 'removal' | 'trimming' | 'stump' | 'emergency' | 'milling' | null

type ScopeCard = { value: string; label: string; subtitle?: string; description: string; badge?: string }

// Step 2 — big-button service selector. Slugs match the hubs in data/services.ts.
const categories: {
  value: Exclude<ServiceCategory, null>
  slug: string
  name: string
  headline: string
  sub: string
  badge?: string
  accent: 'green' | 'amber'
}[] = [
  {
    value: 'removal', slug: 'tree-removal', name: 'Tree Removal',
    headline: 'I need a tree taken down', sub: 'Dead, damaged, or just in the wrong place',
    badge: 'Most Common', accent: 'green',
  },
  {
    value: 'trimming', slug: 'tree-trimming-pruning', name: 'Tree Trimming & Pruning',
    headline: 'I need trees trimmed or pruned', sub: 'Deadwood, crown thinning, clearance from the house',
    accent: 'green',
  },
  {
    value: 'stump', slug: 'stump-grinding', name: 'Stump Grinding',
    headline: 'I have a stump to grind', sub: 'Ground below grade so you can replant or sod',
    accent: 'green',
  },
  {
    value: 'emergency', slug: 'emergency-tree-service', name: 'Emergency Tree Service',
    headline: "It's an emergency", sub: 'Storm damage, fallen tree, hanging limb — 24/7',
    badge: 'Call First', accent: 'amber',
  },
  {
    value: 'milling', slug: 'log-milling', name: 'Log Milling',
    headline: 'I want my logs milled into lumber', sub: 'Portable sawmill — slabs, beams, and boards',
    accent: 'green',
  },
]

// Step 3 — visual scope cards per category.
const scopeCardsByCategory: Record<Exclude<ServiceCategory, null>, ScopeCard[]> = {
  removal: [
    { value: 'small-tree', label: 'Small Tree', subtitle: '<25 ft', description: 'Ornamental, young, or shrub-sized' },
    { value: 'medium-tree', label: 'Medium Tree', subtitle: '25–50 ft', description: 'Typical backyard maple or ash', badge: 'Most Common' },
    { value: 'large-tree', label: 'Large Tree', subtitle: '50 ft+', description: 'Mature oak, cottonwood, or silver maple' },
    { value: 'multiple-trees', label: 'Multiple Trees', description: 'Two or more, or a whole lot to clear' },
    { value: 'not-sure', label: "I'm Not Sure", description: 'Come take a look and give me a ballpark' },
  ],
  trimming: [
    { value: 'one-tree', label: 'One Tree', description: 'Single tree needs shaping or thinning' },
    { value: 'several-trees', label: 'Several Trees', description: 'A few trees around the property', badge: 'Most Common' },
    { value: 'deadwood', label: 'Deadwood / Storm Cleanup', description: 'Broken or hanging limbs to clear out' },
    { value: 'clearance', label: 'Clearance Work', description: 'Off the roof, driveway, or power drop' },
    { value: 'not-sure', label: "I'm Not Sure", description: 'Just want an honest assessment' },
  ],
  stump: [
    { value: 'one-stump', label: 'One Stump', description: 'Single grind, 12 inches below grade', badge: 'Most Common' },
    { value: 'few-stumps', label: '2–5 Stumps', description: 'Multi-stump jobs get a discount' },
    { value: 'many-stumps', label: '6+ / Lot Clearing', description: 'Whole property or new construction' },
    { value: 'not-sure', label: "I'm Not Sure", description: 'Give me a ballpark' },
  ],
  emergency: [
    { value: 'tree-on-structure', label: 'Tree on a Structure', description: 'House, garage, shed, or fence', badge: 'Top Priority' },
    { value: 'tree-on-vehicle', label: 'Tree on a Vehicle', description: 'Car, truck, or equipment pinned' },
    { value: 'blocking-access', label: 'Blocking Access', description: 'Driveway, road, or entryway blocked' },
    { value: 'hanging-limb', label: 'Hanging Limb', description: 'Widow-maker still up in the canopy' },
    { value: 'near-power-lines', label: 'Near Power Lines', description: "Don't touch it — we coordinate with We Energies" },
  ],
  milling: [
    { value: 'live-edge-slabs', label: 'Live-Edge Slabs', description: 'Table tops, mantels, bar tops', badge: 'Most Requested' },
    { value: 'dimensional-lumber', label: 'Dimensional Lumber', description: 'Boards and beams for a build' },
    { value: 'existing-logs', label: 'Logs I Already Have', description: 'Already down and stored on my property' },
    { value: 'not-sure', label: "I'm Not Sure", description: "Let's talk about what the tree could become" },
  ],
}

const stepLabels = ['Your Area', 'Service Needed', 'Project Details', 'Almost Done!']

// Photo upload. Vercel caps a serverless request body at ~4.5 MB, so everything is
// downscaled and re-encoded as JPEG in the browser before it ever leaves the page.
const MAX_PHOTOS = 4
const MAX_DIMENSION = 1600
const JPEG_QUALITY = 0.7
const TOTAL_PHOTO_BUDGET = 3_000_000

type StagedPhoto = { id: string; previewUrl: string; dataBase64: string; contentType: string; bytes: number }

/** Downscale to MAX_DIMENSION on the long edge and re-encode as JPEG. */
async function compressImage(file: File): Promise<StagedPhoto> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('canvas unavailable')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
  const dataBase64 = dataUrl.split(',')[1] ?? ''
  return {
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2, 8)}`,
    previewUrl: dataUrl,
    dataBase64,
    contentType: 'image/jpeg',
    bytes: Math.round((dataBase64.length * 3) / 4), // base64 encodes 3 bytes as 4 chars
  }
}

const formatBytes = (bytes: number): string =>
  bytes >= 1_000_000 ? `${(bytes / 1_000_000).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1000))} KB`

export function QuoteForm({ className = '' }: { className?: string }) {
  const router = useRouter()

  const [step, setStep] = useState(1)
  const [category, setCategory] = useState<ServiceCategory>(null)
  const [scope, setScope] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [zip, setZip] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipLookupLoading, setZipLookupLoading] = useState(false)
  const [zipValid, setZipValid] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [smsOptIn, setSmsOptIn] = useState(true)
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')

  const [photos, setPhotos] = useState<StagedPhoto[]>([])
  const [photoBusy, setPhotoBusy] = useState(false)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  // Time trap — bots submit near-instantly. Checked server-side.
  const [formLoadTime] = useState(() => Date.now())
  // Guards the analytics push so form_submit fires EXACTLY ONCE per lead.
  const formSubmittedRef = useRef(false)

  const activeCategory = categories.find((c) => c.value === category)
  const photoBytes = photos.reduce((sum, p) => sum + p.bytes, 0)

  // Auto-advance step 2 once a category is picked (300ms visual feedback delay).
  useEffect(() => {
    if (step === 2 && category) {
      const timer = setTimeout(() => {
        setError(null)
        setStep(3)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [category, step])

  async function lookupZip() {
    if (!/^\d{5}$/.test(zip)) return
    setZipLookupLoading(true)
    setZipValid(false)
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zip}`)
      if (res.ok) {
        const data = await res.json()
        if (data.places?.length > 0) {
          setCity(data.places[0]['place name'])
          setState(data.places[0]['state abbreviation'])
          setZipValid(true)
        }
      }
    } catch {
      // Silently fail — the ZIP still submits, we just don't echo the city back.
    }
    setZipLookupLoading(false)
  }

  async function addPhotos(files: FileList | null) {
    if (!files?.length) return
    setPhotoError(null)
    setPhotoBusy(true)

    const staged: StagedPhoto[] = []
    let budget = TOTAL_PHOTO_BUDGET - photoBytes
    let room = MAX_PHOTOS - photos.length
    let skipped = 0

    for (const file of Array.from(files)) {
      if (room <= 0 || !file.type.startsWith('image/')) {
        skipped++
        continue
      }
      try {
        const photo = await compressImage(file)
        if (photo.bytes > budget) {
          skipped++
          continue
        }
        budget -= photo.bytes
        room--
        staged.push(photo)
      } catch {
        skipped++ // HEIC and other formats the browser can't decode land here
      }
    }

    if (staged.length) setPhotos((prev) => [...prev, ...staged])
    if (skipped) {
      setPhotoError(
        staged.length
          ? `Added ${staged.length}. Skipped ${skipped} — limit is ${MAX_PHOTOS} photos.`
          : `Couldn't add ${skipped === 1 ? 'that photo' : 'those photos'}. Limit is ${MAX_PHOTOS} photos — or try a JPEG.`
      )
    }
    setPhotoBusy(false)
    if (photoInputRef.current) photoInputRef.current.value = ''
  }

  function removePhoto(id: string) {
    setPhotos((prev) => prev.filter((p) => p.id !== id))
    setPhotoError(null)
  }

  async function nextStep() {
    if (step === 1) {
      if (!/^\d{5}$/.test(zip)) {
        setFieldErrors({ zip: 'Please enter a valid 5-digit ZIP code' })
        return
      }
      setFieldErrors({})
      await lookupZip()
    } else if (step === 2 && !category) {
      setError('Please select the service you need')
      return
    } else if (step === 3 && !scope) {
      setError('Please select an option to continue')
      return
    }
    setError(null)
    setStep((s) => s + 1)
  }

  function prevStep() {
    setError(null)
    if (step === 3) {
      setCategory(null)
      setScope('')
    }
    setStep((s) => s - 1)
  }

  function validateContact() {
    const errs: Record<string, string> = {}
    if (name.trim().length < 2) errs.name = 'Please enter your name'
    if (!/^[\d\s\-().+]{7,}$/.test(phone)) errs.phone = 'Please enter a valid phone number'
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) errs.email = 'Please enter a valid email address'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateContact()) return

    setSubmitting(true)
    setError(null)

    // Google Ads click IDs + utm_* (captured on landing by GclidCapture) → source (google-ads vs
    // organic) + campaign attribution, modeling Frank's dumpsterrescueusa.com.
    const cookie = (k: string) => {
      const m = document.cookie.match(new RegExp('(?:^|; )' + k + '=([^;]*)'))
      return m ? decodeURIComponent(m[1]) : ''
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          smsOptIn,
          message,
          service: activeCategory?.name ?? '',
          serviceSlug: activeCategory?.slug ?? '',
          scope: scopeCardsByCategory[category ?? 'removal'].find((c) => c.value === scope)?.label ?? '',
          zip,
          city,
          state,
          photos: photos.map((p) => ({ contentType: p.contentType, dataBase64: p.dataBase64 })),
          elapsedMs: Date.now() - formLoadTime,
          _honeypot: honeypot,
          gclid: cookie('gclid'),
          gbraid: cookie('gbraid'),
          wbraid: cookie('wbraid'),
          utm_source: cookie('utm_source'),
          utm_medium: cookie('utm_medium'),
          utm_campaign: cookie('utm_campaign'),
          utm_term: cookie('utm_term'),
          utm_content: cookie('utm_content'),
        }),
      })

      if (res.ok) {
        // Fire the conversion event ONCE, only after the lead actually sends.
        if (!formSubmittedRef.current) {
          formSubmittedRef.current = true
          window.dataLayer?.push({
            event: 'form_submit',
            event_category: 'lead',
            event_label: activeCategory?.name || 'quote_request',
            value: 1,
          })
        }
        router.push('/thank-you/')
        return
      }

      const json = await res.json().catch(() => ({}))
      setError(json.error ?? `Something went wrong. Please call us at ${COMPANY.phone}.`)
    } catch {
      setError(`Network error. Please call us directly at ${COMPANY.phone}.`)
    }

    setSubmitting(false)
  }

  return (
    <div className={`rounded-xl border border-gray-200 bg-white shadow-lg ${className}`}>
      {/* Progress indicator */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-brand-green shadow-sm' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-semibold text-gray-700">
          Step {step} of 4: {stepLabels[step - 1]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8" noValidate>
        {/* Honeypot — hidden spam trap */}
        <input
          type="text"
          name="_honeypot"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div aria-live="polite">
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          )}
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                Where&rsquo;s the tree? <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  id="zip"
                  name="zip"
                  autoComplete="postal-code"
                  maxLength={5}
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      nextStep()
                    }
                  }}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                  placeholder="53005"
                />
                {zipLookupLoading && (
                  <div className="flex items-center">
                    <svg className="h-5 w-5 animate-spin text-brand-green" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                )}
              </div>
              {fieldErrors.zip && <p className="mt-1 text-xs text-red-600">{fieldErrors.zip}</p>}
              <p className="mt-1.5 text-xs text-gray-500">
                We only use your ZIP to confirm we cover your area &mdash; no spam, ever.
              </p>
            </div>

            {zipValid && city && state && (
              <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3">
                <svg className="h-5 w-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium text-brand-green">{city}, {state}</span>
              </div>
            )}

            <button
              type="button"
              onClick={nextStep}
              data-cta="quote-step1-next"
              className="w-full rounded-lg bg-brand-green px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-green-dark"
            >
              Get My Free Quote
            </button>
          </div>
        )}

        {/* Step 2: Service category */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">What do you need done?</p>

            <div className="grid gap-3">
              {categories.map((c) => {
                const selected = category === c.value
                const amber = c.accent === 'amber'
                return (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setCategory(c.value)}
                    className={`relative flex items-center gap-4 rounded-lg border-2 p-4 text-left transition-all ${
                      selected
                        ? amber
                          ? 'border-amber-600 bg-amber-50 ring-2 ring-amber-200'
                          : 'border-brand-green bg-green-50 ring-2 ring-green-200'
                        : amber
                        ? 'border-amber-300 bg-amber-50/40 hover:border-amber-400 hover:bg-amber-50'
                        : c.badge
                        ? 'border-green-300 bg-green-50/30 hover:border-green-400 hover:bg-green-50'
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    {c.badge && (
                      <span className={`absolute -top-2 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${amber ? 'bg-amber-600' : 'bg-brand-green'}`}>
                        {c.badge}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-charcoal">{c.headline}</p>
                      <p className="text-sm text-gray-500">{c.sub}</p>
                    </div>
                    {selected && (
                      <svg className={`ml-auto h-6 w-6 shrink-0 ${amber ? 'text-amber-600' : 'text-brand-green'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={prevStep}
              className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        )}

        {/* Step 3: Project scope + photos */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-center text-sm font-medium text-gray-700">
              {category === 'removal' ? 'How big is the tree?'
                : category === 'trimming' ? 'How much needs trimming?'
                : category === 'stump' ? 'How many stumps?'
                : category === 'emergency' ? "What's the situation?"
                : 'What do you want out of the logs?'}
            </p>

            {category === 'emergency' && (
              <div className="flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 p-3">
                <svg className="h-5 w-5 shrink-0 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-sm text-amber-900">
                  <strong>Active emergency?</strong>{' '}
                  <a href={COMPANY.phoneHref} className="font-bold underline" data-cta="quote-step3-emergency-call">
                    Call {COMPANY.phone}
                  </a>{' '}
                  &mdash; we answer 24/7 and respond faster by phone.
                </p>
              </div>
            )}

            <div className="grid gap-3">
              {scopeCardsByCategory[category ?? 'removal'].map((card) => {
                const selected = scope === card.value
                return (
                  <button
                    key={card.value}
                    type="button"
                    onClick={() => { setScope(card.value); setError(null) }}
                    className={`relative flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                      selected
                        ? 'border-brand-green bg-green-50 ring-2 ring-green-200'
                        : card.value === 'not-sure'
                        ? 'border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        : card.badge
                        ? 'border-green-200 bg-green-50/30 hover:border-green-300 hover:bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {card.badge && (
                      <span className="absolute -top-2 right-3 rounded-full bg-brand-green px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        {card.badge}
                      </span>
                    )}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${selected ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {card.subtitle ?? '•'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-charcoal">{card.label}</p>
                      <p className="text-sm text-gray-500">{card.description}</p>
                    </div>
                    {selected && (
                      <svg className="h-6 w-6 shrink-0 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Photo upload — attached straight to Brian's lead email */}
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-4">
              <p className="text-sm font-bold text-charcoal">Add photos of the tree</p>
              <p className="mt-0.5 text-xs text-gray-500">
                Optional, but it&rsquo;s the fastest way to an accurate number &mdash; Brian can often quote straight from a photo.
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.previewUrl}
                      alt="Tree photo to be sent with your quote request"
                      className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      aria-label="Remove this photo"
                      className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-white shadow hover:bg-red-600"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}

                {photos.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={photoBusy}
                    data-cta="quote-add-photo"
                    className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 transition-colors hover:border-brand-green hover:text-brand-green disabled:opacity-50"
                  >
                    {photoBusy ? (
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <>
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
                        </svg>
                        <span className="text-[10px] font-semibold uppercase tracking-wide">Add</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => addPhotos(e.target.files)}
              />

              <div aria-live="polite">
                {photoError && <p className="mt-2 text-xs text-red-600">{photoError}</p>}
              </div>

              {photos.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  {photos.length} of {MAX_PHOTOS} &middot; compressed to {formatBytes(photoBytes)}
                </p>
              )}

              {/* Mobile shortcut: MMS the photo straight to the tracked number, which ACC captures. */}
              <p className="mt-3 text-xs text-gray-500 sm:hidden">
                On your phone?{' '}
                <a href={COMPANY.smsHref} className="font-semibold text-brand-green underline" data-cta="quote-step3-text-photo">
                  Text a photo to {COMPANY.phone}
                </a>{' '}
                instead.
              </p>
            </div>

            <p className="text-center text-xs text-gray-500">
              Brian walks every job site in person before quoting &mdash; your price is confirmed before any work starts.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                disabled={!scope}
                data-cta="quote-step3-next"
                className="flex-1 rounded-lg bg-brand-green px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-green-dark disabled:opacity-50"
              >
                Almost There &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Contact info */}
        {step === 4 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700">Where should we send your free quote?</p>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text" id="name" name="name" autoComplete="name" maxLength={100}
                value={name} onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Jane Smith"
              />
              {fieldErrors.name && <p className="mt-1 text-xs text-red-600">{fieldErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel" id="phone" name="phone" autoComplete="tel" maxLength={25}
                value={phone} onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="(414) 555-0100"
              />
              {fieldErrors.phone && <p className="mt-1 text-xs text-red-600">{fieldErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email" id="email" name="email" autoComplete="email" maxLength={150}
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="jane@example.com"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>}
              <p className="mt-1.5 text-xs text-gray-500">So Brian can send your written quote and reply directly.</p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Anything else we should know?
              </label>
              <textarea
                id="message" name="message" rows={3} maxLength={2000}
                value={message} onChange={(e) => setMessage(e.target.value)}
                className="mt-1 block w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green"
                placeholder="Species, access issues, how close it is to the house, urgency…"
              />
            </div>

            <label className="flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={smsOptIn}
                onChange={(e) => setSmsOptIn(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
              />
              <span className="text-sm text-gray-600">
                Text me my quote <span className="text-xs text-gray-400">(Recommended &mdash; fastest response)</span>
              </span>
            </label>

            {/* Trust box */}
            <div className="rounded-lg border border-gray-200 bg-warm-white p-4">
              <div className="space-y-2.5 text-sm text-gray-700">
                <p><strong>Fast:</strong> Response within 24 hours &mdash; 24/7 for emergencies</p>
                <p><strong>Free:</strong> On-site estimate, zero obligation. 20+ years, fully insured.</p>
                <p><strong>Safe:</strong> We hate spam too. Your info stays with us.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-4 text-sm font-bold uppercase tracking-wide text-gray-700 shadow hover:bg-gray-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                data-cta="quote-form-submit"
                className="flex-1 rounded-lg bg-brand-green px-6 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-brand-green-dark disabled:opacity-50"
              >
                {submitting ? 'Sending…' : 'Get My Free Quote'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

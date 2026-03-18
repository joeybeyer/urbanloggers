import { TestimonialCard } from '@/components/ui/TestimonialCard'

const testimonials = [
  {
    name: 'Karen M.',
    source: 'Angi' as const,
    stars: 5 as const,
    quote:
      "Brian and his crew removed a massive oak that was threatening our garage after the storms. They were professional, fast, and left our yard cleaner than they found it. Highly recommend Urban Loggers to anyone in Milwaukee.",
  },
  {
    name: 'Tom R.',
    source: 'Nextdoor' as const,
    stars: 5 as const,
    quote:
      "I had several ash trees with emerald ash borer damage. Brian assessed each one honestly — some he saved with treatment, two needed to come down. Didn't try to upsell me on unnecessary work. That integrity is rare.",
  },
  {
    name: 'Sarah K.',
    source: 'Google' as const,
    stars: 5 as const,
    quote:
      "The log milling service was incredible. We had a 150-year-old walnut fall in our yard and thought it was a total loss. Brian milled it into gorgeous slabs — we're having a custom dining table made. Truly special.",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-warm-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-3">
          What Milwaukee Homeowners Say
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Real reviews from Angi, Nextdoor, and Google.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

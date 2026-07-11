import { TestimonialCard } from '@/components/ui/TestimonialCard'

// Real, verbatim 5-star Google reviews from the business's Google Business Profile.
const testimonials = [
  {
    name: 'Mary Wacker',
    source: 'Google' as const,
    stars: 5 as const,
    quote:
      "Urban Loggers are the best! After WE Energies took down some huge dead trees and left me with an enormous pile of debris, it was Urban Loggers to the rescue! They chipped the wood pile in a couple hours, leaving me with beautiful wood chips for landscaping. They go above and beyond.",
  },
  {
    name: 'Karen Sparapani',
    source: 'Google' as const,
    stars: 5 as const,
    quote:
      "Brian came right away and got the fallen tree out of the fence, then gave me an estimate for a whole bunch of other work. Took them two days, they cleaned up beautifully — and were well under the estimate they gave me! Cannot recommend them strongly enough. Took this city girl's fear of the cost of tree removal away for good!",
  },
  {
    name: 'Ellen',
    source: 'Google' as const,
    stars: 5 as const,
    quote:
      "Took care of years of neglect in one day! Gave solid advice about the longevity of trees and trimming to look clean and tidy. Quote was on par with the final bill. Includes stump work in the same day — that's so helpful to know it is 'done'.",
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
          Real 5-star reviews from our Google Business Profile.
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

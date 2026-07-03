import { faqSchema } from '@/lib/schema'

const FAQS = [
  {
    question: 'How much does tree removal cost in Greater Milwaukee?',
    answer:
      'Most tree removals in the Milwaukee area run $300 to $2,000+ depending on the tree’s size, location, and complexity. Urban Loggers gives free, no-pressure on-site estimates before any work begins.',
  },
  {
    question: 'Is Urban Loggers LLC licensed and insured?',
    answer:
      'Yes. Urban Loggers is fully insured and led by a licensed arborist with 20+ years of experience. We provide insurance documentation for your records on request.',
  },
  {
    question: 'What is the portable sawmill service?',
    answer:
      'Instead of chipping your felled hardwoods, we can mill them on-site into live-edge slabs, custom lumber, and beams — turning a removed tree into something you keep. It’s our sustainability differentiator.',
  },
  {
    question: 'Do you offer 24/7 emergency tree service?',
    answer:
      'Yes. We respond to storm damage and hazardous trees 24/7 across Greater Milwaukee, typically on-site within hours to make the property safe.',
  },
  {
    question: 'What areas does Urban Loggers serve?',
    answer:
      'We serve Milwaukee County and the surrounding Waukesha, Ozaukee, and Racine County communities — from Wauwatosa and West Allis to Brookfield, Mequon, and Cedarburg.',
  },
  {
    question: 'How soon can you provide a quote?',
    answer:
      'Brian personally visits every job site, usually within 48 hours, and provides a written, itemized quote with no obligation.',
  },
]

export function HomeFAQ() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }}
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">
          Common Tree Service Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <div key={faq.question} className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="faq-question font-semibold text-charcoal mb-2">{faq.question}</h3>
              <p className="faq-answer text-gray-700 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

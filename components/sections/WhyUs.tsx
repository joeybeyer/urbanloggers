const reasons = [
  {
    icon: '🌳',
    title: '20+ Years of Expertise',
    desc: "Brian Smith has spent two decades working Milwaukee's urban forest — from 80-foot elms to delicate ornamentals. His deep knowledge of tree biology separates thoughtful care from chainsaw-and-go services.",
  },
  {
    icon: '🛡️',
    title: 'Fully Insured & SAM Registered',
    desc: "Every job is covered. We carry full liability and workers' compensation insurance, and maintain SAM (System for Award Management) registration. You're protected from start to finish.",
  },
  {
    icon: '🪵',
    title: 'Sawmill Differentiator',
    desc: "We don't just chip your trees — we mill them. Our portable sawmill turns felled hardwoods into beautiful live-edge slabs, beams, and custom lumber. Sustainable, unique, and yours to keep.",
  },
]

export function WhyUs() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-3">
          Why Urban Loggers LLC?
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
          Not every tree service is the same. Here&rsquo;s what sets Brian apart.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-6">
              <div className="text-5xl mb-4">{r.icon}</div>
              <h3 className="text-xl font-semibold text-charcoal mb-3">{r.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

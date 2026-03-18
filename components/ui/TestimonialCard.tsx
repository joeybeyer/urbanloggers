interface TestimonialCardProps {
  name: string
  source: 'Angi' | 'Nextdoor' | 'Google'
  stars: 1 | 2 | 3 | 4 | 5
  quote: string
}

export function TestimonialCard({ name, source, stars, quote }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-1 mb-3" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-gray-700 leading-relaxed mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-charcoal">{name}</span>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{source}</span>
      </div>
    </div>
  )
}

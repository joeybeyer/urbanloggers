'use client'

import { COMPANY } from '@/data/company'

interface TextButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-xl font-bold',
}

// "Text a Photo for a Quote" CTA — mirrors PhoneButton. Points at the SignalWire tracking number
// (COMPANY.smsHref), which SMS-forwards texts to Brian's cell so texts are attributed like calls.
export function TextButton({ size = 'md', className = '', label }: TextButtonProps) {
  function handleClick() {
    window.dataLayer?.push({
      event: 'text_message',
      event_category: 'engagement',
      event_label: COMPANY.phone,
      value: 1,
    })
  }

  return (
    <a
      href={COMPANY.smsHref}
      onClick={handleClick}
      data-cta="text-photo"
      className={`inline-flex items-center gap-2 border-2 border-brand-green text-brand-green hover:bg-brand-green hover:text-white rounded-md font-semibold transition-colors duration-200 ${sizeClasses[size]} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5 flex-shrink-0"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.9 48.9 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
          clipRule="evenodd"
        />
      </svg>
      {label ?? 'Text a Photo'}
    </a>
  )
}

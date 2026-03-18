'use client'

import { COMPANY } from '@/data/company'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

interface PhoneButtonProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  label?: string
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-xl font-bold',
}

export function PhoneButton({ size = 'md', className = '', label }: PhoneButtonProps) {
  function handleClick() {
    window.dataLayer?.push({
      event: 'phone_call',
      event_category: 'engagement',
      event_label: COMPANY.phone,
      value: 1,
    })
  }

  return (
    <a
      href={COMPANY.phoneHref}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white rounded-md font-semibold transition-colors duration-200 ${sizeClasses[size]} ${className}`}
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
          d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
          clipRule="evenodd"
        />
      </svg>
      {label ?? COMPANY.phone}
    </a>
  )
}

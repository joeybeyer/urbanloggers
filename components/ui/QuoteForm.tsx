'use client'

import { useState } from 'react'
import { services } from '@/data/services'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export function QuoteForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      _honeypot: (form.elements.namedItem('_honeypot') as HTMLInputElement).value,
    }

    // Honeypot check — bots fill hidden fields
    if (data._honeypot) {
      setState('success')
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setState('success')
        form.reset()
      } else {
        const json = await res.json().catch(() => ({}))
        setErrorMessage(json.error ?? 'Something went wrong. Please call us directly.')
        setState('error')
      }
    } catch {
      setErrorMessage('Network error. Please call us directly at (414) 514-0750.')
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-semibold text-brand-green mb-2">Request Received!</h3>
        <p className="text-gray-700">
          Brian will be in touch within 24 hours. For urgent needs, call{' '}
          <a href="tel:4145140750" className="font-semibold text-brand-green underline">
            (414) 514-0750
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
            placeholder="(414) 555-0100"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Service Needed
        </label>
        <select
          id="service"
          name="service"
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent bg-white"
        >
          <option value="">Select a service…</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Other">Other / Not Sure</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Tell us about your project
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border border-gray-300 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-y"
          placeholder="Describe the tree(s), approximate size, any access issues, urgency…"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Sending…' : 'Request Free Quote'}
      </button>

      <p className="text-xs text-gray-500 text-center">
        We respond within 24 hours. No spam, ever.
      </p>
    </form>
  )
}

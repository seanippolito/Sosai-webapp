'use client'

import { useActionState } from 'react'
import { submitLead } from '@/app/(site)/contact/actions'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, null)

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <input
        name="name"
        placeholder="Name"
        required
        className="border border-border bg-surface px-4 py-2 text-white placeholder:text-muted"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border border-border bg-surface px-4 py-2 text-white placeholder:text-muted"
      />
      <input
        name="company"
        placeholder="Company (optional)"
        className="border border-border bg-surface px-4 py-2 text-white placeholder:text-muted"
      />
      <textarea
        name="message"
        placeholder="Tell us about your project"
        required
        rows={5}
        className="border border-border bg-surface px-4 py-2 text-white placeholder:text-muted"
      />
      <button
        type="submit"
        disabled={pending}
        className="bg-accent px-6 py-2 font-semibold text-primary transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? 'Sending...' : 'Send Message'}
      </button>
      {state?.success && (
        <p className="text-accent">Message sent. We&apos;ll be in touch.</p>
      )}
      {state?.error && <p className="text-red-400">{state.error}</p>}
    </form>
  )
}

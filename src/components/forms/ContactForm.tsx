'use client'

import { useActionState } from 'react'
import { submitLead } from '@/app/(site)/contact/actions'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, null)

  if (state?.success) {
    return (
      <div className="rounded-lg border border-accent/30 bg-accent/5 p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4 text-accent"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <div>
            <p className="font-semibold text-accent">Message sent</p>
            <p className="text-sm text-zinc-400">
              We will get back to you within one business day.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-600"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent focus:outline-none"
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-600"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent focus:outline-none"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-600"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent focus:outline-none"
          placeholder="Your company (optional)"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-xs uppercase tracking-widest text-zinc-600"
        >
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-lg border border-border bg-surface/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 transition-colors focus:border-accent focus:outline-none resize-none"
          placeholder="Tell us about your project — what you are building, the problem you are solving, and any technical constraints we should know about."
        />
      </div>

      {state?.error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                className="opacity-25"
              />
              <path
                d="M4 12a8 8 0 018-8"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Send Message
            <span className="text-lg">&rarr;</span>
          </>
        )}
      </button>
    </form>
  )
}

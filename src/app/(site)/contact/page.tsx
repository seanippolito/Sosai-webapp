import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/components/forms/ContactForm'
import { getPayloadClient } from '@/lib/payload'

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const contactEmail = settings.contactEmail || 'hello@sosai.tech'
  const location = settings.location || 'United States (Remote)'
  const responseTime = settings.responseTime || 'Within 1 business day'

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Contact
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s talk about your project
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Tell us what you are building. We will get back to you within one
              business day with our thoughts on scope, approach, and timeline.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,360px]">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {/* Direct contact */}
              <div className="rounded-lg border border-border bg-surface/30 p-8">
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
                  Direct Contact
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-zinc-300 transition-colors hover:text-accent"
                    >
                      {contactEmail}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">
                      Location
                    </p>
                    <p className="text-sm text-zinc-300">
                      {location}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">
                      Response Time
                    </p>
                    <p className="text-sm text-zinc-300">
                      {responseTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="rounded-lg border border-border bg-surface/30 p-8">
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
                  What Happens Next
                </p>
                <ol className="space-y-4">
                  {[
                    'We review your message and research your domain.',
                    'We schedule a 30-minute call to discuss scope.',
                    'We send a clear proposal with timeline and cost.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-400">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-accent">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

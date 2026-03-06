import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Sosai Technologies to discuss your next project.',
}

export const revalidate = 60

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const contactEmail = settings.contactEmail || 'hello@sosai.tech'
  const location = settings.location || 'United States (Remote)'
  const responseTime = settings.responseTime || 'Within 1 business day'

  return (
    <div>
      <PageHeader
        label="Contact"
        title="Let's talk about your project"
        description="Tell us what you are building. We will get back to you within one business day with our thoughts on scope, approach, and timeline."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,360px]">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <Card hover={false}>
                <p className="section-label mb-6">Direct Contact</p>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Email</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-zinc-300 transition-colors hover:text-accent"
                    >
                      {contactEmail}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Location</p>
                    <p className="text-sm text-zinc-300">{location}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Response Time</p>
                    <p className="text-sm text-zinc-300">{responseTime}</p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <p className="section-label mb-6">What Happens Next</p>
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
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

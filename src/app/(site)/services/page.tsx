import { FadeIn } from '@/components/motion/FadeIn'
import { CardDeck } from '@/components/motion/CardDeck'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M2 15.2C2 14 2.94 13 4.1 13h.4c.26-2.8 2.6-5 5.5-5 2.46 0 4.51 1.6 5.24 3.83A4.5 4.5 0 0 1 19.5 16.5c0 .17 0 .33-.02.5H4.1A2.1 2.1 0 0 1 2 15.2Z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="m8 18-6-6 6-6M16 6l6 6-6 6" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101M10.172 13.828a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-surface text-accent">
      {icons[name] || icons.code}
    </div>
  )
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()

  const { docs: servicesDocs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })

  const services = servicesDocs.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    capabilities: (s.capabilities ?? []).map((c) => c.capability),
    icon: s.icon || 'code',
  }))

  return (
    <div>
      <PageHeader
        label="What We Do"
        title="Engineering services for organizations that build to last"
        description="We focus on four core areas where precision engineering makes the biggest difference. Every engagement starts with understanding your system — not selling you a solution."
      />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <CardDeck>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group rounded-lg border border-border bg-primary p-8 transition-all hover:border-border-hover hover:bg-surface/60 md:p-10"
            >
              <div className="grid gap-8 md:grid-cols-[1fr,300px]">
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <div>
                      <p className="font-mono text-xs text-zinc-600">
                        0{index + 1}
                      </p>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="section-label mb-4">Capabilities</p>
                  <ul className="space-y-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2 text-sm text-zinc-500"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardDeck>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Not sure which service you need?
              </h2>
              <p className="max-w-lg text-zinc-400">
                Most projects span multiple areas. Tell us what you are trying to
                accomplish and we will figure out the right approach together.
              </p>
              <Button href="/contact">Start a Conversation</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

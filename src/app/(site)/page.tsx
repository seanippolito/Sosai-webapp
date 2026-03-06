import Image from 'next/image'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { NetworkGraph } from '@/components/motion/NetworkGraph'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const revalidate = 60

const metrics = [
  { label: 'Years in R&D', value: '2+' },
  { label: 'Systems Deployed', value: '5+' },
  { label: 'Clearance Level', value: 'Active' },
  { label: 'Uptime SLA', value: '99.9%' },
]

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M2 15.2C2 14 2.94 13 4.1 13h.4c.26-2.8 2.6-5 5.5-5 2.46 0 4.51 1.6 5.24 3.83A4.5 4.5 0 0 1 19.5 16.5c0 .17 0 .33-.02.5H4.1A2.1 2.1 0 0 1 2 15.2Z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="m8 18-6-6 6-6M16 6l6 6-6 6" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101M10.172 13.828a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
      {icons[name] || icons.code}
    </div>
  )
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: servicesDocs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 4,
  })

  const { docs: projectsDocs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 3,
  })

  const services = servicesDocs.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    icon: s.icon || 'code',
  }))

  const projects = projectsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      techStack: (p.techStack ?? []).map((t) => t.technology),
      coverImage: image,
    }
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dot-grid absolute inset-0 opacity-30" />
        <NetworkGraph />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <FadeIn>
            <p className="section-label mb-6">SOSAI TECHNOLOGIES</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight md:text-8xl">
              We build systems that{' '}
              <span className="text-gradient-strong">run your operations</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Cloud architecture, custom software, and systems integration
              for organizations that need reliability — not experiments.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex gap-4">
              <Button href="/work">See Our Work</Button>
              <Button href="/contact" variant="secondary" arrow={false}>
                Get in Touch
              </Button>
            </div>
          </FadeIn>

          {/* Metrics strip */}
          <FadeIn delay={0.4}>
            <div className="mt-20 grid grid-cols-2 gap-px rounded-lg border border-border bg-border md:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-primary px-6 py-5 first:rounded-l-lg last:rounded-r-lg"
                >
                  <p className="font-mono text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-wide text-zinc-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="relative border-t border-border">
        <div className="bg-radial-subtle absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader
            label="Capabilities"
            title="What we build"
            link={{ href: '/services', text: 'View all' }}
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <Card variant="elevated">
                  <div className="mb-5 flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Selected Work */}
      <section className="relative border-t border-border">
        <div className="bg-grid-fine absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader
            label="Portfolio"
            title="Selected work"
            link={{ href: '/work', text: 'View all' }}
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <a
                  href={`/work/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface/50 transition-all hover:border-border-hover hover:bg-surface"
                >
                  {project.coverImage?.url && (
                    <div className="relative aspect-[16/9] w-full bg-surface">
                      <Image
                        src={project.coverImage.url}
                        alt={project.coverImage.alt || project.title}
                        width={project.coverImage.width || 800}
                        height={project.coverImage.height || 450}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <Card variant="default" hover={false} padding="lg" className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                We work with teams that need reliable, production-grade systems
                — not prototypes. Let&apos;s talk about what you&apos;re building.
              </p>
              <div className="mt-8">
                <Button href="/contact">Start a Conversation</Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

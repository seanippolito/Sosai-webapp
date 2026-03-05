'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const services = [
  {
    id: 1,
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description:
      'Azure and AWS architecture design, migration, and management. Scalable, cost-efficient cloud backends that grow with your business.',
    icon: 'cloud',
  },
  {
    id: 2,
    title: 'Custom Software Systems',
    slug: 'custom-software-systems',
    description:
      'Internal tools, automation platforms, and bespoke applications engineered from requirements through deployment.',
    icon: 'code',
  },
  {
    id: 3,
    title: 'Systems Integration',
    slug: 'systems-integration',
    description:
      'API development, data pipelines, and workflow automation connecting your existing tools into a unified system.',
    icon: 'link',
  },
  {
    id: 4,
    title: 'AI-Assisted Automation',
    slug: 'ai-assisted-automation',
    description:
      'Document processing, workflow analysis, and intelligent automation powered by modern AI systems.',
    icon: 'cpu',
  },
]

const projects = [
  {
    id: 1,
    title: 'CorVia',
    slug: 'corvia',
    summary:
      'Leadership assessment and development SaaS platform enabling organizations to evaluate and grow leadership capabilities.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Azure'],
  },
  {
    id: 2,
    title: 'Banksy',
    slug: 'banksy',
    summary:
      'Financial software platform providing automated reporting, compliance tracking, and portfolio analytics.',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'AWS'],
  },
  {
    id: 3,
    title: 'Multi-Tenant CMS',
    slug: 'multi-tenant-cms',
    summary:
      'Payload CMS-based content management platform supporting multiple client sites from a single deployment.',
    techStack: ['Payload CMS', 'Next.js', 'PostgreSQL', 'TypeScript'],
  },
]

const metrics = [
  { label: 'Years in R&D', value: '2+' },
  { label: 'Systems Deployed', value: '5+' },
  { label: 'Clearance Level', value: 'Active' },
  { label: 'Uptime SLA', value: '99.9%' },
]

// ─── Icon components ────────────────────────────────────────────────────────

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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <FadeIn>
            <p className="mb-6 font-mono text-sm tracking-widest text-accent">
              SOSAI TECHNOLOGIES
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
              We build systems that{' '}
              <span className="text-gradient">run your operations</span>
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
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              >
                See Our Work
                <span className="text-lg">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 font-mono text-sm text-zinc-400 transition-all hover:border-zinc-600 hover:text-white"
              >
                Get in Touch
              </Link>
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
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="mb-16 flex items-end justify-between">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                  Capabilities
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  What we build
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden font-mono text-sm text-zinc-500 transition-colors hover:text-white md:block"
              >
                View all &rarr;
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <div className="group rounded-lg border border-border bg-surface/50 p-8 transition-all hover:border-border-hover hover:bg-surface">
                  <div className="mb-5 flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Selected Work */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="mb-16 flex items-end justify-between">
              <div>
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
                  Portfolio
                </p>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  Selected work
                </h2>
              </div>
              <Link
                href="/work"
                className="hidden font-mono text-sm text-zinc-500 transition-colors hover:text-white md:block"
              >
                View all &rarr;
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-border bg-surface/50 p-8 transition-all hover:border-border-hover hover:bg-surface"
                >
                  <h3 className="mb-3 text-xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <div className="rounded-lg border border-border bg-surface/30 p-12 text-center md:p-20">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                We work with teams that need reliable, production-grade systems
                — not prototypes. Let&apos;s talk about what you&apos;re building.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-8 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              >
                Start a Conversation
                <span className="text-lg">&rarr;</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

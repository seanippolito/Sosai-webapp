'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { CardDeck } from '@/components/motion/CardDeck'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const services = [
  {
    id: 1,
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description:
      'Azure and AWS architecture design, migration, and management. We build scalable, cost-efficient cloud backends that grow with your business — from initial setup through production hardening.',
    capabilities: [
      'Cloud architecture design & review',
      'Migration planning & execution',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Cost optimization & monitoring',
      'Security hardening & compliance',
    ],
    icon: 'cloud',
  },
  {
    id: 2,
    title: 'Custom Software Systems',
    slug: 'custom-software-systems',
    description:
      'Internal tools, automation platforms, and bespoke applications built to solve your specific operational problems. No templates — every system is engineered from requirements through deployment.',
    capabilities: [
      'Requirements analysis & system design',
      'Full-stack application development',
      'Database design & optimization',
      'API development & documentation',
      'Deployment & CI/CD pipelines',
    ],
    icon: 'code',
  },
  {
    id: 3,
    title: 'Systems Integration',
    slug: 'systems-integration',
    description:
      'API development, data pipelines, and workflow automation connecting your existing tools into a unified system. We eliminate manual data transfer and reduce operational friction.',
    capabilities: [
      'API design & development',
      'Data pipeline architecture',
      'Workflow automation',
      'Legacy system modernization',
      'Real-time data synchronization',
    ],
    icon: 'link',
  },
  {
    id: 4,
    title: 'AI-Assisted Automation',
    slug: 'ai-assisted-automation',
    description:
      'Document processing, workflow analysis, and intelligent automation powered by modern AI. We identify high-impact automation opportunities and build production-ready solutions.',
    capabilities: [
      'Document processing & extraction',
      'Workflow analysis & optimization',
      'LLM integration & prompt engineering',
      'Automated reporting systems',
      'Intelligent data classification',
    ],
    icon: 'cpu',
  },
]

// ─── Icon components ────────────────────────────────────────────────────────

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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              What We Do
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Engineering services for organizations that build to last
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              We focus on four core areas where precision engineering makes
              the biggest difference. Every engagement starts with understanding
              your system — not selling you a solution.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services list */}
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
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-600">
                    Capabilities
                  </p>
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

      {/* CTA */}
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
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
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

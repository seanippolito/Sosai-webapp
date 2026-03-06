'use client'

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Precision Over Speed',
    description:
      'We build systems right the first time. Cutting corners on architecture creates technical debt that costs 10x to fix later.',
  },
  {
    title: 'Simplicity Over Complexity',
    description:
      'The best systems are the ones that are easy to understand, maintain, and extend. We resist unnecessary complexity at every turn.',
  },
  {
    title: 'Reliability Over Features',
    description:
      'A system that works perfectly with five features beats one that crashes with fifty. We ship what works, then iterate.',
  },
  {
    title: 'Transparency Over Promises',
    description:
      'We tell you what we know, what we do not know, and what it will take to find out. No surprises, no hidden costs.',
  },
]

const experience = [
  {
    role: 'Founder & Principal Engineer',
    org: 'Sosai Technologies',
    period: '2024 — Present',
    description:
      'Cloud architecture, custom software systems, and systems integration for SMBs and government contractors.',
  },
  {
    role: 'Software Engineer — R&D',
    org: 'Leidos',
    period: '2022 — 2024',
    description:
      'Communications security and advanced systems engineering for defense and intelligence programs.',
  },
]

const techAreas = [
  'TypeScript / JavaScript',
  'React / Next.js',
  'Node.js / Python',
  'PostgreSQL / MongoDB',
  'Azure / AWS',
  'Docker / Kubernetes',
  'Terraform / IaC',
  'CI/CD Pipelines',
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        label="About"
        title="An engineering practice built on precision and reliability"
        description="Sosai Technologies is a software engineering consultancy founded by Sean Irving. We build production-grade systems for organizations that cannot afford to get it wrong."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="section-label mb-4">Background</p>
                <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                  <p>
                    Before founding Sosai Technologies, I spent two years in R&D
                    at Leidos working on communications security systems for
                    defense and intelligence programs. That work taught me what it
                    means to build systems where failure is not an option.
                  </p>
                  <p>
                    I started this practice because I saw a gap: small and
                    mid-sized organizations need the same caliber of engineering
                    that large enterprises and government agencies demand — but
                    they cannot justify the overhead of big consulting firms.
                  </p>
                  <p>
                    Every project I take on gets the same rigor I applied in
                    classified environments: thorough requirements analysis,
                    deliberate architecture decisions, and systems that are built
                    to run in production — not just demo well.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <p className="section-label mb-4">Experience</p>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <Card key={exp.role} hover={false} padding="sm">
                      <p className="font-mono text-xs text-zinc-600">
                        {exp.period}
                      </p>
                      <p className="mt-2 font-semibold">{exp.role}</p>
                      <p className="text-sm text-accent">{exp.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {exp.description}
                      </p>
                    </Card>
                  ))}
                </div>

                <Card hover={false} padding="sm" className="mt-8">
                  <p className="section-label mb-4">Core Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {techAreas.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            label="How We Work"
            title="Engineering principles, not sales pitches"
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card>
                  <h3 className="mb-3 text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-400">
                    {value.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <Card hover={false} padding="lg" className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to build something serious?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                Let&apos;s talk about your project. No pressure, no sales
                pitch — just an honest conversation about what you need and
                whether we are the right fit.
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

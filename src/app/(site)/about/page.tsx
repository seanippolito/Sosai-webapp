'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'

// ─── Hardcoded data ─────────────────────────────────────────────────────────

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

// ─── Page ───────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              About
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              An engineering practice built on precision and reliability
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Sosai Technologies is a software engineering consultancy founded
              by Sean Irving. We build production-grade systems for
              organizations that cannot afford to get it wrong.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Background
                </p>
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
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Experience
                </p>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div
                      key={exp.role}
                      className="rounded-lg border border-border bg-surface/30 p-6"
                    >
                      <p className="font-mono text-xs text-zinc-600">
                        {exp.period}
                      </p>
                      <p className="mt-2 font-semibold">{exp.role}</p>
                      <p className="text-sm text-accent">{exp.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-lg border border-border bg-surface/30 p-6">
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-600">
                    Core Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {techAreas.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              How We Work
            </p>
            <h2 className="mb-16 text-3xl font-bold tracking-tight md:text-4xl">
              Engineering principles, not sales pitches
            </h2>
          </FadeIn>

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="rounded-lg border border-border bg-surface/30 p-8 transition-all hover:border-border-hover hover:bg-surface/60">
                  <h3 className="mb-3 text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-400">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <div className="rounded-lg border border-border bg-surface/30 p-12 text-center md:p-20">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to build something serious?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                Let&apos;s talk about your project. No pressure, no sales
                pitch — just an honest conversation about what you need and
                whether we are the right fit.
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

'use client'

import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { CardDeck } from '@/components/motion/CardDeck'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const projects = [
  {
    id: 1,
    title: 'CorVia',
    slug: 'corvia',
    summary:
      'Leadership assessment and development SaaS platform enabling organizations to evaluate, track, and grow leadership capabilities across their teams.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Azure', 'TypeScript'],
    status: 'Shipped',
    year: '2024',
  },
  {
    id: 2,
    title: 'Banksy',
    slug: 'banksy',
    summary:
      'Financial software platform providing automated reporting, compliance tracking, and portfolio analytics for small-to-midsize financial services firms.',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    status: 'Shipped',
    year: '2024',
  },
  {
    id: 3,
    title: 'Multi-Tenant CMS',
    slug: 'multi-tenant-cms',
    summary:
      'Payload CMS-based content management platform supporting multiple client sites from a single deployment with isolated content, users, and configurations.',
    techStack: ['Payload CMS', 'Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    status: 'Shipped',
    year: '2025',
  },
]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Portfolio
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Systems we have designed, built, and shipped
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Every project here went from requirements to production. We build
              systems that organizations depend on — not demos or prototypes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-7xl px-6 pt-24">
        <CardDeck>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block rounded-lg border border-border bg-primary p-8 transition-all hover:border-border-hover hover:bg-surface/60 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-600">
                      0{index + 1}
                    </span>
                    <span className="font-mono text-xs text-zinc-700">/</span>
                    <span className="font-mono text-xs text-zinc-600">
                      {project.year}
                    </span>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                    {project.title}
                  </h2>
                  <p className="max-w-2xl leading-relaxed text-zinc-400">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {project.status}
                  </span>
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                View case study
                <span>&rarr;</span>
              </div>
            </Link>
          ))}
        </CardDeck>
      </section>
    </div>
  )
}

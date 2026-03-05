'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const projects: Record<
  string,
  {
    title: string
    summary: string
    problem: string
    architecture: string
    content: string[]
    outcome: string
    techStack: string[]
    year: string
    status: string
  }
> = {
  corvia: {
    title: 'CorVia',
    summary:
      'A leadership assessment and development SaaS platform that enables organizations to evaluate, track, and grow leadership capabilities across their teams.',
    problem:
      'Organizations lacked a unified platform to run leadership assessments, track development over time, and generate actionable insights from 360-degree feedback data.',
    architecture:
      'Multi-tenant SaaS architecture on Azure with a React SPA frontend, Node.js API layer, and PostgreSQL database. Real-time features powered by WebSockets. Assessment engine handles complex scoring algorithms and report generation.',
    content: [
      'CorVia is a comprehensive leadership development platform built for organizations that take leadership growth seriously. The platform provides 360-degree assessment tools, personalized development plans, and analytics dashboards.',
      'The system handles complex assessment workflows including multi-rater feedback, competency mapping, and longitudinal tracking of leadership development metrics across departments and time periods.',
      'Built on a modern cloud architecture with real-time collaboration features, the platform serves enterprise clients managing hundreds of leadership assessments simultaneously.',
    ],
    outcome:
      'Deployed to production serving multiple enterprise clients. Reduced assessment cycle time from weeks to days and provided leadership teams with data-driven development insights.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Azure', 'TypeScript'],
    year: '2024',
    status: 'Shipped',
  },
  banksy: {
    title: 'Banksy',
    summary:
      'A financial software platform providing automated reporting, compliance tracking, and portfolio analytics for small-to-midsize financial services firms.',
    problem:
      'Small financial firms were stuck with manual compliance reporting and spreadsheet-based analytics, unable to afford enterprise financial software solutions.',
    architecture:
      'Microservices architecture on AWS with a Next.js frontend, Python analytics engine, and PostgreSQL. Data pipelines handle real-time market data ingestion and report generation. Containerized with Docker for consistent deployment.',
    content: [
      'Banksy is a financial technology platform designed to give smaller financial firms access to the kind of reporting and analytics tools typically reserved for large institutions.',
      'The platform automates regulatory compliance reporting, provides real-time portfolio analytics, and integrates with existing accounting and trading systems through a robust API layer.',
      'Security and audit capabilities are built into every layer of the system, with comprehensive logging, role-based access control, and encrypted data handling throughout.',
    ],
    outcome:
      'Reduced compliance reporting time by 80% for client firms and provided portfolio analytics capabilities that were previously only available to large institutions.',
    techStack: ['Next.js', 'Python', 'PostgreSQL', 'AWS', 'Docker'],
    year: '2024',
    status: 'Shipped',
  },
  'multi-tenant-cms': {
    title: 'Multi-Tenant CMS Platform',
    summary:
      'A Payload CMS-based content management platform supporting multiple client sites from a single deployment with isolated content, users, and configurations.',
    problem:
      'Managing separate CMS deployments for each client was expensive and operationally complex. Clients needed isolated content management without the overhead of individual installations.',
    architecture:
      'Single Payload CMS deployment with tenant-aware access control and content isolation. Next.js App Router for the frontend with dynamic tenant resolution. PostgreSQL with row-level security patterns for data isolation.',
    content: [
      'This platform demonstrates how Payload CMS can be extended into a full multi-tenant architecture, allowing multiple organizations to manage their content independently from a shared infrastructure.',
      'Each tenant gets their own content space, user management, media library, and site configuration while sharing the underlying codebase and infrastructure — reducing operational overhead significantly.',
      'The architecture leverages Payload access control, custom hooks, and a tenant-aware middleware layer to ensure complete data isolation between organizations.',
    ],
    outcome:
      'Successfully deployed serving multiple client organizations from a single infrastructure, reducing hosting costs by 60% compared to individual deployments.',
    techStack: ['Payload CMS', 'Next.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
    year: '2025',
    status: 'Shipped',
  },
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects[slug]

  if (!project) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <p className="mt-4 text-zinc-400">
          The project you are looking for does not exist.
        </p>
        <Link
          href="/work"
          className="mt-8 inline-block font-mono text-sm text-accent hover:underline"
        >
          &larr; Back to work
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>&larr;</span>
              Back to work
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-4 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {project.status}
              </span>
              <span className="font-mono text-xs text-zinc-600">
                {project.year}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,320px]">
          {/* Main content */}
          <div className="space-y-16">
            {/* Problem */}
            <FadeIn>
              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  The Problem
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  {project.problem}
                </p>
              </section>
            </FadeIn>

            {/* Architecture */}
            <FadeIn>
              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Architecture
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  {project.architecture}
                </p>
              </section>
            </FadeIn>

            {/* Detail */}
            <FadeIn>
              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Details
                </p>
                <div className="space-y-6">
                  {project.content.map((paragraph, i) => (
                    <p
                      key={i}
                      className="leading-relaxed text-zinc-400"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </FadeIn>

            {/* Outcome */}
            <FadeIn>
              <section>
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Outcome
                </p>
                <p className="text-lg leading-relaxed text-zinc-300">
                  {project.outcome}
                </p>
              </section>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FadeIn>
              <div className="rounded-lg border border-border bg-surface/30 p-8">
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-600">
                  Project Details
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">
                      Status
                    </p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {project.status}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">
                      Year
                    </p>
                    <p className="text-sm font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-xs text-zinc-600">
                      Stack
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
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90"
                  >
                    Discuss a Similar Project
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

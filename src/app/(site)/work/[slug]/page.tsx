import { notFound } from 'next/navigation'
import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const techStack = (project.techStack ?? []).map((t) => t.technology)
  const status = capitalizeFirst(project.projectStatus || 'shipped')

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
                {status}
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
              {techStack.map((tech) => (
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
            {project.problem && (
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
            )}

            {/* Architecture */}
            {project.architecture && (
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
            )}

            {/* Detail */}
            {project.content && (
              <FadeIn>
                <section>
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                    Details
                  </p>
                  <div className="prose prose-invert prose-zinc max-w-none prose-p:leading-relaxed prose-p:text-zinc-400">
                    <RichText data={project.content} />
                  </div>
                </section>
              </FadeIn>
            )}

            {/* Outcome */}
            {project.outcome && (
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
            )}
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
                      {status}
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
                      {techStack.map((tech) => (
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

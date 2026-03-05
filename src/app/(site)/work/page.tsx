import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'
import { CardDeck } from '@/components/motion/CardDeck'
import { getPayloadClient } from '@/lib/payload'

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function WorkPage() {
  const payload = await getPayloadClient()

  const { docs: projectsDocs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 100,
  })

  const projects = projectsDocs.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    summary: p.summary,
    techStack: (p.techStack ?? []).map((t) => t.technology),
    status: capitalizeFirst(p.projectStatus || 'shipped'),
    year: p.year || '',
  }))

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

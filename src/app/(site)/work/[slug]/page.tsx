import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const project = result.docs[0]
  if (!project) notFound()

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-bold">{project.title}</h1>
      <p className="mb-8 text-lg text-muted">{project.summary}</p>

      {project.problem && (
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Problem</h2>
          <p className="text-muted">{project.problem}</p>
        </section>
      )}

      {project.architecture && (
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Architecture</h2>
          <p className="text-muted">{project.architecture}</p>
        </section>
      )}

      <section className="mb-8 prose prose-invert max-w-none">
        {project.content && <RichText data={project.content} />}
      </section>

      {project.outcome && (
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Outcome</h2>
          <p className="text-muted">{project.outcome}</p>
        </section>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <section>
          <h2 className="mb-2 text-xl font-semibold">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((item, i) => (
              <span key={i} className="border border-border px-3 py-1 text-sm text-muted">
                {item.technology}
              </span>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}

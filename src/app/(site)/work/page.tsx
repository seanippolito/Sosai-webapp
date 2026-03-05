import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export default async function WorkPage() {
  const payload = await getPayloadClient()
  const projects = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Work</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.docs.map((project) => (
          <Link key={project.id} href={`/work/${project.slug}`} className="border border-border p-6 transition-colors hover:border-accent">
            <h2 className="mb-2 text-lg font-semibold">{project.title}</h2>
            <p className="text-sm text-muted">{project.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

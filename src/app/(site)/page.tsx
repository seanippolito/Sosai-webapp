import { getPayloadClient } from '@/lib/payload'

export default async function HomePage() {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 4,
  })
  const projects = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    limit: 3,
    sort: '-publishedDate',
  })

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">
          Building intelligent software systems
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Sosai Technologies specializes in cloud architecture, custom software development, and systems integration for businesses and government partners.
        </p>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Services</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {services.docs.map((service) => (
            <div key={service.id} className="border border-border p-6">
              <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Recent Work</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.docs.map((project) => (
            <a key={project.id} href={`/work/${project.slug}`} className="border border-border p-6 transition-colors hover:border-accent">
              <h3 className="mb-2 font-semibold">{project.title}</h3>
              <p className="text-sm text-muted">{project.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

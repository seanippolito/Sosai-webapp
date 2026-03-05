import { getPayloadClient } from '@/lib/payload'

export default async function ServicesPage() {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: 'services',
    sort: 'order',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Services</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {services.docs.map((service) => (
          <div key={service.id} className="border border-border p-6">
            <h2 className="mb-2 text-xl font-semibold">{service.title}</h2>
            <p className="text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'

export default async function InsightsPage() {
  const payload = await getPayloadClient()
  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Insights</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.docs.map((post) => (
          <Link key={post.id} href={`/insights/${post.slug}`} className="border border-border p-6 transition-colors hover:border-accent">
            <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-muted">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

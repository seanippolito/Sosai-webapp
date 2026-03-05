import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { getPayloadClient } from '@/lib/payload'

// ─── Page ───────────────────────────────────────────────────────────────────

export default async function InsightsPage() {
  const payload = await getPayloadClient()

  const { docs: postsDocs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 100,
  })

  const posts = postsDocs.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    tags: (p.tags ?? []).map((t) => t.tag),
    publishedDate: p.publishedDate
      ? new Date(p.publishedDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '',
    readTime: p.readTime || '',
  }))

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Insights
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Engineering perspectives and technical thinking
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Practical writing about cloud architecture, systems integration,
              and building reliable software for real organizations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <StaggerContainer className="space-y-6">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/insights/${post.slug}`}
                className="group block rounded-lg border border-border bg-surface/30 p-8 transition-all hover:border-border-hover hover:bg-surface/60 md:p-10"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex items-center gap-4">
                      <span className="font-mono text-xs text-zinc-600">
                        {post.publishedDate}
                      </span>
                      <span className="font-mono text-xs text-zinc-700">
                        /
                      </span>
                      <span className="font-mono text-xs text-zinc-600">
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                      {post.title}
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-zinc-400">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                  Read article
                  <span>&rarr;</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function InsightsPage() {
  const payload = await getPayloadClient()

  const { docs: postsDocs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })

  const posts = postsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
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
      coverImage: image,
    }
  })

  return (
    <div>
      <PageHeader
        label="Insights"
        title="Engineering perspectives and technical thinking"
        description="Practical writing about cloud architecture, systems integration, and building reliable software for real organizations."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <StaggerContainer className="space-y-6">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/insights/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-surface/30 transition-all hover:border-border-hover hover:bg-surface/60"
              >
                {post.coverImage?.url && (
                  <div className="relative aspect-[21/9] w-full bg-surface">
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      width={post.coverImage.width || 1200}
                      height={post.coverImage.height || 514}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="font-mono text-xs text-zinc-600">
                          {post.publishedDate}
                        </span>
                        <span className="font-mono text-xs text-zinc-700">/</span>
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
                        <Badge key={tag} className="text-zinc-600">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                    Read article
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  )
}

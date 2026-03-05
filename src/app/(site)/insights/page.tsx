'use client'

import Link from 'next/link'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const posts = [
  {
    id: 1,
    title: 'Why Systems Integration Matters for Growing Businesses',
    slug: 'why-systems-integration-matters',
    excerpt:
      'Most growing businesses run on a patchwork of disconnected tools. Systems integration eliminates the manual data transfer, reduces errors, and unlocks operational insights that siloed systems can never provide.',
    tags: ['Systems Integration', 'Automation', 'Operations'],
    publishedDate: 'January 15, 2025',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Cloud Architecture for Small Businesses: What Actually Matters',
    slug: 'cloud-architecture-for-small-businesses',
    excerpt:
      'Small businesses do not need the same cloud architecture as Netflix. Here is what actually matters when designing cloud infrastructure for organizations that need reliability without enterprise complexity.',
    tags: ['Cloud', 'Architecture', 'Infrastructure'],
    publishedDate: 'February 1, 2025',
    readTime: '6 min read',
  },
]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function InsightsPage() {
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

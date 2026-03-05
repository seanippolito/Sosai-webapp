'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

// ─── Hardcoded data (replace with Payload API calls later) ──────────────────

const posts: Record<
  string,
  {
    title: string
    excerpt: string
    content: string[]
    tags: string[]
    publishedDate: string
    readTime: string
    author: string
  }
> = {
  'why-systems-integration-matters': {
    title: 'Why Systems Integration Matters for Growing Businesses',
    excerpt:
      'Most growing businesses run on a patchwork of disconnected tools. Systems integration eliminates the manual data transfer, reduces errors, and unlocks operational insights that siloed systems can never provide.',
    content: [
      'Every growing business eventually hits the same wall: their tools do not talk to each other. The CRM does not sync with the invoicing system. Project data lives in spreadsheets that nobody updates. Customer support tickets exist in a completely different universe from the sales pipeline.',
      'This is not just an inconvenience — it is a structural problem that compounds over time. Every manual data transfer is an opportunity for errors. Every disconnected system is a blind spot in your operational picture. Every hour spent copying data between tools is an hour not spent on work that actually grows the business.',
      'Systems integration solves this by building automated connections between your existing tools. APIs, data pipelines, and workflow automation replace manual processes with reliable, real-time data flow. The result is not just efficiency — it is visibility into how your business actually operates.',
      'The best integration projects start small and targeted: identify the single most painful data silo, build the connection, measure the impact, and expand from there. You do not need to boil the ocean. You need to fix the one bottleneck that is costing you the most time right now.',
      'At Sosai Technologies, we approach integration projects with a bias toward simplicity and reliability. We build connections that are easy to maintain, monitor, and extend — because the last thing a growing business needs is another system that requires constant attention.',
    ],
    tags: ['Systems Integration', 'Automation', 'Operations'],
    publishedDate: 'January 15, 2025',
    readTime: '5 min read',
    author: 'Sean Irving',
  },
  'cloud-architecture-for-small-businesses': {
    title: 'Cloud Architecture for Small Businesses: What Actually Matters',
    excerpt:
      'Small businesses do not need the same cloud architecture as Netflix. Here is what actually matters when designing cloud infrastructure for organizations that need reliability without enterprise complexity.',
    content: [
      'The cloud architecture conversation in most small businesses goes one of two ways: either everything runs on a single server with no redundancy, or someone over-engineers a Kubernetes cluster that nobody knows how to maintain. Both approaches fail for the same reason — they do not match the actual needs of the business.',
      'What small businesses actually need from cloud infrastructure is straightforward: reliability, reasonable performance, predictable costs, and the ability to scale when growth demands it. That is it. You do not need multi-region failover for a 50-person company. You do need automated backups and a deployment process that does not require SSH access.',
      'The right architecture for most small businesses is simple: a managed application platform (like a PaaS or containerized deployment), a managed database with automated backups, object storage for files, and a CDN for static assets. This gives you reliability and scalability without operational complexity.',
      'Cost management is where small businesses get burned most often. Auto-scaling sounds great until you get an unexpected bill. Start with fixed-size resources, monitor actual usage, and only add auto-scaling when you have data showing you need it. Predictable costs matter more than theoretical elasticity.',
      'Security does not have to be complicated either. Use managed services that handle patching. Enable encryption at rest and in transit. Set up proper IAM roles instead of sharing credentials. These basics cover 90% of what a small business needs. The remaining 10% can be addressed as compliance requirements emerge.',
    ],
    tags: ['Cloud', 'Architecture', 'Infrastructure'],
    publishedDate: 'February 1, 2025',
    readTime: '6 min read',
    author: 'Sean Irving',
  },
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts[slug]

  if (!post) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-32 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4 text-zinc-400">
          The article you are looking for does not exist.
        </p>
        <Link
          href="/insights"
          className="mt-8 inline-block font-mono text-sm text-accent hover:underline"
        >
          &larr; Back to insights
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-20">
          <FadeIn>
            <Link
              href="/insights"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>&larr;</span>
              Back to insights
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-xs text-zinc-600">
                {post.publishedDate}
              </span>
              <span className="font-mono text-xs text-zinc-700">/</span>
              <span className="font-mono text-xs text-zinc-600">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {post.excerpt}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface font-mono text-xs text-accent">
                SI
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="font-mono text-xs text-zinc-600">
                  Sosai Technologies
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        <FadeIn>
          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg leading-[1.8] text-zinc-300"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Tags */}
        <FadeIn>
          <div className="mt-16 border-t border-border pt-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-600">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-4 py-1.5 font-mono text-xs text-zinc-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="mt-16 rounded-lg border border-border bg-surface/30 p-8 text-center">
            <h3 className="text-xl font-bold">
              Want to discuss this further?
            </h3>
            <p className="mt-2 text-zinc-400">
              We are always happy to talk through technical challenges.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90"
            >
              Get in Touch
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </article>
    </div>
  )
}

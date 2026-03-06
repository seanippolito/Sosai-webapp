import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { User, Media } from '@/payload-types'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    select: { title: true, excerpt: true },
  })
  const post = docs[0]
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const post = docs[0]
  if (!post) notFound()

  const tags = (post.tags ?? []).map((t) => t.tag)
  const publishedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const author = (post.author as User)?.name || 'Sosai Technologies'
  const coverImage = typeof post.coverImage === 'object' && post.coverImage !== null ? (post.coverImage as Media) : null

  return (
    <div>
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
                {publishedDate}
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
                {author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{author}</p>
                <p className="font-mono text-xs text-zinc-600">
                  Sosai Technologies
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {coverImage?.url && (
        <FadeIn>
          <div className="mx-auto max-w-4xl px-6 pt-12">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || post.title}
                width={coverImage.width || 1200}
                height={coverImage.height || 600}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>
      )}

      <article className="mx-auto max-w-4xl px-6 py-16">
        <FadeIn>
          <div className="prose prose-invert prose-zinc max-w-none prose-p:text-lg prose-p:leading-[1.8] prose-p:text-zinc-300">
            <RichText data={post.content} />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-16 border-t border-border pt-8">
            <p className="section-label mb-4">Topics</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="px-4 py-1.5">{tag}</Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <Card hover={false} className="mt-16 text-center">
            <h3 className="text-xl font-bold">
              Want to discuss this further?
            </h3>
            <p className="mt-2 text-zinc-400">
              We are always happy to talk through technical challenges.
            </p>
            <div className="mt-6">
              <Button href="/contact">Get in Touch</Button>
            </div>
          </Card>
        </FadeIn>
      </article>
    </div>
  )
}

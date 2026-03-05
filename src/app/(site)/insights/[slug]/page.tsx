import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const post = result.docs[0]
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
      <p className="mb-8 text-lg text-muted">{post.excerpt}</p>
      <div className="prose prose-invert max-w-none">
        {post.content && <RichText data={post.content} />}
      </div>
    </article>
  )
}

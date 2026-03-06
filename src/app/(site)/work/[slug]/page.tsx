import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    limit: 100,
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const techStack = (project.techStack ?? []).map((t) => t.technology)
  const status = capitalizeFirst(project.projectStatus || 'shipped')
  const coverImage = typeof project.coverImage === 'object' && project.coverImage !== null ? (project.coverImage as Media) : null

  return (
    <div>
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>&larr;</span>
              Back to work
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-4 flex items-center gap-4">
              <Badge dot>{status}</Badge>
              <span className="font-mono text-xs text-zinc-600">
                {project.year}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {coverImage?.url && (
        <FadeIn>
          <div className="mx-auto max-w-7xl px-6 pt-12">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || project.title}
                width={coverImage.width || 1400}
                height={coverImage.height || 600}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>
      )}

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,320px]">
          <div className="space-y-16">
            {project.problem && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">The Problem</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.problem}
                  </p>
                </section>
              </FadeIn>
            )}

            {project.architecture && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Architecture</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.architecture}
                  </p>
                </section>
              </FadeIn>
            )}

            {project.content && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Details</p>
                  <div className="prose prose-invert prose-zinc max-w-none prose-p:leading-relaxed prose-p:text-zinc-400">
                    <RichText data={project.content} />
                  </div>
                </section>
              </FadeIn>
            )}

            {project.outcome && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Outcome</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.outcome}
                  </p>
                </section>
              </FadeIn>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <FadeIn>
              <Card hover={false}>
                <p className="section-label mb-6">Project Details</p>
                <div className="space-y-6">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Status</p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {status}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Year</p>
                    <p className="text-sm font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-xs text-zinc-600">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-border pt-8">
                  <Button href="/contact" fullWidth arrow={false}>
                    Discuss a Similar Project
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const metadata = {
  title: 'Work',
  description: 'Selected projects and case studies from Sosai Technologies.',
}

export const revalidate = 60

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default async function WorkPage() {
  const payload = await getPayloadClient()

  const { docs: projectsDocs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })

  const projects = projectsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      techStack: (p.techStack ?? []).map((t) => t.technology),
      status: capitalizeFirst(p.projectStatus || 'shipped'),
      year: p.year || '',
      coverImage: image,
    }
  })

  return (
    <div>
      <PageHeader
        label="Portfolio"
        title="Systems we have designed, built, and shipped"
        description="Every project here went from requirements to production. We build systems that organizations depend on — not demos or prototypes."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <StaggerContainer className="flex flex-col gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={project.id}>
              <Link
                href={`/work/${project.slug}`}
                className="group grid overflow-hidden rounded-lg border border-border bg-primary transition-all hover:border-border-hover hover:bg-surface/60 md:grid-cols-5"
              >
                {project.coverImage?.url && (
                  <div className="relative aspect-[16/10] bg-surface md:col-span-2 md:aspect-auto">
                    <Image
                      src={project.coverImage.url}
                      alt={project.coverImage.alt || project.title}
                      width={project.coverImage.width || 800}
                      height={project.coverImage.height || 500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className={`flex flex-col justify-between p-5 md:p-8 ${project.coverImage?.url ? 'md:col-span-3' : 'md:col-span-5'}`}>
                  <div>
                    <div className="mb-2 flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="font-mono text-xs text-zinc-700">/</span>
                      <span className="font-mono text-xs text-zinc-600">
                        {project.year}
                      </span>
                      <Badge dot className="ml-auto">{project.status}</Badge>
                    </div>
                    <h2 className="mb-2 text-xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                      {project.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} className="text-zinc-600">{tech}</Badge>
                      ))}
                    </div>
                    <span className="shrink-0 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                      View &rarr;
                    </span>
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

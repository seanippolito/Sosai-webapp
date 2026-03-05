import type { Payload } from 'payload'

function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const projects = [
  {
    title: 'CorVia',
    slug: 'corvia',
    summary:
      'A leadership assessment and development SaaS platform that enables organizations to evaluate, track, and grow leadership capabilities across their teams.',
    content: richText([
      'CorVia is a comprehensive leadership development platform built for organizations that take leadership growth seriously. The platform provides 360-degree assessment tools, personalized development plans, and analytics dashboards.',
      'The system handles complex assessment workflows including multi-rater feedback, competency mapping, and longitudinal tracking of leadership development metrics across departments and time periods.',
      'Built on a modern cloud architecture with real-time collaboration features, the platform serves enterprise clients managing hundreds of leadership assessments simultaneously.',
    ]),
    techStack: [
      { technology: 'React' },
      { technology: 'Node.js' },
      { technology: 'PostgreSQL' },
      { technology: 'Azure' },
      { technology: 'TypeScript' },
    ],
    problem:
      'Organizations lacked a unified platform to run leadership assessments, track development over time, and generate actionable insights from 360-degree feedback data.',
    architecture:
      'Multi-tenant SaaS architecture on Azure with a React SPA frontend, Node.js API layer, and PostgreSQL database. Real-time features powered by WebSockets. Assessment engine handles complex scoring algorithms and report generation.',
    outcome:
      'Deployed to production serving multiple enterprise clients. Reduced assessment cycle time from weeks to days and provided leadership teams with data-driven development insights.',
    status: 'published' as const,
    publishedDate: '2024-06-15',
  },
  {
    title: 'Banksy',
    slug: 'banksy',
    summary:
      'A financial software platform providing automated reporting, compliance tracking, and portfolio analytics for small-to-midsize financial services firms.',
    content: richText([
      'Banksy is a financial technology platform designed to give smaller financial firms access to the kind of reporting and analytics tools typically reserved for large institutions.',
      'The platform automates regulatory compliance reporting, provides real-time portfolio analytics, and integrates with existing accounting and trading systems through a robust API layer.',
      'Security and audit capabilities are built into every layer of the system, with comprehensive logging, role-based access control, and encrypted data handling throughout.',
    ]),
    techStack: [
      { technology: 'Next.js' },
      { technology: 'Python' },
      { technology: 'PostgreSQL' },
      { technology: 'AWS' },
      { technology: 'Docker' },
    ],
    problem:
      'Small financial firms were stuck with manual compliance reporting and spreadsheet-based analytics, unable to afford enterprise financial software solutions.',
    architecture:
      'Microservices architecture on AWS with a Next.js frontend, Python analytics engine, and PostgreSQL. Data pipelines handle real-time market data ingestion and report generation. Containerized with Docker for consistent deployment.',
    outcome:
      'Reduced compliance reporting time by 80% for client firms and provided portfolio analytics capabilities that were previously only available to large institutions.',
    status: 'published' as const,
    publishedDate: '2024-09-20',
  },
  {
    title: 'Multi-Tenant CMS Platform',
    slug: 'multi-tenant-cms',
    summary:
      'A Payload CMS-based content management platform supporting multiple client sites from a single deployment with isolated content, users, and configurations.',
    content: richText([
      'This platform demonstrates how Payload CMS can be extended into a full multi-tenant architecture, allowing multiple organizations to manage their content independently from a shared infrastructure.',
      'Each tenant gets their own content space, user management, media library, and site configuration while sharing the underlying codebase and infrastructure — reducing operational overhead significantly.',
      'The architecture leverages Payload access control, custom hooks, and a tenant-aware middleware layer to ensure complete data isolation between organizations.',
    ]),
    techStack: [
      { technology: 'Payload CMS' },
      { technology: 'Next.js' },
      { technology: 'PostgreSQL' },
      { technology: 'TypeScript' },
      { technology: 'Tailwind CSS' },
    ],
    problem:
      'Managing separate CMS deployments for each client was expensive and operationally complex. Clients needed isolated content management without the overhead of individual installations.',
    architecture:
      'Single Payload CMS deployment with tenant-aware access control and content isolation. Next.js App Router for the frontend with dynamic tenant resolution. PostgreSQL with row-level security patterns for data isolation.',
    outcome:
      'Successfully deployed serving multiple client organizations from a single infrastructure, reducing hosting costs by 60% compared to individual deployments.',
    status: 'published' as const,
    publishedDate: '2025-01-10',
  },
]

export async function seedProjects(
  payload: Payload,
  mediaIds: number[],
) {
  await payload.delete({ collection: 'projects', where: {} })

  for (let i = 0; i < projects.length; i++) {
    const coverImage = mediaIds[i] ?? undefined
    await payload.create({
      collection: 'projects',
      data: { ...projects[i], coverImage },
    })
  }

  return { count: projects.length }
}

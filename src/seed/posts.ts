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

const posts = [
  {
    title: 'Why Systems Integration Matters for Growing Businesses',
    slug: 'why-systems-integration-matters',
    excerpt:
      'Most growing businesses run on a patchwork of disconnected tools. Systems integration eliminates the manual data transfer, reduces errors, and unlocks operational insights that siloed systems can never provide.',
    content: richText([
      'Every growing business eventually hits the same wall: their tools do not talk to each other. The CRM does not sync with the invoicing system. Project data lives in spreadsheets that nobody updates. Customer support tickets exist in a completely different universe from the sales pipeline.',
      'This is not just an inconvenience — it is a structural problem that compounds over time. Every manual data transfer is an opportunity for errors. Every disconnected system is a blind spot in your operational picture. Every hour spent copying data between tools is an hour not spent on work that actually grows the business.',
      'Systems integration solves this by building automated connections between your existing tools. APIs, data pipelines, and workflow automation replace manual processes with reliable, real-time data flow. The result is not just efficiency — it is visibility into how your business actually operates.',
      'The best integration projects start small and targeted: identify the single most painful data silo, build the connection, measure the impact, and expand from there. You do not need to boil the ocean. You need to fix the one bottleneck that is costing you the most time right now.',
      'At Sosai Technologies, we approach integration projects with a bias toward simplicity and reliability. We build connections that are easy to maintain, monitor, and extend — because the last thing a growing business needs is another system that requires constant attention.',
    ]),
    tags: [
      { tag: 'systems-integration' },
      { tag: 'automation' },
      { tag: 'operations' },
    ],
    readTime: '5 min read',
    status: 'published' as const,
    publishedDate: '2025-01-15',
  },
  {
    title: 'Cloud Architecture for Small Businesses: What Actually Matters',
    slug: 'cloud-architecture-for-small-businesses',
    excerpt:
      'Small businesses do not need the same cloud architecture as Netflix. Here is what actually matters when designing cloud infrastructure for organizations that need reliability without enterprise complexity.',
    content: richText([
      'The cloud architecture conversation in most small businesses goes one of two ways: either everything runs on a single server with no redundancy, or someone over-engineers a Kubernetes cluster that nobody knows how to maintain. Both approaches fail for the same reason — they do not match the actual needs of the business.',
      'What small businesses actually need from cloud infrastructure is straightforward: reliability, reasonable performance, predictable costs, and the ability to scale when growth demands it. That is it. You do not need multi-region failover for a 50-person company. You do need automated backups and a deployment process that does not require SSH access.',
      'The right architecture for most small businesses is simple: a managed application platform (like a PaaS or containerized deployment), a managed database with automated backups, object storage for files, and a CDN for static assets. This gives you reliability and scalability without operational complexity.',
      'Cost management is where small businesses get burned most often. Auto-scaling sounds great until you get an unexpected bill. Start with fixed-size resources, monitor actual usage, and only add auto-scaling when you have data showing you need it. Predictable costs matter more than theoretical elasticity.',
      'Security does not have to be complicated either. Use managed services that handle patching. Enable encryption at rest and in transit. Set up proper IAM roles instead of sharing credentials. These basics cover 90% of what a small business needs. The remaining 10% can be addressed as compliance requirements emerge.',
    ]),
    tags: [
      { tag: 'cloud' },
      { tag: 'architecture' },
      { tag: 'infrastructure' },
    ],
    readTime: '6 min read',
    status: 'published' as const,
    publishedDate: '2025-02-01',
  },
]

export async function seedPosts(
  payload: Payload,
  adminId: number,
  mediaIds: number[],
) {
  await payload.delete({ collection: 'posts', where: {} })

  for (let i = 0; i < posts.length; i++) {
    const coverImage = mediaIds[3 + i] ?? undefined
    await payload.create({
      collection: 'posts',
      data: { ...posts[i], author: adminId, coverImage },
    })
  }

  return { count: posts.length }
}

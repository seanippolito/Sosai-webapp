import type { Payload } from 'payload'

const services = [
  {
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description:
      'Azure and AWS architecture design, migration, and management. We build scalable, cost-efficient cloud backends that grow with your business — from initial setup through production hardening.',
    icon: 'cloud',
    capabilities: [
      { capability: 'Cloud architecture design & review' },
      { capability: 'Migration planning & execution' },
      { capability: 'Infrastructure as Code (Terraform, Pulumi)' },
      { capability: 'Cost optimization & monitoring' },
      { capability: 'Security hardening & compliance' },
    ],
    order: 1,
  },
  {
    title: 'Custom Software Systems',
    slug: 'custom-software-systems',
    description:
      'Internal tools, automation platforms, and bespoke applications built to solve your specific operational problems. No templates — every system is engineered from requirements through deployment.',
    icon: 'code',
    capabilities: [
      { capability: 'Requirements analysis & system design' },
      { capability: 'Full-stack application development' },
      { capability: 'Database design & optimization' },
      { capability: 'API development & documentation' },
      { capability: 'Deployment & CI/CD pipelines' },
    ],
    order: 2,
  },
  {
    title: 'Systems Integration',
    slug: 'systems-integration',
    description:
      'API development, data pipelines, and workflow automation connecting your existing tools into a unified system. We eliminate manual data transfer and reduce operational friction.',
    icon: 'link',
    capabilities: [
      { capability: 'API design & development' },
      { capability: 'Data pipeline architecture' },
      { capability: 'Workflow automation' },
      { capability: 'Legacy system modernization' },
      { capability: 'Real-time data synchronization' },
    ],
    order: 3,
  },
  {
    title: 'AI-Assisted Automation',
    slug: 'ai-assisted-automation',
    description:
      'Document processing, workflow analysis, and intelligent automation powered by modern AI. We identify high-impact automation opportunities and build production-ready solutions.',
    icon: 'cpu',
    capabilities: [
      { capability: 'Document processing & extraction' },
      { capability: 'Workflow analysis & optimization' },
      { capability: 'LLM integration & prompt engineering' },
      { capability: 'Automated reporting systems' },
      { capability: 'Intelligent data classification' },
    ],
    order: 4,
  },
]

export async function seedServices(payload: Payload) {
  await payload.delete({ collection: 'services', where: {} })

  for (const service of services) {
    await payload.create({ collection: 'services', data: service })
  }

  return { count: services.length }
}

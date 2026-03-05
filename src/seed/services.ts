import type { Payload } from 'payload'

const services = [
  {
    title: 'Cloud Infrastructure',
    slug: 'cloud-infrastructure',
    description:
      'Azure and AWS architecture design, migration, and management. We build scalable, cost-efficient cloud backends that grow with your business — from initial setup through production hardening.',
    icon: 'cloud',
    order: 1,
  },
  {
    title: 'Custom Software Systems',
    slug: 'custom-software-systems',
    description:
      'Internal tools, automation platforms, and bespoke applications built to solve your specific operational problems. No templates — every system is engineered from requirements through deployment.',
    icon: 'code',
    order: 2,
  },
  {
    title: 'Systems Integration',
    slug: 'systems-integration',
    description:
      'API development, data pipelines, and workflow automation connecting your existing tools into a unified system. We eliminate manual data transfer and reduce operational friction.',
    icon: 'link',
    order: 3,
  },
  {
    title: 'AI-Assisted Automation',
    slug: 'ai-assisted-automation',
    description:
      'Document processing, workflow analysis, and intelligent automation powered by modern AI. We identify high-impact automation opportunities and build production-ready solutions.',
    icon: 'cpu',
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

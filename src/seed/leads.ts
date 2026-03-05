import type { Payload } from 'payload'

const leads = [
  {
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    company: 'Meridian Logistics',
    message:
      'We are looking for help integrating our warehouse management system with our new ERP platform. We have about 3 warehouses and need real-time inventory sync. Would love to discuss scope and timeline.',
    source: '/contact',
  },
  {
    name: 'James Rodriguez',
    email: 'jrodriguez@example.com',
    company: 'Apex Government Solutions',
    message:
      'Our team needs a custom internal tool for managing contract deliverables and compliance documentation. We are a small government contractor (about 40 people) and currently tracking everything in spreadsheets.',
    source: '/services/custom-software-systems',
  },
]

export async function seedLeads(payload: Payload) {
  await payload.delete({ collection: 'leads', where: {} })

  for (const lead of leads) {
    await payload.create({ collection: 'leads', data: lead })
  }

  return { count: leads.length }
}

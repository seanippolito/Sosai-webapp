'use server'

import { getPayloadClient } from '@/lib/payload'

export async function submitLead(prevState: { success: boolean; error?: string } | null, formData: FormData) {
  const payload = await getPayloadClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' }
  }

  try {
    await payload.create({
      collection: 'leads',
      data: {
        name,
        email,
        company,
        message,
        source: '/contact',
      },
    })

    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

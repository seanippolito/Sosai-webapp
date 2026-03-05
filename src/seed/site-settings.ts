import type { Payload } from 'payload'

export async function seedSiteSettings(payload: Payload) {
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Sosai Technologies',
      tagline:
        'Building intelligent software systems for modern organizations.',
      socialLinks: {
        github: 'https://github.com/sosai-technologies',
        linkedin: 'https://linkedin.com/company/sosai-technologies',
        twitter: 'https://x.com/sosaitech',
      },
    },
  })

  return { count: 1 }
}

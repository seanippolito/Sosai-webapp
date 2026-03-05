import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  fields: [
    {
      name: 'companyName',
      type: 'text',
      defaultValue: 'Sosai Technologies',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Building intelligent software systems for modern organizations.',
    },
    {
      name: 'contactEmail',
      type: 'text',
      defaultValue: 'hello@sosai.tech',
    },
    {
      name: 'location',
      type: 'text',
      defaultValue: 'United States (Remote)',
    },
    {
      name: 'responseTime',
      type: 'text',
      defaultValue: 'Within 1 business day',
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'github', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
      ],
    },
  ],
}

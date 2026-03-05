import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'techStack',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'year',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Display year (e.g. "2024")',
      },
    },
    {
      name: 'projectStatus',
      type: 'select',
      options: [
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'in-progress',
      admin: {
        position: 'sidebar',
        description: 'Visitor-facing project status',
      },
    },
    {
      name: 'problem',
      type: 'textarea',
      admin: {
        description: 'What problem did this project solve?',
      },
    },
    {
      name: 'architecture',
      type: 'textarea',
      admin: {
        description: 'High-level architecture overview',
      },
    },
    {
      name: 'outcome',
      type: 'textarea',
      admin: {
        description: 'Results and impact',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
  ],
}

# Sosai.tech v1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a production-ready business website for Sosai Technologies using Next.js 16.2.x + Payload CMS 3, deployed on Coolify/Hetzner.

**Architecture:** Single Next.js app with Payload CMS installed directly into the App Router. Payload handles all content management, auth, and API. Site pages fetch data via Payload's Local API (server-side, no HTTP). Cloudflare R2 for media, Neon for Postgres.

**Tech Stack:** Next.js 16.2.x, React 19, TypeScript, Payload CMS 3, Tailwind CSS v4, Neon PostgreSQL, Cloudflare R2, Coolify + Hetzner

---

## Task 1: Initialize Next.js + Payload project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `.env.example`
- Create: `.env`
- Create: `src/payload.config.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/(payload)/layout.tsx`
- Create: `src/app/(payload)/admin/[[...segments]]/page.tsx`
- Create: `src/app/(payload)/admin/[[...segments]]/not-found.tsx`
- Create: `src/app/(payload)/api/[...slug]/route.ts`
- Create: `src/app/(payload)/custom.scss`

**Step 1: Create the project using Payload's create-payload-app**

```bash
cd C:/Users/seani/Projects/Clients/Sosai
npx create-payload-app@latest . --db postgres --no-deps
```

Select: `blank` template, TypeScript.

> Note: If `create-payload-app` doesn't support `--no-deps`, run it normally and let it install.

**Step 2: Verify the generated files exist**

Check that these files were created:
- `src/payload.config.ts`
- `src/app/(payload)/admin/[[...segments]]/page.tsx`
- `src/app/(payload)/api/[...slug]/route.ts`
- `next.config.ts` (should have `withPayload` wrapper)

**Step 3: Create `.env` with Neon connection**

```bash
# .env
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=<generate-a-64-char-random-string>
DATABASE_URL=<neon-connection-string>
```

**Step 4: Create `.env.example`**

```bash
# .env.example
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=change-me-super-long-random
DATABASE_URL=postgresql://user:pass@host/dbname?sslmode=require
```

**Step 5: Update `.gitignore`**

Ensure these are included:
```
node_modules
.next
.env
*.tsbuildinfo
```

**Step 6: Install dependencies and verify dev server starts**

```bash
pnpm install
pnpm dev
```

Visit `http://localhost:3000/admin` — should see Payload's setup screen.

**Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 16.2.x + Payload CMS 3 with Neon Postgres"
```

---

## Task 2: Configure Tailwind CSS v4 for site pages

**Files:**
- Modify: `package.json` (add tailwind deps)
- Create: `src/app/(site)/layout.tsx`
- Modify: `src/app/globals.css`
- Create: `postcss.config.mjs`

**Step 1: Install Tailwind v4**

```bash
pnpm add tailwindcss @tailwindcss/postcss postcss
```

**Step 2: Create `postcss.config.mjs`**

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
export default config
```

**Step 3: Update `src/app/globals.css`**

```css
@import 'tailwindcss';

@theme {
  --color-primary: #0a0a0a;
  --color-accent: #00ff88;
  --color-muted: #71717a;
  --color-surface: #18181b;
  --color-border: #27272a;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

> These are starter tokens matching the engineering-first aesthetic. Will be refined during frontend design.

**Step 4: Create `src/app/(site)/layout.tsx`**

```tsx
import type { ReactNode } from 'react'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-primary text-white">
      {/* Header and Footer added in Task 7 */}
      <main>{children}</main>
    </div>
  )
}
```

**Step 5: Create a test page to verify Tailwind works**

Create `src/app/(site)/page.tsx`:

```tsx
export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-accent">Sosai Technologies</h1>
    </div>
  )
}
```

**Step 6: Run dev server and verify**

```bash
pnpm dev
```

Visit `http://localhost:3000` — should see green "Sosai Technologies" text on dark background.
Visit `http://localhost:3000/admin` — Payload admin should still work (isolated styling).

**Step 7: Commit**

```bash
git add .
git commit -m "feat: configure Tailwind CSS v4 with engineering-first theme tokens"
```

---

## Task 3: Define Payload collections — Users, Media, Services

**Files:**
- Create: `src/collections/Users.ts`
- Create: `src/collections/Media.ts`
- Create: `src/collections/Services.ts`
- Modify: `src/payload.config.ts`

**Step 1: Create `src/collections/Users.ts`**

```ts
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
    },
  ],
}
```

**Step 2: Create `src/collections/Media.ts`**

```ts
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
```

**Step 3: Create `src/collections/Services.ts`**

```ts
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or SVG identifier',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
```

**Step 4: Update `src/payload.config.ts`**

```ts
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
})
```

**Step 5: Run dev server, verify collections appear in admin**

```bash
pnpm dev
```

Visit `/admin` — create an admin user, verify Users, Media, and Services collections appear.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add Users, Media, and Services collections"
```

---

## Task 4: Define Payload collections — Projects, Posts, Leads

**Files:**
- Create: `src/collections/Projects.ts`
- Create: `src/collections/Posts.ts`
- Create: `src/collections/Leads.ts`
- Modify: `src/payload.config.ts`

**Step 1: Create `src/collections/Projects.ts`**

```ts
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
```

**Step 2: Create `src/collections/Posts.ts`**

```ts
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
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
      name: 'excerpt',
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
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
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
```

**Step 3: Create `src/collections/Leads.ts`**

```ts
import type { CollectionConfig } from 'payload'

export const Leads: CollectionConfig = {
  slug: 'leads',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'company', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'source',
      type: 'text',
      admin: {
        description: 'Which page the lead came from',
        position: 'sidebar',
      },
    },
  ],
}
```

**Step 4: Update `src/payload.config.ts` — add new collections**

Add imports and include in collections array:

```ts
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Leads } from './collections/Leads'

// In buildConfig:
collections: [Users, Media, Services, Projects, Posts, Leads],
```

**Step 5: Run dev server, verify all collections appear**

```bash
pnpm dev
```

Visit `/admin` — all 6 collections should be visible.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add Projects, Posts, and Leads collections"
```

---

## Task 5: Add SiteSettings global + SEO plugin

**Files:**
- Create: `src/globals/SiteSettings.ts`
- Modify: `src/payload.config.ts`
- Modify: `package.json` (install SEO plugin)

**Step 1: Install SEO plugin**

```bash
pnpm add @payloadcms/plugin-seo
```

**Step 2: Create `src/globals/SiteSettings.ts`**

```ts
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
```

**Step 3: Update `src/payload.config.ts` — add global + SEO plugin**

```ts
import { seoPlugin } from '@payloadcms/plugin-seo'
import { SiteSettings } from './globals/SiteSettings'

export default buildConfig({
  // ... existing config
  globals: [SiteSettings],
  plugins: [
    seoPlugin({
      collections: ['projects', 'posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `Sosai Technologies — ${doc.title}`,
      generateDescription: ({ doc }) => doc.excerpt || doc.summary || '',
    }),
  ],
})
```

**Step 4: Verify in admin**

```bash
pnpm dev
```

Visit `/admin` — SiteSettings should appear under Globals. Projects and Posts should have SEO fields tab.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add SiteSettings global and SEO plugin"
```

---

## Task 6: Configure Cloudflare R2 storage

**Files:**
- Modify: `src/payload.config.ts`
- Modify: `.env`
- Modify: `.env.example`

**Step 1: Install S3 storage adapter**

```bash
pnpm add @payloadcms/storage-s3
```

**Step 2: Update `.env` with R2 credentials**

```bash
# Cloudflare R2
S3_BUCKET=sosai-media
S3_ACCESS_KEY_ID=<your-r2-access-key>
S3_SECRET_ACCESS_KEY=<your-r2-secret-key>
S3_REGION=auto
S3_ENDPOINT=https://<account-id>.r2.cloudflarestorage.com
```

**Step 3: Update `.env.example`**

```bash
# Cloudflare R2 (S3-compatible)
S3_BUCKET=sosai-media
S3_ACCESS_KEY_ID=your-r2-access-key
S3_SECRET_ACCESS_KEY=your-r2-secret-key
S3_REGION=auto
S3_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
```

**Step 4: Add S3 adapter to `src/payload.config.ts`**

```ts
import { s3Storage } from '@payloadcms/storage-s3'

// In plugins array:
plugins: [
  seoPlugin({ /* ... */ }),
  s3Storage({
    collections: {
      media: true,
    },
    bucket: process.env.S3_BUCKET!,
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      region: process.env.S3_REGION || 'auto',
      endpoint: process.env.S3_ENDPOINT,
      forcePathStyle: true,
    },
  }),
],
```

> Note: `forcePathStyle: true` is required for R2 compatibility.

**Step 5: Test upload**

```bash
pnpm dev
```

Go to `/admin` → Media → upload an image. Verify it uploads without error.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: configure Cloudflare R2 storage via S3 adapter"
```

---

## Task 7: Create Payload Local API helper + env validation

**Files:**
- Create: `src/lib/payload.ts`
- Create: `src/lib/env.ts`

**Step 1: Create `src/lib/env.ts`**

```ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PAYLOAD_SECRET: z.string().min(32),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  S3_BUCKET: z.string().min(1),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_REGION: z.string().default('auto'),
  S3_ENDPOINT: z.string().url(),
})

export const env = envSchema.parse(process.env)
```

**Step 2: Create `src/lib/payload.ts`**

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}
```

**Step 3: Verify import works**

No runtime test needed — this will be used by page components in the next tasks.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: add Payload Local API helper and env validation"
```

---

## Task 8: Build site layout — Header, Footer, Navigation

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/layout/Navigation.tsx`
- Modify: `src/app/(site)/layout.tsx`

**Step 1: Create `src/components/layout/Navigation.tsx`**

```tsx
import Link from 'next/link'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  return (
    <nav className="flex gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm tracking-wide text-zinc-400 transition-colors hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

**Step 2: Create `src/components/layout/Header.tsx`**

```tsx
import Link from 'next/link'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="border-b border-border px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          sosai<span className="text-accent">.</span>tech
        </Link>
        <Navigation />
      </div>
    </header>
  )
}
```

**Step 3: Create `src/components/layout/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto max-w-6xl text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} Sosai Technologies LLC. All rights reserved.</p>
      </div>
    </footer>
  )
}
```

**Step 4: Update `src/app/(site)/layout.tsx`**

```tsx
import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-primary text-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
```

**Step 5: Verify layout**

```bash
pnpm dev
```

Visit `http://localhost:3000` — header with nav and footer should be visible.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: add site layout with Header, Footer, and Navigation"
```

---

## Task 9: Build page shells — all site routes

**Files:**
- Modify: `src/app/(site)/page.tsx` (Home)
- Create: `src/app/(site)/services/page.tsx`
- Create: `src/app/(site)/work/page.tsx`
- Create: `src/app/(site)/work/[slug]/page.tsx`
- Create: `src/app/(site)/insights/page.tsx`
- Create: `src/app/(site)/insights/[slug]/page.tsx`
- Create: `src/app/(site)/about/page.tsx`
- Create: `src/app/(site)/contact/page.tsx`

**Step 1: Create placeholder pages**

Each page should be a minimal server component that fetches from Payload's Local API. For now, use placeholder content with the correct data-fetching pattern so wiring up real content later is trivial.

Example pattern for each page:

```tsx
// src/app/(site)/services/page.tsx
import { getPayloadClient } from '@/lib/payload'

export default async function ServicesPage() {
  const payload = await getPayloadClient()
  const services = await payload.find({
    collection: 'services',
    sort: 'order',
  })

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">Services</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {services.docs.map((service) => (
          <div key={service.id} className="border border-border p-6">
            <h2 className="mb-2 text-xl font-semibold">{service.title}</h2>
            <p className="text-muted">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

Apply the same pattern for all pages. Dynamic routes (`[slug]`) should use `params` to fetch a single document by slug.

**Step 2: Verify all routes resolve**

```bash
pnpm dev
```

Visit each route — they should render without errors (empty content is fine).

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add page shells for all site routes with Payload data fetching"
```

---

## Task 10: Build contact form with lead capture

**Files:**
- Create: `src/components/forms/ContactForm.tsx`
- Create: `src/app/(site)/contact/actions.ts`
- Modify: `src/app/(site)/contact/page.tsx`

**Step 1: Create server action `src/app/(site)/contact/actions.ts`**

```ts
'use server'

import { getPayloadClient } from '@/lib/payload'

export async function submitLead(formData: FormData) {
  const payload = await getPayloadClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const company = formData.get('company') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Name, email, and message are required.' }
  }

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
}
```

**Step 2: Create `src/components/forms/ContactForm.tsx`**

```tsx
'use client'

import { useActionState } from 'react'
import { submitLead } from '@/app/(site)/contact/actions'

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { success: boolean; error?: string } | null, formData: FormData) => {
      return submitLead(formData)
    },
    null,
  )

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <input name="name" placeholder="Name" required className="border border-border bg-surface px-4 py-2 text-white" />
      <input name="email" type="email" placeholder="Email" required className="border border-border bg-surface px-4 py-2 text-white" />
      <input name="company" placeholder="Company (optional)" className="border border-border bg-surface px-4 py-2 text-white" />
      <textarea name="message" placeholder="Tell us about your project" required rows={5} className="border border-border bg-surface px-4 py-2 text-white" />
      <button type="submit" disabled={pending} className="bg-accent px-6 py-2 font-semibold text-primary transition-opacity hover:opacity-90 disabled:opacity-50">
        {pending ? 'Sending...' : 'Send Message'}
      </button>
      {state?.success && <p className="text-accent">Message sent. We'll be in touch.</p>}
      {state?.error && <p className="text-red-400">{state.error}</p>}
    </form>
  )
}
```

**Step 3: Wire up contact page**

```tsx
// src/app/(site)/contact/page.tsx
import { ContactForm } from '@/components/forms/ContactForm'

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-bold">Contact</h1>
      <p className="mb-8 text-muted">Ready to modernize your systems? Let's talk.</p>
      <ContactForm />
    </section>
  )
}
```

**Step 4: Test the form**

```bash
pnpm dev
```

Visit `/contact`, submit a form. Check `/admin` → Leads — the submission should appear.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: add contact form with server action lead capture"
```

---

## Task 11: Configure standalone output + production readiness

**Files:**
- Modify: `next.config.ts`
- Create: `Dockerfile`

**Step 1: Update `next.config.ts`**

```ts
import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default withPayload(nextConfig)
```

**Step 2: Create `Dockerfile` at project root**

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN corepack enable

FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

**Step 3: Verify production build works**

```bash
pnpm build
```

Should complete without errors.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: configure standalone output and Dockerfile for Coolify deployment"
```

---

## Task 12: Push to GitHub + set up Coolify deployment

**Step 1: Create GitHub repo**

```bash
gh repo create sosai-tech --private --source=. --remote=origin
git push -u origin main
```

**Step 2: Create dev branch for staging**

```bash
git checkout -b dev
git push -u origin dev
git checkout main
```

**Step 3: Configure Coolify (manual steps)**

1. Log into Coolify dashboard
2. Add new Resource → Docker (from GitHub)
3. Connect GitHub repo `sosai-tech`
4. Set build pack: Dockerfile
5. Set environment variables (DATABASE_URL, PAYLOAD_SECRET, S3_*, NEXT_PUBLIC_SERVER_URL)
6. Set domain: `sosai.tech`
7. Enable auto-deploy on `main` push
8. Repeat for staging: deploy `dev` branch to `staging.sosai.tech`

**Step 4: Verify deployment**

Push a change to `main`, verify Coolify builds and deploys.

**Step 5: Commit any config changes**

```bash
git add .
git commit -m "chore: configure GitHub repo and deployment branches"
```

---

## Summary

| Task | What it delivers |
|------|-----------------|
| 1 | Working Next.js 16.2.x + Payload project with Neon DB |
| 2 | Tailwind v4 with engineering-first theme |
| 3 | Users, Media, Services collections |
| 4 | Projects, Posts, Leads collections |
| 5 | SiteSettings global + SEO plugin |
| 6 | Cloudflare R2 file storage |
| 7 | Payload Local API helper + env validation |
| 8 | Site layout (Header, Footer, Nav) |
| 9 | All page shells with data fetching |
| 10 | Contact form with lead capture |
| 11 | Production build + Dockerfile |
| 12 | GitHub + Coolify deployment |

After Task 12, you have a fully functional site with CMS, blog, lead capture, and auto-deployment. Frontend design (visual polish, homepage hero, portfolio cards) comes next as a separate effort.

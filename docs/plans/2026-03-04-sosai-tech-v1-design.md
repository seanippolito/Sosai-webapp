# Sosai.tech v1 — Design Document

## Overview

Business website for Sosai Technologies LLC — a consulting sales engine, technical portfolio, and product platform. Engineering-first positioning targeting SMBs, government contractors, and future AI/advanced systems clients.

## Tech Stack

| Layer | Tool | Cost |
|-------|------|------|
| Framework | Next.js 15.4.x (App Router) + TypeScript | Free |
| CMS | Payload CMS 3.0 | Free (self-hosted) |
| Styling | Tailwind CSS v4 (site) / v3 (Payload admin, isolated) | Free |
| Database | Neon PostgreSQL | Free tier |
| File Storage | Cloudflare R2 (S3-compatible) | Free tier |
| Hosting | Coolify on Hetzner VPS (~4GB ARM) | ~$5/mo |
| Domain/DNS | Cloudflare | Free |
| **Total** | | **~$5/mo** |

## Architecture Decisions

- **Flat project (no monorepo)** — single Next.js + Payload app. Add Turborepo later if a second app is needed.
- **No Docker for local dev** — Neon (cloud DB) + R2 (cloud storage) means `pnpm dev` is all you need.
- **No separate ORM** — Payload's Postgres adapter uses Drizzle internally. No competing data layer.
- **No Clerk** — Payload built-in auth for admin. Add external auth only when client-facing login is needed.
- **Tailwind v4 for site, Payload manages its own v3** — no conflict, scoped to separate route groups.
- **Coolify handles CI/CD** — no GitHub Actions needed. Push to GitHub, Coolify builds and deploys.

## Packages

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `next` (v16.2.x) | Framework |
| `react` / `react-dom` (v19) | UI |
| `payload` | CMS core |
| `@payloadcms/next` | Payload Next.js integration (admin + API handlers) |
| `@payloadcms/db-postgres` | Postgres adapter (Drizzle under the hood) |
| `@payloadcms/richtext-lexical` | Rich text editor (Lexical-based) |
| `@payloadcms/storage-s3` | S3-compatible storage adapter (for Cloudflare R2) |
| `@payloadcms/plugin-seo` | SEO meta fields on content types |
| `tailwindcss` (v4) | Styling |
| `@tailwindcss/postcss` | PostCSS plugin for Tailwind v4 |
| `typescript` | Type safety |
| `zod` | Environment variable validation |

### Dev Dependencies

| Package | Purpose |
|---------|---------|
| `eslint` | Linting |
| `@next/eslint-plugin-next` | Next.js lint rules |
| `prettier` | Formatting |
| `prettier-plugin-tailwindcss` | Auto-sort Tailwind classes |

### Intentionally Excluded

| Package | Reason |
|---------|--------|
| Drizzle ORM (standalone) | Payload uses Drizzle internally |
| Clerk / next-auth | Payload built-in auth is sufficient for v1 |
| shadcn/ui | Build lean components with Tailwind v4 directly |
| axios / ky | Payload Local API is server-side, no HTTP calls |
| @payloadcms/plugin-nested-docs | No deep page hierarchies |
| @payloadcms/plugin-redirects | Add later if URLs are restructured |
| @payloadcms/plugin-search | <50 pages, simple queries suffice |
| @payloadcms/plugin-multi-tenant | Single site |
| @payloadcms/plugin-stripe | No payments in v1 |

## File Structure

```
sosai-tech/
  src/
    app/
      (site)/                     # Marketing site (public pages)
        layout.tsx                # Site layout — nav, footer
        page.tsx                  # Home
        services/
          page.tsx                # Services listing
        work/
          page.tsx                # Portfolio/case studies listing
          [slug]/
            page.tsx              # Individual project page
        insights/
          page.tsx                # Blog listing
          [slug]/
            page.tsx              # Individual blog post
        about/
          page.tsx                # About / background
        contact/
          page.tsx                # Lead capture form
      (payload)/                  # Payload admin (auto-mounted)
        admin/
          [[...segments]]/
            page.tsx
        api/
          [...slug]/
            route.ts
      layout.tsx                  # Root layout
      globals.css                 # Tailwind v4 config (@theme directives)

    collections/                  # Payload CMS collections
      Users.ts                    # Admin users (Payload built-in auth)
      Pages.ts                    # Static page content
      Projects.ts                 # Portfolio / case studies
      Posts.ts                    # Blog posts
      Media.ts                    # Images / files (backed by R2)
      Leads.ts                    # Contact form submissions
      Services.ts                 # Service offerings

    globals/                      # Payload globals (site-wide settings)
      SiteSettings.ts             # Company info, social links, SEO defaults

    components/                   # Shared UI components
      layout/
        Header.tsx
        Footer.tsx
        Navigation.tsx
      ui/                         # Reusable primitives (buttons, cards, etc.)
      forms/
        ContactForm.tsx           # Lead capture form
      portfolio/
        ProjectCard.tsx
      blog/
        PostCard.tsx

    lib/
      payload.ts                  # Payload client helper (Local API)
      env.ts                      # Zod env validation

    payload.config.ts             # Payload configuration

  public/
    fonts/
    images/

  next.config.ts
  tsconfig.json
  package.json
  .env.example
  .gitignore
```

## Payload Collections Schema

### Users (Payload built-in auth)
- email, password, role (admin/editor)

### Projects (Portfolio / Case Studies)
- title, slug, summary, content (rich text), coverImage (relation to Media)
- techStack (array of strings), problem, architecture, outcome
- publishedDate, status (draft/published)
- SEO fields via plugin

### Posts (Blog / Insights)
- title, slug, excerpt, content (rich text), coverImage (relation to Media)
- author (relation to Users), tags (array of strings)
- publishedDate, status (draft/published)
- SEO fields via plugin

### Media (all uploads → Cloudflare R2)
- file, alt text, caption

### Leads (contact form submissions)
- name, email, company, message, source (which page), createdAt

### Services
- title, slug, description, icon, order (for display sorting)

### SiteSettings (Global)
- companyName, tagline, socialLinks, defaultSEO (meta title, description, og:image)

## Pages

| Route | Purpose | Data Source |
|-------|---------|-------------|
| `/` | Hero + services overview + featured projects + CTA | Projects, Services, SiteSettings |
| `/services` | Detailed service descriptions | Services collection |
| `/work` | Portfolio grid | Projects collection |
| `/work/[slug]` | Individual case study | Single Project |
| `/insights` | Blog listing | Posts collection |
| `/insights/[slug]` | Individual blog post | Single Post |
| `/about` | Background, certs, experience | Pages collection or hardcoded |
| `/contact` | Lead capture form | Writes to Leads collection |
| `/admin` | Payload CMS dashboard | Payload built-in |

## Deployment

### Environments

| Environment | Branch | URL | Database |
|-------------|--------|-----|----------|
| Local dev | any | localhost:3000 | Neon (dev DB) |
| Staging | `dev` | staging.sosai.tech | Neon (staging DB) |
| Production | `main` | sosai.tech | Neon (prod DB) |

### Flow

```
Local dev (your PC)
  → pnpm dev (localhost:3000)
  → Neon DB (cloud) + R2 (cloud)
  → Push to GitHub

GitHub
  → push to `dev`  → Coolify auto-builds → staging.sosai.tech
  → push to `main` → Coolify auto-builds → sosai.tech
```

### Next.js Config

- `output: "standalone"` in next.config.ts for container deployment
- Coolify builds the Docker image from the standalone output

## Visual Direction

- Minimal, technical, high-contrast
- Engineering-first aesthetic (terminal vibes, architecture diagrams, systems visuals)
- No stock agency designs
- Reference: Palantir (systems focus), Anduril (engineering tone), Stripe docs

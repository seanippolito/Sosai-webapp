# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sosai Technologies LLC business website — a consulting sales engine, technical portfolio, and product platform. Engineering-first positioning targeting SMBs, government contractors, and AI/advanced systems clients.

## Tech Stack

- **Framework:** Next.js 16.2.x (App Router) + TypeScript
- **CMS:** Payload CMS 3.0 (installed directly into Next.js)
- **Styling:** Tailwind CSS v4 for site pages (Payload admin uses its own Tailwind v3, isolated)
- **Database:** Neon PostgreSQL (via `@payloadcms/db-postgres`)
- **File Storage:** Cloudflare R2 (via `@payloadcms/storage-s3` with `forcePathStyle: true`)
- **Hosting:** Coolify on Hetzner VPS (~$5/mo)
- **Domain/DNS:** Cloudflare

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build (standalone output)
pnpm lint         # Run ESLint
```

## Architecture

- **Single flat app** (no monorepo). Add Turborepo later only if a second app is needed.
- **Route groups:** `(site)` for public marketing pages, `(payload)` for CMS admin panel
- **Data fetching:** Payload Local API via `getPayloadClient()` from `src/lib/payload.ts` — server-side only, no HTTP calls
- **Auth:** Payload built-in auth only. No Clerk, no next-auth.
- **ORM:** None separately — Payload uses Drizzle internally via its Postgres adapter

## Key Directories

- `src/app/(site)/` — Public site pages (Home, Services, Work, Insights, About, Contact)
- `src/app/(payload)/` — Payload admin panel and API routes
- `src/collections/` — Payload CMS collection definitions
- `src/globals/` — Payload global configs (SiteSettings)
- `src/components/` — Shared UI components
- `src/lib/` — Utilities (Payload client helper, env validation)

## Payload Collections

- **Users** — Admin auth (Payload built-in)
- **Projects** — Portfolio/case studies
- **Posts** — Blog/Insights
- **Media** — File uploads (backed by Cloudflare R2)
- **Leads** — Contact form submissions
- **Services** — Service offerings
- **SiteSettings** (Global) — Company info, social links, SEO defaults

## Environment Variables

Required in `.env`:
- `DATABASE_URL` — Neon Postgres connection string
- `PAYLOAD_SECRET` — Min 32 chars
- `NEXT_PUBLIC_SERVER_URL` — Site URL
- `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_ENDPOINT` — Cloudflare R2

## Deployment

- **Production:** `main` branch → Coolify auto-builds → sosai.tech
- **Staging:** `dev` branch → Coolify auto-builds → staging.sosai.tech
- Dockerfile uses `output: "standalone"` from next.config.ts

## Design Direction

- Minimal, technical, high-contrast, engineering-first aesthetic
- No stock agency designs, no emoji in UI
- Reference: Palantir, Anduril, Stripe engineering docs

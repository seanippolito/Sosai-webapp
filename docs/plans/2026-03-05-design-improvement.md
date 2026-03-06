# Design Improvement: Shared Components, Enhanced Tokens, Typography & Hero Animation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add visual authority to the Sosai Technologies website through shared UI components, enhanced CSS patterns, stronger typography hierarchy, and a subtle hero animation.

**Architecture:** Extract repeated UI patterns (section headers, cards, buttons, badges) into `src/components/ui/`. Enhance `styles.css` with new background patterns and section variety utilities. Add a single animated SVG network topology to the hero. Update all 8 page files to use the shared components.

**Tech Stack:** Next.js 15, Tailwind CSS v4 `@theme`, Framer Motion, inline SVG

---

### Task 1: Enhanced CSS Tokens & Utilities

**Files:**
- Modify: `src/app/(site)/styles.css`

**Step 1: Add new background patterns and utilities to styles.css**

Add after the existing utilities:

```css
/* Fine grid for content sections — tighter than hero dot grid */
.bg-grid-fine {
  background-image:
    linear-gradient(to right, #27272a08 1px, transparent 1px),
    linear-gradient(to bottom, #27272a08 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Radial gradient overlay — adds depth to alternating sections */
.bg-radial-subtle {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, #00ff8808 0%, transparent 70%);
}

/* Stronger text gradient with wider sweep */
.text-gradient-strong {
  background: linear-gradient(135deg, #ffffff 0%, #ffffff 40%, #71717a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Section label with left accent bar */
.section-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
}

.section-label::before {
  content: '';
  display: block;
  width: 2rem;
  height: 1px;
  background: var(--color-accent);
}
```

**Step 2: Verify styles load**

Run: `pnpm dev` — check homepage renders without errors, existing styles unaffected.

**Step 3: Commit**

```bash
git add src/app/(site)/styles.css
git commit -m "feat: add enhanced CSS patterns and section-label utility"
```

---

### Task 2: Badge Component

**Files:**
- Create: `src/components/ui/Badge.tsx`

**Step 1: Create Badge component**

This pattern appears 12+ times across pages — tech stack pills, status indicators, tags.

```tsx
import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  /** Show a pulsing dot before the label */
  dot?: boolean
  className?: string
}

export function Badge({ children, dot, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-zinc-500 ${className}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Badge.tsx
git commit -m "feat: add Badge shared component"
```

---

### Task 3: Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`

**Step 1: Create Button component**

The primary/secondary button pattern is repeated 8+ times with identical Tailwind strings.

```tsx
import Link from 'next/link'
import { type ReactNode } from 'react'

interface ButtonProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  arrow?: boolean
  className?: string
  fullWidth?: boolean
}

export function Button({
  href,
  children,
  variant = 'primary',
  arrow = true,
  className = '',
  fullWidth = false,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-mono text-sm font-medium transition-all'
  const variants = {
    primary:
      'bg-accent px-6 py-3 text-primary hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20',
    secondary:
      'border border-border px-6 py-3 text-zinc-400 hover:border-zinc-600 hover:text-white',
  }
  const width = fullWidth ? 'w-full' : ''

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${width} ${className}`}>
      {children}
      {arrow && <span className="text-lg">&rarr;</span>}
    </Link>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Button.tsx
git commit -m "feat: add Button shared component"
```

---

### Task 4: SectionHeader Component

**Files:**
- Create: `src/components/ui/SectionHeader.tsx`

**Step 1: Create SectionHeader component**

The mono-label + heading + optional description + optional link pattern is used on every page (7+ instances). Uses the new `.section-label` CSS class for the accent bar.

```tsx
import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  link?: { href: string; text: string }
  /** Use max-w-4xl instead of max-w-7xl (for article pages) */
  narrow?: boolean
}

export function SectionHeader({
  label,
  title,
  description,
  link,
  narrow,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${link ? 'flex items-end justify-between' : ''}`}>
      <div className={narrow ? 'max-w-3xl' : ''}>
        <FadeIn>
          <p className="section-label mb-4">{label}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        </FadeIn>
        {description && (
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {description}
            </p>
          </FadeIn>
        )}
      </div>
      {link && (
        <FadeIn delay={0.1}>
          <Link
            href={link.href}
            className="hidden font-mono text-sm text-zinc-500 transition-colors hover:text-white md:block"
          >
            {link.text} &rarr;
          </Link>
        </FadeIn>
      )}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/SectionHeader.tsx
git commit -m "feat: add SectionHeader shared component"
```

---

### Task 5: Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`

**Step 1: Create Card component**

The bordered surface container with hover states appears 15+ times. Three variants cover all use cases.

```tsx
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  /** 'default' = bg-surface/30, 'elevated' = bg-surface/50, 'solid' = bg-primary */
  variant?: 'default' | 'elevated' | 'solid'
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({
  children,
  variant = 'default',
  hover = true,
  padding = 'md',
  className = '',
}: CardProps) {
  const backgrounds = {
    default: 'bg-surface/30',
    elevated: 'bg-surface/50',
    solid: 'bg-primary',
  }
  const paddings = {
    sm: 'p-6',
    md: 'p-8',
    lg: 'p-8 md:p-10',
  }
  const hoverClass = hover
    ? 'transition-all hover:border-border-hover hover:bg-surface/60'
    : ''

  return (
    <div
      className={`rounded-lg border border-border ${backgrounds[variant]} ${paddings[padding]} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/Card.tsx
git commit -m "feat: add Card shared component"
```

---

### Task 6: PageHeader Component

**Files:**
- Create: `src/components/ui/PageHeader.tsx`

**Step 1: Create PageHeader component**

Every page has an identical header section pattern: `border-b border-border` wrapper with mono label + h1 + description. Replacing this with a component also applies the new `.section-label` with accent bar.

```tsx
import { FadeIn } from '@/components/motion/FadeIn'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
  /** Use max-w-4xl instead of max-w-7xl (for article pages) */
  narrow?: boolean
  children?: React.ReactNode
}

export function PageHeader({
  label,
  title,
  description,
  narrow,
  children,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border">
      <div className={`mx-auto ${narrow ? 'max-w-4xl' : 'max-w-7xl'} px-6 pb-16 pt-20`}>
        <FadeIn>
          <p className="section-label mb-4">{label}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
        </FadeIn>
        {description && (
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {description}
            </p>
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/ui/PageHeader.tsx
git commit -m "feat: add PageHeader shared component"
```

---

### Task 7: Hero Network Animation

**Files:**
- Create: `src/components/motion/NetworkGraph.tsx`

**Step 1: Create animated SVG network topology**

A slowly pulsing, subtly animated network graph for the hero background. Pure SVG + CSS animations — no JS runtime cost. Renders behind the hero text.

```tsx
export function NetworkGraph() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
      <svg
        className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 md:h-[800px] md:w-[800px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        {/* Network nodes */}
        {[
          [400, 400], [250, 300], [550, 280], [300, 550], [520, 520],
          [150, 420], [650, 400], [400, 180], [200, 180], [600, 180],
          [350, 650], [500, 680], [180, 600], [620, 600],
        ].map(([cx, cy], i) => (
          <g key={i}>
            {/* Pulse ring */}
            <circle
              cx={cx}
              cy={cy}
              r="8"
              stroke="#00ff88"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="8;20;8"
                dur={`${3 + (i % 4) * 0.7}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.3;0;0.3"
                dur={`${3 + (i % 4) * 0.7}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Node dot */}
            <circle cx={cx} cy={cy} r="3" fill="#00ff88" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.6;0.3;0.6"
                dur={`${2 + (i % 3) * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}

        {/* Connection lines */}
        {[
          [400, 400, 250, 300], [400, 400, 550, 280], [400, 400, 300, 550],
          [400, 400, 520, 520], [400, 400, 400, 180], [250, 300, 150, 420],
          [250, 300, 200, 180], [550, 280, 650, 400], [550, 280, 600, 180],
          [300, 550, 180, 600], [300, 550, 350, 650], [520, 520, 620, 600],
          [520, 520, 500, 680], [400, 180, 200, 180], [400, 180, 600, 180],
          [150, 420, 180, 600], [650, 400, 620, 600],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#00ff88"
            strokeWidth="0.5"
            opacity="0.15"
          >
            <animate
              attributeName="opacity"
              values="0.15;0.05;0.15"
              dur={`${4 + (i % 5) * 0.6}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/components/motion/NetworkGraph.tsx
git commit -m "feat: add NetworkGraph animated SVG for hero"
```

---

### Task 8: Update Home Page

**Files:**
- Modify: `src/app/(site)/page.tsx`

**Step 1: Refactor home page to use shared components + new visuals**

Key changes:
- Import and use `SectionHeader`, `Badge`, `Button`, `Card`, `NetworkGraph`
- Add `NetworkGraph` behind hero text
- Add `bg-radial-subtle` to services section for visual variety
- Add `bg-grid-fine` to work section for texture
- Bump hero heading to `md:text-8xl`
- Use `.section-label` via `SectionHeader` component
- Replace inline button/badge classes with components

Replace the entire file with:

```tsx
import Image from 'next/image'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { NetworkGraph } from '@/components/motion/NetworkGraph'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const revalidate = 60

const metrics = [
  { label: 'Years in R&D', value: '2+' },
  { label: 'Systems Deployed', value: '5+' },
  { label: 'Clearance Level', value: 'Active' },
  { label: 'Uptime SLA', value: '99.9%' },
]

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M2 15.2C2 14 2.94 13 4.1 13h.4c.26-2.8 2.6-5 5.5-5 2.46 0 4.51 1.6 5.24 3.83A4.5 4.5 0 0 1 19.5 16.5c0 .17 0 .33-.02.5H4.1A2.1 2.1 0 0 1 2 15.2Z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="m8 18-6-6 6-6M16 6l6 6-6 6" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101M10.172 13.828a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-accent">
      {icons[name] || icons.code}
    </div>
  )
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const { docs: servicesDocs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 4,
  })

  const { docs: projectsDocs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 3,
  })

  const services = servicesDocs.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    icon: s.icon || 'code',
  }))

  const projects = projectsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      techStack: (p.techStack ?? []).map((t) => t.technology),
      coverImage: image,
    }
  })

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-dot-grid absolute inset-0 opacity-30" />
        <NetworkGraph />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 md:pb-32 md:pt-44">
          <FadeIn>
            <p className="section-label mb-6">SOSAI TECHNOLOGIES</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight md:text-8xl">
              We build systems that{' '}
              <span className="text-gradient-strong">run your operations</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Cloud architecture, custom software, and systems integration
              for organizations that need reliability — not experiments.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10 flex gap-4">
              <Button href="/work">See Our Work</Button>
              <Button href="/contact" variant="secondary" arrow={false}>
                Get in Touch
              </Button>
            </div>
          </FadeIn>

          {/* Metrics strip */}
          <FadeIn delay={0.4}>
            <div className="mt-20 grid grid-cols-2 gap-px rounded-lg border border-border bg-border md:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-primary px-6 py-5 first:rounded-l-lg last:rounded-r-lg"
                >
                  <p className="font-mono text-2xl font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-xs tracking-wide text-zinc-500">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services — radial gradient overlay for section variety */}
      <section className="relative border-t border-border">
        <div className="bg-radial-subtle absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader
            label="Capabilities"
            title="What we build"
            link={{ href: '/services', text: 'View all' }}
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.id}>
                <Card variant="elevated">
                  <div className="mb-5 flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Selected Work — fine grid background for texture */}
      <section className="relative border-t border-border">
        <div className="bg-grid-fine absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <SectionHeader
            label="Portfolio"
            title="Selected work"
            link={{ href: '/work', text: 'View all' }}
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <a
                  href={`/work/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface/50 transition-all hover:border-border-hover hover:bg-surface"
                >
                  {project.coverImage?.url && (
                    <div className="relative aspect-[16/9] w-full bg-surface">
                      <Image
                        src={project.coverImage.url}
                        alt={project.coverImage.alt || project.title}
                        width={project.coverImage.width || 800}
                        height={project.coverImage.height || 450}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <FadeIn>
            <Card variant="default" hover={false} padding="lg" className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Have a project in mind?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                We work with teams that need reliable, production-grade systems
                — not prototypes. Let&apos;s talk about what you&apos;re building.
              </p>
              <div className="mt-8">
                <Button href="/contact">Start a Conversation</Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Verify**

Run: `pnpm dev` — homepage should render with:
- Network graph animation behind hero text (right side, faded)
- Accent bar before section labels
- Larger hero heading on desktop
- Subtle radial gradient on services section
- Fine grid texture on work section

**Step 3: Commit**

```bash
git add src/app/(site)/page.tsx
git commit -m "feat: refactor home page with shared components and enhanced visuals"
```

---

### Task 9: Update Services Page

**Files:**
- Modify: `src/app/(site)/services/page.tsx`

**Step 1: Refactor to use PageHeader and Badge**

Replace the header section with `PageHeader`, use `Badge` for capability dots, and use `Card` for the CTA. The `ServiceIcon` and `CardDeck` remain page-specific.

Changes:
- Replace header section with `<PageHeader label="What We Do" title="..." description="..." />`
- Replace bottom CTA inline button with `<Button>`
- Keep CardDeck and ServiceIcon as-is (page-specific layout)

```tsx
import { FadeIn } from '@/components/motion/FadeIn'
import { CardDeck } from '@/components/motion/CardDeck'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

function ServiceIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M2 15.2C2 14 2.94 13 4.1 13h.4c.26-2.8 2.6-5 5.5-5 2.46 0 4.51 1.6 5.24 3.83A4.5 4.5 0 0 1 19.5 16.5c0 .17 0 .33-.02.5H4.1A2.1 2.1 0 0 1 2 15.2Z" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="m8 18-6-6 6-6M16 6l6 6-6 6" />
      </svg>
    ),
    link: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <path d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101M10.172 13.828a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    cpu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
      </svg>
    ),
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-surface text-accent">
      {icons[name] || icons.code}
    </div>
  )
}

export default async function ServicesPage() {
  const payload = await getPayloadClient()

  const { docs: servicesDocs } = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })

  const services = servicesDocs.map((s) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
    description: s.description,
    capabilities: (s.capabilities ?? []).map((c) => c.capability),
    icon: s.icon || 'code',
  }))

  return (
    <div>
      <PageHeader
        label="What We Do"
        title="Engineering services for organizations that build to last"
        description="We focus on four core areas where precision engineering makes the biggest difference. Every engagement starts with understanding your system — not selling you a solution."
      />

      {/* Services list */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <CardDeck>
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group rounded-lg border border-border bg-primary p-8 transition-all hover:border-border-hover hover:bg-surface/60 md:p-10"
            >
              <div className="grid gap-8 md:grid-cols-[1fr,300px]">
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <ServiceIcon name={service.icon} />
                    <div>
                      <p className="font-mono text-xs text-zinc-600">
                        0{index + 1}
                      </p>
                      <h2 className="text-2xl font-bold tracking-tight">
                        {service.title}
                      </h2>
                    </div>
                  </div>
                  <p className="max-w-2xl leading-relaxed text-zinc-400">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <p className="section-label mb-4">Capabilities</p>
                  <ul className="space-y-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2 text-sm text-zinc-500"
                      >
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </CardDeck>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Not sure which service you need?
              </h2>
              <p className="max-w-lg text-zinc-400">
                Most projects span multiple areas. Tell us what you are trying to
                accomplish and we will figure out the right approach together.
              </p>
              <Button href="/contact">Start a Conversation</Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/services/page.tsx
git commit -m "feat: refactor services page with shared components"
```

---

### Task 10: Update Work Listing Page

**Files:**
- Modify: `src/app/(site)/work/page.tsx`

**Step 1: Refactor to use PageHeader, Badge, Button**

Replace header with `PageHeader`, use `Badge` for tech pills and status indicators.

Changes:
- Replace header section with `<PageHeader>`
- Replace inline badge classes with `<Badge>`
- Keep `CardDeck` and cover image rendering as-is

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { CardDeck } from '@/components/motion/CardDeck'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const revalidate = 60

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default async function WorkPage() {
  const payload = await getPayloadClient()

  const { docs: projectsDocs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })

  const projects = projectsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      techStack: (p.techStack ?? []).map((t) => t.technology),
      status: capitalizeFirst(p.projectStatus || 'shipped'),
      year: p.year || '',
      coverImage: image,
    }
  })

  return (
    <div>
      <PageHeader
        label="Portfolio"
        title="Systems we have designed, built, and shipped"
        description="Every project here went from requirements to production. We build systems that organizations depend on — not demos or prototypes."
      />

      <section className="mx-auto max-w-7xl px-6 pt-24">
        <CardDeck>
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group block overflow-hidden rounded-lg border border-border bg-primary transition-all hover:border-border-hover hover:bg-surface/60"
            >
              {project.coverImage?.url && (
                <div className="relative aspect-[21/9] w-full bg-surface">
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt || project.title}
                    width={project.coverImage.width || 1200}
                    height={project.coverImage.height || 514}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-8 md:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <span className="font-mono text-xs text-zinc-600">
                        0{index + 1}
                      </span>
                      <span className="font-mono text-xs text-zinc-700">/</span>
                      <span className="font-mono text-xs text-zinc-600">
                        {project.year}
                      </span>
                    </div>
                    <h2 className="mb-3 text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="max-w-2xl leading-relaxed text-zinc-400">
                      {project.summary}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-4 md:items-end">
                    <Badge dot>{project.status}</Badge>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} className="text-zinc-600">{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                  View case study
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </CardDeck>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/work/page.tsx
git commit -m "feat: refactor work listing with shared components"
```

---

### Task 11: Update Work Detail Page

**Files:**
- Modify: `src/app/(site)/work/[slug]/page.tsx`

**Step 1: Refactor to use Badge, Button, Card, and section-label**

Replace inline badge/button/card classes with shared components. Use `.section-label` for the content section labels. Keep the page layout structure.

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    limit: 100,
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'projects',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const project = docs[0]
  if (!project) notFound()

  const techStack = (project.techStack ?? []).map((t) => t.technology)
  const status = capitalizeFirst(project.projectStatus || 'shipped')
  const coverImage = typeof project.coverImage === 'object' && project.coverImage !== null ? (project.coverImage as Media) : null

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20">
          <FadeIn>
            <Link
              href="/work"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>&larr;</span>
              Back to work
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-4 flex items-center gap-4">
              <Badge dot>{status}</Badge>
              <span className="font-mono text-xs text-zinc-600">
                {project.year}
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-zinc-400">
              {project.summary}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cover Image */}
      {coverImage?.url && (
        <FadeIn>
          <div className="mx-auto max-w-7xl px-6 pt-12">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || project.title}
                width={coverImage.width || 1400}
                height={coverImage.height || 600}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,320px]">
          {/* Main content */}
          <div className="space-y-16">
            {project.problem && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">The Problem</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.problem}
                  </p>
                </section>
              </FadeIn>
            )}

            {project.architecture && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Architecture</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.architecture}
                  </p>
                </section>
              </FadeIn>
            )}

            {project.content && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Details</p>
                  <div className="prose prose-invert prose-zinc max-w-none prose-p:leading-relaxed prose-p:text-zinc-400">
                    <RichText data={project.content} />
                  </div>
                </section>
              </FadeIn>
            )}

            {project.outcome && (
              <FadeIn>
                <section>
                  <p className="section-label mb-4">Outcome</p>
                  <p className="text-lg leading-relaxed text-zinc-300">
                    {project.outcome}
                  </p>
                </section>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <FadeIn>
              <Card hover={false}>
                <p className="section-label mb-6">Project Details</p>

                <div className="space-y-6">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Status</p>
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {status}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Year</p>
                    <p className="text-sm font-medium">{project.year}</p>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-xs text-zinc-600">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <Button href="/contact" fullWidth arrow={false}>
                    Discuss a Similar Project
                  </Button>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/work/[slug]/page.tsx
git commit -m "feat: refactor work detail with shared components"
```

---

### Task 12: Update Insights Listing Page

**Files:**
- Modify: `src/app/(site)/insights/page.tsx`

**Step 1: Refactor to use PageHeader and Badge**

Replace header with `PageHeader`, use `Badge` for tags.

```tsx
import Link from 'next/link'
import Image from 'next/image'
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { getPayloadClient } from '@/lib/payload'
import type { Media } from '@/payload-types'

export const revalidate = 60

export default async function InsightsPage() {
  const payload = await getPayloadClient()

  const { docs: postsDocs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedDate',
    depth: 1,
    limit: 100,
  })

  const posts = postsDocs.map((p) => {
    const image = typeof p.coverImage === 'object' && p.coverImage !== null ? (p.coverImage as Media) : null
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      tags: (p.tags ?? []).map((t) => t.tag),
      publishedDate: p.publishedDate
        ? new Date(p.publishedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '',
      readTime: p.readTime || '',
      coverImage: image,
    }
  })

  return (
    <div>
      <PageHeader
        label="Insights"
        title="Engineering perspectives and technical thinking"
        description="Practical writing about cloud architecture, systems integration, and building reliable software for real organizations."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <StaggerContainer className="space-y-6">
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <Link
                href={`/insights/${post.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-surface/30 transition-all hover:border-border-hover hover:bg-surface/60"
              >
                {post.coverImage?.url && (
                  <div className="relative aspect-[21/9] w-full bg-surface">
                    <Image
                      src={post.coverImage.url}
                      alt={post.coverImage.alt || post.title}
                      width={post.coverImage.width || 1200}
                      height={post.coverImage.height || 514}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-8 md:p-10">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-4">
                        <span className="font-mono text-xs text-zinc-600">
                          {post.publishedDate}
                        </span>
                        <span className="font-mono text-xs text-zinc-700">/</span>
                        <span className="font-mono text-xs text-zinc-600">
                          {post.readTime}
                        </span>
                      </div>
                      <h2 className="mb-3 text-xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="max-w-2xl leading-relaxed text-zinc-400">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="text-zinc-600">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 font-mono text-sm text-zinc-600 transition-colors group-hover:text-accent">
                    Read article
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/insights/page.tsx
git commit -m "feat: refactor insights listing with shared components"
```

---

### Task 13: Update Insights Detail Page

**Files:**
- Modify: `src/app/(site)/insights/[slug]/page.tsx`

**Step 1: Refactor to use Badge, Button, Card**

Replace inline badge/button/card classes. Use `.section-label` for topics label.

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn } from '@/components/motion/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { User, Media } from '@/payload-types'

export const revalidate = 60

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 100,
    select: { slug: true },
  })
  return docs.map((doc) => ({ slug: doc.slug }))
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    depth: 1,
    limit: 1,
  })

  const post = docs[0]
  if (!post) notFound()

  const tags = (post.tags ?? []).map((t) => t.tag)
  const publishedDate = post.publishedDate
    ? new Date(post.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''
  const author = (post.author as User)?.name || 'Sosai Technologies'
  const coverImage = typeof post.coverImage === 'object' && post.coverImage !== null ? (post.coverImage as Media) : null

  return (
    <div>
      {/* Header */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pb-16 pt-20">
          <FadeIn>
            <Link
              href="/insights"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-zinc-500 transition-colors hover:text-white"
            >
              <span>&larr;</span>
              Back to insights
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="mb-4 flex items-center gap-4">
              <span className="font-mono text-xs text-zinc-600">
                {publishedDate}
              </span>
              <span className="font-mono text-xs text-zinc-700">/</span>
              <span className="font-mono text-xs text-zinc-600">
                {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-zinc-400">
              {post.excerpt}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface font-mono text-xs text-accent">
                {author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium">{author}</p>
                <p className="font-mono text-xs text-zinc-600">
                  Sosai Technologies
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Cover Image */}
      {coverImage?.url && (
        <FadeIn>
          <div className="mx-auto max-w-4xl px-6 pt-12">
            <div className="overflow-hidden rounded-lg border border-border">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || post.title}
                width={coverImage.width || 1200}
                height={coverImage.height || 600}
                className="w-full object-cover"
                priority
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Content */}
      <article className="mx-auto max-w-4xl px-6 py-16">
        <FadeIn>
          <div className="prose prose-invert prose-zinc max-w-none prose-p:text-lg prose-p:leading-[1.8] prose-p:text-zinc-300">
            <RichText data={post.content} />
          </div>
        </FadeIn>

        {/* Tags */}
        <FadeIn>
          <div className="mt-16 border-t border-border pt-8">
            <p className="section-label mb-4">Topics</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} className="px-4 py-1.5">{tag}</Badge>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <Card hover={false} className="mt-16 text-center">
            <h3 className="text-xl font-bold">
              Want to discuss this further?
            </h3>
            <p className="mt-2 text-zinc-400">
              We are always happy to talk through technical challenges.
            </p>
            <div className="mt-6">
              <Button href="/contact">Get in Touch</Button>
            </div>
          </Card>
        </FadeIn>
      </article>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/insights/[slug]/page.tsx
git commit -m "feat: refactor insights detail with shared components"
```

---

### Task 14: Update About Page

**Files:**
- Modify: `src/app/(site)/about/page.tsx`

**Step 1: Refactor to use PageHeader, Card, Badge, Button, SectionHeader**

Replace header with `PageHeader`, cards with `Card`, badges with `Badge`, CTA button with `Button`, section labels with `.section-label`.

```tsx
'use client'

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/motion/FadeIn'
import { PageHeader } from '@/components/ui/PageHeader'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Precision Over Speed',
    description:
      'We build systems right the first time. Cutting corners on architecture creates technical debt that costs 10x to fix later.',
  },
  {
    title: 'Simplicity Over Complexity',
    description:
      'The best systems are the ones that are easy to understand, maintain, and extend. We resist unnecessary complexity at every turn.',
  },
  {
    title: 'Reliability Over Features',
    description:
      'A system that works perfectly with five features beats one that crashes with fifty. We ship what works, then iterate.',
  },
  {
    title: 'Transparency Over Promises',
    description:
      'We tell you what we know, what we do not know, and what it will take to find out. No surprises, no hidden costs.',
  },
]

const experience = [
  {
    role: 'Founder & Principal Engineer',
    org: 'Sosai Technologies',
    period: '2024 — Present',
    description:
      'Cloud architecture, custom software systems, and systems integration for SMBs and government contractors.',
  },
  {
    role: 'Software Engineer — R&D',
    org: 'Leidos',
    period: '2022 — 2024',
    description:
      'Communications security and advanced systems engineering for defense and intelligence programs.',
  },
]

const techAreas = [
  'TypeScript / JavaScript',
  'React / Next.js',
  'Node.js / Python',
  'PostgreSQL / MongoDB',
  'Azure / AWS',
  'Docker / Kubernetes',
  'Terraform / IaC',
  'CI/CD Pipelines',
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        label="About"
        title="An engineering practice built on precision and reliability"
        description="Sosai Technologies is a software engineering consultancy founded by Sean Irving. We build production-grade systems for organizations that cannot afford to get it wrong."
      />

      {/* Story */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2">
            <FadeIn>
              <div>
                <p className="section-label mb-4">Background</p>
                <div className="space-y-6 text-lg leading-relaxed text-zinc-300">
                  <p>
                    Before founding Sosai Technologies, I spent two years in R&D
                    at Leidos working on communications security systems for
                    defense and intelligence programs. That work taught me what it
                    means to build systems where failure is not an option.
                  </p>
                  <p>
                    I started this practice because I saw a gap: small and
                    mid-sized organizations need the same caliber of engineering
                    that large enterprises and government agencies demand — but
                    they cannot justify the overhead of big consulting firms.
                  </p>
                  <p>
                    Every project I take on gets the same rigor I applied in
                    classified environments: thorough requirements analysis,
                    deliberate architecture decisions, and systems that are built
                    to run in production — not just demo well.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div>
                <p className="section-label mb-4">Experience</p>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <Card key={exp.role} hover={false} padding="sm">
                      <p className="font-mono text-xs text-zinc-600">
                        {exp.period}
                      </p>
                      <p className="mt-2 font-semibold">{exp.role}</p>
                      <p className="text-sm text-accent">{exp.org}</p>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {exp.description}
                      </p>
                    </Card>
                  ))}
                </div>

                <Card hover={false} padding="sm" className="mt-8">
                  <p className="section-label mb-4">Core Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {techAreas.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                </Card>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeader
            label="How We Work"
            title="Engineering principles, not sales pitches"
          />

          <StaggerContainer className="grid gap-4 md:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card>
                  <h3 className="mb-3 text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="leading-relaxed text-zinc-400">
                    {value.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <FadeIn>
            <Card hover={false} padding="lg" className="text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to build something serious?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-zinc-400">
                Let&apos;s talk about your project. No pressure, no sales
                pitch — just an honest conversation about what you need and
                whether we are the right fit.
              </p>
              <div className="mt-8">
                <Button href="/contact">Start a Conversation</Button>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/about/page.tsx
git commit -m "feat: refactor about page with shared components"
```

---

### Task 15: Update Contact Page

**Files:**
- Modify: `src/app/(site)/contact/page.tsx`

**Step 1: Refactor to use PageHeader and Card**

Replace header with `PageHeader`, sidebar cards with `Card`.

```tsx
import { FadeIn } from '@/components/motion/FadeIn'
import { ContactForm } from '@/components/forms/ContactForm'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { getPayloadClient } from '@/lib/payload'

export const revalidate = 60

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const contactEmail = settings.contactEmail || 'hello@sosai.tech'
  const location = settings.location || 'United States (Remote)'
  const responseTime = settings.responseTime || 'Within 1 business day'

  return (
    <div>
      <PageHeader
        label="Contact"
        title="Let's talk about your project"
        description="Tell us what you are building. We will get back to you within one business day with our thoughts on scope, approach, and timeline."
      />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-[1fr,360px]">
          <FadeIn>
            <ContactForm />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              <Card hover={false}>
                <p className="section-label mb-6">Direct Contact</p>
                <div className="space-y-4">
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Email</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-zinc-300 transition-colors hover:text-accent"
                    >
                      {contactEmail}
                    </a>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Location</p>
                    <p className="text-sm text-zinc-300">{location}</p>
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-xs text-zinc-600">Response Time</p>
                    <p className="text-sm text-zinc-300">{responseTime}</p>
                  </div>
                </div>
              </Card>

              <Card hover={false}>
                <p className="section-label mb-6">What Happens Next</p>
                <ol className="space-y-4">
                  {[
                    'We review your message and research your domain.',
                    'We schedule a 30-minute call to discuss scope.',
                    'We send a clear proposal with timeline and cost.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm text-zinc-400">
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-accent">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add src/app/(site)/contact/page.tsx
git commit -m "feat: refactor contact page with shared components"
```

---

### Task 16: Final Build Verification

**Step 1: Run build**

Run: `pnpm build`
Expected: Clean build with no errors. All pages listed with ISR revalidation.

**Step 2: Visual spot-check**

Run: `pnpm dev` and verify:
- `/` — Network graph visible behind hero, accent bars on section labels, larger hero heading, radial gradient on services, grid texture on work section
- `/services` — Accent bar on "Capabilities" labels
- `/work` — PageHeader with accent bar, Badge components for status/tech
- `/work/[slug]` — Section labels with accent bars, Card sidebar, Badge components
- `/insights` — PageHeader, Badge tags
- `/insights/[slug]` — Section label on Topics, Card CTA
- `/about` — Cards for experience/values, Badge for tech areas
- `/contact` — Cards for sidebar sections

**Step 3: Final commit**

If any adjustments were needed during spot-check, commit them:

```bash
git add -A
git commit -m "fix: polish design improvements after visual review"
```

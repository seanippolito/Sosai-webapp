import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'

const footerLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export async function Footer() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })

  const tagline = settings.tagline || 'Building intelligent software systems for modern organizations.'
  const socialLinks = [
    settings.socialLinks?.github && { label: 'GitHub', href: settings.socialLinks.github },
    settings.socialLinks?.linkedin && { label: 'LinkedIn', href: settings.socialLinks.linkedin },
    settings.socialLinks?.twitter && { label: 'Twitter', href: settings.socialLinks.twitter },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-mono text-lg font-bold tracking-tight"
            >
              sosai<span className="text-accent">.</span>tech
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </p>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                    <span className="ml-1 text-zinc-700">&#8599;</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <p className="font-mono text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Sosai Technologies LLC
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            <span className="font-mono text-xs text-zinc-600">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

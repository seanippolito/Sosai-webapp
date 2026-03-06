import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

interface SectionHeaderProps {
  label: string
  title: string
  description?: string
  link?: { href: string; text: string }
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

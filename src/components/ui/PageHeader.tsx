import { FadeIn } from '@/components/motion/FadeIn'

interface PageHeaderProps {
  label: string
  title: string
  description?: string
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

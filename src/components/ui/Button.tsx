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

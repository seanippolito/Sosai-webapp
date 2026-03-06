import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
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

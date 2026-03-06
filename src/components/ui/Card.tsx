import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
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

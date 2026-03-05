import Link from 'next/link'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-primary/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-mono text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          sosai<span className="text-accent">.</span>tech
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

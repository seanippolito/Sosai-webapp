import Link from 'next/link'
import { Navigation } from './Navigation'

export function Header() {
  return (
    <header className="border-b border-border px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          sosai<span className="text-accent">.</span>tech
        </Link>
        <Navigation />
      </div>
    </header>
  )
}

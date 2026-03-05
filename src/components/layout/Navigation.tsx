import Link from 'next/link'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  return (
    <nav className="flex gap-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm tracking-wide text-zinc-400 transition-colors hover:text-white"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

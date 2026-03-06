'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden items-center gap-8 md:flex">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-sm tracking-wide transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-[19px] left-0 right-0 h-px bg-accent" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span
          className={`block h-px w-5 bg-white transition-all duration-200 ${
            open ? 'translate-y-[3.5px] rotate-45' : ''
          }`}
        />
        <span
          className={`block h-px w-5 bg-white transition-all duration-200 ${
            open ? '-translate-y-[3.5px] -rotate-45' : ''
          }`}
        />
      </button>

      {/* Mobile overlay — portaled to body */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-primary/98 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <nav
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + '/')

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`text-2xl font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-accent'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>,
          document.body,
        )}
    </>
  )
}

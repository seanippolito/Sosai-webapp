import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SeedButton } from '@/components/dev/SeedButton'
import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Sosai Technologies — Intelligent Software Systems',
    template: '%s | Sosai Technologies',
  },
  description:
    'Engineering-first consulting firm building intelligent software systems for modern organizations. Cloud architecture, AI integration, and systems engineering.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://sosai.tech'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sosai Technologies',
  },
}

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="relative flex min-h-screen flex-col bg-primary text-white antialiased">
          <Header />
          <main className="flex-1 pt-[65px]">{children}</main>
          <Footer />
          <SeedButton />
        </div>
      </body>
    </html>
  )
}

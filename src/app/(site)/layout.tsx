import type { ReactNode } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SeedButton } from '@/components/dev/SeedButton'
import './styles.css'

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

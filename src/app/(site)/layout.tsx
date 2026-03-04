import type { ReactNode } from 'react'
import './styles.css'

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-primary text-white">
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}

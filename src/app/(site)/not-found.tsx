import Link from 'next/link'
import { FadeIn } from '@/components/motion/FadeIn'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <FadeIn>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
            404
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-zinc-400">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-mono text-sm font-medium text-primary transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
          >
            Back to Home
            <span className="text-lg">&rarr;</span>
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export function SeedButton() {
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  if (process.env.NODE_ENV === 'production') return null

  async function handleSeed() {
    setState('loading')
    try {
      const res = await fetch('/api/seed')
      const data = await res.json()
      setState(data.success ? 'success' : 'error')
    } catch {
      setState('error')
    }
    setTimeout(() => setState('idle'), 3000)
  }

  const label = {
    idle: 'Seed DB',
    loading: 'Seeding...',
    success: 'Seeded',
    error: 'Failed',
  }[state]

  return (
    <button
      onClick={handleSeed}
      disabled={state === 'loading'}
      className="fixed bottom-4 right-4 z-50 rounded-md border border-border bg-surface px-4 py-2 font-mono text-xs text-zinc-400 shadow-lg transition-all hover:border-accent hover:text-white disabled:opacity-50"
    >
      {label}
    </button>
  )
}

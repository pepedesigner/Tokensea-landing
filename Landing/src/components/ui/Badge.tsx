import type { ReactNode } from 'react'

export type BadgeVariant = 'accent' | 'ink' | 'live'

const VARIANTS: Record<BadgeVariant, string> = {
  accent: 'border-accent-500/30 bg-accent-500/15 text-accent-700',
  ink: 'border-black/10 bg-ink/5 text-ink-2',
  live: 'border-accent-500/30 bg-accent-500/15 text-accent-600',
}

export default function Badge({
  children,
  variant = 'accent',
  dot = true,
  className = '',
}: {
  children: ReactNode
  variant?: BadgeVariant
  dot?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider uppercase ${VARIANTS[variant]} ${className}`}
    >
      {dot && <span className="inline-block h-1.5 w-1.5 bg-current" />}
      {children}
    </span>
  )
}

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// One full cycle. The stops are laid out twice across a 200%-wide background so
// that shifting by one background-position period loops seamlessly in a single
// direction (no yoyo, no visible seam).
const DEFAULT_COLORS = ['#dc2626', '#ea580c', '#eab308', '#16a34a', '#0891b2', '#2563eb', '#7c3aed']

export default function GradientText({
  children,
  colors = DEFAULT_COLORS,
  duration = 3,
  ...rest
}: {
  children: ReactNode
  colors?: string[]
  duration?: number
} & Record<string, unknown>) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { backgroundPosition: '0% 50%' },
        {
          backgroundPosition: '100% 50%',
          duration,
          ease: 'none',
          repeat: -1,
        },
      )
    },
    { scope: ref },
  )

  const cycle = [...colors, ...colors, colors[0]]
  const stops = cycle
    .map((c, i) => `${c} ${(i / (cycle.length - 1)) * 100}%`)
    .join(', ')

  return (
    <span
      ref={ref}
      className="inline-block"
      style={{
        backgroundImage: `linear-gradient(90deg, ${stops})`,
        backgroundSize: '200% 100%',
        backgroundPosition: '0% 50%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
      {...rest}
    >
      {children}
    </span>
  )
}

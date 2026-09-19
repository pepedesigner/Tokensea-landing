import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function GradientText({
  children,
  colors = ['#2a231c', '#3f7311', '#c9ff3f'],
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
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      )
    },
    { scope: ref },
  )

  const stops = colors
    .map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`)
    .join(', ')

  return (
    <span
      ref={ref}
      className="inline-block"
      style={{
        backgroundImage: `linear-gradient(90deg, ${stops})`,
        backgroundSize: '180% 100%',
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

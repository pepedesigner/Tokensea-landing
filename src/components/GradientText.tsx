import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function GradientText({
  children,
  colors = ['#7342E2', '#9B6BFF', '#4DE0C0', '#2A9D8F', '#F4A261', '#9B6BFF'],
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
        backgroundSize: '250% 100%',
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

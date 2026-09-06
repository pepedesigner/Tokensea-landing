import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function FloatingOrb({
  className = '',
  size = 300,
  duration = 6,
  drift = 30,
  style,
  ...rest
}: {
  className?: string
  size?: number
  duration?: number
  drift?: number
  style?: CSSProperties
} & Record<string, unknown>) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      gsap.to(el, {
        y: drift,
        rotation: 8,
        duration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
      gsap.to(el, {
        x: drift * 0.6,
        duration: duration * 1.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute rounded-full will-change-transform ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    />
  )
}

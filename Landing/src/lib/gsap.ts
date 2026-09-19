import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP as useGSAPBase } from '@gsap/react'

gsap.registerPlugin(useGSAPBase, ScrollTrigger)

type GSAPCallback = (context?: unknown, contextSafe?: unknown) => unknown

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

/**
 * useGSAP with a `prefers-reduced-motion` guard. When the user asks for
 * reduced motion, the setup callback never runs, so entrance tweens leave
 * content in its natural (visible) state and looping/parallax effects never
 * start. Selector scoping from the `scope` option is preserved.
 */
export function useGSAP(
  callback?: GSAPCallback,
  dependencies?: Parameters<typeof useGSAPBase>[1],
) {
  useGSAPBase((context, contextSafe) => {
    if (prefersReducedMotion()) return
    return callback?.(context, contextSafe)
  }, dependencies)
}

export { gsap, ScrollTrigger }

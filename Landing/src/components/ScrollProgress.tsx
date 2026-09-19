import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left will-change-transform"
      style={{
        background: 'linear-gradient(90deg, #14110e, #3f7311, #c9ff3f)',
      }}
    />
  )
}

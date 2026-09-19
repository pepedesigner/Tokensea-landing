import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

const ITEMS = [
  'glm-5.3',
  'claude-opus-5',
  'gpt-5.6-sol',
  'kimi-k3',
  'claude-fable-5',
  'glm-5.1',
  'gpt-6-astra',
  'glm-5.2',
  'USD payouts',
  'Autopilot pricing',
  'Encrypted listings',
  'No custody of keys',
]

export default function ModelMarquee() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.to('[data-marquee-track]', {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })
      gsap.fromTo(
        '[data-marquee-band]',
        { yPercent: -40 },
        {
          yPercent: 40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      data-marquee-band
      className="relative overflow-hidden border-y border-black/10 py-5"
      style={{
        background: 'linear-gradient(90deg, #faf8f4 0%, #f3efe7 50%, #faf8f4 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#faf8f4] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#faf8f4] to-transparent" />

      <div data-marquee-track className="flex w-max items-center whitespace-nowrap will-change-transform">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-mono text-sm font-medium tracking-wide"
            style={{ color: i % 2 === 0 ? '#14110e' : 'rgba(20,17,14,0.5)' }}
          >
            {item}
            <span style={{ color: '#ba905c' }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}

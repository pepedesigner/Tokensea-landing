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
      className="relative overflow-hidden py-5"
      style={{
        background: 'linear-gradient(90deg, #F4EEFF 0%, #EBE2FF 50%, #F4EEFF 100%)',
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#F0E9FF] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#F0E9FF] to-transparent" />

      <div data-marquee-track className="flex w-max items-center whitespace-nowrap will-change-transform">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-mono text-sm font-medium tracking-wide"
            style={{ color: i % 2 === 0 ? '#3D2A6B' : 'rgba(115,66,226,0.45)' }}
          >
            {item}
            <span style={{ color: '#7342E2' }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { Plug, KeyRound, Wallet, ReceiptText } from 'lucide-react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'
import FloatingOrb from './FloatingOrb'
import GradientText from './GradientText'

const FEATURES = [
  {
    icon: Wallet,
    title: 'Sell what you already pay for',
    body: 'Turn unused API credits or included subscription capacity into USD every time a buyer hits your listing.',
  },
  {
    icon: KeyRound,
    title: 'Encrypted per listing',
    body: 'Your key is held only to serve your listing, encrypted, and never kept on file after it ends.',
  },
  {
    icon: Plug,
    title: 'Autopilot pricing',
    body: 'We price your listing to win demand. Set an optional minimum — Autopilot never goes below it.',
  },
  {
    icon: ReceiptText,
    title: 'Automatic payouts',
    body: 'Earn per request. USD batches to your wallet at $5 or after 72 hours, then cash out to the account you choose.',
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-features-heading]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-features-heading]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.set('[data-feature-card]', {
        y: 48,
        autoAlpha: 0,
        scale: 0.9,
        transformOrigin: 'center center',
      })
      ScrollTrigger.batch('[data-feature-card]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            overwrite: true,
          }),
      })

      gsap.to('[data-feature-icon]', {
        y: -4,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        '[data-features-orb]',
        { yPercent: -26 },
        {
          yPercent: 38,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '[data-features-content]',
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        '[data-features-grid]',
        { yPercent: 8 },
        {
          yPercent: -8,
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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F2F2EE] py-20 sm:py-28">
      <FloatingOrb
        data-features-orb
        size={460}
        duration={10}
        drift={36}
        className="-top-32 right-[-12rem]"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(155,107,255,0.16), rgba(115,66,226,0.03) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      <div data-features-content className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="max-w-[720px]" data-features-heading>
          <span
            className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
            style={{ background: 'rgba(115,66,226,0.12)', color: '#7342E2' }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #7342E2, #9B6BFF)' }} />
            Why sell on TokenSea
          </span>
          <h2
            className="mb-12"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#192837',
            }}
          >
            Idle AI capacity should{' '}
            <GradientText>make you money.</GradientText>
          </h2>
        </div>

        <div data-features-grid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              data-feature-card
              className="group rounded-2xl bg-white p-6 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(25,40,55,0.12)]"
              style={{ boxShadow: '0 8px 32px rgba(25, 40, 55, 0.06)' }}
            >
              <div
                data-feature-icon
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'rgba(115, 66, 226, 0.1)' }}
              >
                <f.icon size={22} color="#7342E2" />
              </div>
              <h3
                className="mb-2 font-semibold"
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}
              >
                {f.title}
              </h3>
              <p
                className="leading-relaxed opacity-70"
                style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

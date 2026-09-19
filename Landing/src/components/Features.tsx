import { useRef } from 'react'
import { Plug, KeyRound, Wallet, ReceiptText } from 'lucide-react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'
import FloatingOrb from './FloatingOrb'
import GradientText from './GradientText'
import Badge from './ui/Badge'
import Card from './ui/Card'

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
    <section ref={sectionRef} className="relative overflow-hidden bg-paper py-20 sm:py-28">
      <FloatingOrb
        data-features-orb
        size={460}
        duration={10}
        drift={36}
        className="-top-32 right-[-12rem]"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(208,170,119,0.18), rgba(208,170,119,0.03) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      <div data-features-content className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="max-w-[720px]" data-features-heading>
          <Badge className="mb-4">Why sell on TokenSea</Badge>
          <h2
            className="mb-12 font-bold text-ink"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Idle AI capacity should{' '}
            <GradientText>make you money.</GradientText>
          </h2>
        </div>

        <div data-features-grid className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Card key={f.title} hover className="group p-6">
              <div data-feature-card>
                <div
                  data-feature-icon
                  className="mb-4 flex h-11 w-11 items-center justify-center border border-black/10 bg-paper-2 transition-transform duration-300 group-hover:scale-110"
                >
                  <f.icon size={22} className="text-ink" />
                </div>
                <h3
                  className="mb-2 font-semibold text-ink"
                  style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)' }}
                >
                  {f.title}
                </h3>
                <p
                  className="leading-relaxed text-ink-2"
                  style={{ fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}
                >
                  {f.body}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

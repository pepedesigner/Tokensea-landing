import { useRef } from 'react'
import { KeyRound, Gauge, Wallet } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import GradientText from './GradientText'
import Badge from './ui/Badge'
import Card from './ui/Card'

const STEPS = [
  {
    icon: KeyRound,
    step: '01',
    title: 'Connect a key',
    body: 'io.run probes it to confirm it works. We never keep a copy of your key.',
  },
  {
    icon: Gauge,
    step: '02',
    title: 'Autopilot pricing',
    body: 'We price your listing to win demand. Set a minimum only if you want one — Autopilot never goes below it.',
  },
  {
    icon: Wallet,
    step: '03',
    title: 'Paid automatically',
    body: 'Earn per request. io.run batches USD to your wallet at $5 or after 72 hours, then you cash out.',
  },
]

const PAYOUTS = [
  'Revolut',
  'Monzo',
  'Chime',
  'Zelle',
  'Venmo',
  'Cash App',
  'Wise',
  'PayPal',
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-how-heading]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-how-heading]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-how-step]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-how-step]',
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-how-payout]', {
        y: 20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-how-payout]',
          start: 'top 92%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-paper py-20 sm:py-28"
    >
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="max-w-[720px]" data-how-heading>
          <Badge className="mb-4">How it works</Badge>
          <h2
            className="mb-4 font-bold text-ink"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            From idle key to income in{' '}
            <GradientText>three steps.</GradientText>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <Card key={s.step} hover className="relative overflow-hidden p-7">
              <div data-how-step>
                <span
                  className="pointer-events-none absolute -top-3 right-3 font-bold tracking-tight text-ink opacity-[0.06]"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  }}
                >
                  {s.step}
                </span>
                <div className="mb-5 flex h-12 w-12 items-center justify-center border border-black/10 bg-paper-2">
                  <s.icon size={24} className="text-ink" />
                </div>
                <h3
                  className="mb-2 font-semibold text-ink"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
                >
                  {s.title}
                </h3>
                <p
                  className="leading-relaxed text-ink-2"
                  style={{ fontSize: 'clamp(0.88rem, 2vw, 0.95rem)' }}
                >
                  {s.body}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div
          data-how-payout
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border border-black/10 bg-white/60 px-6 py-5 backdrop-blur-sm"
        >
          <span className="font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
            Cash out to
          </span>
          {PAYOUTS.map((p) => (
            <span
              key={p}
              className="text-sm font-semibold text-ink-2 transition-colors hover:text-accent-600"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

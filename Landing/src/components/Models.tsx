import { useRef } from 'react'
import { ArrowRight, Gauge, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import FloatingOrb from './FloatingOrb'
import GradientText from './GradientText'
import Badge from './ui/Badge'
import Card from './ui/Card'

const MARKET_ROWS = [
  { model: 'glm-5.3', live: 161, price: '$0.0093 / $0.029', vol: '$578.46' },
  { model: 'claude-opus-5', live: 240, price: '$0.287 / $1.44', vol: '$266.63' },
  { model: 'gpt-5.6-sol', live: 481, price: '$0.020 / $0.100', vol: '$181.65' },
  { model: 'kimi-k3', live: 799, price: '$0.030 / $0.148', vol: '$162.59' },
]

const CHIPS = [
  { label: 'glm-5.3', className: 'top-[16%] right-[8%] border-accent-500/40 text-accent-700' },
  { label: 'claude-opus-5', className: 'top-[30%] left-[6%] border-bronze-400 text-bronze-700' },
  { label: 'gpt-5.6-sol', className: 'right-[12%] bottom-[22%] border-black/15 text-ink' },
  { label: 'kimi-k3', className: 'bottom-[30%] left-[10%] border-accent-500/30 text-accent-700' },
  { label: 'claude-fable-5', className: 'top-[46%] right-[16%] border-black/15 text-ink-2' },
  { label: 'earning USD', className: 'top-[22%] left-[18%] border-accent-500/30 text-accent-700' },
]

export default function Models() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'top top',
          scrub: 0.5,
        },
      })
      intro
        .fromTo(
          '[data-models-card]',
          {
            xPercent: 14,
            scale: 0.94,
            autoAlpha: 0,
            rotate: 1.2,
            transformOrigin: 'center center',
          },
          {
            xPercent: 0,
            scale: 1,
            autoAlpha: 1,
            rotate: 0,
            ease: 'none',
            duration: 1,
          },
        )
        .fromTo(
          '[data-market-row]',
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            ease: 'none',
            stagger: 0.1,
            duration: 0.55,
          },
          '>-0.12',
        )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 1,
        },
      })

      tl.from('[data-model-meta] > *', {
        y: 16,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.08,
      })

      gsap.fromTo(
        '[data-models-orb]',
        { yPercent: -18 },
        {
          yPercent: 30,
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
        '[data-models-orb-2]',
        { yPercent: 20 },
        {
          yPercent: -32,
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
        '[data-models-watermark]',
        { yPercent: -14 },
        {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
      gsap.to('[data-model-chip]', {
        y: -14,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4 },
      })
      gsap.to('[data-model-bubble]', {
        y: -20,
        scale: 1.15,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3 },
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="market"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f3efe7 55%, #ebe5da 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(20,17,14,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(20,17,14,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px 500px at 20% 0%, rgba(255,210,54,0.08), transparent 60%), radial-gradient(1000px 500px at 85% 100%, rgba(201,255,63,0.08), transparent 60%)',
        }}
      />

      <div
        data-models-watermark
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="font-bold tracking-tight text-white/60 select-none"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(6rem, 24vw, 20rem)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          MARKET
        </span>
      </div>

      <FloatingOrb
        data-models-orb
        size={420}
        duration={9}
        drift={30}
        className="top-0 left-[-12rem]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(201,255,63,0.16), rgba(201,255,63,0.02) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
      <FloatingOrb
        data-models-orb-2
        size={360}
        duration={11}
        drift={40}
        className="right-[-10rem] bottom-[-6rem]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(255,210,54,0.18), rgba(255,210,54,0.03) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      {CHIPS.map((c, i) => (
        <div
          key={c.label}
          data-model-chip
          className={`pointer-events-none absolute hidden border bg-white/70 px-4 py-2 font-mono backdrop-blur-sm lg:block ${c.className} ${
            i > 3 ? 'text-xs' : 'text-sm'
          }`}
          style={{ boxShadow: '0 4px 16px rgba(20,17,14,0.08)' }}
        >
          {c.label}
        </div>
      ))}

      <div
        data-model-bubble
        className="pointer-events-none absolute top-[12%] left-[30%] hidden h-3 w-3 bg-accent-500 lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[38%] left-[4%] hidden h-2 w-2 bg-bronze-400 lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[58%] right-[4%] hidden h-2.5 w-2.5 bg-ink lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute right-[24%] bottom-[14%] hidden h-3.5 w-3.5 bg-accent-600 lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute bottom-[16%] left-[24%] hidden h-2 w-2 bg-bronze-500 lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[70%] left-[12%] hidden h-3 w-3 bg-bronze-400 lg:block"
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[24%] right-[30%] hidden h-2.5 w-2.5 bg-accent-500 lg:block"
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <Card className="p-8 sm:p-12">
          <div data-models-card>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Badge className="mb-4">What&apos;s paying</Badge>
                <h2
                  className="max-w-[560px] font-bold text-ink"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Live model demand.{' '}
                  <GradientText>See what buyers are using.</GradientText>
                </h2>
              </div>
              <Link
                to="/pricing"
                className="group inline-flex items-center gap-1.5 font-semibold text-accent-700 transition-colors hover:text-accent-600"
              >
                Explore the market
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-black/10">
                    {['Model', 'Wins at / 1M', '24h volume', 'Est. payout'].map((h) => (
                      <th
                        key={h}
                        className="px-3 py-3 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase first:pl-5"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MARKET_ROWS.map((m) => (
                    <tr
                      key={m.model}
                      data-market-row
                      className="border-b border-black/5 last:border-0"
                    >
                      <td className="px-3 py-3.5 pl-5">
                        <span className="flex items-center gap-2 font-mono font-medium text-ink">
                          {m.model}
                          <span className="inline-flex items-center gap-1 border border-accent-500/30 bg-accent-500/15 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-accent-700 uppercase">
                            <span className="h-1 w-1 bg-accent-600" />
                            {m.live} live
                          </span>
                        </span>
                      </td>
                      <td className="px-3 py-3.5 font-mono text-ink-2">{m.price}</td>
                      <td className="px-3 py-3.5 font-medium text-ink">{m.vol}</td>
                      <td className="px-3 py-3.5">
                        <span className="font-mono text-xs font-bold text-accent-600">
                          USD
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div data-model-meta className="mt-6 flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-2 text-sm text-ink-2">
                <Gauge size={16} className="text-accent-600" />
                Priced to win demand, never below your minimum
              </span>
              <span className="inline-flex items-center gap-2 text-sm text-ink-2">
                <ShieldCheck size={16} className="text-accent-600" />
                Keys encrypted per listing &middot; never kept on file
              </span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

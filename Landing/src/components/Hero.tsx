import { useRef } from 'react'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import Navbar from './Navbar'
import FloatingOrb from './FloatingOrb'
import GradientText from './GradientText'
import Badge from './ui/Badge'
import Button from './ui/Button'

const MARKET_STATS = [
  { label: 'Models listed', value: '396' },
  { label: 'Requests / 24h', value: '1.4M' },
  { label: 'Paid out / 24h', value: '$2,867.24' },
]

const VIDEO_URL = '/BG.mp4'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.8 },
        delay: 0.15,
      })

      tl.from('[data-hero-eyebrow]', {
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
      })
        .from(
          '[data-hero-word]',
          { yPercent: 120, rotate: 4, autoAlpha: 0, stagger: 0.055, duration: 0.9, ease: 'power4.out' },
          '-=0.15',
        )
        .from('[data-hero-sub]', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=0.4')
        .from('[data-hero-baseurl]', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.35')
        .from('[data-hero-cta]', { y: 20, autoAlpha: 0, duration: 0.6 }, '-=0.3')

      gsap.fromTo(
        '.hero-video',
        { scale: 1.35, yPercent: -18, filter: 'blur(0px)' },
        {
          scale: 1.35,
          yPercent: 18,
          filter: 'blur(8px)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      gsap.to('[data-scroll-indicator]', {
        y: 10,
        autoAlpha: 0.4,
        duration: 0.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.to('[data-hero-content]', {
        y: 160,
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '80% top',
          scrub: true,
        },
      })

      gsap.fromTo(
        '[data-hero-orb-1]',
        { yPercent: 24 },
        {
          yPercent: -46,
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
        '[data-hero-orb-2]',
        { yPercent: -18 },
        {
          yPercent: 34,
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

  const words: { text: string; accent?: boolean }[] = [
    { text: 'Sell' },
    { text: 'your' },
    { text: 'spare' },
    { text: 'AI' },
    { text: 'tokens' },
    { text: 'for cash.', accent: true },
  ]

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ filter: 'blur(2px)' }}
      >
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = 2 / 3
          }}
          className="hero-video absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(250,248,244,0.86) 0%, rgba(250,248,244,0.58) 28%, rgba(250,248,244,0.24) 55%, rgba(250,248,244,0.12) 100%)',
        }}
      />

      <FloatingOrb
        data-hero-orb-1
        size={420}
        duration={9}
        drift={40}
        className="-top-20 right-[-8rem]"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(201,255,63,0.22), rgba(201,255,63,0.04) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
      <FloatingOrb
        data-hero-orb-2
        size={340}
        duration={11}
        drift={32}
        className="top-1/2 left-[-10rem]"
        style={{
          background:
            'radial-gradient(circle at 60% 40%, rgba(255,210,54,0.2), rgba(255,210,54,0.03) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      <Navbar />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-8">
        <div
          className="mx-auto max-w-[1280px]"
          style={{ paddingTop: 'clamp(40px, 8vw, 72px)' }}
        >
          <div data-hero-content className="max-w-[620px]">
            <div data-hero-eyebrow className="mb-6">
              <Badge className="bg-white/70 backdrop-blur-sm">AI surplus marketplace</Badge>
            </div>

            <h1
              className="mb-7 font-bold text-ink"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 6vw, 3.75rem)',
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
              }}
            >
              {words.map((w, i) => (
                <span
                  key={i}
                  className="mr-[0.24em] inline-block overflow-hidden align-bottom"
                  style={{ paddingBottom: '0.08em', marginBottom: '-0.08em' }}
                >
                  <span
                    data-hero-word
                    className="inline-block will-change-transform"
                    style={{ display: 'inline-block' }}
                  >
                    {w.accent ? <GradientText>{w.text}</GradientText> : w.text}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-sub
              className="mb-7 max-w-[560px] font-medium text-ink-2"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                lineHeight: 1.65,
                textShadow:
                  '0 1px 2px rgba(250,248,244,0.85), 0 0 12px rgba(250,248,244,0.65)',
              }}
            >
              List unused AI API credits or included capacity on the io.run
              market. Earn USD when buyers use your models, then cash out to
              Revolut, Zelle, PayPal, and more.
            </p>

            <div data-hero-baseurl>
              <div className="flex w-full items-center gap-3 border border-black/10 bg-white/70 px-4 py-3 backdrop-blur-md">
                <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                  <TrendingUp size={14} className="text-accent-600" />
                  Market
                </span>
                <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-3">
                  {MARKET_STATS.map((s) => (
                    <span key={s.label} className="text-xs text-ink-2">
                      <span className="font-semibold text-ink">{s.value}</span>{' '}
                      <span>{s.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div data-hero-cta className="mt-7 flex flex-wrap items-center gap-4">
              <Button to="/account" variant="accent" size="lg">
                Start selling
                <ArrowRight size={20} />
              </Button>
              <Button href="#market" variant="secondary" size="lg">
                See what&apos;s paying
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        data-scroll-indicator
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[11px] font-bold tracking-widest text-ink-3 uppercase">
          Scroll
        </span>
        <div className="flex h-9 w-5 items-start justify-center border border-black/40 p-1">
          <span className="h-2 w-1 bg-accent-500" />
        </div>
      </div>
    </section>
  )
}

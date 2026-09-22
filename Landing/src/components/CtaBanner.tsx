import { useRef } from 'react'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import GradientText from './GradientText'
import Badge from './ui/Badge'
import Button from './ui/Button'

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-cta-banner]', {
        y: 60,
        rotateX: -8,
        autoAlpha: 0,
        transformOrigin: 'center bottom',
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-cta-banner]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      gsap.to('[data-cta-sparkle]', {
        rotate: 360,
        duration: 12,
        ease: 'none',
        repeat: -1,
      })

      gsap.to('[data-cta-glow]', {
        scale: 1.15,
        opacity: 0.9,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        '[data-cta-content]',
        { yPercent: 14 },
        {
          yPercent: -14,
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
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div data-cta-content>
          <div
            data-cta-banner
            className="relative flex flex-col items-start justify-between gap-8 overflow-hidden border border-bronze-200 p-8 sm:p-12 md:flex-row md:items-center"
            style={{
              background: 'linear-gradient(135deg, #faf8f4 0%, #f3efe7 45%, #faf6f0 100%)',
              boxShadow: '0 16px 48px rgba(20, 17, 14, 0.06)',
            }}
          >
            <div
              data-cta-glow
              className="rounded-keep pointer-events-none absolute -top-24 -right-24 h-72 w-72"
              style={{
                background:
                  'radial-gradient(circle, rgba(201,255,63,0.35), rgba(201,255,63,0.06) 60%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />
            <div
              className="rounded-keep pointer-events-none absolute -bottom-28 -left-24 h-72 w-72"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,210,54,0.25), rgba(255,210,54,0.04) 60%, transparent 70%)',
                filter: 'blur(10px)',
              }}
            />

            <div className="relative">
              <Badge dot={false} className="mb-4">
                <Sparkles size={14} className="will-change-transform" data-cta-sparkle />
                Start selling
              </Badge>
              <h2
                className="mb-3 font-bold text-ink"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}
              >
                Turn idle AI capacity into{' '}
                <GradientText>income.</GradientText>
              </h2>
              <p
                className="max-w-[460px] text-ink-2"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.6 }}
              >
                Connect a key in minutes, let Autopilot price your listing, and
                start earning USD the moment buyers use your models.
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-4">
              <Button to="/account" variant="accent" size="lg">
                Start selling
                <ArrowRight size={20} />
              </Button>
              <Button to="/docs" variant="secondary" size="lg">
                <BookOpen size={20} />
                Read the docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

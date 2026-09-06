import { useRef } from 'react'
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import GradientText from './GradientText'

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
    <section ref={sectionRef} className="relative overflow-hidden bg-[#F2F2EE] py-20 sm:py-28">
      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8">
        <div data-cta-content>
          <div
            data-cta-banner
            className="relative flex flex-col items-start justify-between gap-8 overflow-hidden rounded-3xl border border-[rgba(115,66,226,0.15)] p-8 sm:p-12 md:flex-row md:items-center"
            style={{
              background: 'linear-gradient(135deg, #F4EEFF 0%, #EBE2FF 45%, #F6F2FF 100%)',
              boxShadow: '0 16px 48px rgba(115, 66, 226, 0.12)',
            }}
          >
          <div
            data-cta-glow
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(155,107,255,0.3), rgba(115,66,226,0.08) 60%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(42,157,143,0.12), rgba(42,157,143,0.03) 60%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />

          <div className="relative">
            <span
              className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
              style={{ background: 'rgba(255,255,255,0.7)', color: '#7342E2', border: '1px solid rgba(115,66,226,0.2)' }}
            >
              <Sparkles size={14} className="will-change-transform" data-cta-sparkle />
              Start selling
            </span>
            <h2
              className="mb-3"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#192837',
              }}
            >
              Turn idle AI capacity into{' '}
              <GradientText>income.</GradientText>
            </h2>
            <p
              className="max-w-[460px] opacity-75"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.6, color: '#192837' }}
            >
              Connect a key in minutes, let Autopilot price your listing, and
              start earning USD the moment buyers use your models.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="flex items-center justify-center gap-2 font-semibold text-white transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: '#7342E2',
                borderRadius: 50,
                padding: '17px 24px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 4px 24px rgba(115, 66, 226, 0.28)',
              }}
            >
              Start selling
              <ArrowRight size={20} />
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 font-semibold text-[#192837] transition-transform duration-300 hover:scale-105 active:scale-95"
              style={{
                background: '#FFFFFF',
                borderRadius: 50,
                padding: '17px 24px',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                boxShadow: '0 2px 12px rgba(25,40,55,0.06)',
              }}
            >
              <BookOpen size={20} />
              Read the docs
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

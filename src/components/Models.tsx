import { useRef } from 'react'
import { ArrowRight, Gauge, ShieldCheck } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import FloatingOrb from './FloatingOrb'
import GradientText from './GradientText'

export default function Models() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // 入场跟滚动联动:屏进入约 1/3 后才开始播放入场,到顶(pin 开始)时内容已就位。
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

      // pin 后仅做底部 meta 的轻强调
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=60%',
          pin: true,
          scrub: 1,
        },
      })

      tl.from(
        '[data-model-meta] > *',
        {
          y: 16,
          autoAlpha: 0,
          duration: 0.4,
          stagger: 0.08,
        },
      )

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
      gsap.fromTo(
        '[data-models-chip]',
        { yPercent: 22 },
        {
          yPercent: -22,
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
      style={{ background: 'linear-gradient(180deg, #F5F5F1 0%, #EDECE6 55%, #E8E7E1 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(25,40,55,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(25,40,55,0.06) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(1200px 500px at 20% 0%, rgba(155,107,255,0.06), transparent 60%), radial-gradient(1000px 500px at 85% 100%, rgba(42,157,143,0.07), transparent 60%)',
        }}
      />

      <div
        data-models-watermark
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="select-none font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(6rem, 24vw, 20rem)',
            letterSpacing: '-0.04em',
            color: 'rgba(255,255,255,0.6)',
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
          background: 'radial-gradient(circle at 50% 50%, rgba(42,157,143,0.14), rgba(42,157,143,0.02) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />
      <FloatingOrb
        data-models-orb-2
        size={360}
        duration={11}
        drift={40}
        className="bottom-[-6rem] right-[-10rem]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(155,107,255,0.16), rgba(115,66,226,0.03) 60%, transparent 70%)',
          filter: 'blur(6px)',
        }}
      />

      <div
        data-model-chip
        className="pointer-events-none absolute top-[16%] right-[8%] hidden rounded-full border border-[rgba(115,66,226,0.25)] bg-white/70 px-4 py-2 font-mono text-sm text-[#7342E2] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(115,66,226,0.12)' }}
      >
        glm-5.3
      </div>
      <div
        data-model-chip
        className="pointer-events-none absolute top-[30%] left-[6%] hidden rounded-full border border-[rgba(42,157,143,0.25)] bg-white/70 px-4 py-2 font-mono text-sm text-[#1f6f63] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(42,157,143,0.12)' }}
      >
        claude-opus-5
      </div>
      <div
        data-model-chip
        className="pointer-events-none absolute right-[12%] bottom-[22%] hidden rounded-full border border-[rgba(25,40,55,0.18)] bg-white/70 px-4 py-2 font-mono text-sm text-[#192837] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(25,40,55,0.1)' }}
      >
        gpt-5.6-sol
      </div>
      <div
        data-model-chip
        className="pointer-events-none absolute bottom-[30%] left-[10%] hidden rounded-full border border-[rgba(115,66,226,0.2)] bg-white/70 px-4 py-2 font-mono text-xs text-[#7342E2] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(115,66,226,0.1)' }}
      >
        kimi-k3
      </div>
      <div
        data-model-chip
        className="pointer-events-none absolute top-[46%] right-[16%] hidden rounded-full border border-[rgba(115,66,226,0.2)] bg-white/70 px-4 py-2 font-mono text-xs text-[#5a33b8] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(115,66,226,0.1)' }}
      >
        claude-fable-5
      </div>
      <div
        data-model-chip
        className="pointer-events-none absolute top-[22%] left-[18%] hidden rounded-full border border-[rgba(42,157,143,0.2)] bg-white/70 px-4 py-2 font-mono text-xs text-[#1f6f63] backdrop-blur-sm lg:block"
        style={{ boxShadow: '0 4px 16px rgba(42,157,143,0.1)' }}
      >
        earning USD
      </div>

      <div
        data-model-bubble
        className="pointer-events-none absolute top-[12%] left-[30%] hidden h-3 w-3 rounded-full lg:block"
        style={{ background: 'linear-gradient(135deg, #9B6BFF, #7342E2)', boxShadow: '0 2px 8px rgba(115,66,226,0.3)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[38%] left-[4%] hidden h-2 w-2 rounded-full lg:block"
        style={{ background: 'rgba(42,157,143,0.7)', boxShadow: '0 2px 8px rgba(42,157,143,0.25)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[58%] right-[4%] hidden h-2.5 w-2.5 rounded-full lg:block"
        style={{ background: 'linear-gradient(135deg, #9B6BFF, #4DE0C0)', boxShadow: '0 2px 8px rgba(115,66,226,0.25)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute right-[24%] bottom-[14%] hidden h-3.5 w-3.5 rounded-full lg:block"
        style={{ background: 'rgba(115,66,226,0.5)', boxShadow: '0 2px 10px rgba(115,66,226,0.3)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute bottom-[16%] left-[24%] hidden h-2 w-2 rounded-full lg:block"
        style={{ background: 'rgba(155,107,255,0.6)', boxShadow: '0 2px 8px rgba(155,107,255,0.3)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[70%] left-[12%] hidden h-3 w-3 rounded-full lg:block"
        style={{ background: 'rgba(42,157,143,0.5)', boxShadow: '0 2px 8px rgba(42,157,143,0.25)' }}
      />
      <div
        data-model-bubble
        className="pointer-events-none absolute top-[24%] right-[30%] hidden h-2.5 w-2.5 rounded-full lg:block"
        style={{ background: 'linear-gradient(135deg, rgba(155,107,255,0.8), rgba(42,157,143,0.6))', boxShadow: '0 2px 8px rgba(115,66,226,0.2)' }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div
          data-models-card
          className="rounded-3xl p-8 sm:p-12"
          style={{
            background: '#FFFFFF',
            boxShadow: '0 16px 48px rgba(25, 40, 55, 0.1)',
          }}
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span
                className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
                style={{ background: 'rgba(115,66,226,0.12)', color: '#7342E2' }}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #7342E2, #9B6BFF)' }} />
                What's paying
              </span>
              <h2
                className="max-w-[560px]"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#192837',
                }}
              >
                Live model demand.{' '}
                <GradientText>See what buyers are using.</GradientText>
              </h2>
            </div>
            <a
              href="#"
              className="group inline-flex items-center gap-1.5 font-semibold transition-opacity hover:opacity-60"
              style={{ color: '#7342E2' }}
            >
              Explore the market
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[rgba(25,40,55,0.1)]">
                  {['Model', 'Wins at / 1M', '24h volume', 'Est. payout'].map((h) => (
                    <th key={h} className="px-3 py-3 text-xs font-semibold tracking-wide uppercase opacity-50 first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'glm-5.3', live: 161, price: '$0.0093 / $0.029', vol: '$578.46' },
                  { model: 'claude-opus-5', live: 240, price: '$0.287 / $1.44', vol: '$266.63' },
                  { model: 'gpt-5.6-sol', live: 481, price: '$0.020 / $0.100', vol: '$181.65' },
                  { model: 'kimi-k3', live: 799, price: '$0.030 / $0.148', vol: '$162.59' },
                ].map((m) => (
                  <tr key={m.model} data-market-row className="border-b border-[rgba(25,40,55,0.06)] last:border-0">
                    <td className="px-3 py-3.5 pl-5">
                      <span className="flex items-center gap-2 font-mono font-medium text-[#192837]">
                        {m.model}
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(42,157,143,0.12)', color: '#1f6f63' }}>
                          <span className="h-1 w-1 rounded-full" style={{ background: '#2A9D8F' }} />
                          {m.live} live
                        </span>
                      </span>
                    </td>
                    <td className="px-3 py-3.5 opacity-80">{m.price}</td>
                    <td className="px-3 py-3.5 font-medium text-[#192837]">{m.vol}</td>
                    <td className="px-3 py-3.5">
                      <span className="font-mono text-xs font-semibold" style={{ color: '#2A9D8F' }}>USD</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div data-model-meta className="mt-6 flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-2 text-sm opacity-70">
              <Gauge size={16} color="#7342E2" />
              Priced to win demand, never below your minimum
            </span>
            <span className="inline-flex items-center gap-2 text-sm opacity-70">
              <ShieldCheck size={16} color="#7342E2" />
              Keys encrypted per listing &middot; never kept on file
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { CheckCircle2, Lock, ArrowRight, KeyRound } from 'lucide-react'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'

const CHECKS = [
  'Sell unused AI API credits and included capacity',
  'Autopilot pricing with an optional minimum',
  'USD earnings batched to your wallet',
  'Cash out to Revolut, Zelle, PayPal and more',
]

const inputCls =
  'w-full rounded-xl border border-[rgba(25,40,55,0.12)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#7342E2] focus:ring-2 focus:ring-[rgba(115,66,226,0.15)]'

function Field({ label, placeholder, type = 'text' }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold tracking-wide uppercase opacity-50">{label}</span>
      <input type={type} placeholder={placeholder} className={inputCls} />
    </label>
  )
}

export default function Account() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to('[data-account-bg]', {
        backgroundPosition: '100% 50%',
        duration: 14,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.from('[data-account-hero] > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.from('[data-account-check]', {
        x: -24,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from('[data-account-card]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
      })
    },
    { scope: pageRef },
  )

  return (
    <div ref={pageRef} className="relative overflow-hidden py-16 sm:py-24">
      <div
        data-account-bg
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'linear-gradient(115deg, #F4EEFF 0%, #F2F2EE 30%, #E9F5F1 55%, #EBE2FF 80%, #F6F2FF 100%)',
          backgroundSize: '220% 220%',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(800px 400px at 80% 20%, rgba(155,107,255,0.08), transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div data-account-hero className="flex flex-col">
          <PageHeader
            eyebrow="AI surplus marketplace"
            title="Turn spare AI capacity into"
            accent="income."
            description="Create an account, connect a key or provider, and let the market buy your idle capacity while you earn USD."
          />

          <ul className="mb-8 flex flex-col gap-3">
            {CHECKS.map((c) => (
              <li key={c} data-account-check className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 size={18} color="#7342E2" />
                {c}
              </li>
            ))}
          </ul>

          <div
            data-preview-card
            className="hidden rounded-2xl border border-[rgba(25,40,55,0.08)] bg-white/80 backdrop-blur-md lg:mt-auto lg:block"
            style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.04)' }}
          >
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <KeyRound size={14} className="opacity-60" />
                <span className="text-xs font-semibold uppercase tracking-wide opacity-70">Console preview</span>
                <span className="ml-auto text-xs opacity-40">Illustrative data</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                {[
                  { label: 'Earned today', value: '$28.40' },
                  { label: 'Active listings', value: '3' },
                  { label: 'Requests served', value: '18.4k' },
                ].map((s) => (
                  <span key={s.label} className="text-sm opacity-70">
                    <span className="font-semibold text-[#192837]">{s.value}</span>{' '}
                    <span className="opacity-70">{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div data-account-card>
          <div
            className="flex h-full flex-col justify-center rounded-3xl bg-white p-8 sm:p-10"
            style={{ boxShadow: '0 24px 80px rgba(115, 66, 226, 0.14), 0 4px 20px rgba(25,40,55,0.06)' }}
          >
            <div className="mb-6 flex items-center gap-1 rounded-full p-1" style={{ background: '#F2F2EE' }}>
              <button
                onClick={() => setMode('signin')}
                className="flex-1 rounded-full py-2.5 text-sm font-semibold transition"
                style={mode === 'signin' ? { background: '#fff', color: '#192837', boxShadow: '0 2px 8px rgba(25,40,55,0.08)' } : { color: '#192837', opacity: 0.6 }}
              >
                Sign in
              </button>
              <button
                onClick={() => setMode('signup')}
                className="flex-1 rounded-full py-2.5 text-sm font-semibold transition"
                style={mode === 'signup' ? { background: '#fff', color: '#192837', boxShadow: '0 2px 8px rgba(25,40,55,0.08)' } : { color: '#192837', opacity: 0.6 }}
              >
                Create account
              </button>
            </div>

            {mode === 'signin' ? (
              <div className="flex flex-col gap-4">
                <h2 className="mb-1 text-xl font-bold text-[#192837]">Welcome back</h2>
                <p className="mb-2 opacity-60" style={{ fontSize: '0.95rem' }}>Sign in to manage your listings and earnings.</p>
                <Field label="Email" placeholder="you@example.com" type="email" />
                <Field label="Password" placeholder="••••••••" type="password" />
                <div className="flex justify-end">
                  <a href="#" className="text-sm font-medium opacity-60 transition hover:opacity-100 hover:text-[#7342E2]">Forgot password?</a>
                </div>
                <button className="mt-2 flex items-center justify-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '16px 0', boxShadow: '0 4px 24px rgba(115,66,226,0.28)' }}>
                  Sign in
                  <ArrowRight size={20} />
                </button>
                <p className="text-center text-sm opacity-60">
                  Don&rsquo;t have an account?{' '}
                  <button onClick={() => setMode('signup')} className="font-semibold" style={{ color: '#7342E2' }}>Create one</button>
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="mb-1 text-xl font-bold text-[#192837]">Create your TokenSea account</h2>
                <p className="mb-2 opacity-60" style={{ fontSize: '0.95rem' }}>
                  Start selling spare AI capacity and earn USD per request.
                </p>
                <Field label="Display name" placeholder="Ada Lovelace" />
                <Field label="Email" placeholder="you@example.com" type="email" />
                <Field label="Password" placeholder="••••••••" type="password" />
                <Field label="Confirm password" placeholder="••••••••" type="password" />
                <div className="flex items-center gap-3 rounded-xl bg-[#F2F2EE] px-4 py-3 text-sm">
                  <Lock size={16} className="opacity-50" />
                  <span className="opacity-70">Image check and reCAPTCHA verification.</span>
                </div>
                <button className="mt-2 flex items-center justify-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '16px 0', boxShadow: '0 4px 24px rgba(115,66,226,0.28)' }}>
                  Create account
                  <ArrowRight size={20} />
                </button>
                <p className="text-center text-sm opacity-60">
                  Already have an account?{' '}
                  <button onClick={() => setMode('signin')} className="font-semibold" style={{ color: '#7342E2' }}>Sign in</button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

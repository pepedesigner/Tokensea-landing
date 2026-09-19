import { CheckCircle2, Lock, ArrowRight, KeyRound } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Tabs from '../components/ui/Tabs'
import { Field } from '../components/ui/Input'

const CHECKS = [
  'Sell unused AI API credits and included capacity',
  'Autopilot pricing with an optional minimum',
  'USD earnings batched to your wallet',
  'Cash out to Revolut, Zelle, PayPal and more',
]

const MODES = ['Sign in', 'Create account'] as const

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
          background:
            'linear-gradient(115deg, #faf8f4 0%, #f3efe7 30%, #faf6f0 55%, #ebe5da 80%, #faf8f4 100%)',
          backgroundSize: '220% 220%',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(800px 400px at 80% 20%, rgba(201,255,63,0.12), transparent 60%)',
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
              <li
                key={c}
                data-account-check
                className="flex items-center gap-3 text-sm font-medium text-ink"
              >
                <CheckCircle2 size={18} className="text-accent-600" />
                {c}
              </li>
            ))}
          </ul>

          <Card className="hidden bg-white/80 backdrop-blur-md lg:mt-auto lg:block">
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <KeyRound size={14} className="text-ink-3" />
                <span className="font-mono text-[11px] font-bold tracking-wider text-ink-2 uppercase">
                  Console preview
                </span>
                <span className="ml-auto text-xs text-ink-3">Illustrative data</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
                {[
                  { label: 'Earned today', value: '$28.40' },
                  { label: 'Active listings', value: '3' },
                  { label: 'Requests served', value: '18.4k' },
                ].map((s) => (
                  <span key={s.label} className="text-sm text-ink-2">
                    <span className="font-mono font-semibold text-ink">{s.value}</span>{' '}
                    <span>{s.label}</span>
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <div data-account-card>
          <Card className="flex h-full flex-col justify-center p-8 sm:p-10">
            <Tabs
              items={MODES}
              active={mode === 'signin' ? 0 : 1}
              onChange={(i) => setMode(i === 0 ? 'signin' : 'signup')}
              grow
              className="mb-6"
            />

            {mode === 'signin' ? (
              <div className="flex flex-col gap-4">
                <h2 className="mb-1 text-xl font-bold text-ink">Welcome back</h2>
                <p className="mb-2 text-ink-2" style={{ fontSize: '0.95rem' }}>
                  Sign in to manage your listings and earnings.
                </p>
                <Field label="Email" placeholder="you@example.com" type="email" />
                <Field label="Password" placeholder="••••••••" type="password" />
                <div className="flex justify-end">
                  <Link
                    to="/lookup"
                    className="text-sm font-medium text-ink-2 transition-colors hover:text-accent-600"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Button variant="accent" size="lg" className="mt-2">
                  Sign in
                  <ArrowRight size={20} />
                </Button>
                <p className="text-center text-sm text-ink-2">
                  Don&rsquo;t have an account?{' '}
                  <button
                    onClick={() => setMode('signup')}
                    className="font-semibold text-accent-700 hover:text-accent-600"
                  >
                    Create one
                  </button>
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h2 className="mb-1 text-xl font-bold text-ink">Create your TokenSea account</h2>
                <p className="mb-2 text-ink-2" style={{ fontSize: '0.95rem' }}>
                  Start selling spare AI capacity and earn USD per request.
                </p>
                <Field label="Display name" placeholder="Ada Lovelace" />
                <Field label="Email" placeholder="you@example.com" type="email" />
                <Field label="Password" placeholder="••••••••" type="password" />
                <Field label="Confirm password" placeholder="••••••••" type="password" />
                <div className="flex items-center gap-3 border border-black/10 bg-paper-2 px-4 py-3 text-sm">
                  <Lock size={16} className="text-ink-3" />
                  <span className="text-ink-2">Image check and reCAPTCHA verification.</span>
                </div>
                <Button variant="accent" size="lg" className="mt-2">
                  Create account
                  <ArrowRight size={20} />
                </Button>
                <p className="text-center text-sm text-ink-2">
                  Already have an account?{' '}
                  <button
                    onClick={() => setMode('signin')}
                    className="font-semibold text-accent-700 hover:text-accent-600"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

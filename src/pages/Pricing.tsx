import { useRef } from 'react'
import { ArrowRight, CheckCircle2, Wallet, Percent, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import GradientText from '../components/GradientText'

const MARKET_ROWS = [
  {
    model: 'glm-5.3',
    live: 161,
    price: '$0.0093',
    up: '$0.029',
    volume: '$578.46',
  },
  {
    model: 'claude-opus-5',
    live: 240,
    price: '$0.287',
    up: '$1.44',
    volume: '$266.63',
  },
  {
    model: 'gpt-5.6-sol',
    live: 481,
    price: '$0.020',
    up: '$0.100',
    volume: '$181.65',
  },
  {
    model: 'kimi-k3',
    live: 799,
    price: '$0.030',
    up: '$0.148',
    volume: '$162.59',
  },
  {
    model: 'claude-fable-5',
    live: 133,
    price: '$2.30',
    up: '$11.50',
    volume: '$154.04',
  },
  {
    model: 'gpt-6-astra',
    live: 77,
    price: '$0.200',
    up: '$0.998',
    volume: '$136.21',
  },
]

const FAQS = [
  { q: 'Do I need a monthly subscription?', a: 'No. TokenSea is a marketplace. You list spare capacity and earn per request — there is nothing to subscribe to.' },
  { q: 'Who sets the price for my model?', a: 'Autopilot prices your listing to win demand. You can set an optional minimum it will never go below.' },
  { q: 'When do I get paid?', a: 'TokenSea batches USD to your wallet at $5 of earnings or after 72 hours, whichever comes first.' },
  { q: 'What fees do sellers pay?', a: 'Listing and selling are free. When you send money out, the send costs 0.5% of the amount; the recipient gets the rest.' },
  { q: 'What can I sell?', a: 'Unused AI API credits, prepaid balances, or included capacity from provider plans. TokenSea probes a key before it goes live.' },
  { q: 'Where does my key go?', a: 'TokenSea holds it encrypted per listing for as long as the listing is live. We never keep a copy on file.' },
]

const PAYOUTS = ['Revolut', 'Monzo', 'Chime', 'Zelle', 'Venmo', 'Cash App', 'Wise', 'PayPal']

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition'
const btnPrimary = {
  background: '#7342E2',
  color: '#fff',
  boxShadow: '0 4px 24px rgba(115, 66, 226, 0.28)',
}
const btnSecondary = { background: '#F2F2EE', color: '#192837' }
const pad = { padding: '15px 24px' }

export default function Pricing() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-pricing-hero] > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.from('[data-pricing-table]', {
        y: 32,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.2,
      })
      gsap.from('[data-pricing-card]', {
        y: 40,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-pricing-card]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-pricing-cta]', {
        y: 48,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-pricing-cta]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-faq-heading]', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-faq-heading]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-faq-item]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-faq-grid]',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: pageRef },
  )

  return (
    <div ref={pageRef} className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div data-pricing-hero>
          <PageHeader
            eyebrow="What's paying"
            title="See the market before you"
            accent="list."
            description="Live demand on the TokenSea market over the last 24 hours. Prices show the range at which listings won requests. Your Autopilot prices your listing to win too — with no TokenSea fees on the way in."
          />
        </div>

        <div
          data-pricing-table
          className="mt-12 overflow-x-auto rounded-2xl bg-white"
          style={{ boxShadow: '0 8px 32px rgba(25, 40, 55, 0.06)' }}
        >
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[rgba(25,40,55,0.1)]">
                {['Model', 'Live listings', 'Wins at / 1M (low)', 'Wins at / 1M (high)', '24h volume'].map((h) => (
                  <th key={h} className="px-5 py-4 text-xs font-semibold tracking-wide uppercase opacity-50">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MARKET_ROWS.map((row) => (
                <tr key={row.model} className="border-b border-[rgba(25,40,55,0.06)] last:border-0">
                  <td className="px-5 py-4 font-mono font-semibold text-[#192837]">{row.model}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold" style={{ background: 'rgba(42,157,143,0.12)', color: '#1f6f63' }}>
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: '#2A9D8F' }} />
                      {row.live} live
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium">{row.price}</td>
                  <td className="px-5 py-4 font-medium">{row.up}</td>
                  <td className="px-5 py-4 font-semibold text-[#192837]">{row.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-[rgba(25,40,55,0.08)] px-5 py-4 text-xs opacity-60">
            Illustrative 24h snapshot. Actual demand and winning prices change as buyers route requests.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            {
              icon: Percent,
              title: 'Free to list, free to sell.',
              body: 'TokenSea takes no fee when buyers use your models or when earnings batch to your wallet. You keep the market rate your capacity wins.',
            },
            {
              icon: Zap,
              title: 'Sending out costs 0.5%.',
              body: 'When you cash out, the send costs 0.5% of the amount you enter. The recipient receives the rest — no TokenSea custody in between.',
            },
          ].map((c) => (
            <div
              key={c.title}
              data-pricing-card
              className="rounded-2xl bg-white p-8"
              style={{ boxShadow: '0 8px 32px rgba(25, 40, 55, 0.06)' }}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(115,66,226,0.1)]">
                <c.icon size={22} color="#7342E2" />
              </div>
              <h2
                className="mb-2 font-semibold"
                style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)' }}
              >
                {c.title}
              </h2>
              <p className="leading-relaxed opacity-70" style={{ fontSize: 'clamp(0.9rem, 2vw, 0.98rem)' }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div
          data-payouts
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-[rgba(25,40,55,0.08)] bg-white/70 px-6 py-5"
        >
          <span className="flex items-center gap-2 text-xs font-semibold tracking-wide uppercase opacity-50">
            <Wallet size={14} color="#7342E2" />
            Cash out to
          </span>
          {PAYOUTS.map((p) => (
            <span key={p} className="text-sm font-semibold opacity-70" style={{ color: '#192837' }}>
              {p}
            </span>
          ))}
        </div>

        <div
          data-pricing-cta
          className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#192837] p-8 sm:p-10 md:flex-row md:items-center"
          style={{ boxShadow: '0 16px 48px rgba(25, 40, 55, 0.2)' }}
        >
          <div>
            <h2
              className="mb-2"
              style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#fff' }}
            >
              Ready to start earning?
            </h2>
            <p className="max-w-[440px] opacity-80" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.6 }}>
              Connect a key, let Autopilot price your capacity, and get paid in
              USD the moment buyers use your models.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/account" className={btnBase} style={{ ...btnPrimary, ...pad }}>
              Start selling
              <ArrowRight size={20} />
            </Link>
            <Link to="/docs" className={btnBase} style={{ ...btnSecondary, ...pad }}>
              Read the seller guide
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2
            data-faq-heading
            className="mb-10"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', letterSpacing: '-0.02em', color: '#192837' }}
          >
            Seller questions,{' '}
            <GradientText>answered.</GradientText>
          </h2>

          <div data-faq-grid className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} data-faq-item className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0" color="#7342E2" />
                <div>
                  <h3 className="font-semibold text-[#192837]">{f.q}</h3>
                  <p className="mt-1 opacity-70" style={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {f.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

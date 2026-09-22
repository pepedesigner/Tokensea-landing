import { useRef } from 'react'
import { ArrowRight, CheckCircle2, Wallet, Percent, Zap } from 'lucide-react'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import GradientText from '../components/GradientText'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const MARKET_ROWS = [
  { model: 'glm-5.3', live: 161, price: '$0.0093', up: '$0.029', volume: '$578.46' },
  { model: 'claude-opus-5', live: 240, price: '$0.287', up: '$1.44', volume: '$266.63' },
  { model: 'gpt-5.6-sol', live: 481, price: '$0.020', up: '$0.100', volume: '$181.65' },
  { model: 'kimi-k3', live: 799, price: '$0.030', up: '$0.148', volume: '$162.59' },
  { model: 'claude-fable-5', live: 133, price: '$2.30', up: '$11.50', volume: '$154.04' },
  { model: 'gpt-6-astra', live: 77, price: '$0.200', up: '$0.998', volume: '$136.21' },
]

const FAQS = [
  { q: 'Do I need a monthly subscription?', a: 'No. io.run is a marketplace. You list spare capacity and earn per request — there is nothing to subscribe to.' },
  { q: 'Who sets the price for my model?', a: 'Autopilot prices your listing to win demand. You can set an optional minimum it will never go below.' },
  { q: 'When do I get paid?', a: 'io.run batches USD to your wallet at $5 of earnings or after 72 hours, whichever comes first.' },
  { q: 'What fees do sellers pay?', a: 'Listing and selling are free. When you send money out, the send costs 0.5% of the amount; the recipient gets the rest.' },
  { q: 'What can I sell?', a: 'Unused AI API credits, prepaid balances, or included capacity from provider plans. io.run probes a key before it goes live.' },
  { q: 'Where does my key go?', a: 'io.run holds it encrypted per listing for as long as the listing is live. We never keep a copy on file.' },
]

const PAYOUTS = ['Revolut', 'Monzo', 'Chime', 'Zelle', 'Venmo', 'Cash App', 'Wise', 'PayPal']

const FEE_CARDS = [
  {
    icon: Percent,
    title: 'Free to list, free to sell.',
    body: 'io.run takes no fee when buyers use your models or when earnings batch to your wallet. You keep the market rate your capacity wins.',
  },
  {
    icon: Zap,
    title: 'Sending out costs 0.5%.',
    body: 'When you cash out, the send costs 0.5% of the amount you enter. The recipient receives the rest — no io.run custody in between.',
  },
]

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
            description="Live demand on the io.run market over the last 24 hours. Prices show the range at which listings won requests. Your Autopilot prices your listing to win too — with no io.run fees on the way in."
          />
        </div>

        <div data-pricing-table className="mt-12">
          <Card className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-black/10">
                  {['Model', 'Live listings', 'Wins at / 1M (low)', 'Wins at / 1M (high)', '24h volume'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MARKET_ROWS.map((row) => (
                  <tr key={row.model} className="border-b border-black/5 last:border-0">
                    <td className="px-5 py-4 font-mono font-semibold text-ink">{row.model}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 border border-accent-500/30 bg-accent-500/15 px-2.5 py-1 font-mono text-[11px] font-bold tracking-wider text-accent-700 uppercase">
                        <span className="h-1.5 w-1.5 bg-accent-600" />
                        {row.live} live
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono font-medium text-ink-2">{row.price}</td>
                    <td className="px-5 py-4 font-mono font-medium text-ink-2">{row.up}</td>
                    <td className="px-5 py-4 font-semibold text-ink">{row.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-black/10 px-5 py-4 text-xs text-ink-3">
              Illustrative 24h snapshot. Actual demand and winning prices change as buyers route requests.
            </p>
          </Card>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2">
          {FEE_CARDS.map((c) => (
            <Card key={c.title} hover className="p-8">
              <div data-pricing-card>
                <div className="mb-4 flex h-11 w-11 items-center justify-center border border-black/10 bg-paper-2">
                  <c.icon size={22} className="text-ink" />
                </div>
                <h2
                  className="mb-2 font-semibold text-ink"
                  style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)' }}
                >
                  {c.title}
                </h2>
                <p
                  className="leading-relaxed text-ink-2"
                  style={{ fontSize: 'clamp(0.9rem, 2vw, 0.98rem)' }}
                >
                  {c.body}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border border-black/10 bg-white/60 px-6 py-5">
          <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
            <Wallet size={14} className="text-accent-600" />
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

        <div
          data-pricing-cta
          className="mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:p-10 md:flex-row md:items-center"
          style={{
            background: 'linear-gradient(135deg, #2a231c 0%, #14110e 100%)',
            boxShadow: '0 16px 48px rgba(20, 17, 14, 0.2)',
          }}
        >
          <div>
            <h2
              className="mb-2 font-bold text-white"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.4rem, 4vw, 2rem)',
              }}
            >
              Ready to start earning?
            </h2>
            <p
              className="max-w-[440px] text-white/70"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.6 }}
            >
              Connect a key, let Autopilot price your capacity, and get paid in
              USD the moment buyers use your models.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button to="/account" variant="accent" size="lg">
              Start selling
              <ArrowRight size={20} />
            </Button>
            <Button to="/docs" variant="secondary" size="lg">
              Read the seller guide
            </Button>
          </div>
        </div>

        <div className="mt-20">
          <h2
            data-faq-heading
            className="mb-10 font-bold text-ink"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Seller questions,{' '}
            <GradientText>answered.</GradientText>
          </h2>

          <div data-faq-grid className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {FAQS.map((f) => (
              <div key={f.q} data-faq-item className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-accent-600" />
                <div>
                  <h3 className="font-semibold text-ink">{f.q}</h3>
                  <p
                    className="mt-1 text-ink-2"
                    style={{ fontSize: '0.95rem', lineHeight: 1.6 }}
                  >
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

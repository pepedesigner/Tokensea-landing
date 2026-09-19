import { ArrowRight, KeyRound, Gauge, Wallet, HelpCircle } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const STEPS = [
  {
    step: 'Step 1. Connect a key',
    body: 'Create an account on TokenSea with any email, then connect an AI API key or a provider account that has unused credits or included capacity. TokenSea probes it to confirm it works — we never keep a copy.',
  },
  {
    step: 'Step 2. Autopilot prices it',
    body: 'Your capacity is listed on the market and priced to win demand. Set a minimum only if you want one; Autopilot never goes below it, but it may price higher when the market allows.',
  },
  {
    step: 'Step 3. Get paid per request',
    body: 'When a buyer uses your model, you earn in USD. TokenSea batches earnings to your wallet at $5 or after 72 hours, then you cash out to the payment account you choose.',
  },
]

const FAQS = [
  { q: 'Who holds my key?', a: 'TokenSea holds it, encrypted per listing, and only for as long as your listing is live. We never keep a copy on file.' },
  { q: 'Where does the money go?', a: 'TokenSea batches earnings to your wallet at $5 or after 72 hours. We never take custody of your funds.' },
  { q: 'What does it cost?', a: 'Selling and cashing out have no TokenSea fees. Sending money out costs 0.5% of the amount you enter; the recipient receives the rest.' },
  { q: 'Which payouts are supported?', a: 'Revolut, Monzo, Chime and Zelle pay out immediately. Venmo, Cash App, Wise and PayPal pay out after a one-time Verify on desktop Chrome.' },
  { q: 'Can I set a minimum price?', a: 'Yes, it is optional. Autopilot may price higher when the market permits, but never lower than your minimum.' },
  { q: 'Selling prepaid balance?', a: 'Prepaid API credits and included subscription capacity can both be listed. Check the current market to see what is paying before you list.' },
]

const SECTION_IDS = ['Quick start', 'Pricing & fees', 'Payouts', 'FAQ']

const SECTION_HEADING: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
  letterSpacing: '-0.02em',
}

export default function Docs() {
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-docs-hero] > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.from('[data-docs-step]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-docs-step]',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
      gsap.from('[data-docs-faq]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-docs-faq]',
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: pageRef },
  )

  return (
    <div ref={pageRef} className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div data-docs-hero>
          <PageHeader
            eyebrow="Seller guide"
            title="Sell your spare AI capacity"
            accent="in minutes."
            description="TokenSea connects unused AI API credits and included capacity with buyers who want them. Here is how listing, pricing, and payouts work."
          >
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button to="/account" variant="accent" size="lg">
                Start selling
                <ArrowRight size={20} />
              </Button>
              <Button href="#faq" variant="secondary" size="lg">
                Browse the FAQ
              </Button>
            </div>
          </PageHeader>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <nav className="hidden lg:block">
              <span className="mb-3 block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                Guide
              </span>
              <ul className="space-y-1">
                {SECTION_IDS.map((s) => (
                  <li key={s}>
                    <a
                      href={`#${s.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                      className="block px-3 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-paper-2 hover:text-accent-600"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Card className="mt-8 hidden p-5 lg:block">
              <span className="mb-2 flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                <HelpCircle size={13} /> Need help?
              </span>
              <p className="text-sm leading-relaxed text-ink-2">
                Sellers get support at hello@tokensea.world.
              </p>
            </Card>
          </aside>

          <div className="flex flex-col gap-14">
            <section id="quick-start">
              <h2 className="mb-6 flex items-center gap-2 font-bold text-ink" style={SECTION_HEADING}>
                <KeyRound size={22} className="text-accent-600" />
                Quick start
              </h2>
              <p className="mb-6 text-ink-2" style={{ lineHeight: 1.65 }}>
                Listing spare AI capacity takes about three steps. You never send
                money in — you earn it.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {STEPS.map((s) => (
                  <Card key={s.step} hover className="p-5">
                    <div data-docs-step>
                      <span className="font-mono text-sm font-bold text-accent-700">{s.step}</span>
                      <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.body}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            <section id="pricing-fees">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-ink" style={SECTION_HEADING}>
                <Gauge size={22} className="text-accent-600" />
                Pricing &amp; fees
              </h2>
              <p className="mb-4 text-ink-2" style={{ lineHeight: 1.65 }}>
                You choose how much control you want over price. Autopilot handles
                the rest so your capacity actually gets bought.
              </p>
              <Card className="mb-3 p-5">
                <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                  Selling
                </span>
                <p className="mt-1 text-sm text-ink-2">
                  No TokenSea fees to list or sell. You keep what the market pays for your model.
                </p>
              </Card>
              <Card className="p-5">
                <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                  Sending money out
                </span>
                <p className="mt-1 text-sm text-ink-2">
                  0.5% of the amount you send. The recipient receives everything else.
                </p>
              </Card>
            </section>

            <section id="payouts">
              <h2 className="mb-4 flex items-center gap-2 font-bold text-ink" style={SECTION_HEADING}>
                <Wallet size={22} className="text-accent-600" />
                Payouts
              </h2>
              <p className="mb-4 text-ink-2" style={{ lineHeight: 1.65 }}>
                Earnings land in your wallet as USD — batched at $5 or after 72
                hours — then you cash out to a supported account.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card className="p-5">
                  <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                    Instant
                  </span>
                  <p className="mt-1 text-sm text-ink-2">Revolut, Monzo, Chime, Zelle</p>
                </Card>
                <Card className="p-5">
                  <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                    After one-time Verify
                  </span>
                  <p className="mt-1 text-sm text-ink-2">Venmo, Cash App, Wise, PayPal (desktop Chrome)</p>
                </Card>
              </div>
            </section>

            <section id="faq">
              <h2 className="mb-6 font-bold text-ink" style={SECTION_HEADING}>
                FAQ
              </h2>
              <div className="flex flex-col gap-4">
                {FAQS.map((f) => (
                  <Card key={f.q} hover className="p-5">
                    <div data-docs-faq>
                      <h3 className="font-semibold text-ink">{f.q}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-2">{f.a}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

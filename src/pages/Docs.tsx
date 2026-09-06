import { ArrowRight, KeyRound, Gauge, Wallet, HelpCircle } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'

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
              <Link to="/account" className="inline-flex items-center gap-2 rounded-full font-semibold text-white"
                style={{ background: '#7342E2', padding: '15px 24px', boxShadow: '0 4px 24px rgba(115,66,226,0.28)' }}>
                Start selling
                <ArrowRight size={20} />
              </Link>
              <a href="#faq" className="inline-flex items-center gap-2 rounded-full font-semibold text-[#192837]"
                style={{ background: '#F2F2EE', padding: '15px 24px' }}>
                Browse the FAQ
              </a>
            </div>
          </PageHeader>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-8 lg:self-start">
            <nav className="hidden lg:block">
              <span className="mb-3 block text-xs font-semibold tracking-wide uppercase opacity-50">Guide</span>
              <ul className="space-y-1">
                {SECTION_IDS.map((s) => (
                  <li key={s}>
                    <a href={`#${s.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                      className="block rounded-lg px-3 py-2 text-sm font-medium opacity-80 transition hover:bg-[rgba(115,66,226,0.08)] hover:opacity-100 hover:text-[#7342E2]">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 hidden rounded-2xl bg-white p-5 lg:block" style={{ boxShadow: '0 8px 32px rgba(25,40,55,0.06)' }}>
              <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide opacity-50">
                <HelpCircle size={13} /> Need help?
              </span>
              <p className="text-sm leading-relaxed opacity-75">
                Sellers get support at hello@tokensea.world.
              </p>
            </div>
          </aside>

          <div className="flex flex-col gap-14">
            <section id="quick-start">
              <h2 className="mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
                <KeyRound size={22} color="#7342E2" />
                Quick start
              </h2>
              <p className="mb-6 opacity-80" style={{ lineHeight: 1.65 }}>
                Listing spare AI capacity takes about three steps. You never send
                money in — you earn it.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {STEPS.map((s) => (
                  <div key={s.step} data-docs-step className="rounded-xl bg-white p-5"
                    style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                    <span className="text-sm font-semibold" style={{ color: '#7342E2' }}>{s.step}</span>
                    <p className="mt-2 text-sm leading-relaxed opacity-75">{s.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="pricing-fees">
              <h2 className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
                <Gauge size={22} color="#7342E2" />
                Pricing &amp; fees
              </h2>
              <p className="mb-4 opacity-80" style={{ lineHeight: 1.65 }}>
                You choose how much control you want over price. Autopilot handles
                the rest so your capacity actually gets bought.
              </p>
              <div className="mb-3 rounded-xl bg-white p-5" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">Selling</span>
                <p className="mt-1 text-sm opacity-80">No TokenSea fees to list or sell. You keep what the market pays for your model.</p>
              </div>
              <div className="rounded-xl bg-white p-5" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">Sending money out</span>
                <p className="mt-1 text-sm opacity-80">0.5% of the amount you send. The recipient receives everything else.</p>
              </div>
            </section>

            <section id="payouts">
              <h2 className="mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
                <Wallet size={22} color="#7342E2" />
                Payouts
              </h2>
              <p className="mb-4 opacity-80" style={{ lineHeight: 1.65 }}>
                Earnings land in your wallet as USD — batched at $5 or after 72
                hours — then you cash out to a supported account.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-5" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">Instant</span>
                  <p className="mt-1 text-sm opacity-80">Revolut, Monzo, Chime, Zelle</p>
                </div>
                <div className="rounded-xl bg-white p-5" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">After one-time Verify</span>
                  <p className="mt-1 text-sm opacity-80">Venmo, Cash App, Wise, PayPal (desktop Chrome)</p>
                </div>
              </div>
            </section>

            <section id="faq">
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
                FAQ
              </h2>
              <div className="flex flex-col gap-4">
                {FAQS.map((f) => (
                  <div key={f.q} data-docs-faq className="rounded-xl bg-white p-5" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                    <h3 className="font-semibold">{f.q}</h3>
                    <p className="mt-1 text-sm leading-relaxed opacity-75">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Search, CheckCircle2, HelpCircle, Wallet, KeyRound, ShieldCheck, Mail } from 'lucide-react'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'

const FAQS = [
  { q: 'How do I list my spare AI capacity?', a: 'Go to Dashboard → My listings, connect an AI API key or provider account, and TokenSea probes it before Autopilot prices your listing live.' },
  { q: 'When does USD batch to my wallet?', a: 'Earnings batch at $5 of accrued earnings or after 72 hours, whichever comes first.' },
  { q: 'Is my key safe?', a: 'Yes. Keys are encrypted per listing and only used to serve requests on your listing. We never keep a copy on file.' },
  { q: 'How do I cash out?', a: 'Connect a payout account in Dashboard → Withdraw. Revolut, Monzo, Chime and Zelle pay immediately; Venmo, Cash App, Wise and PayPal pay after a one-time Verify on desktop Chrome.' },
]

const WHY = [
  { icon: Wallet, text: 'Earnings settled as USD, never held in custody' },
  { icon: ShieldCheck, text: 'Encrypted listings and keys' },
  { icon: KeyRound, text: 'Seller support at hello@tokensea.world' },
]

export default function Lookup() {
  const [query, setQuery] = useState('')
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-lookup-hero] > *', {
        y: 28,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })
      gsap.from('[data-lookup-item]', {
        y: 32,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-lookup-item]',
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
        <div data-lookup-hero className="mx-auto max-w-[560px] text-center">
          <PageHeader
            align="center"
            eyebrow="Seller support"
            title="Look Up a Batch or"
            accent="Payout"
            description="Enter a payout or batch reference to check the status of your TokenSea earnings."
          />

          <div className="flex items-center gap-2 rounded-full bg-white p-2 pl-5" style={{ boxShadow: '0 8px 32px rgba(25,40,55,0.08)' }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Payout reference or wallet"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button className="inline-flex shrink-0 items-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '13px 22px', boxShadow: '0 4px 24px rgba(115,66,226,0.28)' }}>
              <Search size={18} />
              Search
            </button>
          </div>

          <p className="mt-4 text-xs opacity-50">References look like TS-BATCH-XXXXXXXX.</p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
              <HelpCircle size={22} color="#7342E2" />
              Seller FAQ
            </h2>
            <div className="flex flex-col gap-4">
              {FAQS.map((f) => (
                <div key={f.q} data-lookup-item className="rounded-2xl bg-white p-6" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                  <h3 className="font-semibold text-[#192837]">{f.q}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed opacity-75">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', color: '#192837' }}>
              Why sell on TokenSea?
            </h2>
            <div className="flex flex-col gap-4">
              {WHY.map((w) => (
                <div key={w.text} data-lookup-item className="flex items-center gap-4 rounded-2xl bg-white p-6" style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(115,66,226,0.1)]">
                    <w.icon size={22} color="#7342E2" />
                  </div>
                  <span className="flex items-center gap-2 font-semibold text-[#192837]">
                    <CheckCircle2 size={18} color="#7342E2" />
                    {w.text}
                  </span>
                </div>
              ))}
              <a
                href="mailto:hello@tokensea.world"
                data-lookup-item
                className="flex items-center gap-4 rounded-2xl bg-white p-6 transition hover:shadow-[0_16px_40px_rgba(25,40,55,0.1)]"
                style={{ boxShadow: '0 4px 20px rgba(25,40,55,0.05)' }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[rgba(115,66,226,0.1)]">
                  <Mail size={22} color="#7342E2" />
                </div>
                <span className="flex items-center gap-2 font-semibold text-[#192837]">
                  hello@tokensea.world
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

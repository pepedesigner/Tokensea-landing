import { Search, CheckCircle2, HelpCircle, Wallet, KeyRound, ShieldCheck, Mail } from 'lucide-react'
import { useRef, useState, type CSSProperties } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const FAQS = [
  { q: 'How do I list my spare AI capacity?', a: 'Go to Dashboard → My listings, connect an AI API key or provider account, and io.run probes it before Autopilot prices your listing live.' },
  { q: 'When does USD batch to my wallet?', a: 'Earnings batch at $5 of accrued earnings or after 72 hours, whichever comes first.' },
  { q: 'Is my key safe?', a: 'Yes. Keys are encrypted per listing and only used to serve requests on your listing. We never keep a copy on file.' },
  { q: 'How do I cash out?', a: 'Connect a payout account in Dashboard → Withdraw. Revolut, Monzo, Chime and Zelle pay immediately; Venmo, Cash App, Wise and PayPal pay after a one-time Verify on desktop Chrome.' },
]

const WHY = [
  { icon: Wallet, text: 'Earnings settled as USD, never held in custody' },
  { icon: ShieldCheck, text: 'Encrypted listings and keys' },
  { icon: KeyRound, text: 'Seller support at hello@io.run' },
]

const SECTION_HEADING: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'clamp(1.3rem, 3vw, 1.75rem)',
  letterSpacing: '-0.02em',
}

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
            description="Enter a payout or batch reference to check the status of your io.run earnings."
          />

          <div className="flex items-center gap-2 border border-black/10 bg-white p-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Payout reference or wallet"
              className="w-full bg-transparent px-3 text-sm text-ink placeholder:text-ink-3/60 focus:outline-none"
            />
            <Button variant="accent" size="md" className="shrink-0">
              <Search size={18} />
              Search
            </Button>
          </div>

          <p className="mt-4 font-mono text-[11px] tracking-wider text-ink-3 uppercase">
            References look like IO-BATCH-XXXXXXXX.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 flex items-center gap-2 font-bold text-ink" style={SECTION_HEADING}>
              <HelpCircle size={22} className="text-accent-600" />
              Seller FAQ
            </h2>
            <div className="flex flex-col gap-4">
              {FAQS.map((f) => (
                <Card key={f.q} hover className="p-6">
                  <div data-lookup-item>
                    <h3 className="font-semibold text-ink">{f.q}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{f.a}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-6 font-bold text-ink" style={SECTION_HEADING}>
              Why sell on io.run?
            </h2>
            <div className="flex flex-col gap-4">
              {WHY.map((w) => (
                <Card key={w.text} hover className="p-6">
                  <div data-lookup-item className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/10 bg-paper-2">
                      <w.icon size={22} className="text-ink" />
                    </div>
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      <CheckCircle2 size={18} className="text-accent-600" />
                      {w.text}
                    </span>
                  </div>
                </Card>
              ))}
              <a
                href="mailto:hello@io.run"
                className="block"
              >
                <Card hover className="p-6">
                  <div data-lookup-item className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-black/10 bg-paper-2">
                      <Mail size={22} className="text-ink" />
                    </div>
                    <span className="flex items-center gap-2 font-semibold text-ink">
                      hello@io.run
                    </span>
                  </div>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

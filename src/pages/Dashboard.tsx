import { Copy, Check, Plus, ArrowUpRight, Wallet, TrendingUp, Activity, KeyRound, ExternalLink, ListPlus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'

const SUBTABS = ['Overview', 'My listings', 'Earnings', 'Withdraw', 'Payout methods', 'Support']

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl bg-white p-6 ${className}`} style={{ boxShadow: '0 8px 32px rgba(25,40,55,0.06)' }}>{children}</div>
}

function Summary({ label, value, icon: Icon, tint }: { label: string; value: string; icon: React.ElementType; tint: string }) {
  return (
    <Card className="flex items-start justify-between">
      <div>
        <span className="block text-xs font-semibold tracking-wide uppercase opacity-50">{label}</span>
        <span className="mt-2 block text-2xl font-bold text-[#192837]">{value}</span>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: tint }}>
        <Icon size={20} color="#7342E2" />
      </div>
    </Card>
  )
}

function WithdrawRow({ label, value, note }: { label: string; value: string; note: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#F2F2EE] p-4">
      <div className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">{label}</span>
        <code className="mt-1 block truncate font-mono text-sm font-medium" style={{ color: '#7342E2' }}>{value}</code>
        <span className="mt-0.5 block text-xs opacity-60">{note}</span>
      </div>
      <button onClick={copy} aria-label={`Copy ${label}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#192837] transition hover:text-[#7342E2]">
        {copied ? <Check size={16} color="#7342E2" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

export default function Dashboard() {
  const [tab, setTab] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-dash-header]', {
        y: 24,
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.from('[data-dash-tabs] > *', {
        y: 16,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.1,
      })
    },
    { scope: pageRef },
  )

  useEffect(() => {
    const panel = pageRef.current?.querySelector('[data-dash-panel]')
    if (panel) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      )
    }
  }, [tab])

  return (
    <div ref={pageRef} className="py-12 sm:py-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div data-dash-header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <PageHeader
            eyebrow="Seller console"
            title="Seller"
            accent="Console"
            description="Track your listings, USD earnings, and payout status."
          />
          <div className="flex items-center gap-2">
            <Link to="/docs" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-[#192837]" style={{ background: '#F2F2EE' }}>
              Seller guide
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div data-dash-tabs className="mb-6 flex flex-wrap gap-2">
          {SUBTABS.map((s, i) => (
            <button key={s} onClick={() => setTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${i === tab ? 'text-white' : 'text-[#192837] opacity-70 hover:opacity-100'}`}
              style={i === tab ? { background: '#7342E2' } : { background: 'transparent' }}>
              {s}
            </button>
          ))}
        </div>

        {tab === 0 && (
          <div key="overview" data-dash-panel className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Summary label="Available to withdraw" value="$0.00" icon={Wallet} tint="rgba(115,66,226,0.1)" />
              <Summary label="Pending batch" value="$0.00" icon={TrendingUp} tint="rgba(115,66,226,0.1)" />
              <Summary label="Earned this month" value="$0.00" icon={Activity} tint="rgba(115,66,226,0.1)" />
              <Summary label="Active listings" value="0" icon={ListPlus} tint="rgba(115,66,226,0.1)" />
            </div>

            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#192837]">Create your first listing</h2>
                <Link to="/docs" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#7342E2' }}>How it works <ArrowUpRight size={16} /></Link>
              </div>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { step: '1', body: 'Connect an AI API key or provider account with unused capacity.' },
                  { step: '2', body: 'TokenSea probes it and Autopilot prices your listing to win demand.' },
                  { step: '3', body: 'Buyers use your model and you earn USD per request.' },
                ].map((s) => (
                  <li key={s.step} className="flex items-start gap-3 rounded-xl bg-[#F2F2EE] p-4 text-sm leading-relaxed opacity-80">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: '#7342E2' }}>{s.step}</span>
                    {s.body}
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '13px 22px', boxShadow: '0 4px 24px rgba(115,66,226,0.28)' }}>
                  <Plus size={18} /> New listing
                </button>
                <Link to="/docs" className="inline-flex items-center gap-2 rounded-full font-semibold text-[#192837]" style={{ background: '#F2F2EE', padding: '13px 22px' }}>
                  <KeyRound size={18} /> Seller guide
                </Link>
              </div>
            </Card>

            <Card>
              <h2 className="mb-4 font-semibold text-[#192837]">My listings</h2>
              <div className="overflow-x-auto rounded-xl border border-[rgba(25,40,55,0.08)]">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(25,40,55,0.08)]">
                      {['Model', 'Status', 'Min price', 'Requests', 'Earned', 'Actions'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold tracking-wide uppercase opacity-50">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center opacity-50">
                        No listings yet. Connect a key and your capacity goes live on the market.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="mt-4 inline-flex items-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '12px 20px' }}>
                <Plus size={18} /> Add a listing
              </button>
            </Card>

            <Card>
              <h2 className="mb-4 font-semibold text-[#192837]">Earnings &amp; batches</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-xl bg-[#F2F2EE] p-5">
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">Batch threshold</span>
                  <p className="mt-2 text-2xl font-bold text-[#192837]">$5</p>
                  <p className="mt-2 text-xs opacity-60">USD batches to your wallet at $5 or after 72 hours.</p>
                </div>
                <div className="col-span-2 rounded-xl bg-[#F2F2EE] p-5">
                  <span className="block text-xs font-semibold uppercase tracking-wide opacity-50">How earnings work</span>
                  <p className="mt-2 text-sm leading-relaxed opacity-75">
                    Buyers pay market rate for requests on your listing. Autopilot
                    prices to win demand while respecting your minimum. Earnings
                    settle as USD in your wallet, then you cash out to a supported
                    payment account.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-[#192837]">Listing &amp; key safety</h2>
                <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgba(115,66,226,0.12)', color: '#7342E2' }}>
                  <Activity size={14} /> Encrypted
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-3 text-sm opacity-75 md:grid-cols-2">
                <li className="rounded-xl bg-[#F2F2EE] p-4">Keys are encrypted per listing and never kept on file.</li>
                <li className="rounded-xl bg-[#F2F2EE] p-4">Pause or delist your capacity at any time.</li>
                <li className="rounded-xl bg-[#F2F2EE] p-4">Earnings notifications when a batch settles.</li>
                <li className="rounded-xl bg-[#F2F2EE] p-4">Withdraw only to verified accounts you own.</li>
              </ul>
            </Card>
          </div>
        )}

        {tab !== 0 && (
          <div key={tab} data-dash-panel className="flex flex-col gap-4">
            <Card>
              <h2 className="mb-2 font-semibold text-[#192837]">{SUBTABS[tab]}</h2>
              <p className="opacity-60" style={{ fontSize: '0.95rem' }}>Details appear here once you have active listings and earnings.</p>
            </Card>
            <Card>
              <h2 className="mb-4 font-semibold text-[#192837]">Receive USD</h2>
              <p className="mb-4 opacity-60" style={{ fontSize: '0.95rem' }}>
                Earnings are batched to this wallet. Cash out to your bank or payment app from the Withdraw tab.
              </p>
              <div className="flex flex-col gap-3">
                <WithdrawRow label="Payout account" value="0x0000…0000" note="Set once you have earnings to receive." />
                <WithdrawRow label="Bank / payment app" value="Not connected" note="Revolut, Zelle, PayPal and more." />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full font-semibold text-white" style={{ background: '#7342E2', padding: '12px 20px' }}>
                  <ExternalLink size={18} /> Connect account
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

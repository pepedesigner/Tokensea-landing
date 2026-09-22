import {
  Copy,
  Check,
  Plus,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Activity,
  KeyRound,
  ExternalLink,
  ListPlus,
} from 'lucide-react'
import { useEffect, useRef, useState, type ElementType } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import PageHeader from '../components/PageHeader'
import Badge from '../components/ui/Badge'
import Button, { buttonClasses } from '../components/ui/Button'
import Card from '../components/ui/Card'
import Tabs from '../components/ui/Tabs'

const SUBTABS = ['Overview', 'My listings', 'Earnings', 'Withdraw', 'Payout methods', 'Support']

function Summary({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: ElementType
}) {
  return (
    <Card className="flex items-start justify-between p-6">
      <div>
        <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
          {label}
        </span>
        <span className="mt-2 block font-mono text-2xl font-bold text-ink">{value}</span>
      </div>
      <div className="flex h-10 w-10 items-center justify-center border border-black/10 bg-paper-2">
        <Icon size={20} className="text-ink" />
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
    <div className="flex items-center justify-between gap-4 border border-black/10 bg-paper-2 p-4">
      <div className="min-w-0">
        <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
          {label}
        </span>
        <code className="mt-1 block truncate font-mono text-sm font-medium text-accent-700">
          {value}
        </code>
        <span className="mt-0.5 block text-xs text-ink-3">{note}</span>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="flex h-9 w-9 shrink-0 items-center justify-center border border-black/10 bg-white text-ink transition-colors hover:border-accent-500 hover:text-accent-600"
      >
        {copied ? <Check size={16} className="text-accent-600" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

const STEP_ILLUSTRATIONS = [
  { step: '1', body: 'Connect an AI API key or provider account with unused capacity.' },
  { step: '2', body: 'io.run probes it and Autopilot prices your listing to win demand.' },
  { step: '3', body: 'Buyers use your model and you earn USD per request.' },
]

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
            <Link to="/docs" className={buttonClasses('secondary', 'sm')}>
              Seller guide
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div data-dash-tabs className="mb-6">
          <Tabs items={SUBTABS} active={tab} onChange={setTab} />
        </div>

        {tab === 0 && (
          <div key="overview" data-dash-panel role="tabpanel" className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <Summary label="Available to withdraw" value="$0.00" icon={Wallet} />
              <Summary label="Pending batch" value="$0.00" icon={TrendingUp} />
              <Summary label="Earned this month" value="$0.00" icon={Activity} />
              <Summary label="Active listings" value="0" icon={ListPlus} />
            </div>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-ink">Create your first listing</h2>
                <Link
                  to="/docs"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 transition-colors hover:text-accent-600"
                >
                  How it works <ArrowUpRight size={16} />
                </Link>
              </div>
              <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {STEP_ILLUSTRATIONS.map((s) => (
                  <li
                    key={s.step}
                    className="flex items-start gap-3 border border-black/10 bg-paper-2 p-4 text-sm leading-relaxed text-ink-2"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-ink font-mono text-xs font-bold text-white">
                      {s.step}
                    </span>
                    {s.body}
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="accent" size="md">
                  <Plus size={18} /> New listing
                </Button>
                <Button to="/docs" variant="secondary" size="md">
                  <KeyRound size={18} /> Seller guide
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-ink">My listings</h2>
              <div className="overflow-x-auto border border-black/10">
                <table className="w-full min-w-[680px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-black/10">
                      {['Model', 'Status', 'Min price', 'Requests', 'Earned', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-center text-ink-3">
                        No listings yet. Connect a key and your capacity goes live on the market.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Button variant="accent" size="md">
                  <Plus size={18} /> Add a listing
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-ink">Earnings &amp; batches</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="border border-black/10 bg-paper-2 p-5">
                  <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                    Batch threshold
                  </span>
                  <p className="mt-2 font-mono text-2xl font-bold text-ink">$5</p>
                  <p className="mt-2 text-xs text-ink-3">
                    USD batches to your wallet at $5 or after 72 hours.
                  </p>
                </div>
                <div className="col-span-2 border border-black/10 bg-paper-2 p-5">
                  <span className="block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                    How earnings work
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    Buyers pay market rate for requests on your listing. Autopilot
                    prices to win demand while respecting your minimum. Earnings
                    settle as USD in your wallet, then you cash out to a supported
                    payment account.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-ink">Listing &amp; key safety</h2>
                <Badge variant="live">
                  <Activity size={14} /> Encrypted
                </Badge>
              </div>
              <ul className="grid grid-cols-1 gap-3 text-sm text-ink-2 md:grid-cols-2">
                <li className="border border-black/10 bg-paper-2 p-4">
                  Keys are encrypted per listing and never kept on file.
                </li>
                <li className="border border-black/10 bg-paper-2 p-4">
                  Pause or delist your capacity at any time.
                </li>
                <li className="border border-black/10 bg-paper-2 p-4">
                  Earnings notifications when a batch settles.
                </li>
                <li className="border border-black/10 bg-paper-2 p-4">
                  Withdraw only to verified accounts you own.
                </li>
              </ul>
            </Card>
          </div>
        )}

        {tab !== 0 && (
          <div key={tab} data-dash-panel role="tabpanel" className="flex flex-col gap-4">
            <Card className="p-6">
              <h2 className="mb-2 font-semibold text-ink">{SUBTABS[tab]}</h2>
              <p className="text-ink-2" style={{ fontSize: '0.95rem' }}>
                Details appear here once you have active listings and earnings.
              </p>
            </Card>
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-ink">Receive USD</h2>
              <p className="mb-4 text-ink-2" style={{ fontSize: '0.95rem' }}>
                Earnings are batched to this wallet. Cash out to your bank or payment app from the Withdraw tab.
              </p>
              <div className="flex flex-col gap-3">
                <WithdrawRow label="Payout account" value="0x0000…0000" note="Set once you have earnings to receive." />
                <WithdrawRow label="Bank / payment app" value="Not connected" note="Revolut, Zelle, PayPal and more." />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="accent" size="md">
                  <ExternalLink size={18} /> Connect account
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

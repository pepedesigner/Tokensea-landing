import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import { LogoLockup } from './Logo'

const FOOTER_COLUMNS = [
  {
    heading: 'Market',
    links: [
      { label: 'What\'s paying', to: '/#market' },
      { label: 'Model prices', to: '/pricing' },
      { label: 'Sell your credits', to: '/account' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'How it works', to: '/docs' },
      { label: 'Payouts', to: '/pricing' },
      { label: 'Support', to: '/lookup' },
    ],
  },
  {
    heading: 'Contact',
    links: [{ label: 'hello@io.run', to: 'mailto:hello@io.run' }],
  },
]

const LINK_CLASS =
  'text-sm text-ink-2 transition-colors hover:text-accent-600'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-footer-col]', {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    },
    { scope: footerRef },
  )

  return (
    <footer ref={footerRef} className="relative bg-paper pb-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-10 h-px w-full bg-black/10" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div data-footer-col className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <LogoLockup size={32} />
            </div>
            <p className="text-sm leading-relaxed text-ink-2">
              Sell your spare AI tokens for cash.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} data-footer-col>
              <span className="mb-4 block font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
                {col.heading}
              </span>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith('mailto:') ? (
                      <a href={link.to} className={LINK_CLASS}>
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

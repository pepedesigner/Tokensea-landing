import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../lib/gsap'
import Logo from './Logo'

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
    links: [{ label: 'hello@tokensea.world', to: 'mailto:hello@tokensea.world' }],
  },
]

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
    <footer ref={footerRef} className="relative bg-[#F2F2EE] pb-16">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="mb-10 h-px w-full bg-[rgba(25,40,55,0.12)]" />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div data-footer-col className="col-span-2 md:col-span-1">
            <div className="mb-4 flex items-center gap-2.5">
              <Logo />
              <span
                className="text-lg tracking-tight"
                style={{ fontFamily: 'var(--font-heading)', color: '#192837' }}
              >
                TokenSea
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-60">
              Sell your spare AI tokens for cash.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} data-footer-col>
              <span className="mb-4 block text-xs font-semibold tracking-wide uppercase opacity-50">
                {col.heading}
              </span>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm opacity-80 transition-opacity hover:opacity-50"
                    >
                      {link.label}
                    </Link>
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

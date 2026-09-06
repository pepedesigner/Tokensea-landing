import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Market', to: '/#market' },
  { label: 'Payouts', to: '/pricing' },
  { label: 'How it works', to: '/docs' },
]

const ease = [0.22, 1, 0.36, 1] as const

const NAV_BUTTON_CLASSES =
  'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition hover:opacity-90'

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const links = [...NAV_LINKS]
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(25, 40, 55, 0.35)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="sheet"
            className="fixed top-0 right-0 z-50 flex flex-col"
            style={{
              width: 'min(88vw, 360px)',
              height: '100dvh',
              background: '#CFC8C5',
              boxShadow: '-12px 0 48px rgba(25, 40, 55, 0.18)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Logo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#192837] transition hover:bg-[rgba(25,40,55,0.06)]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mx-6 h-px bg-[rgba(25,40,55,0.18)]" />

            <nav className="flex flex-col gap-1 px-4 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.18 + i * 0.07,
                    duration: 0.45,
                    ease,
                  }}
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-[#192837] transition hover:bg-[rgba(25,40,55,0.06)]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 px-6 pb-10">
              <motion.a
                href="/account"
                className={`${NAV_BUTTON_CLASSES} bg-[#7342E2] text-white`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + links.length * 0.07, duration: 0.45, ease }}
              >
                Start selling
              </motion.a>
              <motion.a
                href="/account"
                className={`${NAV_BUTTON_CLASSES} bg-[#F2F2EE] text-[#192837]`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + links.length * 0.07, duration: 0.45, ease }}
              >
                Sign In
              </motion.a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        <Link to="/" className="flex items-center gap-2.5" aria-label="TokenSea home">
          <Logo />
          <span
            className="text-lg tracking-tight"
            style={{ fontFamily: 'var(--font-heading)', color: '#192837' }}
          >
            TokenSea
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-[#192837] opacity-100 transition-opacity hover:opacity-60"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/account"
            className={`${NAV_BUTTON_CLASSES} bg-[#7342E2] text-white`}
          >
            Start selling
          </Link>
          <Link
            to="/account"
            className={`${NAV_BUTTON_CLASSES} bg-[#F2F2EE] text-[#192837]`}
          >
            Sign In
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#192837] transition hover:bg-[rgba(25,40,55,0.06)] md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

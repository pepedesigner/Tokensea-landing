import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LogoLockup, LogoTile } from './Logo'
import { buttonClasses } from './ui/Button'

const MotionLink = motion.create(Link)

const NAV_LINKS = [
  { label: 'Market', to: '/#market' },
  { label: 'Payouts', to: '/pricing' },
  { label: 'How it works', to: '/docs' },
]

const ease = [0.22, 1, 0.36, 1] as const

function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const links = [...NAV_LINKS]

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{
              background: 'rgba(20, 17, 14, 0.35)',
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
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed top-0 right-0 z-50 flex flex-col border-l border-black/10"
            style={{
              width: 'min(88vw, 360px)',
              height: '100dvh',
              background: '#ebe5da',
              boxShadow: '-12px 0 48px rgba(20, 17, 14, 0.18)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <LogoTile size={36} />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center text-ink transition hover:bg-paper-2"
              >
                <X size={22} />
              </button>
            </div>

            <div className="mx-6 h-px bg-black/15" />

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
                    className="block px-4 py-3 text-base font-medium text-ink transition hover:bg-paper-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-3 px-6 pb-10">
              <MotionLink
                to="/account"
                onClick={onClose}
                className={buttonClasses('accent')}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + links.length * 0.07, duration: 0.45, ease }}
              >
                Start selling
              </MotionLink>
              <MotionLink
                to="/account"
                onClick={onClose}
                className={buttonClasses('secondary')}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + links.length * 0.07, duration: 0.45, ease }}
              >
                Sign In
              </MotionLink>
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
        <LogoLockup to="/" />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/account" className={buttonClasses('accent')}>
            Start selling
          </Link>
          <Link to="/account" className={buttonClasses('secondary')}>
            Sign In
          </Link>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-ink transition hover:bg-paper-2 md:hidden"
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

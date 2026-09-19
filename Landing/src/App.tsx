import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Button from './components/ui/Button'

const Pricing = lazy(() => import('./pages/Pricing'))
const Docs = lazy(() => import('./pages/Docs'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Account = lazy(() => import('./pages/Account'))
const Lookup = lazy(() => import('./pages/Lookup'))

function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

function InnerLayout() {
  return (
    <div className="min-h-screen bg-paper">
      <div className="border-b border-black/10">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[1280px] flex-col items-center justify-center px-5 text-center sm:px-8">
      <span className="font-mono text-[11px] font-bold tracking-wider text-ink-3 uppercase">
        404
      </span>
      <h1
        className="mt-3 mb-3 font-bold text-ink"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
        }}
      >
        This page isn&rsquo;t on the market.
      </h1>
      <p className="mb-6 text-ink-2">The page you are looking for doesn&rsquo;t exist.</p>
      <Button to="/" variant="accent" size="lg">
        Back to home
      </Button>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Suspense fallback={<div className="min-h-screen bg-paper" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<InnerLayout />}>
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/account" element={<Account />} />
            <Route path="/lookup" element={<Lookup />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

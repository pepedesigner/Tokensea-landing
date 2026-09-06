import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Docs from './pages/Docs'
import Dashboard from './pages/Dashboard'
import Account from './pages/Account'
import Lookup from './pages/Lookup'

function InnerLayout() {
  return (
    <div className="min-h-screen bg-[#F2F2EE]">
      <div className="border-b border-[rgba(25,40,55,0.08)]">
        <Navbar />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<InnerLayout />}>
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/account" element={<Account />} />
          <Route path="/lookup" element={<Lookup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

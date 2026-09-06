import Hero from '../components/Hero'
import Features from '../components/Features'
import ModelMarquee from '../components/ModelMarquee'
import Models from '../components/Models'
import HowItWorks from '../components/HowItWorks'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />
      <Hero />
      <Features />
      <ModelMarquee />
      <Models />
      <HowItWorks />
      <CtaBanner />
      <Footer />
    </main>
  )
}

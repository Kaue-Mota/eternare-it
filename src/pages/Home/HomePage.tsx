import { useEffect, useState } from "react"
import Header from "../../components/ui/Header/index.tsx"
import { Examples } from "../../components/ui/sections/Examples.tsx"
import { Reviews } from "../../components/ui/sections/Reviews.tsx"
import { Cta, Footer } from "../../components/ui/CtaFooter/index.tsx"
import Hero from "../../components/ui/sections/Hero.tsx"
import { HowItWorks } from "../../components/ui/sections/Howitworks.tsx"
import { BackgroundLight } from "../../components/ui/sections/Backgroundlight.tsx"
// Barra de progresso de scroll
function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? scrolled / total : 0)
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-200 h-0.5 pointer-events-none"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(to right, #7c6aff, #b06fff, #e0a8ff)",
          transition: "width 0.08s linear",
          boxShadow: "0 0 8px rgba(176,111,255,0.6)",
        }}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <div className="relative z-10">
        <Header />
        <Hero />
        <HowItWorks />
        <Examples />
        <Reviews />
        <Cta />
        <Footer />
      </div>
      <BackgroundLight />
    </>
  )
}

// src/components/ui/sections/HowItWorks.tsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

const STEPS = [
  {
    number: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    title: 'Preencha os detalhes',
    text: 'Adicione fotos, título, data, texto e a música que marca esse momento.',
  },
  {
    number: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Veja o preview',
    text: 'Acompanhe em tempo real como sua página está ficando enquanto preenche.',
  },
  {
    number: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
      </svg>
    ),
    title: 'Finalize o pagamento',
    text: 'Pagamento seguro via Stripe. Insira um email válido para receber sua memória.',
  },
  {
    number: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Compartilhe quando quiser',
    text: 'Receba seu link exclusivo e QR Code. Sua memória está pronta para ser compartilhada.',
  },
]

const HOW_STYLES = `
  .step-card {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
  }
  .step-card:hover {
    transform: translateY(-6px) !important;
  }
  .step-card:hover .step-icon {
    box-shadow: 0 0 0 8px rgba(124,106,255,0.1), 0 0 24px rgba(124,106,255,0.25);
    border-color: rgba(124,106,255,0.5) !important;
    background: rgba(124,106,255,0.2) !important;
    color: #d4b8ff !important;
  }
  .step-card:hover .step-number {
    opacity: 1 !important;
  }
`

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="step-card flex flex-col gap-5 px-6 py-8 rounded-2xl"
      style={{
        borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(40px)',
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
      }}
    >
      {/* Número */}
      <p
        className="step-number text-5xl font-light leading-none transition-opacity duration-300"
        style={{
          fontFamily: 'Georgia, serif',
          background: 'linear-gradient(135deg, #7c6aff, #b06fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
          opacity: 0.8,
        }}
      >
        {step.number}
      </p>

      {/* Ícone */}
      <div
        className="step-icon w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          background: 'rgba(124,106,255,0.1)',
          border: '1px solid rgba(124,106,255,0.22)',
          color: '#9d8aff',
        }}
      >
        {step.icon}
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-2">
        <p className="text-[14px] font-semibold text-white">{step.title}</p>
        <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.45)' }}>
          {step.text}
        </p>
      </div>
    </div>
  )
}

export function HowItWorks() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3)
  const lineRef = useRef<HTMLDivElement | null>(null)
  const [lineVisible, setLineVisible] = useState(false)

  useEffect(() => {
    const el = lineRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setLineVisible(true); obs.disconnect() } },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      className="py-28 px-6 relative z-10"
      style={{ background: 'rgba(5,6,18,0.92)' }}
    >
      <style>{HOW_STYLES}</style>
      <div className="max-w-5xl mx-auto">

        {/* Header com clip-path reveal */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="mb-16 flex flex-col items-center text-center gap-4"
        >
          {/* Label */}
          <div style={{ overflow: 'hidden' }}>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff]"
              style={{
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Como funciona
            </p>
          </div>

          {/* Título — linha por linha */}
          <div style={{ overflow: 'hidden' }}>
            <h2
              className="text-4xl md:text-5xl font-light leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#f0eef8',
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s',
              }}
            >
              Simples como lembrar
            </h2>
          </div>

          {/* Subtítulo */}
          <p
            className="text-[15px] max-w-md"
            style={{
              color: 'rgba(240,238,248,0.45)',
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            Em poucos passos, sua memória ganha vida em uma página exclusiva, pronta para ser compartilhada.
          </p>
        </div>

        {/* Linha conectora animada (desktop) */}
        <div ref={lineRef} className="relative hidden lg:block mb-0 h-px">
          <div
            className="absolute top-0 left-[12.5%]"
            style={{ width: '75%', background: 'rgba(255,255,255,0.04)', height: 1 }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(to right, #7c6aff, #b06fff, #7c6aff)',
                width: lineVisible ? '100%' : '0%',
                transition: 'width 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s',
                borderRadius: 1,
                boxShadow: '0 0 8px rgba(124,106,255,0.4)',
              }}
            />
          </div>
        </div>

        {/* Steps — cada um com seu próprio observer */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

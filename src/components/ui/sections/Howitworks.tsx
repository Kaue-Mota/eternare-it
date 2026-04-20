// src/components/ui/sections/HowItWorks.tsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

type Step = {
  number: string
  eyebrow: string
  title: string
  text: string
  visual: React.ReactNode
}

/* ── Mockups visuais por etapa ───────────────────────────────────────── */

function FormMockup() {
  return (
    <div
      className="w-full max-w-65 rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="flex flex-col gap-1.5">
        <div className="h-1.5 w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="h-7 rounded-md flex items-center px-2.5"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(124,106,255,0.35)' }}>
          <span className="text-[11px]" style={{ color: 'rgba(240,238,248,0.85)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            Nosso primeiro verão
          </span>
          <span className="ml-auto h-3 w-px bg-[#b06fff] animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-md"
            style={{
              background: i === 2
                ? 'linear-gradient(135deg, rgba(124,106,255,0.15), rgba(176,111,255,0.08))'
                : `linear-gradient(135deg, rgba(${124 + i * 20},106,255,0.25), rgba(176,111,255,0.12))`,
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="#b06fff">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <div className="h-1 flex-1 rounded-full" style={{ background: 'rgba(124,106,255,0.2)' }}>
          <div className="h-full w-2/3 rounded-full" style={{ background: 'linear-gradient(to right, #7c6aff, #b06fff)' }} />
        </div>
      </div>
    </div>
  )
}

function PreviewMockup() {
  return (
    <div className="relative w-full max-w-65">
      <div
        className="rounded-2xl overflow-hidden relative"
        style={{
          background: 'linear-gradient(165deg, #1a1230 0%, #0b0d1e 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '9 / 12',
        }}
      >
        {/* Foto no topo */}
        <div className="absolute inset-x-0 top-0 h-[55%] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(0.9) brightness(0.85)' }}
          />
          {/* Overlay tinto pra combinar com o tema roxo */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(124,106,255,0.25), transparent 60%)',
              mixBlendMode: 'overlay',
            }}
          />
          {/* Fade para baixo */}
          <div
            className="absolute inset-x-0 bottom-0 h-20"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(11,13,30,0.98))' }}
          />
        </div>

        {/* Conteúdo inferior */}
        <div className="absolute inset-x-0 bottom-0 top-[50%] flex flex-col items-center justify-center gap-1.5 px-4 text-center">
          <p className="text-[9px] tracking-[0.22em] uppercase" style={{ color: 'rgba(176,111,255,0.85)' }}>
            Para sempre
          </p>
          <p className="text-white text-base leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            Ana & Rafael
          </p>
          <p className="text-[10px]" style={{ color: 'rgba(240,238,248,0.4)' }}>
            12.09.2024
          </p>
          <div className="flex gap-1 mt-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ background: i === 0 ? '#b06fff' : 'rgba(255,255,255,0.15)' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Badge Live — fora do recorte */}
      <div
        className="absolute -top-2 -right-2 flex items-center gap-1.5 px-2 py-1 rounded-full z-10"
        style={{
          background: 'rgba(124,106,255,0.2)',
          border: '1px solid rgba(124,106,255,0.4)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <span className="relative flex w-1.5 h-1.5">
          <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#b06fff' }} />
          <span className="relative inline-flex rounded-full w-1.5 h-1.5" style={{ background: '#b06fff' }} />
        </span>
        <span className="text-[9px] font-medium tracking-wider uppercase" style={{ color: '#d4b8ff' }}>
          Live
        </span>
      </div>
    </div>
  )
}

function PaymentMockup() {
  return (
    <div
      className="w-full max-w-65 rounded-2xl p-4 flex flex-col gap-3"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(240,238,248,0.35)' }}>
          Total
        </p>
        <svg width="32" height="14" viewBox="0 0 60 26" fill="#6772e5">
          <path d="M59.5 14.4c0-4.1-2-7.4-5.9-7.4-3.8 0-6.2 3.2-6.2 7.3 0 4.9 2.8 7.4 6.7 7.4 1.9 0 3.4-.4 4.5-1V17c-1.1.5-2.3.9-3.9.9-1.5 0-2.9-.5-3.1-2.4h7.8c0-.2.1-1 .1-1.1zm-7.9-1.5c0-1.8 1.1-2.6 2.1-2.6 1 0 2 .8 2 2.6h-4.1zM41.1 7c-1.5 0-2.5.7-3.1 1.2l-.2-1H34v20l4.2-.9v-4.8c.6.4 1.5 1.1 3 1.1 3 0 5.7-2.4 5.7-7.7 0-4.8-2.7-7.9-5.8-7.9zm-1 11.7c-1 0-1.6-.4-2-.8V11c.4-.5 1-.8 2-.8 1.5 0 2.6 1.7 2.6 4.2 0 2.6-1 4.3-2.6 4.3zM33 4.5 28.7 5.4v-3.4L33 1.1v3.4zM28.7 7.3h4.3v14.3h-4.3V7.3zM24 8.6l-.3-1.3h-3.7v14.3h4.2v-9.7c1-1.3 2.7-1 3.2-.9V7.3c-.5-.2-2.5-.5-3.4 1.3zM16.4 3.7l-4.1.9-.1 13.4c0 2.4 1.8 4.2 4.2 4.2 1.4 0 2.4-.2 2.9-.5V18.3c-.5.2-3 .9-3-1.5v-6h3V7.3h-3V3.7zM5 10.6c0-.6.5-.9 1.4-.9 1.3 0 2.9.4 4.1 1V6.7c-1.4-.5-2.8-.7-4.1-.7C3 6 1 7.7 1 10.4c0 4.4 5.7 3.7 5.7 5.5 0 .7-.6 1-1.6 1-1.4 0-3.3-.6-4.6-1.4v4c1.5.7 3.1.9 4.6.9 3.5 0 5.6-1.6 5.6-4.4 0-4.7-5.7-3.9-5.7-5.4z" />
        </svg>
      </div>
      <p className="text-2xl font-semibold" style={{ color: '#f0eef8', fontVariantNumeric: 'tabular-nums' }}>
        R$ 14<span className="text-sm" style={{ color: 'rgba(240,238,248,0.5)' }}>,90</span>
      </p>
      <div className="h-8 rounded-md flex items-center px-3 gap-2"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(240,238,248,0.5)" strokeWidth="1.5">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
        <span className="text-[11px] tracking-wider" style={{ color: 'rgba(240,238,248,0.7)', fontVariantNumeric: 'tabular-nums' }}>
          •••• •••• •••• 4242
        </span>
      </div>
      <button
        className="h-9 rounded-md text-[12px] font-semibold text-white"
        style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
      >
        Pagar com segurança
      </button>
    </div>
  )
}

function QrMockup() {
  const cells = Array.from({ length: 49 }, (_, i) => {
    // Pseudo-random but deterministic pattern
    const isFilled = [0, 1, 2, 4, 5, 6, 7, 9, 10, 14, 16, 17, 19, 22, 24, 26, 28, 30, 31, 33, 35, 36, 39, 40, 42, 43, 44, 46, 47, 48].includes(i)
    return isFilled
  })

  return (
    <div className="relative w-full max-w-65 flex flex-col items-center gap-3">
      <div
        className="p-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #fafafa, #ececf2)',
          border: '1px solid rgba(255,255,255,0.15)',
          boxShadow: '0 16px 40px rgba(0,0,0,0.4), 0 0 32px rgba(124,106,255,0.2)',
        }}
      >
        <div className="grid grid-cols-7 gap-0.5 w-35">
          {cells.map((filled, i) => (
            <div
              key={i}
              className="aspect-square rounded-xs"
              style={{ background: filled ? '#070712' : 'transparent' }}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#b06fff" strokeWidth="2">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
        <span className="text-[10px] tracking-wider" style={{ color: 'rgba(240,238,248,0.7)' }}>
          eternare.it/ana-rafael
        </span>
      </div>
    </div>
  )
}

/* ── Dados ────────────────────────────────────────────────────────────── */

const STEPS: Step[] = [
  {
    number: '01',
    eyebrow: 'Começo',
    title: 'Conte a história',
    text: 'Escolha fotos que importam, escreva em poucas palavras o que esse momento foi, adicione a música que toca quando você pensa nele.',
    visual: <FormMockup />,
  },
  {
    number: '02',
    eyebrow: 'Durante',
    title: 'Veja tudo ganhar forma',
    text: 'Cada ajuste aparece ao vivo. Você não precisa imaginar — você vê, exatamente como ficará na tela de quem receber.',
    visual: <PreviewMockup />,
  },
  {
    number: '03',
    eyebrow: 'Confirmação',
    title: 'Finalize com tranquilidade',
    text: 'Pagamento seguro pela Stripe. Uma etapa simples, sem assinatura, sem complicação. Seu email chega quando terminar.',
    visual: <PaymentMockup />,
  },
  {
    number: '04',
    eyebrow: 'Para sempre',
    title: 'Entregue quando for a hora',
    text: 'Você recebe um link exclusivo e um QR Code. Imprima num cartão, mande por mensagem, cole num presente — sua memória já é eterna.',
    visual: <QrMockup />,
  },
]

/* ── Step (linha do timeline) ─────────────────────────────────────────── */

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)
  const reverse = index % 2 === 1

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative pl-14 lg:pl-0 py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-14 lg:items-center"
    >
      {/* Número — mobile (alinhado ao trilho em left-6) */}
      <div
        className="lg:hidden absolute top-10 flex items-center justify-center w-9 h-9 rounded-full text-[11px] font-semibold"
        style={{
          left: 'calc(1.5rem - 18px)', // centro em 24px (left-6 do trilho)
          background: 'rgba(7,7,18,0.95)',
          border: '1px solid rgba(124,106,255,0.35)',
          color: '#d4b8ff',
          fontFamily: 'Georgia, serif',
          boxShadow: visible ? '0 0 0 4px rgba(124,106,255,0.08), 0 0 20px rgba(124,106,255,0.25)' : 'none',
          transition: 'box-shadow 0.8s ease 0.2s',
        }}
      >
        {step.number}
      </div>

      {/* Texto */}
      <div
        className={`flex flex-col gap-3 lg:gap-4 ${reverse ? 'lg:order-3 lg:text-left' : 'lg:order-1 lg:text-right'}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.15s',
        }}
      >
        <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(124,106,255,0.8)' }}>
          {step.eyebrow}
        </p>
        <h3
          className="text-xl md:text-2xl lg:text-3xl font-light leading-tight"
          style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
        >
          {step.title}
        </h3>
        <p
          className={`text-[13px] md:text-[14px] leading-relaxed ${reverse ? 'lg:mr-auto' : 'lg:ml-auto'}`}
          style={{ color: 'rgba(240,238,248,0.5)', maxWidth: '28rem' }}
        >
          {step.text}
        </p>
      </div>

      {/* Nó central do timeline (desktop) */}
      <div className="hidden lg:flex lg:order-2 flex-col items-center justify-center relative">
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(7,7,18,0.95)',
            border: '1px solid rgba(124,106,255,0.35)',
            boxShadow: visible
              ? '0 0 0 6px rgba(124,106,255,0.08), 0 0 32px rgba(124,106,255,0.3)'
              : '0 0 0 0 rgba(124,106,255,0)',
            transition: 'box-shadow 0.9s ease 0.3s',
          }}
        >
          <span
            className="text-[13px] font-semibold tracking-wider"
            style={{
              background: 'linear-gradient(135deg, #9d7fff, #e0a8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Georgia, serif',
            }}
          >
            {step.number}
          </span>
          {visible && (
            <span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                border: '1px solid rgba(176,111,255,0.4)',
                animation: 'node-ping 2.8s ease-out infinite',
              }}
            />
          )}
        </div>
      </div>

      {/* Visual */}
      <div
        className={`flex justify-start lg:justify-center ${reverse ? 'lg:order-1 lg:justify-end' : 'lg:order-3 lg:justify-start'}`}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(48px) scale(0.96)',
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}
      >
        {step.visual}
      </div>
    </div>
  )
}

/* ── Componente principal ─────────────────────────────────────────────── */

export function HowItWorks() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.3)
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const [progress, setProgress] = useState(0)

  // Scroll-driven progress line
  useEffect(() => {
    const el = timelineRef.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const viewportH = window.innerHeight
      // Progresso: 0 quando topo da seção entra na tela; 1 quando base sai
      const start = rect.top - viewportH * 0.5
      const end = rect.bottom - viewportH * 0.5
      const total = end - start
      const current = -start
      const p = Math.max(0, Math.min(1, current / total))
      setProgress(p)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section
      className="relative z-10 py-24 md:py-32 px-6"
      style={{ background: 'rgba(5,6,18,0.92)' }}
    >
      <style>{`
        @keyframes node-ping {
          0%   { transform: scale(1);   opacity: 0.9; }
          80%  { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="mb-16 md:mb-20 flex flex-col items-center text-center gap-4"
        >
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
              Quatro passos.{' '}
              <em style={{ color: '#b06fff', fontStyle: 'italic' }}>
                Uma lembrança para sempre.
              </em>
            </h2>
          </div>

          <p
            className="text-[15px] max-w-md"
            style={{
              color: 'rgba(240,238,248,0.45)',
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          >
            Do primeiro clique ao QR Code pronto pra imprimir — sem fricção, sem assinatura, sem pressa.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">

          {/* Trilho vertical (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: 1, background: 'rgba(255,255,255,0.05)' }}
          >
            <div
              style={{
                width: '100%',
                height: `${progress * 100}%`,
                background: 'linear-gradient(to bottom, rgba(124,106,255,0.1), #7c6aff 40%, #b06fff)',
                boxShadow: '0 0 12px rgba(176,111,255,0.5)',
                transition: 'height 0.15s linear',
              }}
            />
          </div>

          {/* Trilho vertical (mobile — alinhado aos números a 24px) */}
          <div
            className="lg:hidden absolute top-0 bottom-0"
            style={{ left: 24, width: 1, background: 'rgba(255,255,255,0.05)' }}
          >
            <div
              style={{
                width: '100%',
                height: `${progress * 100}%`,
                background: 'linear-gradient(to bottom, rgba(124,106,255,0.1), #7c6aff 40%, #b06fff)',
                boxShadow: '0 0 8px rgba(176,111,255,0.5)',
                transition: 'height 0.15s linear',
              }}
            />
          </div>

          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* Fecho */}
        <div className="flex flex-col items-center text-center mt-8 gap-2">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: '#b06fff',
              boxShadow: '0 0 12px rgba(176,111,255,0.8)',
            }}
          />
          <p className="text-[11px] tracking-[0.22em] uppercase" style={{ color: 'rgba(240,238,248,0.35)' }}>
            Pronto
          </p>
        </div>

      </div>
    </section>
  )
}

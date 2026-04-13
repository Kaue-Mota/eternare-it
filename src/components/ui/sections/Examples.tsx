// src/components/ui/sections/Examples.tsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

const EXAMPLES = [
  {
    id: 1,
    label: 'Dia dos Namorados',
    bgColor: '#1a0a1a',
    photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    title: 'EU TE AMO',
    date: '12 de junho de 2021',
    counter: '4 anos, 285 dias',
    text: 'Cada dia ao seu lado é um presente que guardo para sempre no coração.',
    emoji: '❤️',
    // direção de entrada
    from: 'left',
  },
  {
    id: 2,
    label: 'Dia dos Pais',
    bgColor: '#0d1a2e',
    photo: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400',
    title: 'MEU HERÓI',
    date: '10 de agosto de 2020',
    counter: '5 anos, 156 dias',
    text: 'Obrigado por ser meu exemplo, meu guia e minha maior fonte de força.',
    emoji: '⭐',
    from: 'bottom',
  },
  {
    id: 3,
    label: 'Dia das Mães',
    bgColor: '#1a0a0a',
    photo: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400',
    title: 'MINHA MÃE',
    date: '14 de maio de 2019',
    counter: '6 anos, 314 dias',
    text: 'Nenhuma palavra é suficiente para expressar o quanto você significa para mim.',
    emoji: '🌸',
    from: 'right',
  },
]

const EXAMPLE_STYLES = `
  .ex-card {
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.35s ease;
    cursor: default;
  }
  .ex-card:hover {
    transform: translateY(-10px) scale(1.025) !important;
    box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(124,106,255,0.18) !important;
  }
`

function fromInitial(from: string): React.CSSProperties {
  if (from === 'left')   return { opacity: 0, transform: 'translateX(-60px) scale(0.95)' }
  if (from === 'right')  return { opacity: 0, transform: 'translateX(60px) scale(0.95)' }
  return { opacity: 0, transform: 'translateY(50px) scale(0.95)' }
}

function MemoryCard({
  example,
  index,
}: {
  example: (typeof EXAMPLES)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const initial = fromInitial(example.from)

  return (
    <div
      ref={ref}
      className="ex-card rounded-2xl overflow-hidden w-full"
      style={{
        background: example.bgColor,
        border: '1px solid rgba(255,255,255,0.08)',
        ...(visible
          ? { opacity: 1, transform: 'none', transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s` }
          : { ...initial, transition: 'none' }),
      }}
    >
      {/* Badge de ocasião */}
      <div className="px-3 pt-3">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium"
          style={{
            background: 'rgba(124,106,255,0.12)',
            border: '1px solid rgba(124,106,255,0.2)',
            color: '#b06fff',
          }}
        >
          <span>{example.emoji}</span>
          {example.label}
        </span>
      </div>

      {/* Foto polaroid */}
      <div className="p-3 pb-0">
        <div className="bg-white rounded-xl p-2 pb-7">
          <div className="rounded-lg overflow-hidden aspect-square">
            <img src={example.photo} alt="" className="w-full h-full object-cover block" />
          </div>
          <p className="text-[8px] tracking-widest uppercase text-black/20 text-center mt-2 font-medium">
            eternare
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-3 pb-5 pt-3">
        <div
          className="rounded-lg px-2 py-1.5 text-center text-[9px] font-semibold mb-3"
          style={{
            background: 'rgba(124,106,255,0.12)',
            border: '1px solid rgba(124,106,255,0.18)',
            color: '#b06fff',
          }}
        >
          {example.counter}
        </div>

        <div className="flex items-start gap-1.5 mb-1">
          <div className="w-0.5 self-stretch rounded-sm shrink-0 bg-red-600 mt-0.5" />
          <p className="text-[12px] font-extrabold uppercase tracking-wider text-white leading-tight">
            {example.title}
          </p>
        </div>

        <p className="text-[8px] tracking-wider uppercase mt-1 mb-2" style={{ color: 'rgba(240,238,248,0.3)' }}>
          {example.date}
        </p>

        <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.6)' }}>
          {example.text}
        </p>
      </div>
    </div>
  )
}

export function Examples() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.4)
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i === 0 ? EXAMPLES.length - 1 : i - 1))
  const next = () => setActive(i => (i === EXAMPLES.length - 1 ? 0 : i + 1))

  return (
    <section className="backdrop-blur-lg py-24 border-b border-white/10 z-10 relative">
      <style>{EXAMPLE_STYLES}</style>
      <div className="max-w-5xl mx-auto px-6">

        {/* Header — clip-path reveal por linha */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
        >
          <div style={{ overflow: 'hidden' }}>
            <p
              className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3"
              style={{
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              Exemplos de memórias
            </p>
          </div>

          <div style={{ overflow: 'hidden' }}>
            <h2
              className="text-3xl md:text-4xl font-light leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#f0eef8',
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s',
              }}
            >
              Momentos que merecem<br />
              <em
                style={{
                  color: '#b06fff',
                  display: 'inline-block',
                  clipPath: headingVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s',
                }}
              >
                ser eternizados
              </em>
            </h2>
          </div>
        </div>

        {/* Desktop: 3 cards — cada um entra de uma direção diferente */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {EXAMPLES.map((ex, i) => (
            <MemoryCard key={ex.id} example={ex} index={i} />
          ))}
        </div>

        {/* Mobile: carrossel */}
        <div className="md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex-1 overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {EXAMPLES.map((ex) => (
                  <div key={ex.id} className="min-w-full px-1">
                    <div className="max-w-60 mx-auto">
                      <MemoryCard example={ex} index={0} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {EXAMPLES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="h-1.5 rounded-full transition-all duration-300 border-none p-0 cursor-pointer"
                style={{
                  width: i === active ? 20 : 6,
                  background: i === active ? '#7c6aff' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

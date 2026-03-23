// src/components/ui/sections/Examples.tsx
import { useState } from 'react'

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
  },
]

function MemoryCard({ example, active }: { example: typeof EXAMPLES[0]; active: boolean }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-500 select-none"
      style={{
        width: active ? 220 : 160,
        opacity: active ? 1 : 0.5,
        transform: active ? 'scale(1)' : 'scale(0.92)',
        background: example.bgColor,
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {/* Foto polaroid */}
      <div className="p-2.5 pb-0">
        <div className="bg-white rounded-xl p-1.5 pb-6">
          <div className="rounded-lg overflow-hidden aspect-square">
            <img src={example.photo} alt="" className="w-full h-full object-cover block" />
          </div>
          <p className="text-[8px] tracking-widest uppercase text-black/20 text-center mt-1.5 font-medium">
            eternare
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-3 pb-4 pt-3">
        <div
          className="rounded-lg px-2 py-1.5 text-center text-[9px] font-semibold mb-3"
          style={{ background: 'rgba(124,106,255,0.15)', border: '1px solid rgba(124,106,255,0.2)', color: '#b06fff' }}
        >
          {example.counter}
        </div>

        <div className="flex items-start gap-1.5 mb-1">
          <div className="w-[2px] self-stretch rounded-sm flex-shrink-0 bg-red-600 mt-0.5" />
          <p className="text-[11px] font-extrabold uppercase tracking-wider text-white leading-tight">
            {example.title}
          </p>
        </div>

        <p className="text-[8px] tracking-wider uppercase mt-1 mb-2" style={{ color: 'rgba(240,238,248,0.3)' }}>
          {example.date}
        </p>

        <p className="text-[9px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.6)' }}>
          {example.text}
        </p>
      </div>
    </div>
  )
}

export function Examples() {
  const [active, setActive] = useState(1)

  const prev = () => setActive(i => (i === 0 ? EXAMPLES.length - 1 : i - 1))
  const next = () => setActive(i => (i === EXAMPLES.length - 1 ? 0 : i + 1))

  return (
    <section className="bg-[rgba(5,6,18,0.88)]  backdrop-blur-lg py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header da seção */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">
            Exemplos de memórias
          </p>
          <h2
            className="text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            Momentos que merecem<br />
            <em style={{ color: '#b06fff' }}>ser eternizados</em>
          </h2>
        </div>

        {/* Carrossel */}
        <div className="relative flex items-center justify-center gap-4">

          {/* Botão prev */}
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Cards */}
          <div className="flex items-center gap-4 overflow-hidden">
            {EXAMPLES.map((ex, i) => (
              <MemoryCard key={ex.id} example={ex} active={i === active} />
            ))}
          </div>

          {/* Botão next */}
          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Label do card ativo */}
        <p className="text-center mt-8 text-[12px] tracking-widest uppercase text-white/30">
          {EXAMPLES[active].label}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
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
    </section>
  )
}
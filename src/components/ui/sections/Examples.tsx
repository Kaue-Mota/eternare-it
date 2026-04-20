// src/components/ui/sections/Examples.tsx
import { useState } from 'react'
import { useInView } from '../../../hooks/useInView'

type Example = {
  id: string
  label: string
  emoji: string
  accent: string
  photo: string
  slug: string
  title: string
  date: string
  counter: string
  text: string
  song: string
}

const EXAMPLES: Example[] = [
  {
    id: 'namorados',
    label: 'Namorados',
    emoji: '❤️',
    accent: '#ff6b9e',
    photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
    slug: 'ana-rafael',
    title: 'Eu te amo',
    date: '12 de junho de 2021',
    counter: '4 anos, 285 dias',
    text: 'Cada dia ao seu lado é um presente que carrego comigo no coração.',
    song: 'Ben — Stevie Wonder',
  },
  {
    id: 'pais',
    label: 'Pais',
    emoji: '⭐',
    accent: '#5b9dff',
    photo: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800',
    slug: 'meu-heroi',
    title: 'Meu herói',
    date: '10 de agosto de 2020',
    counter: '5 anos, 156 dias',
    text: 'Obrigado por ser meu exemplo, meu guia e minha maior fonte de força.',
    song: 'Dance With My Father — Luther Vandross',
  },
  {
    id: 'maes',
    label: 'Mães',
    emoji: '🌸',
    accent: '#ff8fb5',
    photo: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800',
    slug: 'minha-mae',
    title: 'Minha mãe',
    date: '14 de maio de 2019',
    counter: '6 anos, 314 dias',
    text: 'Nenhuma palavra é suficiente para expressar o quanto você significa para mim.',
    song: 'Hey Mama — Kanye West',
  },
  {
    id: 'casamento',
    label: 'Casamento',
    emoji: '💍',
    accent: '#d4a8ff',
    photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    slug: 'carla-bruno',
    title: 'Para sempre',
    date: '18 de março de 2023',
    counter: '2 anos, 33 dias',
    text: 'De mãos dadas, começamos a escrever a mais longa das nossas histórias.',
    song: 'Thinking Out Loud — Ed Sheeran',
  },
  {
    id: 'aniversario',
    label: 'Aniversário',
    emoji: '🎂',
    accent: '#ffb77c',
    photo: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800',
    slug: 'primeiro-aninho',
    title: 'Primeiro aninho',
    date: '22 de janeiro de 2025',
    counter: '1 ano, 88 dias',
    text: 'Um ano de sorrisos, descobertas e amor que não cabe em lugar nenhum.',
    song: 'Beautiful Boy — John Lennon',
  },
  {
    id: 'formatura',
    label: 'Formatura',
    emoji: '🎓',
    accent: '#7de1c1',
    photo: 'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800',
    slug: 'finalmente',
    title: 'Finalmente',
    date: '15 de dezembro de 2024',
    counter: '4 meses, 5 dias',
    text: 'Cinco anos de noites viradas, amizades e a certeza de que valeu cada minuto.',
    song: 'Time of Your Life — Green Day',
  },
]

const STYLES = `
  @keyframes ex-fade-in {
    from { opacity: 0; transform: translateY(18px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)   scale(1); }
  }
  @keyframes ex-photo-zoom {
    from { transform: scale(1.08); opacity: 0; }
    to   { transform: scale(1);    opacity: 1; }
  }
  .ex-playbar {
    background-size: 200% 100%;
    animation: ex-playbar-shimmer 2.6s ease-in-out infinite;
  }
  @keyframes ex-playbar-shimmer {
    0%   { background-position: 100% 0; }
    100% { background-position: 0 0; }
  }
`

function ExamplePreview({ ex }: { ex: Example }) {
  return (
    <article
      key={ex.id}
      className="w-full max-w-md mx-auto rounded-3xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(170deg, #0f0c1f 0%, #070712 80%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 60px ${ex.accent}20`,
        animation: 'ex-fade-in 0.7s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Foto hero */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={ex.photo}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          style={{
            filter: 'saturate(0.92) brightness(0.82)',
            animation: 'ex-photo-zoom 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* Tint da cor do acento */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${ex.accent}30, transparent 55%)`,
            mixBlendMode: 'overlay',
          }}
        />
        {/* Fade pra baixo */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0f0c1f)' }}
        />
        {/* Badge de ocasião */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium"
            style={{
              background: 'rgba(7,7,18,0.75)',
              border: `1px solid ${ex.accent}40`,
              color: ex.accent,
              backdropFilter: 'blur(8px)',
            }}
          >
            <span>{ex.emoji}</span>
            {ex.label}
          </span>
        </div>
        {/* URL no canto */}
        <div className="absolute top-4 right-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-wider font-mono"
            style={{
              background: 'rgba(7,7,18,0.75)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(240,238,248,0.55)',
              backdropFilter: 'blur(8px)',
            }}
          >
            eternare.it/{ex.slug}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="px-7 pt-4 pb-7 flex flex-col gap-4 -mt-8 relative">

        {/* Contador pílula */}
        <div className="self-start">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{
              background: `${ex.accent}18`,
              border: `1px solid ${ex.accent}35`,
              color: ex.accent,
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: ex.accent, boxShadow: `0 0 8px ${ex.accent}` }}
            />
            {ex.counter}
          </span>
        </div>

        {/* Título */}
        <h3
          className="text-3xl md:text-4xl leading-tight"
          style={{
            fontFamily: 'Georgia, serif',
            color: '#f0eef8',
            fontStyle: 'italic',
          }}
        >
          {ex.title}
        </h3>

        {/* Data */}
        <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgba(240,238,248,0.35)' }}>
          {ex.date}
        </p>

        {/* Quote */}
        <div className="relative pl-4 py-1">
          <div
            className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full"
            style={{ background: `linear-gradient(to bottom, ${ex.accent}, transparent)` }}
          />
          <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.72)', fontFamily: 'Georgia, serif' }}>
            "{ex.text}"
          </p>
        </div>

        {/* Música */}
        <div
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 mt-1"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: `${ex.accent}20`, border: `1px solid ${ex.accent}35` }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill={ex.accent}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium truncate" style={{ color: 'rgba(240,238,248,0.85)' }}>
              {ex.song}
            </p>
            <div
              className="h-0.5 mt-1.5 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)' }}
            >
              <div
                className="ex-playbar h-full rounded-full"
                style={{
                  width: '40%',
                  backgroundImage: `linear-gradient(90deg, ${ex.accent}, ${ex.accent}60, ${ex.accent})`,
                }}
              />
            </div>
          </div>
          <span className="text-[10px] font-mono shrink-0" style={{ color: 'rgba(240,238,248,0.35)' }}>
            1:23
          </span>
        </div>
      </div>
    </article>
  )
}

export function Examples() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.4)
  const [activeId, setActiveId] = useState<string>(EXAMPLES[0].id)
  const active = EXAMPLES.find(e => e.id === activeId) ?? EXAMPLES[0]

  return (
    <section className="backdrop-blur-lg py-24 md:py-32 border-b border-white/10 z-10 relative">
      <style>{STYLES}</style>

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div
          ref={headingRef as React.RefObject<HTMLDivElement>}
          className="text-center mb-14"
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
              className="text-3xl md:text-5xl font-light leading-tight"
              style={{
                fontFamily: 'Georgia, serif',
                color: '#f0eef8',
                transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
                transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s',
              }}
            >
              Momentos que merecem{' '}
              <em
                style={{
                  color: '#b06fff',
                  display: 'inline-block',
                  clipPath: headingVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                  transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1) 0.38s',
                }}
              >
                ser lembrados
              </em>
            </h2>
          </div>

          <p
            className="mt-5 text-[14px] max-w-md mx-auto"
            style={{
              color: 'rgba(240,238,248,0.45)',
              opacity: headingVisible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.5s',
            }}
          >
            Escolha a ocasião e veja como a sua memória pode ficar.
          </p>
        </div>

        {/* Seletor de ocasião */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
          }}
        >
          {EXAMPLES.map(ex => {
            const isActive = ex.id === activeId
            return (
              <button
                key={ex.id}
                onClick={() => setActiveId(ex.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${ex.accent}25, ${ex.accent}10)`
                    : 'rgba(255,255,255,0.03)',
                  border: isActive
                    ? `1px solid ${ex.accent}60`
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? ex.accent : 'rgba(240,238,248,0.55)',
                  boxShadow: isActive ? `0 0 20px ${ex.accent}30` : 'none',
                }}
              >
                <span>{ex.emoji}</span>
                {ex.label}
              </button>
            )
          })}
        </div>

        {/* Preview */}
        <ExamplePreview ex={active} />

      </div>
    </section>
  )
}

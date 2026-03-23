// src/components/ui/sections/Hero.tsx
import { useNavigate } from 'react-router-dom'

const PREVIEW_CARDS = [
  {
    bgColor: '#1a0a1a',
    photo: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400',
    title: 'EU TE AMO',
    label: 'Dia dos Namorados',
    size: 'large',
  },
  {
    bgColor: '#0d1a2e',
    photo: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=400',
    title: 'MEU HERÓI',
    label: 'Dia dos Pais',
    size: 'small',
  },
]

function MiniMemoryCard({ card }: { card: typeof PREVIEW_CARDS[0] }) {
  const isLarge = card.size === 'large'
  return (
    <div
      className="rounded-2xl overflow-hidden shrink-0"
      style={{
        background: card.bgColor,
        border: '1px solid rgba(255,255,255,0.08)',
        width: isLarge ? 160 : 110,
      }}
    >
      <div className="p-2">
        <div className="bg-white rounded-xl p-1.5 pb-5">
          <div
            className="rounded-lg overflow-hidden"
            style={{ aspectRatio: '1/1' }}
          >
            <img src={card.photo} alt="" className="w-full h-full object-cover block" />
          </div>
          <p className="text-[7px] tracking-widest uppercase text-black/20 text-center mt-1 font-medium">
            eternare
          </p>
        </div>
      </div>
      <div className="px-2.5 pb-3">
        <div className="flex items-center gap-1 mt-1">
          <div className="w-[2px] self-stretch rounded-sm flex-shrink-0 bg-red-600" />
          <p className="text-[9px] font-extrabold uppercase tracking-wider text-white leading-tight">
            {card.title}
          </p>
        </div>
        <p className="text-[7px] mt-1" style={{ color: 'rgba(240,238,248,0.4)' }}>
          {card.label}
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="min-h-screen flex items-center pt-20 pb-12 px-6">
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Coluna esquerda — texto */}
        <div className="flex flex-col gap-6">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] self-start"
            style={{
              background: 'rgba(124,106,255,0.1)',
              border: '1px solid rgba(124,106,255,0.25)',
              color: '#b06fff',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#b06fff', animation: 'pulse 2s infinite' }}
            />
            Eternize o que importa
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            Transforme memórias em{' '}
            <em style={{ color: '#b06fff' }}>páginas eternas</em>
          </h1>

          <p className="text-[16px] leading-relaxed max-w-md" style={{ color: 'rgba(240,238,248,0.55)' }}>
            Crie uma página única com fotos, música e palavras que vão durar para sempre — compartilhe com um link ou QR Code.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/criar')}
              className="px-6 py-3.5 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-88 hover:-translate-y-0.5"
              style={{
                background: 'linear-gradient(135deg, #7c6aff, #b06fff)',
                boxShadow: '0 0 32px rgba(124,106,255,0.3)',
              }}
            >
              Criar minha memória
            </button>
            <button
              className="px-6 py-3.5 rounded-xl text-[14px] font-medium transition-all hover:text-white"
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(240,238,248,0.5)',
              }}
            >
              Ver exemplos
            </button>
          </div>
        </div>

        {/* Coluna direita — preview de cards */}
        <div className="hidden lg:flex items-end justify-center gap-4">
          {/* Card grande */}
          <MiniMemoryCard card={PREVIEW_CARDS[0]} />

          {/* Stack de dois cards pequenos */}
          <div className="flex flex-col gap-4 mb-8">
            <MiniMemoryCard card={PREVIEW_CARDS[1]} />
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                width: 110,
                height: 80,
                background: '#1a0a0a',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p className="text-[9px] font-bold uppercase tracking-wider text-white/30">
                + sua memória
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(240,238,248,0.25)' }}>
          Rolar
        </p>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(124,106,255,0.6), transparent)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
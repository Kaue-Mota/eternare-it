// src/components/ui/sections/Reviews.tsx
import { useInView } from '../../../hooks/useInView'

const REVIEWS = [
  {
    name: 'Ana Medeiros',
    handle: '@anamedeiros',
    initials: 'AM',
    color: 'linear-gradient(135deg, #7c6aff, #b06fff)',
    stars: 5,
    text: 'Presentei minha mãe com a memória do nosso último Natal com meu pai. Ela chorou de emoção ao escanear o QR Code.',
  },
  {
    name: 'Rafael Lima',
    handle: '@rafaellima',
    initials: 'RL',
    color: 'linear-gradient(135deg, #1d9e75, #0f6e56)',
    stars: 5,
    text: 'Coloquei o QR Code no convite de casamento. Os convidados podiam acessar a história do casal antes da cerimônia. Lindo demais.',
  },
  {
    name: 'Camila Souza',
    handle: '@camilasouza',
    initials: 'CS',
    color: 'linear-gradient(135deg, #d4537e, #993556)',
    stars: 5,
    text: 'Simples de criar, incrivelmente bonito no resultado. Vale cada centavo. Já fiz cinco memórias diferentes.',
  },
  {
    name: 'Pedro Costa',
    handle: '@pedrocosta',
    initials: 'PC',
    color: 'linear-gradient(135deg, #378add, #185fa5)',
    stars: 5,
    text: 'Fiz uma memória do aniversário de 1 ano da minha filha. Ela vai poder ver isso quando crescer. Melhor presente que já dei.',
  },
  {
    name: 'Juliana Ramos',
    handle: '@julianaramos',
    initials: 'JR',
    color: 'linear-gradient(135deg, #ff8c42, #cc5500)',
    stars: 5,
    text: 'Dei de presente para minha avó no Dia das Mães. Ela ficou impressionada com como ficou bonito. Uma recordação muito especial.',
  },
  {
    name: 'Lucas Mendes',
    handle: '@lucasmendes',
    initials: 'LM',
    color: 'linear-gradient(135deg, #a855f7, #6d28d9)',
    stars: 5,
    text: 'Fiz para o meu melhor amigo como presente de formatura. Reunimos fotos dos 5 anos de faculdade. Ele amou demais.',
  },
  {
    name: 'Fernanda Alves',
    handle: '@fernandaalves',
    initials: 'FA',
    color: 'linear-gradient(135deg, #ec4899, #be185d)',
    stars: 5,
    text: 'Cada detalhe da plataforma é pensado com carinho. O preview ao vivo é incrível — você já vai vendo como fica antes de pagar.',
  },
  {
    name: 'Bruno Carvalho',
    handle: '@brunocarvalho',
    initials: 'BC',
    color: 'linear-gradient(135deg, #14b8a6, #0f766e)',
    stars: 5,
    text: 'Criei uma memória para o nosso aniversário de namoro. Minha namorada ficou sem palavras. Recomendo demais para presentear.',
  },
]

// Duplica para loop infinito
const ROW1 = [...REVIEWS, ...REVIEWS]
const ROW2 = [...REVIEWS.slice().reverse(), ...REVIEWS.slice().reverse()]

const MARQUEE_STYLES = `
  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .marquee-track-left {
    animation: marquee-left 40s linear infinite;
    will-change: transform;
  }
  .marquee-track-right {
    animation: marquee-right 34s linear infinite;
    will-change: transform;
  }
  .marquee-track-left:hover,
  .marquee-track-right:hover {
    animation-play-state: paused;
  }
`

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#f5c842">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: typeof REVIEWS[0] }) {
  return (
    <div
      className="w-72 shrink-0 rounded-2xl p-5 flex flex-col gap-4 select-none"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Stars count={review.stars} />

      <p
        className="text-[13px] leading-relaxed flex-1"
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          color: 'rgba(240,238,248,0.72)',
        }}
      >
        "{review.text}"
      </p>

      <div
        className="flex items-center gap-2.5 pt-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div
          className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: review.color }}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-[13px] font-medium text-white leading-tight">{review.name}</p>
          <p className="text-[11px]" style={{ color: 'rgba(240,238,248,0.3)' }}>{review.handle}</p>
        </div>
      </div>
    </div>
  )
}

export function Reviews() {
  const { ref: headingRef, inView: headingVisible } = useInView(0.4)

  return (
    <section className="relative z-10 py-24 overflow-hidden">
      <style>{MARQUEE_STYLES}</style>

      {/* Header com reveal por linha */}
      <div
        ref={headingRef as React.RefObject<HTMLDivElement>}
        className="text-center mb-14 px-6"
      >
        <div style={{ overflow: 'hidden' }}>
          <p
            className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3"
            style={{
              transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Depoimentos
          </p>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <h2
            className="text-3xl md:text-4xl font-light leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              color: '#f0eef8',
              transform: headingVisible ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.08s',
            }}
          >
            O que dizem quem{' '}
            <em
              style={{
                color: '#b06fff',
                display: 'inline-block',
                clipPath: headingVisible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s',
              }}
            >
              guardou
            </em>
          </h2>
        </div>
      </div>

      {/* Linha 1 — rola para a esquerda */}
      <div
        className="overflow-hidden mb-4"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? 'translateX(0)' : 'translateX(-32px)',
          transition: 'opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s',
        }}
      >
        <div className="flex gap-4 marquee-track-left" style={{ width: 'max-content' }}>
          {ROW1.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>

      {/* Linha 2 — rola para a direita */}
      <div
        className="overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          opacity: headingVisible ? 1 : 0,
          transform: headingVisible ? 'translateX(0)' : 'translateX(32px)',
          transition: 'opacity 0.8s ease 0.45s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s',
        }}
      >
        <div className="flex gap-4 marquee-track-right" style={{ width: 'max-content' }}>
          {ROW2.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
    </section>
  )
}

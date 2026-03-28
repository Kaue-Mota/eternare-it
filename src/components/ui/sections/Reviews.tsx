// src/components/ui/sections/Reviews.tsx

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
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f5c842">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function Reviews() {
  return (
    <section className="py-24 relative min-h-screen overflow-hidden bg-[#0a0a1f]" >
      {/* glow roxo */}
  <div className="absolute -top-40 -left-40 h-100 w-100 rounded-full bg-purple-600/30 blur-[120px]" />

  {/* glow azul */}
  <div className="absolute top-40 -right-25 h-100 w-100 rounded-full bg-blue-500/30 blur-[120px]" />

  {/* conteúdo */}
  <div className="relative mt-40 z-10">
    {/* sua landing */}
  </div>
      <div className="max-w-5xl mx-auto  px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">
            Depoimentos
          </p>
          <h2
            className="text-3xl md:text-4xl font-light leading-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            O que dizem quem<br />
            <em style={{ color: '#b06fff' }}>eternizou</em>
          </h2>
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEWS.map((review) => (
            <div
              key={review.handle}
              className="rounded-2xl p-5 flex flex-col gap-4"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <Stars count={review.stars} />

              <p
                className="text-[13px] leading-relaxed flex-1"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  color: 'rgba(240,238,248,0.7)',
                }}
              >
                "{review.text}"
              </p>

              <div className="flex items-center gap-2.5 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-white"
                  style={{ background: review.color }}
                >
                  {review.initials}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white leading-tight">{review.name}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(240,238,248,0.35)' }}>{review.handle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
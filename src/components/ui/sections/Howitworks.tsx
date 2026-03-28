// src/components/ui/sections/HowItWorks.tsx

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
    text: 'Pagamento seguro via Stripe. Rápido e sem complicação.',
  },
  {
    number: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    title: 'Compartilhe para sempre',
    text: 'Receba seu link exclusivo e QR Code. Sua memória está viva.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[rgba(5,6,18,0.88)] backdrop-blur-lg">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-4">
            Como funciona
          </p>
          <h2
            className="text-4xl md:text-5xl font-light leading-tight mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            Simples como lembrar
          </h2>
          <p className="text-[15px] max-w-md" style={{ color: 'rgba(240,238,248,0.45)' }}>
            Em poucos passos, sua memória ganha vida em uma página exclusiva, pronta para ser compartilhada.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col gap-5 px-6 py-8"
              style={{
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Número */}
              <p
                className="text-5xl font-light leading-none"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: 'rgba(124,106,255,0.18)',
                  letterSpacing: '-0.02em',
                }}
              >
                {step.number}
              </p>

              {/* Ícone */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(124,106,255,0.1)',
                  border: '1px solid rgba(124,106,255,0.2)',
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
          ))}
        </div>

      </div>
    </section>
  )
}
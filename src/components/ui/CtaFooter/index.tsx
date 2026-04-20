// src/components/ui/CtaFooter/index.tsx
import { useNavigate, Link } from 'react-router-dom'
import { useInView } from '../../../hooks/useInView'

const CTA_STYLES = `
  @keyframes ring-expand {
    0%   { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2);   opacity: 0; }
  }
  @keyframes cta-glow {
    0%, 100% { box-shadow: 0 0 32px rgba(124,106,255,0.3), 0 4px 20px rgba(0,0,0,0.3); }
    50%       { box-shadow: 0 0 64px rgba(124,106,255,0.55), 0 4px 20px rgba(0,0,0,0.3); }
  }
  @keyframes shimmer-cta {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
  }
`

export function Cta() {
  const navigate = useNavigate()
  const { ref: sectionRef, inView } = useInView(0.25)
  const { ref: badgeRef, inView: badgeIn } = useInView(0.4)

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-36 relative overflow-hidden z-10"
      style={{ background: '#070712' }}
    >
      <style>{CTA_STYLES}</style>

      {/* Glow central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(124,106,255,0.1) 0%, transparent 70%)',
          opacity: inView ? 1 : 0,
          transition: 'opacity 1s ease',
        }}
      />

      {/* Anéis expansivos — disparam ao entrar em viewport */}
      {inView && [0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border pointer-events-none"
          style={{
            width: 320,
            height: 320,
            top: '50%',
            left: '50%',
            borderColor: 'rgba(124,106,255,0.15)',
            animation: `ring-expand ${2.8 + i * 0.9}s ${i * 0.85}s ease-out infinite`,
          }}
        />
      ))}

      <div className="max-w-2xl mx-auto px-6 text-center relative">

        {/* Label */}
        <div style={{ overflow: 'hidden' }}>
          <p
            className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-4"
            style={{
              transform: inView ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Comece agora
          </p>
        </div>

        {/* Título — linha 1 */}
        <div style={{ overflow: 'hidden' }}>
          <h2
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{
              fontFamily: 'Georgia, serif',
              color: '#f0eef8',
              transform: inView ? 'translateY(0)' : 'translateY(100%)',
              transition: 'transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.08s',
            }}
          >
            Alguns momentos merecem
          </h2>
        </div>

        {/* Título — linha 2 (accent com clip-path) */}
        <div style={{ overflow: 'hidden', marginBottom: '1.25rem' }}>
          <h2
            className="text-3xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            <em
              style={{
                color: '#b06fff',
                display: 'inline-block',
                clipPath: inView ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 1s cubic-bezier(0.16,1,0.3,1) 0.35s',
              }}
            >
              ser lembrado com carinho
            </em>
          </h2>
        </div>

        {/* Subtítulo */}
        <p
          className="text-[15px] mb-10"
          style={{
            color: 'rgba(240,238,248,0.48)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease 0.45s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.45s',
          }}
        >
          Crie sua primeira memória em menos de 5 minutos.
        </p>

        {/* Botão */}
        <div
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
            transition: 'opacity 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 0.75s cubic-bezier(0.16,1,0.3,1) 0.55s',
          }}
        >
          <button
            onClick={() => navigate('/criar')}
            className="relative overflow-hidden px-10 py-4 rounded-xl text-[15px] font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #7c6aff, #b06fff)',
              animation: inView ? 'cta-glow 3.5s ease-in-out infinite' : 'none',
            }}
          >
            <span
              className="absolute inset-y-0 w-1/3 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)',
                animation: 'shimmer-cta 4s 1.5s ease-in-out infinite',
              }}
            />
            <span className="relative z-10">Criar minha memória →</span>
          </button>
        </div>

        {/* Micro garantias */}
        <div
          ref={badgeRef as React.RefObject<HTMLDivElement>}
          className="flex flex-wrap items-center justify-center gap-5 mt-8"
          style={{
            opacity: badgeIn ? 1 : 0,
            transition: 'opacity 0.7s ease 0.2s',
          }}
        >
          {[
            {
              label: 'Pagamento seguro',
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              ),
            },
            {
              label: 'Link exclusivo',
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              ),
            },
            {
              label: 'QR Code por email',
              icon: (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
              ),
            },
          ].map((g) => (
            <span key={g.label} className="flex items-center gap-1.5 text-[12px]" style={{ color: 'rgba(240,238,248,0.28)' }}>
              {g.icon}
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#070712]" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        className="px-6 py-5 flex flex-wrap items-center justify-between gap-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <span
          className="text-[15px] font-medium"
          style={{
            background: 'linear-gradient(135deg, #b06fff, #7c6aff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          eternare.it
        </span>

        <div className="flex flex-wrap gap-5">
          {[
            { label: 'Sobre', to: '/sobre' },
            { label: 'Suporte', to: '/suporte' },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[13px] transition-colors hover:text-white"
              style={{ color: 'rgba(240,238,248,0.35)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px]" style={{ color: 'rgba(240,238,248,0.2)' }}>
          © 2026 Eternare. Todos os direitos reservados.
        </p>
        <div className="flex gap-5">
          {[
            { label: 'Termos de Uso', to: '/termos' },
            { label: 'Privacidade', to: '/privacidade' },
            { label: 'Reembolso', to: '/reembolso' },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[12px] transition-colors hover:text-white/60"
              style={{ color: 'rgba(240,238,248,0.2)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

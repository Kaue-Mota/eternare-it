// src/components/ui/sections/CtaFooter.tsx
import { useNavigate, Link } from 'react-router-dom'

export function Cta() {
  const navigate = useNavigate()

  return (
    <section className="py-32 relative overflow-hidden z-10 bg-[#070712]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(124,106,255,0.08) 0%, transparent 70%)' }}
      />
      <div className="max-w-2xl mx-auto px-6 text-center relative">
        <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-4">
          Comece agora
        </p>
        <h2
          className="text-3xl md:text-5xl font-light leading-tight mb-4"
          style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
        >
          Alguns momentos merecem<br />
          <em style={{ color: '#b06fff' }}>durar para sempre</em>
        </h2>
        <p className="text-[15px] mb-10" style={{ color: 'rgba(240,238,248,0.5)' }}>
          Crie sua primeira memória em menos de 5 minutos.
        </p>
        <button
          onClick={() => navigate('/criar')}
          className="px-8 py-4 rounded-xl text-[15px] font-medium text-white transition-all hover:opacity-88 hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #7c6aff, #b06fff)',
            boxShadow: '0 0 40px rgba(124,106,255,0.3)',
          }}
        >
          Criar minha memória
        </button>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className='bg-[#070712]'  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Links legais — linha superior */}
      <div className=" px-6 py-5 flex flex-wrap items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {/* Logo */}
       
          <span
            className="text-[15px] font-medium"
            style={{ background: 'linear-gradient(135deg, #b06fff, #7c6aff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            eternare.it
          </span>
      

        {/* Links de navegação */}
        <div className="flex flex-wrap gap-5">
          {[
            { label: 'Sobre', to: '/sobre' },
            { label: 'Suporte', to: '/suporte' },
          ].map((link) =>
            link.href ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-[13px] transition-colors hover:text-white"
                style={{ color: 'rgba(240,238,248,0.35)' }}>
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.to!}
                className="text-[13px] transition-colors hover:text-white"
                style={{ color: 'rgba(240,238,248,0.35)' }}>
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Copyright + links legais — linha inferior */}
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
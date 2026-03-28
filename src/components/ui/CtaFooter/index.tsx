// src/components/ui/sections/CtaFooter.tsx
import { useNavigate } from 'react-router-dom'

export function Cta() {
  const navigate = useNavigate()

  return (
    <section className="bg-[rgba(5,6,18,0.88)]  backdrop-blur-lg py-32 z-10 relative overflow-hidden">
      {/* Glow de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(124,106,255,0.08) 0%, transparent 70%)',
        }}
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
    <footer
      className="px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2C8 2 4 5 4 8.5C4 10.985 5.79 13 8 13C10.21 13 12 10.985 12 8.5C12 5 8 2 8 2Z" fill="white" fillOpacity="0.9" />
            <path d="M8 6C8 6 6 7.5 6 9C6 10.105 6.895 11 8 11C9.105 11 10 10.105 10 9C10 7.5 8 6 8 6Z" fill="white" fillOpacity="0.4" />
          </svg>
        </div>
        <span
          className="text-[15px] font-medium"
          style={{ background: 'linear-gradient(135deg, #b06fff, #7c6aff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          eternare.it
        </span>
      </div>

      {/* Links */}
      <div className="flex gap-6">
        {['Sobre', 'Privacidade', 'Termos', 'Suporte'].map((link) => (
          <a
            key={link}
            href="#"
            className="text-[13px] transition-colors hover:text-white"
            style={{ color: 'rgba(240,238,248,0.35)' }}
          >
            {link}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p className="text-[12px]" style={{ color: 'rgba(240,238,248,0.2)' }}>
        © 2026 Eternare. Todos os direitos reservados.
      </p>
    </footer>
  )
}
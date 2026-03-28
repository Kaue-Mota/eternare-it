// src/pages/AboutPage.tsx
import { Link, useNavigate } from 'react-router-dom'

export function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#070712] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link to="/" className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-10 inline-block">
          ← Voltar para o início
        </Link>

        {/* Header */}
        <div className="mb-14">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">Sobre</p>
          <h1
            className="text-4xl font-light leading-tight mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            Eternare nasceu de uma{' '}
            <em style={{ color: '#b06fff' }}>vontade simples</em>
          </h1>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.5)' }}>
            Guardar o que importa de um jeito bonito, acessível e para sempre.
          </p>
        </div>

        {/* Divisor */}
        <div className="h-px mb-14" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* História */}
        <div className="flex flex-col gap-5 mb-14">
          <h2 className="text-[18px] font-medium text-white">A história</h2>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.6)' }}>
            Tudo começou com uma pergunta: como você guarda uma memória especial hoje? Fotos no celular que se perdem, prints de conversa que somem, stories que expiram em 24 horas.
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.6)' }}>
            O Eternare surgiu para mudar isso. Criamos uma forma de transformar momentos especiais em páginas digitais únicas — com fotos, músicas, palavras e uma contagem do tempo que não para.
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.6)' }}>
            Cada memória criada aqui tem um link permanente e um QR Code para compartilhar. É simples, bonito e dura para sempre.
          </p>
        </div>

        {/* Divisor */}
        <div className="h-px mb-14" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Missão */}
        <div className="flex flex-col gap-5 mb-14">
          <h2 className="text-[18px] font-medium text-white">Nossa missão</h2>

          <div className="flex flex-col gap-4">
            {[
              { emoji: '🕯️', title: 'Eternizar o que importa', text: 'Acreditamos que momentos especiais merecem um lugar permanente — não só na memória, mas na internet.' },
              { emoji: '✨', title: 'Simplicidade com beleza', text: 'Criar uma memória deve ser tão fácil quanto sentir ela. Por isso o processo é rápido, intuitivo e o resultado é visualmente bonito.' },
              { emoji: '🔒', title: 'Seu momento, sua página', text: 'Cada memória é única. O link é seu, o QR Code é seu, o conteúdo é seu — para sempre.' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl px-5 py-4 flex gap-4 items-start"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{item.emoji}</span>
                <div>
                  <p className="text-[14px] font-medium text-white mb-1">{item.title}</p>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(240,238,248,0.5)' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl px-6 py-8 text-center"
          style={{ background: 'rgba(124,106,255,0.08)', border: '1px solid rgba(124,106,255,0.15)' }}
        >
          <p
            className="text-2xl font-light mb-2"
            style={{ fontFamily: 'Georgia, serif', color: '#f0eef8' }}
          >
            Pronto para eternizar um momento?
          </p>
          <p className="text-[13px] mb-6" style={{ color: 'rgba(240,238,248,0.4)' }}>
            Crie sua primeira memória em menos de 5 minutos.
          </p>
          <button
            onClick={() => navigate('/criar')}
            className="px-6 py-3 rounded-xl text-[14px] font-medium text-white transition-all hover:opacity-88"
            style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
          >
            Criar minha memória
          </button>
        </div>

      </div>
    </div>
  )
}
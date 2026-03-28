// src/pages/legal/RefundPage.tsx
import { Link } from 'react-router-dom'

export function RefundPage() {
  return (
    <div className="min-h-screen bg-[#070712] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link to="/" className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-10 inline-block">
          ← Voltar para o início
        </Link>

        <div className="mb-10">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">Legal</p>
          <h1 className="text-3xl font-semibold text-white mb-2">Política de Reembolso</h1>
          <p className="text-white/40 text-sm">eternare.it</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <Section title="1. Natureza do serviço">
            <p>O eternare.it oferece um produto digital personalizado, criado com base nas informações fornecidas pelo usuário.</p>
          </Section>

          <Section title="2. Reembolsos">
            <p>Devido à natureza personalizada do serviço, <strong className="text-white/90">não realizamos reembolsos após a criação da memória.</strong></p>
          </Section>

          <Section title="3. Exceções">
            <p>Em casos de erro técnico comprovado que impeça o uso do serviço, o usuário pode entrar em contato para análise individual do caso.</p>
          </Section>

          <Section title="4. Contato">
            <p>Para suporte ou solicitação, entre em contato via WhatsApp: <a href="https://wa.me/5561991014779" className="text-[#7c6aff] hover:underline">61 99101-4779</a></p>
          </Section>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[16px] font-semibold text-white">{title}</h2>
      {children}
    </div>
  )
}
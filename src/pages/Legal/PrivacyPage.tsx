// src/pages/legal/PrivacyPage.tsx
import { Link } from 'react-router-dom'

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#070712] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link to="/" className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-10 inline-block">
          ← Voltar para o início
        </Link>

        <div className="mb-10">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">Legal</p>
          <h1 className="text-3xl font-semibold text-white mb-2">Política de Privacidade</h1>
          <p className="text-white/40 text-sm">eternare.it — Sua privacidade é importante para nós.</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <Section title="1. Dados coletados">
            <p>Podemos coletar as seguintes informações: nome (quando fornecido), email, fotos enviadas e conteúdo da memória (texto, data, música).</p>
          </Section>

          <Section title="2. Uso dos dados">
            <p>Os dados são utilizados para criação e exibição das memórias, processamento de pagamentos (via Stripe) e envio de emails relacionados ao serviço.</p>
          </Section>

          <Section title="3. Compartilhamento de dados">
            <p>Não vendemos nem compartilhamos seus dados pessoais com terceiros, exceto quando necessário para o funcionamento do serviço:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Stripe</span> — processamento de pagamentos</li>
              <li><span className="text-white/60">Resend</span> — envio de emails</li>
              <li><span className="text-white/60">Cloudflare R2</span> — armazenamento de imagens</li>
            </ul>
          </Section>

          <Section title="4. Armazenamento">
            <p>Os dados são armazenados de forma segura e utilizados apenas para o funcionamento da plataforma.</p>
          </Section>

          <Section title="5. Segurança">
            <p>Adotamos medidas técnicas para proteger suas informações, mas não garantimos segurança absoluta contra todos os riscos.</p>
          </Section>

          <Section title="6. Contato">
            <p>Para dúvidas sobre privacidade, entre em contato via WhatsApp: <a href="https://wa.me/5561991014779" className="text-[#7c6aff] hover:underline">61 99101-4779</a></p>
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
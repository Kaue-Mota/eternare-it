// src/pages/legal/TermsPage.tsx
import { Link } from 'react-router-dom'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-[#070712] text-white px-6 py-16">
      <div className="max-w-2xl mx-auto">

        <Link to="/" className="text-[12px] text-white/30 hover:text-white/60 transition-colors mb-10 inline-block">
          ← Voltar para o início
        </Link>

        <div className="mb-10">
          <p className="text-[11px] tracking-[0.18em] uppercase text-[#7c6aff] mb-3">Legal</p>
          <h1 className="text-3xl font-semibold text-white mb-2">Termos de Uso</h1>
          <p className="text-white/40 text-sm">eternare.it</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <p>Ao acessar e utilizar o site eternare.it, você concorda com os termos descritos abaixo.</p>

          <Section title="1. Sobre o serviço">
            <p>O eternare.it é uma plataforma que permite a criação de páginas digitais personalizadas para eternizar momentos especiais, incluindo fotos, textos, datas e músicas.</p>
            <p>Após a finalização do pagamento, o usuário recebe um link único e permanente para acesso à sua memória.</p>
          </Section>

          <Section title="2. Responsabilidade do usuário">
            <p>O usuário é totalmente responsável pelo conteúdo inserido na plataforma, incluindo imagens enviadas, textos escritos e links adicionados.</p>
            <p>É proibido utilizar o serviço para conteúdo ilegal, conteúdo ofensivo, discriminatório ou abusivo, ou violação de direitos autorais de terceiros.</p>
            <p>O eternare.it se reserva o direito de remover conteúdos que violem estes termos.</p>
          </Section>

          <Section title="3. Disponibilidade do serviço">
            <p>Nos esforçamos para manter o serviço disponível de forma contínua, porém não garantimos disponibilidade ininterrupta. O serviço pode sofrer interrupções para manutenção, melhorias ou por fatores externos.</p>
          </Section>

          <Section title="4. Alterações">
            <p>Os termos podem ser atualizados a qualquer momento sem aviso prévio. Recomendamos a revisão periódica desta página.</p>
          </Section>

          <Section title="5. Contato">
            <p>Em caso de dúvidas ou suporte, entre em contato via WhatsApp: <a href="https://wa.me/5561991014779" className="text-[#7c6aff] hover:underline">61 99101-4779</a></p>
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
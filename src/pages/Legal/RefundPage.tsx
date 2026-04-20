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
          <p className="text-white/40 text-sm">eternare.it — Última atualização: 20/04/2026</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <Section title="1. Natureza do serviço">
            <p>O eternare.it oferece um produto digital personalizado, criado sob demanda com base no conteúdo fornecido pelo próprio usuário (fotos, textos, datas e músicas).</p>
          </Section>

          <Section title="2. Direito de arrependimento (Art. 49 do CDC)">
            <p>Em conformidade com o Art. 49 do Código de Defesa do Consumidor, o consumidor tem o prazo de <strong className="text-white/90">7 (sete) dias</strong>, contados da contratação, para desistir da compra sem justificativa.</p>
            <p>Este direito pode ser exercido <strong className="text-white/90">antes da geração final da página de memória</strong> — momento em que o serviço personalizado passa a ser considerado executado sob medida, nos termos do §único do Art. 49.</p>
            <p>Para exercer o arrependimento dentro desse prazo, basta entrar em contato pelos canais abaixo. O reembolso será feito integralmente pelo mesmo meio de pagamento utilizado, em até 7 dias úteis.</p>
          </Section>

          <Section title="3. Após a criação da memória">
            <p>Uma vez que a página de memória tenha sido gerada e o link/QR Code enviado, por se tratar de <strong className="text-white/90">bem digital personalizado e sob medida</strong>, não são oferecidos reembolsos por mera desistência.</p>
            <p>O usuário continua com todos os direitos previstos em lei quanto a vícios, defeitos e problemas de execução do serviço, conforme a seção seguinte.</p>
          </Section>

          <Section title="4. Problemas técnicos e vícios do serviço">
            <p>Se houver erro técnico comprovado que impeça a visualização da memória, corrompa o conteúdo, ou configure falha do fornecedor na entrega do serviço contratado, o usuário pode solicitar:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li>Correção do problema sem custo adicional, ou</li>
              <li>Reembolso integral do valor pago, se a correção não for possível em prazo razoável</li>
            </ul>
            <p>Aplicam-se os prazos e regras do Art. 18 e seguintes do CDC.</p>
          </Section>

          <Section title="5. Como solicitar">
            <p>Para qualquer solicitação de reembolso ou exercício do direito de arrependimento, envie:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li>Email do cadastro</li>
              <li>Data da compra</li>
              <li>Motivo (quando aplicável)</li>
            </ul>
            <p>Canais de atendimento:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Email:</span> pckaue1234@gmail.com</li>
              <li><span className="text-white/60">WhatsApp:</span> <a href="https://wa.me/5561991014779" className="text-[#7c6aff] hover:underline">61 99101-4779</a></li>
            </ul>
          </Section>

          <Section title="6. Complemento aos Termos">
            <p>Esta política é parte integrante dos <Link to="/termos" className="text-[#7c6aff] hover:underline">Termos de Uso</Link> e deve ser lida em conjunto com a <Link to="/privacidade" className="text-[#7c6aff] hover:underline">Política de Privacidade</Link>.</p>
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

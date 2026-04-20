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
          <p className="text-white/40 text-sm">eternare.it — Última atualização: 20/04/2026</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <Section title="1. Aceitação">
            <p>Ao acessar e utilizar o site eternare.it, você declara ter lido, compreendido e aceito integralmente estes termos. A identificação completa do fornecedor encontra-se ao final deste documento.</p>
          </Section>

          <Section title="2. Sobre o serviço">
            <p>O eternare.it é uma plataforma digital que permite ao usuário criar páginas personalizadas para registrar momentos especiais, contendo fotos, textos, datas e músicas escolhidos por ele.</p>
            <p>Após a confirmação do pagamento, o usuário recebe um link exclusivo de acesso à sua memória, disponível enquanto o serviço estiver ativo e o conteúdo não violar estes termos.</p>
            <p>A plataforma não oferece garantia de disponibilidade perpétua. Em caso de descontinuação do serviço, o usuário será comunicado com antecedência razoável por email.</p>
          </Section>

          <Section title="3. Cadastro e pagamento">
            <p>Para utilizar o serviço, o usuário fornece dados necessários à criação da memória (nome, email, fotos, texto e demais informações).</p>
            <p>O pagamento é processado pela Stripe, responsável pela segurança das transações. Não armazenamos dados de cartão de crédito.</p>
          </Section>

          <Section title="4. Direito de arrependimento (Art. 49 do CDC)">
            <p>Nos termos do Art. 49 do Código de Defesa do Consumidor, o consumidor dispõe de <strong className="text-white/90">7 (sete) dias</strong>, contados da data da contratação, para desistir da compra.</p>
            <p>O direito de arrependimento poderá ser exercido <strong className="text-white/90">antes da geração final da página de memória</strong>. Após a execução do serviço personalizado (criação e envio do link/QR Code), aplicam-se as regras da <Link to="/reembolso" className="text-[#7c6aff] hover:underline">Política de Reembolso</Link>.</p>
          </Section>

          <Section title="5. Responsabilidade do usuário e conteúdo">
            <p>O usuário é integral e exclusivamente responsável pelo conteúdo inserido na plataforma, incluindo fotos, textos, músicas e links.</p>
            <p>Ao enviar conteúdo, o usuário declara e garante que:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li>Possui todos os direitos sobre o material (ou autorização dos titulares)</li>
              <li>O conteúdo não viola direitos autorais, de imagem ou de privacidade de terceiros</li>
              <li>Possui consentimento expresso das pessoas retratadas nas fotos, especialmente quando menores de idade</li>
              <li>O conteúdo não é ilegal, ofensivo, discriminatório, violento, sexual ou abusivo</li>
            </ul>
            <p>É proibido utilizar o serviço para: difamação, discurso de ódio, pornografia, conteúdo envolvendo menores em situação inadequada, violação de direitos autorais ou qualquer finalidade ilegal.</p>
            <p>O eternare.it se reserva o direito de remover, sem aviso prévio e sem reembolso, qualquer conteúdo que viole estes termos, e de cooperar com autoridades quando legalmente exigido.</p>
          </Section>

          <Section title="6. Propriedade intelectual">
            <p>O usuário mantém todos os direitos sobre o conteúdo que envia. Ao utilizar o serviço, concede ao eternare.it licença limitada, não exclusiva e gratuita para armazenar, processar e exibir esse conteúdo com a única finalidade de prestar o serviço contratado.</p>
            <p>A marca, o design, o código e os demais elementos da plataforma eternare.it são de titularidade exclusiva do fornecedor, sendo vedada sua reprodução sem autorização.</p>
          </Section>

          <Section title="7. Limitação de responsabilidade">
            <p>Nos esforçamos para manter o serviço disponível de forma contínua, porém não garantimos disponibilidade ininterrupta. O serviço pode sofrer interrupções por manutenção, atualizações ou fatores externos (falhas de provedores, infraestrutura, ataques, caso fortuito ou força maior).</p>
            <p>O eternare.it não se responsabiliza por: perdas indiretas, danos causados pelo uso indevido da plataforma pelo usuário, conteúdo inserido por terceiros, ou indisponibilidade temporária decorrente de causas alheias ao seu controle.</p>
            <p>Em qualquer hipótese, a responsabilidade do fornecedor fica limitada ao valor efetivamente pago pelo usuário pela memória em questão.</p>
          </Section>

          <Section title="8. Privacidade e proteção de dados">
            <p>O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados (Lei 13.709/2018). Detalhes estão descritos na <Link to="/privacidade" className="text-[#7c6aff] hover:underline">Política de Privacidade</Link>.</p>
          </Section>

          <Section title="9. Alterações dos termos">
            <p>Estes termos podem ser atualizados a qualquer momento. Alterações relevantes serão comunicadas por email ou aviso em destaque no site. O uso contínuo da plataforma após a atualização implica concordância com os novos termos.</p>
          </Section>

          <Section title="10. Lei aplicável e foro">
            <p>Estes termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca do domicílio do consumidor para dirimir quaisquer controvérsias, nos termos do Art. 101, I, do CDC.</p>
          </Section>

          <Section title="11. Identificação do fornecedor e contato">
            <p>O serviço eternare.it é oferecido por:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Titular:</span> Kaue Ferreira Mota</li>
              <li><span className="text-white/60">CPF:</span> 101.704.571-25</li>
              <li><span className="text-white/60">Endereço:</span> Cond. Versales, Conjunto D, Casa 27, Brasília/DF, CEP 73090-165</li>
              <li><span className="text-white/60">Email:</span> pckaue1234@gmail.com</li>
              <li><span className="text-white/60">WhatsApp:</span> <a href="https://wa.me/5561991014779" className="text-[#7c6aff] hover:underline">61 99101-4779</a></li>
            </ul>
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

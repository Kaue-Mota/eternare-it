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
          <p className="text-white/40 text-sm">eternare.it — Última atualização: 20/04/2026</p>
        </div>

        <div className="flex flex-col gap-8 text-[15px] leading-relaxed text-white/70">

          <Section title="1. Sobre esta política">
            <p>Esta política descreve como coletamos, usamos, armazenamos e protegemos seus dados, em conformidade com a Lei Geral de Proteção de Dados — LGPD (Lei 13.709/2018). A identificação do controlador dos dados encontra-se ao final deste documento.</p>
          </Section>

          <Section title="2. Dados coletados">
            <p>Coletamos apenas os dados estritamente necessários à prestação do serviço:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Identificação:</span> nome fornecido e email</li>
              <li><span className="text-white/60">Conteúdo da memória:</span> fotos, textos, datas e link de música escolhidos pelo usuário</li>
              <li><span className="text-white/60">Pagamento:</span> processado pela Stripe. Não armazenamos dados de cartão</li>
              <li><span className="text-white/60">Técnicos:</span> endereço IP e dados básicos de navegação para segurança</li>
            </ul>
          </Section>

          <Section title="3. Finalidades e bases legais">
            <p>Tratamos seus dados com as seguintes finalidades e bases legais:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Execução do contrato (Art. 7º, V da LGPD):</span> criar e exibir sua memória, enviar o link e QR Code, processar pagamento</li>
              <li><span className="text-white/60">Obrigação legal (Art. 7º, II):</span> cumprimento de obrigações fiscais e legais</li>
              <li><span className="text-white/60">Legítimo interesse (Art. 7º, IX):</span> segurança da plataforma e prevenção a fraudes</li>
              <li><span className="text-white/60">Consentimento (Art. 7º, I):</span> quando o próprio usuário insere dados de terceiros (ex.: pessoas retratadas nas fotos), declara ter obtido consentimento destas</li>
            </ul>
          </Section>

          <Section title="4. Dados de crianças e adolescentes">
            <p>Caso o usuário insira fotos ou dados de crianças ou adolescentes, declara ter autorização expressa dos responsáveis legais, nos termos do Art. 14 da LGPD. A responsabilidade por essa autorização é integralmente do usuário.</p>
          </Section>

          <Section title="5. Compartilhamento com terceiros">
            <p>Não vendemos dados pessoais. Compartilhamos apenas com operadores necessários à prestação do serviço:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Stripe</span> — processamento de pagamentos</li>
              <li><span className="text-white/60">Resend</span> — envio de emails transacionais</li>
              <li><span className="text-white/60">Cloudflare R2</span> — armazenamento seguro de imagens</li>
            </ul>
            <p>Parte desses serviços pode envolver transferência internacional de dados. Esses fornecedores possuem garantias contratuais e técnicas de proteção compatíveis com a LGPD.</p>
          </Section>

          <Section title="6. Retenção dos dados">
            <p>Os dados da memória (fotos, textos etc.) são mantidos enquanto o link da memória estiver ativo. Dados cadastrais e de pagamento são retidos pelos prazos legais aplicáveis (fiscais, civis e de prescrição).</p>
            <p>O usuário pode solicitar a exclusão dos seus dados a qualquer momento, observadas as retenções legais obrigatórias.</p>
          </Section>

          <Section title="7. Direitos do titular">
            <p>Nos termos do Art. 18 da LGPD, o usuário pode, a qualquer momento, solicitar:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li>Confirmação da existência de tratamento</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos ou desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Portabilidade dos dados</li>
              <li>Eliminação dos dados tratados com consentimento</li>
              <li>Informação sobre compartilhamentos</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p>Para exercer qualquer direito, entre em contato por email: pckaue1234@gmail.com</p>
          </Section>

          <Section title="8. Segurança">
            <p>Adotamos medidas técnicas e administrativas razoáveis para proteger os dados contra acesso não autorizado, destruição, perda, alteração ou divulgação. Apesar disso, nenhuma tecnologia é absolutamente invulnerável, e o usuário reconhece esse risco inerente.</p>
            <p>Em caso de incidente de segurança relevante, comunicaremos a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados nos termos da lei.</p>
          </Section>

          <Section title="9. Cookies e rastreamento">
            <p>A plataforma utiliza apenas cookies estritamente necessários ao funcionamento do serviço (sessão, autenticação e segurança). Não utilizamos cookies de publicidade ou rastreamento de terceiros.</p>
          </Section>

          <Section title="10. Alterações">
            <p>Esta política pode ser atualizada. Alterações relevantes serão comunicadas por email ou aviso em destaque no site.</p>
          </Section>

          <Section title="11. Controlador e encarregado (DPO)">
            <p>O controlador dos dados pessoais e encarregado pelo tratamento (DPO) é:</p>
            <ul className="flex flex-col gap-1 pl-4 list-disc marker:text-white/30">
              <li><span className="text-white/60">Titular:</span> Kaue Ferreira Mota</li>
              <li><span className="text-white/60">CPF:</span> 101.704.571-25</li>
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

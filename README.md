# Eternare

<img width="1517" height="940" alt="Eternare — homepage" src="https://github.com/user-attachments/assets/a9b99acb-9fe5-494e-a6f4-0b2a34761128" />

> Transforme memórias em páginas digitais únicas e compartilháveis.

**Eternare** é uma plataforma SaaS que permite criar páginas digitais personalizadas para eternizar momentos especiais. O usuário preenche um formulário multi-etapa com fotos, título, data, texto e opções visuais — e recebe uma página exclusiva acessível por link permanente e QR Code, enviados automaticamente por email após o pagamento.

**Produção:** [eternareit.com](https://eternareit.com)

---

## Sumário

- [Funcionalidades](#funcionalidades)
- [Stack tecnológica](#stack-tecnológica)
- [Arquitetura e fluxo](#arquitetura-e-fluxo)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Banco de dados](#banco-de-dados)
- [API — Referência de endpoints](#api--referência-de-endpoints)
- [Configuração local](#configuração-local)
- [Deploy](#deploy)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Custos estimados](#custos-estimados)
- [Páginas do site](#páginas-do-site)

---

## Funcionalidades

### Criação da memória (formulário multi-etapa)

O formulário é dividido em 6 steps + uma tela de revisão final:

| Step | O que o usuário faz |
|------|---------------------|
| 1 — Fotos | Upload de até 5 fotos (JPG, PNG ou WEBP, máx. 10 MB cada) |
| 2 — Identidade | Título (máx. 60 caracteres) e data do momento (não pode ser futura) |
| 3 — Texto | Mensagem personalizada (máx. 1200 caracteres) |
| 4 — Visual | Cor de fundo, animação de fundo, moldura das fotos e fontes |
| 5 — Emoji | Emoji que vai "chover" na tela quando a memória for aberta |
| 6 — Música | Link de uma faixa do Spotify para tocar automaticamente |
| 7 — Revisão | Preview completo da memória antes de ir para o checkout |

**Opções visuais disponíveis:**

- **Cores de fundo:** Noite (`#09090f`), Cosmos (`#1a0a1a`), Oceano (`#0d1a2e`), Vinho (`#1a0a0a`), Floresta (`#0a1a0a`), Âmbar (`#1a100a`)
- **Animações de fundo:** Estrelas, Brilhos, Chamas ou Nenhuma
- **Molduras:** Polaroid, Vintage, Minimalista ou Neon (com glow animado)
- **Fonte do título:** Moderna (DM Sans), Serifada (Georgia) ou Manuscrita (Caveat)
- **Fonte do texto:** Moderna, Serifada ou Manuscrita
- **Emojis da chuva:** 9 opções ou Nenhum

### Página pública da memória (`/m/:slug`)

Quando a memória é paga e o usuário acessa o link:

1. **Tela de entrada:** Botão 3D "Clique Aqui" com glow pulsante e animação flutuante
2. **Ao clicar:** Explosão de 24 partículas de emoji em todas as direções
3. **Revelação:** Chuva contínua de emojis cai pela tela + animação de fundo ativa
4. **Conteúdo exibido:**
   - Player do Spotify no topo (largura total, com autoplay)
   - Carrossel de fotos à esquerda com moldura escolhida (troca automática a cada 5 s)
   - Painel à direita com contador ao vivo, título, data e texto da memória
5. **Contador ao vivo:** Exibe exatamente quanto tempo passou desde a data escolhida (anos, dias, horas, minutos e segundos — atualizado a cada segundo)

### Pós-pagamento

- Email automático enviado ao comprador com o link da memória e o QR Code em anexo (PNG 400×400 px)
- Página `/sucesso` exibe o link e um QR Code gerado no browser para compartilhar

---

## Stack tecnológica

### Frontend

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 19 | Interface |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 8 (beta) | Build e dev server |
| Tailwind CSS | 4 | Estilização utility-first |
| React Router DOM | 7 | Roteamento SPA |
| Zod | 4 | Validação de formulários por step |
| react-qr-code | 2 | Exibição do QR Code na página de sucesso |
| qrcode | 1.5 | Download do QR Code em PNG |
| lucide-react | 0.577 | Ícones |

### Backend

| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4 | Servidor HTTP |
| TypeScript | 5.3 | Tipagem |
| Prisma | 5 | ORM |
| PostgreSQL | — | Banco de dados relacional |
| Multer | 1.4 | Recebimento de uploads multipart |
| Stripe SDK | 22 | Pagamentos |
| Resend SDK | 6 | Emails transacionais |
| @aws-sdk/client-s3 | 3 | Upload para Cloudflare R2 via S3 API |
| nanoid | 5 | Geração de slugs únicos |
| qrcode | 1.5 | Geração do QR Code em buffer PNG para o email |
| zod | 3 | Validação dos campos do body no servidor |
| tsx | 4 | Execução TypeScript em desenvolvimento |

### Infraestrutura

| Serviço | Uso |
|---|---|
| Vercel | Deploy do frontend + domínio `eternareit.com` + proxy reverso para o backend |
| Railway | Deploy do backend (Node.js) + banco PostgreSQL gerenciado |
| Cloudflare R2 | Armazenamento de fotos (S3-compatible, sem egress fee) |
| Stripe | Processamento de pagamentos (Checkout Session + Webhook) |
| Resend | Envio de emails transacionais com template HTML |

---

## Arquitetura e fluxo

```
Browser (React SPA — Vercel)
         │
         │  /api/* → proxy reverso (vercel.json)
         ▼
Backend (Express — Railway)
         │
         ├─ POST /api/memory   → Multer (upload) → Cloudflare R2
         │                     → Prisma → PostgreSQL (paid: false)
         │
         ├─ POST /api/checkout → Stripe Checkout Session
         │                     → salva stripeSessionId no banco
         │
         └─ POST /api/webhook  ← Stripe chama após pagamento
                               → valida assinatura HMAC
                               → Prisma: paid = true
                               → Resend: envia email com QR Code
```

### Fluxo detalhado do usuário

```
1. Usuário preenche 6 steps + revisão
          ↓
2. POST /api/memory
   • Multer recebe as fotos em memória (sem gravar em disco)
   • Cada foto é enviada para o R2 com UUID único como nome de arquivo
   • Campos são validados com Zod no servidor
   • Registro criado no banco com paid: false
   • Resposta: { slug, id }
          ↓
3. POST /api/checkout
   • Recebe o slug
   • Cria uma Stripe Checkout Session com os dados do produto
   • Salva o stripeSessionId no banco
   • Resposta: { url } — frontend redireciona para o Stripe
          ↓
4. Usuário paga no Stripe Checkout (redirect externo)
          ↓
5. Stripe chama POST /api/webhook (event: checkout.session.completed)
   • Assinatura HMAC validada com STRIPE_WEBHOOK_SECRET
   • Se payment_status === "paid":
     - Atualiza paid = true no banco via memoryId dos metadata
     - Envia email ao comprador via Resend com QR Code em anexo
          ↓
6. Stripe redireciona usuário para /sucesso?slug=...
   • Página exibe link permanente e QR Code para compartilhar
          ↓
7. Página pública disponível em /m/:slug (acesso por qualquer pessoa com o link)
```

### Por que o webhook vem antes do `express.json()`?

O Stripe exige que o body do webhook seja lido como **raw bytes** para validar a assinatura HMAC. Se `express.json()` processar o body primeiro, a assinatura falha. Por isso, em `server/src/index.ts`, a rota `/api/webhook` usa `express.raw({ type: 'application/json' })` **antes** do middleware global `express.json()`.

---

## Estrutura do projeto

```
eternare/
│
├── src/                                    # Frontend (React + TypeScript)
│   ├── types/
│   │   └── memory.ts                       # Interfaces, constantes de opções e estado inicial do formulário
│   │
│   ├── lib/
│   │   └── validation.ts                   # Schemas Zod por step (step1Schema … step6Schema)
│   │
│   ├── hooks/
│   │   └── useMemoryForm.ts                # Hook central do formulário: estado, navegação, upload de fotos
│   │
│   ├── components/
│   │   ├── steps/
│   │   │   ├── StepPhotos.tsx              # Step 1 — dropzone de fotos com preview e remoção
│   │   │   ├── StepIdentity.tsx            # Step 2 — título e data
│   │   │   ├── StepText.tsx                # Step 3 — textarea com contador de caracteres
│   │   │   ├── StepVisual.tsx              # Step 4 — cor, animação, moldura e fontes
│   │   │   ├── StepEmoji.tsx               # Step 5 — grid de seleção de emoji
│   │   │   ├── StepMusic.tsx               # Step 6 — input de link do Spotify
│   │   │   └── StepReview.tsx              # Step 7 — revisão + botão de checkout
│   │   │
│   │   └── ui/
│   │       ├── Header/                     # Barra de navegação superior
│   │       ├── BgAnimation/                # Animações de fundo da memória (estrelas, brilhos, chamas)
│   │       ├── BackgroundAnimated/         # Fundo animado decorativo da landing page
│   │       ├── CtaFooter/                  # Rodapé com call-to-action
│   │       └── sections/
│   │           ├── Hero.tsx                # Seção principal da landing page
│   │           ├── Howitworks.tsx          # Como funciona (3 passos)
│   │           ├── Examples.tsx            # Exemplos de memórias
│   │           ├── TemplateCarousel.tsx    # Carrossel de templates visuais
│   │           ├── Reviews.tsx             # Depoimentos
│   │           └── Backgroundlight.tsx     # Luz de fundo gradiente
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   └── HomePage.tsx               # Landing page (Hero + seções)
│   │   ├── CreatePage/
│   │   │   └── CreatePage.tsx             # Página do formulário multi-step com preview ao vivo
│   │   ├── Memory/
│   │   │   └── MemoryPage.tsx             # Página pública da memória (/m/:slug)
│   │   ├── SuccessPage.tsx                # Tela de sucesso pós-pagamento
│   │   ├── AboutPage/
│   │   │   └── AboutPage.tsx              # Sobre o projeto
│   │   ├── SupportPage/
│   │   │   └── SupportPage.tsx            # Redireciona para WhatsApp
│   │   └── Legal/
│   │       ├── TermsPage.tsx              # Termos de uso
│   │       ├── PrivacyPage.tsx            # Política de privacidade
│   │       └── RefundPage.tsx             # Política de reembolso
│   │
│   ├── routes/
│   │   └── index.tsx                      # Definição de todas as rotas (React Router)
│   ├── App.tsx                            # Componente raiz
│   ├── main.tsx                           # Entry point — monta o React na DOM
│   └── styles/
│       └── global.css                     # CSS global + importação do Tailwind
│
├── server/                                # Backend (Node.js + Express)
│   ├── prisma/
│   │   └── schema.prisma                  # Schema do banco de dados
│   └── src/
│       ├── lib/
│       │   ├── prisma.ts                  # Singleton do PrismaClient
│       │   ├── slug.ts                    # Geração de slug: base do título + nanoid(6)
│       │   ├── upload.ts                  # Upload paralelo de fotos para o Cloudflare R2
│       │   └── email.ts                   # Template HTML do email + geração e anexo do QR Code
│       ├── routes/
│       │   ├── memory.ts                  # GET /api/memory/:slug · POST /api/memory
│       │   ├── checkout.ts                # POST /api/checkout
│       │   └── webhook.ts                 # POST /api/webhook (Stripe)
│       └── index.ts                       # Entry point do servidor Express
│
├── public/                                # Assets estáticos servidos pelo Vite
├── vercel.json                            # Proxy /api/* para Railway + SPA fallback
├── vite.config.ts                         # Configuração do Vite
├── tsconfig.json                          # Config TypeScript raiz
├── tsconfig.app.json                      # Config TypeScript do frontend
└── tsconfig.node.json                     # Config TypeScript do Vite/Node
```

---

## Banco de dados

O Prisma gerencia o schema e as migrations. Há um único modelo:

```prisma
model Memory {
  id              String    @id @default(cuid())   // ID interno (CUID)
  slug            String    @unique                 // URL pública: /m/:slug
  title           String                            // Título da memória (máx. 60 chars)
  date            DateTime                          // Data do momento
  text            String                            // Texto da mensagem (máx. 1200 chars)
  bgColor         String                            // Cor de fundo (hex)
  spotifyUrl      String?                           // Link do Spotify (opcional)
  photos          String[]                          // Array de URLs públicas do R2
  emoji           String   @default("❤️")           // Emoji da chuva
  fontStyle       String   @default("moderna")      // Fonte do título
  textFont        String   @default("moderna")      // Fonte do texto
  frameStyle      String   @default("polaroid")     // Estilo da moldura
  bgAnimation     String   @default("none")         // Animação de fundo
  paid            Boolean  @default(false)          // true após confirmação do Stripe
  stripeSessionId String?  @unique                  // ID da Checkout Session do Stripe
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@map("memories")
}
```

> **Segurança:** a rota `GET /api/memory/:slug` retorna `404` se `paid = false`, impedindo que memórias não pagas sejam acessadas mesmo que o slug seja descoberto.

### Geração do slug

O slug é gerado pela função `generateSlug(title)` em `server/src/lib/slug.ts`:

1. Converte o título para minúsculas
2. Remove acentos (normalização Unicode NFD)
3. Remove caracteres especiais (mantém apenas letras, números, hífens e espaços)
4. Converte espaços em hífens e corta em 40 caracteres
5. Adiciona um sufixo aleatório de 6 caracteres via `nanoid` para garantir unicidade

Exemplo: `"Nossa Viagem para Paris"` → `nossa-viagem-para-paris-k3x9p2`

---

## API — Referência de endpoints

### `GET /api/memory/:slug`

Retorna os dados de uma memória paga.

**Respostas:**

| Status | Corpo | Quando |
|--------|-------|--------|
| `200` | Objeto da memória (ver abaixo) | Memória encontrada e paga |
| `404` | `{ error: "Memória não encontrada" }` | Slug inexistente ou memória não paga |
| `500` | `{ error: "Erro interno" }` | Erro no banco |

**Corpo `200`:**
```json
{
  "slug": "nossa-viagem-k3x9p2",
  "title": "Nossa Viagem",
  "date": "2024-06-15",
  "text": "Texto da memória...",
  "bgColor": "#09090f",
  "spotifyUrl": "https://open.spotify.com/track/...",
  "photos": ["https://pub-xxx.r2.dev/memories/uuid.jpeg"],
  "emoji": "❤️",
  "fontStyle": "moderna",
  "textFont": "manuscrita",
  "frameStyle": "polaroid",
  "bgAnimation": "stars"
}
```

---

### `POST /api/memory`

Cria uma nova memória no banco (com `paid: false`) e faz o upload das fotos para o R2.

**Content-Type:** `multipart/form-data`

**Campos do formulário:**

| Campo | Tipo | Obrigatório | Restrições |
|-------|------|-------------|------------|
| `photos` | File[] | Sim | 1–5 arquivos, JPG/PNG/WEBP, máx. 10 MB cada |
| `title` | string | Sim | 1–60 caracteres |
| `date` | string | Sim | Formato `YYYY-MM-DD`, não pode ser futura |
| `text` | string | Sim | 1–1200 caracteres |
| `bgColor` | string | Sim | Um dos 6 hexadecimais válidos |
| `emoji` | string | Não | Default: `❤️` |
| `fontStyle` | string | Não | `moderna` \| `serifada` \| `manuscrita`. Default: `moderna` |
| `textFont` | string | Não | `moderna` \| `serifada` \| `manuscrita`. Default: `moderna` |
| `frameStyle` | string | Não | `polaroid` \| `vintage` \| `minimalista` \| `neon`. Default: `polaroid` |
| `bgAnimation` | string | Não | `none` \| `stars` \| `sparkles` \| `flames`. Default: `none` |
| `spotifyUrl` | string | Não | Deve começar com `https://open.spotify.com/track/` |

**Respostas:**

| Status | Corpo | Quando |
|--------|-------|--------|
| `201` | `{ slug, id }` | Criado com sucesso |
| `400` | `{ error: "..." }` | Validação falhou ou formato de foto inválido |
| `500` | `{ error: "Erro ao criar memória" }` | Erro no banco ou R2 |

---

### `POST /api/checkout`

Cria uma Stripe Checkout Session para a memória e retorna a URL de redirecionamento.

**Content-Type:** `application/json`

**Body:**
```json
{ "slug": "nossa-viagem-k3x9p2" }
```

**Respostas:**

| Status | Corpo | Quando |
|--------|-------|--------|
| `200` | `{ url: "https://checkout.stripe.com/..." }` | Session criada |
| `400` | `{ error: "slug é obrigatório" }` | Body sem slug |
| `400` | `{ error: "Essa memória já foi paga" }` | Tentativa de pagar duas vezes |
| `404` | `{ error: "Memória não encontrada" }` | Slug inexistente |
| `500` | `{ error: "Erro ao criar sessão de pagamento" }` | Erro no Stripe |

---

### `POST /api/webhook`

Endpoint exclusivo para eventos do Stripe. Não deve ser chamado diretamente.

- Valida a assinatura HMAC do header `stripe-signature`
- Processa apenas o evento `checkout.session.completed` com `payment_status: "paid"`
- Atualiza `paid = true` no banco
- Envia o email ao comprador via Resend
- Retorna `200` para todos os eventos (inclusive os ignorados), conforme boas práticas do Stripe

---

### `GET /api/health`

```json
{ "ok": true }
```

Usado para health check do Railway.

---

## Configuração local

### Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente
- Conta no Stripe (modo teste — gratuito)
- Conta no Cloudflare R2 (gratuito até 10 GB)
- Conta no Resend (gratuito até 3.000 emails/mês)
- CLI do Stripe instalada (para o webhook local)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/eternare.git
cd eternare
```

### 2. Instale as dependências

```bash
# Frontend
npm install

# Backend
cd server && npm install
```

### 3. Crie o banco de dados

```bash
# No psql ou em qualquer cliente PostgreSQL
CREATE DATABASE eternare;
```

### 4. Configure as variáveis de ambiente

Crie o arquivo `server/.env` (veja a seção [Variáveis de ambiente](#variáveis-de-ambiente) abaixo).

### 5. Execute as migrations do Prisma

```bash
cd server
npm run db:migrate
```

### 6. Inicie os servidores

Abra **três terminais**:

```bash
# Terminal 1 — Backend (porta 3333)
cd server && npm run dev

# Terminal 2 — Webhook do Stripe (redireciona eventos para o servidor local)
cd server
./stripe listen --forward-to localhost:3333/api/webhook

# Terminal 3 — Frontend (porta 5173)
npm run dev
```

Acesse `http://localhost:5173`

> **Dica:** o comando `stripe listen` exibe um webhook secret (`whsec_...`) específico para desenvolvimento. Use-o como `STRIPE_WEBHOOK_SECRET` no `.env` enquanto estiver testando localmente.

---

## Variáveis de ambiente

Todas as variáveis ficam em `server/.env`. O frontend não precisa de `.env` — em produção o Vercel faz o proxy das chamadas `/api/*` para o Railway.

```env
# ── Banco de dados ─────────────────────────────────────────────────────────────
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/eternare"

# ── Servidor ────────────────────────────────────────────────────────────────────
PORT=3333
CLIENT_URL="http://localhost:5173"   # Em produção: https://eternareit.com

# ── Cloudflare R2 ───────────────────────────────────────────────────────────────
# Endpoint do bucket no formato: https://<account_id>.r2.cloudflarestorage.com
R2_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="sua_access_key"
R2_SECRET_ACCESS_KEY="sua_secret_key"
R2_BUCKET_NAME="eternare-photos"
# URL pública do bucket (ativada em Cloudflare > R2 > Settings > Public Access)
R2_PUBLIC_URL="https://pub-<hash>.r2.dev"

# ── Stripe ──────────────────────────────────────────────────────────────────────
# Desenvolvimento: sk_test_...  |  Produção: sk_live_...
STRIPE_SECRET_KEY="sk_test_..."
# Desenvolvimento: gerado pelo `stripe listen`  |  Produção: gerado no painel Stripe
STRIPE_WEBHOOK_SECRET="whsec_..."
# Valor em centavos (ex: 1990 = R$ 19,90)
STRIPE_PRICE_AMOUNT=1990

# ── Resend ──────────────────────────────────────────────────────────────────────
RESEND_API_KEY="re_..."
```

---

## Deploy

### Frontend — Vercel

1. Conecte o repositório em [vercel.com](https://vercel.com)
2. **Root Directory:** `./` (raiz do repositório)
3. **Build Command:** `npm run build`
4. **Output Directory:** `dist`
5. Nenhuma variável de ambiente é necessária no frontend — o `vercel.json` já configura o proxy

O arquivo `vercel.json` faz duas coisas:
- Redireciona `/api/*` para o backend no Railway (`https://eternare-it-production.up.railway.app/api/*`)
- Redireciona qualquer outra rota para `index.html` (necessário para o React Router funcionar como SPA)

### Backend — Railway

1. Crie um projeto em [railway.app](https://railway.app)
2. Adicione um serviço a partir do repositório GitHub
3. **Root Directory:** `server`
4. Adicione o plugin **PostgreSQL** ao projeto (Railway provisiona automaticamente e injeta `DATABASE_URL`)
5. Configure todas as variáveis de ambiente da seção acima
6. **Pre-deploy command:** `npx prisma migrate deploy`
7. **Start command:** `node dist/index.js`
8. **Build command:** `npm run build` (compila TypeScript para `dist/`)

### Stripe em produção

1. Verifique sua conta no painel do Stripe (KYC)
2. Crie um webhook apontando para `https://eternare-it-production.up.railway.app/api/webhook`
3. Selecione o evento `checkout.session.completed`
4. Atualize no Railway:
   - `STRIPE_SECRET_KEY` → chave `sk_live_...`
   - `STRIPE_WEBHOOK_SECRET` → chave `whsec_...` gerada no painel

### Resend em produção

1. Verifique o domínio `eternareit.com` no painel do Resend
2. Adicione os registros DNS (SPF, DKIM, DMARC) no provedor do domínio
3. O remetente já está configurado como `noreply@eternareit.com` em `server/src/lib/email.ts`

---

## Custos estimados

| Serviço | Free tier | Custo após |
|---|---|---|
| Vercel | Gratuito (hobby) | ~$20/mês (pro) |
| Railway | $5 crédito/mês | ~$10–15/mês |
| Cloudflare R2 | 10 GB grátis + 10M operações/mês | $0,015/GB |
| Resend | 3.000 emails/mês | $20/mês (50 k emails) |
| Stripe | — | ~2,9% + R$0,50 por transação |

> Com 50 vendas/mês a R$ 19,90 → receita bruta ~R$ 995 → lucro líquido estimado de ~**R$ 910/mês**

---

## Páginas do site

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `HomePage` | Landing page com hero, como funciona, exemplos e depoimentos |
| `/criar` | `CreatePage` | Formulário multi-step com preview ao vivo da memória |
| `/m/:slug` | `MemoryPage` | Página pública da memória (somente se `paid = true`) |
| `/sucesso` | `SuccessPage` | Tela pós-pagamento com link e QR Code para compartilhar |
| `/sobre` | `AboutPage` | Sobre o projeto |
| `/suporte` | `SupportPage` | Redireciona para WhatsApp de suporte |
| `/termos` | `TermsPage` | Termos de uso |
| `/privacidade` | `PrivacyPage` | Política de privacidade |
| `/reembolso` | `RefundPage` | Política de reembolso |

---

## Licença

MIT © Eternare

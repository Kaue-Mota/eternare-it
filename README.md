# 🔥 Eternare

> Transforme memórias em páginas digitais únicas e compartilháveis.

## ✨ Sobre o projeto

O **Eternare** é uma plataforma que permite criar páginas digitais personalizadas para eternizar momentos especiais. O usuário preenche um formulário com fotos, título, data, texto, emoji, animação de fundo, moldura, fontes e música — e recebe uma página exclusiva acessível por link permanente e QR Code.

**Produção:** [eternareit.com](https://eternareit.com)

---

## 🚀 Funcionalidades

**Criação da memória:**
- 📸 Upload de até 5 fotos com carrossel automático
- ✍️ Escolha de fonte para o título e para o texto (Moderna, Serifada, Manuscrita)
- 🖼️ Escolha de moldura para as fotos (Polaroid, Vintage, Minimalista, Neon)
- 🎨 Escolha de cor de fundo (6 opções)
- 🌟 Animação de fundo (Estrelas, Brilhos, Chamas ou Nenhuma)
- 💧 Escolha de emoji para chuva ao abrir a memória (9 opções ou Nenhum)
- 🎵 Embed do Spotify com autoplay integrado
- ✅ Revisão completa antes do pagamento

**Página pública da memória:**
- 🔐 Botão 3D "Clique Aqui" com glow e animação flutuante
- 💥 Explosão de emojis ao clicar no botão
- 🌧️ Chuva contínua de emojis após revelar
- 🌟 Animação de fundo (estrelas, brilhos ou chamas)
- ⏱️ Contador ao vivo de quanto tempo se passou desde a data
- 📱 Layout side by side no desktop (Spotify no topo, foto à esquerda, conteúdo à direita)
- 🎵 Spotify com autoplay após o clique

**Infraestrutura:**
- 💳 Pagamento seguro via Stripe (produção)
- 🔗 Link permanente e QR Code
- 📧 Email automático com link e QR Code em anexo
- 🖼️ Fotos armazenadas no Cloudflare R2

---

## 🛠️ Stack

### Frontend
| Tecnologia | Uso |
|---|---|
| React + TypeScript | Interface |
| Vite | Build tool |
| Tailwind CSS | Estilização |
| React Router DOM | Navegação |
| Zod | Validação de formulários |
| react-qr-code | Geração do QR Code na página de sucesso |
| qrcode | Download do QR Code em PNG |

### Backend
| Tecnologia | Uso |
|---|---|
| Node.js + Express | Servidor HTTP |
| TypeScript | Tipagem |
| Prisma | ORM |
| PostgreSQL | Banco de dados |
| Multer | Upload de arquivos |
| Stripe | Pagamentos |
| Resend | Emails transacionais |
| nanoid | Geração de slugs únicos |
| @aws-sdk/client-s3 | Upload para Cloudflare R2 |

### Infraestrutura
| Serviço | Uso |
|---|---|
| Vercel | Deploy do frontend + domínio eternareit.com |
| Railway | Deploy do backend + PostgreSQL |
| Cloudflare R2 | Armazenamento de fotos |
| Stripe | Processamento de pagamentos (produção) |
| Resend | Envio de emails |

---

## 📁 Estrutura do projeto

```
eternare/
├── src/                                # Frontend (React)
│   ├── components/
│   │   ├── steps/                      # Etapas do formulário
│   │   │   ├── StepPhotos.tsx          # Step 1 — Upload de fotos
│   │   │   ├── StepIdentity.tsx        # Step 2 — Título e data
│   │   │   ├── StepText.tsx            # Step 3 — Texto
│   │   │   ├── StepVisual.tsx          # Step 4 — Cor, animação, moldura, fontes
│   │   │   ├── StepEmoji.tsx           # Step 5 — Emoji da chuva
│   │   │   ├── StepMusic.tsx           # Step 6 — Link Spotify
│   │   │   └── StepReview.tsx          # Revisão final + checkout
│   │   └── ui/
│   │       ├── Header/
│   │       ├── BackgroundLight.tsx     # Fundo animado da landing page
│   │       ├── BgAnimation.tsx         # Animações de fundo da memória
│   │       ├── MemoryPreview/          # Preview ao vivo do formulário
│   │       └── sections/
│   │           ├── Hero.tsx
│   │           ├── HowItWorks.tsx
│   │           ├── Examples.tsx
│   │           ├── Reviews.tsx
│   │           └── CtaFooter.tsx
│   ├── hooks/
│   │   └── useMemoryForm.ts
│   ├── lib/
│   │   └── validation.ts
│   ├── pages/
│   │   ├── Home/HomePage.tsx
│   │   ├── CreatePage/CreatePage.tsx
│   │   ├── Memory/MemoryPage.tsx       # Página pública da memória
│   │   ├── Memory/MemoryPagePreview.tsx
│   │   ├── SuccessPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── SupportPage.tsx
│   │   └── legal/
│   │       ├── TermsPage.tsx
│   │       ├── PrivacyPage.tsx
│   │       └── RefundPage.tsx
│   ├── routes/index.tsx
│   └── types/memory.ts
│
└── server/                             # Backend (Node.js)
    ├── prisma/schema.prisma
    └── src/
        ├── lib/
        │   ├── prisma.ts
        │   ├── slug.ts
        │   ├── upload.ts
        │   └── email.ts
        ├── routes/
        │   ├── memory.ts
        │   ├── checkout.ts
        │   └── webhook.ts
        └── index.ts
```

---

## 🗃️ Banco de dados

```prisma
model Memory {
  id              String   @id @default(cuid())
  slug            String   @unique
  title           String
  date            DateTime
  text            String
  bgColor         String
  spotifyUrl      String?
  photos          String[]
  emoji           String   @default("❤️")
  fontStyle       String   @default("moderna")
  textFont        String   @default("moderna")
  frameStyle      String   @default("polaroid")
  bgAnimation     String   @default("none")
  paid            Boolean  @default(false)
  stripeSessionId String?  @unique
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@map("memories")
}
```

---

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js 18+
- PostgreSQL instalado e rodando
- Conta no Stripe (modo teste)
- Conta no Cloudflare R2
- Conta no Resend

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/eternare-it.git
cd eternare-it
```

### 2. Instale as dependências
```bash
npm install
cd server && npm install
```

### 3. Configure o `server/.env`
```env
DATABASE_URL="postgresql://postgres:suasenha@localhost:5432/eternare"
CLIENT_URL="http://localhost:5173"
PORT=3333

R2_ENDPOINT="https://<account_id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="sua_access_key"
R2_SECRET_ACCESS_KEY="sua_secret_key"
R2_BUCKET_NAME="eternare-photos"
R2_PUBLIC_URL="https://pub-<hash>.r2.dev"

STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_AMOUNT=1990

RESEND_API_KEY="re_..."
```

### 4. Rode as migrations
```bash
cd server
npm run db:migrate
```

### 5. Inicie os servidores

**Terminal 1 — Backend:**
```bash
cd server && npm run dev
```

**Terminal 2 — Webhook do Stripe:**
```bash
cd server && ./stripe listen --forward-to localhost:3333/api/webhook
```

**Terminal 3 — Frontend:**
```bash
npm run dev
```

Acesse `http://localhost:5173`

---

## 🌊 Fluxo da aplicação

```
Usuário preenche 6 steps do formulário
        ↓
POST /api/memory → salva no banco (paid: false) + upload fotos para R2
        ↓
POST /api/checkout → cria sessão no Stripe
        ↓
Usuário paga no Stripe Checkout
        ↓
Stripe chama POST /api/webhook
        ↓
Webhook valida assinatura → atualiza paid: true → envia email via Resend com QR Code
        ↓
Usuário redirecionado para /sucesso?slug=...
        ↓
Página pública disponível em /m/:slug
  → Botão 3D "Clique Aqui"
  → Explosão de emojis
  → Chuva de emojis + animação de fundo + Spotify autoplay
```

---

## 🚢 Deploy

### Frontend — Vercel
1. Conecte o repositório em [vercel.com](https://vercel.com)
2. Root Directory: `./`
3. O `vercel.json` já configura proxy `/api/*` para o Railway e SPA fallback

### Backend — Railway
1. Crie um projeto em [railway.app](https://railway.app)
2. Root Directory: `server`
3. Adicione PostgreSQL ao projeto
4. Configure todas as variáveis de ambiente
5. Pre-deploy step: `npx prisma migrate deploy`
6. Start command: `node dist/index.js`

### Stripe produção
1. Verifique a conta no painel do Stripe
2. Crie o produto com preço avulso de R$19,90
3. Crie um webhook apontando para `https://eternare-it-production.up.railway.app/api/webhook`
4. Atualize `STRIPE_SECRET_KEY` e `STRIPE_WEBHOOK_SECRET` no Railway com as chaves `sk_live_` e `whsec_` de produção

### Resend produção
- Verifique o domínio `eternareit.com` no painel do Resend
- Adicione os registros DNS no Namecheap
- Mude o `from` no `email.ts` para `noreply@eternareit.com`

---

## 💰 Custos estimados

| Serviço | Free tier | Custo após |
|---|---|---|
| Vercel | Gratuito | ~$20/mês |
| Railway | $5 crédito/mês | ~$10-15/mês |
| Cloudflare R2 | 10GB grátis | $0.015/GB |
| Resend | 3.000 emails/mês | $20/mês (50k) |
| Stripe | — | ~2,9% + R$0,50 por transação |

Com 50 vendas/mês a R$19,90 → lucro líquido estimado de ~**R$ 910/mês**

---

## 📄 Páginas do site

| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/criar` | Formulário de criação |
| `/m/:slug` | Página pública da memória |
| `/sucesso` | Página de sucesso pós-pagamento |
| `/sobre` | Sobre o projeto |
| `/suporte` | Redireciona para WhatsApp |
| `/termos` | Termos de uso |
| `/privacidade` | Política de privacidade |
| `/reembolso` | Política de reembolso |

---

## 📄 Licença

MIT © Eternare
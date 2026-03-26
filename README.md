# 🔥 Eternare

> Transforme memórias em páginas digitais únicas e compartilháveis.

![Eternare Landing Page](https://pub-92102761f5e7481db393dabea2a4960c.r2.dev/memories/readme-banner.png)

## ✨ Sobre o projeto

O **Eternare** é uma plataforma que permite criar páginas digitais personalizadas para eternizar momentos especiais. O usuário preenche um formulário com fotos, título, data, texto e música — e recebe uma página exclusiva acessível por link permanente e QR Code.

**Demo:** [eternare-it.vercel.app](https://eternare-it.vercel.app)

---

## 🚀 Funcionalidades

- 📸 Upload de até 5 fotos com carrossel automático
- 🎵 Embed do Spotify integrado
- ⏱️ Contador ao vivo de quanto tempo se passou desde a data da memória
- 🎨 Escolha de cor de fundo personalizada
- 💳 Pagamento seguro via Stripe
- 🔗 Link permanente e QR Code para compartilhar
- 📧 Email automático com o link e QR Code em anexo após o pagamento
- 📱 Design responsivo e mobile-first

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
| react-qr-code | Geração do QR Code |
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
| Vercel | Deploy do frontend |
| Railway | Deploy do backend + PostgreSQL |
| Cloudflare R2 | Armazenamento de fotos |
| Stripe | Processamento de pagamentos |
| Resend | Envio de emails |

---

## 📁 Estrutura do projeto

```
eternare/
├── src/                          # Frontend (React)
│   ├── components/
│   │   ├── steps/                # Etapas do formulário
│   │   │   ├── StepPhotos.tsx
│   │   │   ├── StepIdentity.tsx
│   │   │   ├── StepText.tsx
│   │   │   ├── StepVisual.tsx
│   │   │   ├── StepMusic.tsx
│   │   │   └── StepReview.tsx
│   │   └── ui/
│   │       ├── Header/
│   │       ├── sections/
│   │       │   ├── Hero.tsx
│   │       │   ├── Examples.tsx
│   │       │   ├── Reviews.tsx
│   │       │   └── CtaFooter.tsx
│   │       └── MemoryPreview.tsx
│   ├── hooks/
│   │   └── useMemoryForm.ts      # Estado e lógica do formulário
│   ├── lib/
│   │   └── validation.ts         # Schemas Zod
│   ├── pages/
│   │   ├── Home/HomePage.tsx
│   │   ├── CreatePage/
│   │   ├── Memory/MemoryPage.tsx
│   │   └── SuccessPage.tsx
│   └── types/
│       └── memory.ts
│
└── server/                       # Backend (Node.js)
    ├── prisma/
    │   └── schema.prisma
    └── src/
        ├── lib/
        │   ├── prisma.ts         # Cliente Prisma singleton
        │   ├── slug.ts           # Gerador de slugs únicos
        │   ├── upload.ts         # Upload para Cloudflare R2
        │   └── email.ts          # Envio de emails via Resend
        ├── routes/
        │   ├── memory.ts         # GET /api/memory/:slug e POST /api/memory
        │   ├── checkout.ts       # POST /api/checkout
        │   └── webhook.ts        # POST /api/webhook (Stripe)
        └── index.ts              # Ponto de entrada do servidor
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

### 2. Configure o frontend

```bash
npm install
```

### 3. Configure o backend

```bash
cd server
npm install
```

Crie o arquivo `server/.env` com base no exemplo:

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

Terminal 1 — Backend:
```bash
cd server
npm run dev
```

Terminal 2 — Webhook do Stripe (para testes locais):
```bash
cd server
./stripe listen --forward-to localhost:3333/api/webhook
```

Terminal 3 — Frontend:
```bash
npm run dev
```

Acesse `http://localhost:5173`

---

## 🌊 Fluxo da aplicação

```
Usuário preenche o formulário
        ↓
POST /api/memory → salva no banco (paid: false) + faz upload das fotos para R2
        ↓
POST /api/checkout → cria sessão no Stripe
        ↓
Usuário paga no Stripe Checkout
        ↓
Stripe chama POST /api/webhook
        ↓
Webhook valida assinatura → atualiza paid: true → envia email via Resend
        ↓
Usuário é redirecionado para /sucesso?slug=...
        ↓
Página pública disponível em /m/:slug
```

---

## 🚢 Deploy

### Frontend — Vercel

1. Conecte o repositório no [vercel.com](https://vercel.com)
2. Root Directory: `./`
3. O arquivo `vercel.json` já configura o proxy para o backend

### Backend — Railway

1. Crie um novo projeto no [railway.app](https://railway.app)
2. Adicione o serviço do GitHub com Root Directory: `server`
3. Adicione um banco PostgreSQL
4. Configure todas as variáveis de ambiente
5. O pre-deploy step `npx prisma migrate deploy` roda as migrations automaticamente

---

## 💰 Custos estimados

| Serviço | Free tier | Custo após |
|---|---|---|
| Vercel | Gratuito | ~$20/mês |
| Railway | $5 crédito/mês | ~$10-15/mês |
| Cloudflare R2 | 10GB grátis | $0.015/GB |
| Resend | 3.000 emails/mês | $20/mês (50k) |
| Stripe | — | 2,9% + R$0,50 por transação |

Com 50 vendas/mês a R$19,90 → lucro líquido estimado de ~**R$ 910/mês**

---

## 📄 Licença

MIT © Eternare
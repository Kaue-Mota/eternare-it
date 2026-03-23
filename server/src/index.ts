// server/src/index.ts
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { memoryRouter } from './routes/memory.js'
import { checkoutRouter } from './routes/checkout.js'
import { webhookRouter } from './routes/webhook.js'

const app = express()
const PORT = process.env.PORT || 3333

// webhook precisa do body raw — deve vir ANTES do express.json()
app.use('/api/webhook', express.raw({ type: 'application/json' }), webhookRouter)

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/memory', memoryRouter)
app.use('/api/checkout', checkoutRouter)

app.get('/api/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`)
})
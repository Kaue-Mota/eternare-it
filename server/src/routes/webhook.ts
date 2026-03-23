// server/src/routes/webhook.ts
import { Router } from 'express'
import Stripe from 'stripe'
import { prisma } from '../lib/prisma.js'

export const webhookRouter = Router()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// ── POST /api/webhook ─────────────────────────────────────────────────────────
// O Stripe chama essa rota quando o pagamento é confirmado.
// IMPORTANTE: o body aqui é raw (Buffer), não JSON.
// Isso é configurado no index.ts antes do express.json().
webhookRouter.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature']

  if (!sig) {
    return res.status(400).json({ error: 'Assinatura ausente' })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature inválida:', err)
    return res.status(400).json({ error: 'Assinatura inválida' })
  }

  // só processa o evento que nos interessa
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // pagamento confirmado — ativa a memória no banco
    if (session.payment_status === 'paid') {
      const memoryId = session.metadata?.memoryId

      if (!memoryId) {
        console.error('memoryId ausente nos metadata da session')
        return res.status(400).json({ error: 'metadata inválido' })
      }

      await prisma.memory.update({
        where: { id: memoryId },
        data: { paid: true },
      })

      console.log(`✅ Memória ${memoryId} ativada após pagamento`)
    }
  }

  // sempre retorna 200 para o Stripe não retentar
  return res.status(200).json({ received: true })
})
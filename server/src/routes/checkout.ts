// server/src/routes/checkout.ts
import { Router } from 'express'
import Stripe from 'stripe'
import { prisma } from '../lib/prisma.js'

export const checkoutRouter = Router()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

// ── POST /api/checkout ────────────────────────────────────────────────────────
// Recebe o slug da memória já criada e gera uma Checkout Session no Stripe
checkoutRouter.post('/', async (req, res) => {
  try {
    const { slug } = req.body

    if (!slug) {
      return res.status(400).json({ error: 'slug é obrigatório' })
    }

    const memory = await prisma.memory.findUnique({ where: { slug } })

    if (!memory) {
      return res.status(404).json({ error: 'Memória não encontrada' })
    }

    if (memory.paid) {
      return res.status(400).json({ error: 'Essa memória já foi paga' })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      customer_creation: 'always',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            unit_amount: Number(process.env.STRIPE_PRICE_AMOUNT) || 1490, // R$ 14,90
            product_data: {
              name: `Memória: ${memory.title}`,
              description: 'Página digital exclusiva, link permanente e QR Code',
             
            },
          },
        },
      ],
      metadata: {
        memoryId: memory.id,
        slug: memory.slug,
      },
      success_url: `${process.env.CLIENT_URL}/sucesso?slug=${memory.slug}`,
      cancel_url: `${process.env.CLIENT_URL}/criar`,
    })

    // salva o sessionId no banco para o webhook conseguir encontrar a memória
    await prisma.memory.update({
      where: { id: memory.id },
      data: { stripeSessionId: session.id },
    })

    return res.json({ url: session.url })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Erro ao criar sessão de pagamento' })
  }
})
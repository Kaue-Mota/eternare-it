// server/src/routes/webhook.ts
import { Router } from "express";
import Stripe from "stripe";
import { prisma } from "../lib/prisma.js";
import { sendMemoryEmail } from "../lib/email.js";

export const webhookRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ── POST /api/webhook ─────────────────────────────────────────────────────────
webhookRouter.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"] as string;

  if (!sig) {
    return res.status(400).json({ error: "Assinatura ausente" });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("Webhook signature inválida:", err);
    return res.status(400).json({ error: "Assinatura inválida" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === "paid") {
      const memoryId = session.metadata?.memoryId;
      const customerEmail = session.customer_details?.email;

      console.log("✉️ Email do cliente:", customerEmail);
      console.log("🆔 Memory ID:", memoryId);

      if (!memoryId) {
        console.error("memoryId ausente nos metadata da session");
        return res.status(400).json({ error: "metadata inválido" });
      }

      const memory = await prisma.memory.update({
        where: { id: memoryId },
        data: { paid: true },
      });

      console.log(`✅ Memória ativada: ${memory.slug}`);

      if (customerEmail) {
        const memoryUrl = `${process.env.CLIENT_URL}/m/${memory.slug}`;
        try {
          await sendMemoryEmail({
            to: customerEmail,
            memoryTitle: memory.title,
            memorySlug: memory.slug,
            memoryUrl,
          });
          console.log("✉️ Email enviado para:", customerEmail);
        } catch (err) {
          console.error("❌ Erro ao enviar email:", err);
        }
      }

      return res.status(200).json({ received: true });
    }
  }

  return res.status(200).json({ received: true });
});
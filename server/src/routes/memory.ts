// server/src/routes/memory.ts

import { Router } from "express";
import multer from "multer";
import { prisma } from "../lib/prisma.js";
import { generateSlug } from "../lib/slug.js";
import { uploadPhotos } from "../lib/upload.js";
import { z } from "zod";

export const memoryRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB por foto
  fileFilter: (_, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Formato não suportado: ${file.mimetype}. Use JPG, PNG ou WEBP.`,
        ),
      );
    }
  },
});

// ── schema de validação do body ───────────────────────────────────────────────
const createMemorySchema = z.object({
  title: z.string().min(1).max(60),
  date: z.string().min(1),
  text: z.string().min(1).max(1200),
  bgColor: z.string().min(1),
  spotifyUrl: z.string().optional(),
  emoji: z.string().default('❤️'), 
})

// ── GET /api/memory/:slug ─────────────────────────────────────────────────────
memoryRouter.get("/:slug", async (req, res) => {
  try {
    const memory = await prisma.memory.findUnique({
      where: { slug: req.params.slug },
    });

    if (!memory) {
      return res.status(404).json({ error: "Memória não encontrada" });
    }

    // só exibe se o pagamento foi confirmado
    if (!memory.paid) {
      return res.status(404).json({ error: "Memória não encontrada" });
    }

    return res.json({
      slug: memory.slug,
      title: memory.title,
      date: memory.date.toISOString().split("T")[0],
      text: memory.text,
      bgColor: memory.bgColor,
      spotifyUrl: memory.spotifyUrl ?? undefined,
      photos: memory.photos,
      emoji: memory.emoji ?? "❤️",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno" });
  }
});

// ── POST /api/memory ──────────────────────────────────────────────────────────
// Cria a memória no banco (paid = false)
// O webhook do Stripe muda paid = true após pagamento confirmado
memoryRouter.post(
  "/",
  (req, res, next) => {
    upload.array("photos", 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      // valida os campos de texto
      const parsed = createMemorySchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Envie pelo menos 1 foto" });
      }

      // faz upload das fotos e retorna as URLs públicas
      const photoUrls = await uploadPhotos(files);

      const { title, date, text, bgColor, spotifyUrl } = parsed.data;
      const slug = generateSlug(title);

      const memory = await prisma.memory.create({
        data: {
          slug,
          title,
          date: new Date(date + "T12:00:00"),
          text,
          bgColor,
          spotifyUrl: spotifyUrl || null,
          photos: photoUrls,
          emoji: parsed.data.emoji || "❤️", // ← precisa estar aqui
          paid: false,
        },
      });

      return res.status(201).json({ slug: memory.slug, id: memory.id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao criar memória" });
    }
  },
);

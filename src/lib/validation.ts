// src/lib/validation.ts
import { z } from 'zod'
import { BG_COLORS } from '../types/memory'

const validHexColors = BG_COLORS.map((c) => c.hex)

// ── schemas por step ─────────────────────────────────────────────────────────

export const step1Schema = z.object({
  photos: z
    .array(z.instanceof(File))
    .min(1, 'Adicione pelo menos 1 foto')
    .max(5, 'Máximo de 5 fotos'),
})

export const step2Schema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(60, 'Título muito longo — máximo 60 caracteres'),
  date: z
    .string()
    .min(1, 'A data é obrigatória')
    .refine((d) => !isNaN(new Date(d).getTime()), 'Data inválida')
    .refine((d) => new Date(d) <= new Date(), 'A data não pode ser no futuro'),
})

export const step3Schema = z.object({
  text: z
    .string()
    .min(1, 'Escreva pelo menos uma frase')
    .max(1200, 'Texto muito longo — máximo 1200 caracteres'),
})

export const step4Schema = z.object({
  bgColor: z
    .string()
    .refine(
      (val) => validHexColors.includes(val),
      'Selecione uma cor de fundo'
    ),
})

export const step5Schema = z.object({
  spotifyUrl: z
    .string()
    .optional()
    .refine(
      (url) => !url || url.startsWith('https://open.spotify.com/track/'),
      'Use um link no formato: open.spotify.com/track/...'
    ),
})

// ── schema completo (usado na API antes de salvar no banco) ──────────────────

export const memorySchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)

export type MemorySchema = z.infer<typeof memorySchema>

// ── mapa de schema por step ───────────────────────────────────────────────────

export const stepSchemas = {
  1: step1Schema,
  2: step2Schema,
  3: step3Schema,
  4: step4Schema,
  5: step5Schema,
} as const

export type StepErrors = Partial<Record<string, string>>

// ── helper: valida um step e retorna erros formatados ────────────────────────

export function validateStep(
  step: keyof typeof stepSchemas,
  data: Record<string, unknown>
): StepErrors {
  const result = stepSchemas[step].safeParse(data)
  if (result.success) return {}

  return result.error.issues.reduce<StepErrors>((acc, issue) => {
    const key = issue.path[0]?.toString() ?? 'root'
    acc[key] = issue.message
    return acc
  }, {})
}
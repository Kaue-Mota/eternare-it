// server/src/lib/slug.ts
import { nanoid } from 'nanoid'

export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9\s-]/g, '')   // remove caracteres especiais
    .trim()
    .replace(/\s+/g, '-')            // espaços viram hífens
    .slice(0, 40)

  const suffix = nanoid(6)           // ex: k3x9p2
  return `${base}-${suffix}`
}
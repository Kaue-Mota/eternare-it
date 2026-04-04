// src/types/memory.ts

export interface MemoryFormData {
  photos: File[]
  photosPreviews: string[]
  title: string
  date: string
  text: string
  bgColor: string
  emoji: string
  fontStyle: string  
  textFont: string  
  spotifyUrl: string
}

export interface BgColorOption {
  hex: string
  label: string
}

export const BG_COLORS: BgColorOption[] = [
  { hex: '#09090f', label: 'Noite' },
  { hex: '#1a0a1a', label: 'Cosmos' },
  { hex: '#0d1a2e', label: 'Oceano' },
  { hex: '#1a0a0a', label: 'Vinho' },
  { hex: '#0a1a0a', label: 'Floresta' },
  { hex: '#1a100a', label: 'Âmbar' },
]

export const INITIAL_FORM_DATA: MemoryFormData = {
  photos: [],
  photosPreviews: [],
  title: '',
  date: '',
  text: '',
  bgColor: BG_COLORS[0].hex,
  emoji: '❤️',
  fontStyle: 'moderna',  
  textFont: 'moderna',
  spotifyUrl: '',
}

// 1-5 são os steps do formulário, 6 é a tela de revisão
export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7
export const TOTAL_STEPS = 6
export const REVIEW_STEP = 7
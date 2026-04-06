// src/components/steps/StepEmoji.tsx
import type { MemoryFormData } from '../../types/memory'
import type { StepErrors } from '../../lib/validation'

interface Props {
  data: MemoryFormData
  errors: StepErrors
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

export const EMOJI_OPTIONS = [
  { emoji: 'none', label: 'Nenhum' },
  { emoji: '❤️', label: 'Coração' },
  { emoji: '✨', label: 'Estrelas' },
  { emoji: '🌸', label: 'Flores' },
  { emoji: '🌟', label: 'Estrelinhas' },
  { emoji: '🦋', label: 'Borboletas' },
  { emoji: '🌊', label: 'Ondas' },
  { emoji: '💋', label: 'Beijos' },
  { emoji: '🎂', label: 'Bolo' },
  { emoji: '🍎', label: 'Maçãs' },
]

export function StepEmoji({ data, errors, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 5</p>
        <h2 className="text-[19px] font-medium text-white">Chuva de emojis</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Escolha o emoji que vai chover quando alguém abrir sua memória
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {EMOJI_OPTIONS.map((option) => {
          const isSelected = (data.emoji || '❤️') === option.emoji
          return (
            <button
              key={option.emoji}
              type="button"
              onClick={() => onChange('emoji', option.emoji)}
              className="flex flex-col items-center gap-2 rounded-xl py-4 transition-all"
              style={{
                background: isSelected ? 'rgba(124,106,255,0.15)' : 'rgba(255,255,255,0.03)',
                border: isSelected ? '1px solid rgba(124,106,255,0.5)' : '1px solid rgba(255,255,255,0.07)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {option.emoji === 'none' ? (
                <span style={{ fontSize: 28, opacity: 0.3 }}>✕</span>
              ) : (
                <span style={{ fontSize: 32 }}>{option.emoji}</span>
              )}
              <span
                className="text-[11px] font-medium"
                style={{ color: isSelected ? '#b06fff' : 'rgba(240,238,248,0.4)' }}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {errors.emoji && (
        <p className="text-[11px] text-red-400">{errors.emoji}</p>
      )}

      {data.emoji && data.emoji !== 'none' && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span style={{ fontSize: 20 }}>{data.emoji}</span>
          <p className="text-[12px]" style={{ color: 'rgba(240,238,248,0.5)' }}>
            Sua memória vai receber uma chuva de <strong className="text-white/70">
              {EMOJI_OPTIONS.find(e => e.emoji === data.emoji)?.label.toLowerCase()}
            </strong>
          </p>
        </div>
      )}

      {data.emoji === 'none' && (
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span style={{ fontSize: 20, opacity: 0.3 }}>✕</span>
          <p className="text-[12px]" style={{ color: 'rgba(240,238,248,0.5)' }}>
            Sua memória vai abrir sem chuva de emojis
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <button type="button" onClick={onBack}
          className="rounded-lg border border-white/8 px-4 py-[10px] text-[13px] text-white/50 hover:text-white transition-colors">
          ← Voltar
        </button>
        <button type="button" onClick={onNext}
          className="flex-1 rounded-lg py-[10px] text-[13px] font-medium text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}>
          Continuar →
        </button>
      </div>
    </div>
  )
}
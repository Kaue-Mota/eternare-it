// src/components/steps/StepText.tsx
import { type MemoryFormData } from '../../types/memory'
import { type StepErrors } from '../../lib/validation'

interface Props {
  data: MemoryFormData
  errors: StepErrors
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

const MAX_CHARS = 1200

export function StepText({ data, errors, onChange, onNext, onBack }: Props) {
  const remaining = MAX_CHARS - data.text.length

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 3</p>
        <h2 className="text-[19px] font-medium text-white">Conte a história</h2>
        <p className="text-[12px] text-white/50 mt-1">Escreva o que esse momento significa para você</p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] text-white/50 tracking-wide">Texto da memória</span>
        <textarea
          placeholder="Naquela tarde, tudo parecia perfeito..."
          value={data.text}
          onChange={(e) => onChange('text', e.target.value)}
          maxLength={MAX_CHARS}
          rows={6}
          className="bg-white/[0.04] rounded-lg px-3 py-[9px] text-[13px] text-white placeholder:text-white/20 outline-none transition-colors resize-none leading-relaxed border"
          style={{ borderColor: errors.text ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)' }}
        />
        <div className="flex justify-between items-center">
          {errors.text
            ? <p className="text-[11px] text-red-400">{errors.text}</p>
            : <span />
          }
          <span
            className="text-[10px] ml-auto transition-colors"
            style={{ color: remaining < 50 ? '#f87171' : 'rgba(255,255,255,0.25)' }}
          >
            {remaining} restantes
          </span>
        </div>
      </label>

      <div className="flex gap-2">
        <button type="button" onClick={onBack} className="rounded-lg border border-white/8 px-4 py-[10px] text-[13px] text-white/50 hover:text-white transition-colors">
          ← Voltar
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 rounded-lg py-[10px] text-[13px] font-medium text-white transition-opacity hover:opacity-85"
          style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
        >
          Continuar →
        </button>
      </div>
    </div>
  )
}
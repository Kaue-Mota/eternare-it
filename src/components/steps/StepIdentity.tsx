// src/components/steps/StepIdentity.tsx
import { type MemoryFormData } from '../../types/memory'
import { type StepErrors } from '../../lib/validation'

interface Props {
  data: MemoryFormData
  errors: StepErrors
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

export function StepIdentity({ data, errors, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 2</p>
        <h2 className="text-[19px] font-medium text-white">Identidade da memória</h2>
        <p className="text-[12px] text-white/50 mt-1">Como você quer chamar esse momento?</p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] text-white/50 tracking-wide">Título</span>
          <input
            type="text"
            placeholder="Ex: EU TE AMO"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            maxLength={60}
            className="bg-white/[0.04] rounded-lg px-3 py-[9px] text-[13px] text-white placeholder:text-white/20 outline-none transition-colors border"
            style={{ borderColor: errors.title ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)' }}
          />
          {errors.title && <p className="text-[11px] text-red-400">{errors.title}</p>}
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] text-white/50 tracking-wide">Data da memória</span>
          <input
            type="date"
            value={data.date}
            onChange={(e) => onChange('date', e.target.value)}
            className="bg-white/[0.04] rounded-lg px-3 py-[9px] text-[13px] text-white outline-none transition-colors border"
            style={{ borderColor: errors.date ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.08)' }}
          />
          {errors.date && <p className="text-[11px] text-red-400">{errors.date}</p>}
        </label>
      </div>

      <div className="flex gap-2 mt-1">
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
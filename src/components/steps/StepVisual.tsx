// src/components/steps/StepVisual.tsx
import { type MemoryFormData, BG_COLORS } from '../../types/memory'

interface Props {
  data: MemoryFormData
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

export function StepVisual({ data, onChange, onNext, onBack }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 4</p>
        <h2 className="text-[19px] font-medium text-white">Escolha o visual</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Cor de fundo da sua página de memória
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] text-white/50 tracking-wide">Cor de fundo</span>
        <div className="flex gap-3 flex-wrap">
          {BG_COLORS.map((color) => {
            const isSelected = data.bgColor === color.hex
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange('bgColor', color.hex)}
                title={color.label}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="w-9 h-9 rounded-full border-2 transition-all"
                  style={{
                    background: color.hex,
                    borderColor: isSelected ? '#7c6aff' : 'rgba(255,255,255,0.12)',
                    outline: isSelected ? '2px solid #7c6aff' : '2px solid transparent',
                    outlineOffset: 3,
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-[9px] transition-colors"
                  style={{ color: isSelected ? '#b06fff' : 'rgba(255,255,255,0.3)' }}
                >
                  {color.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Preview da cor selecionada */}
      <div
        className="rounded-xl border border-white/8 p-4 flex items-center gap-3 transition-colors duration-300"
        style={{ background: data.bgColor }}
      >
        <div className="w-2 h-8 rounded-sm bg-red-600 flex-shrink-0" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-white">
            Título da memória
          </p>
          <p className="text-[10px] text-white/50 mt-0.5">Prévia da cor de fundo</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-white/8 px-4 py-[10px] text-[13px] text-white/50 hover:text-white transition-colors"
        >
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

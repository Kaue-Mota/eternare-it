// src/components/steps/StepVisual.tsx
import { type MemoryFormData, BG_COLORS } from '../../types/memory'

interface Props {
  data: MemoryFormData
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

const FONT_OPTIONS = [
  {
    id: 'moderna',
    label: 'Moderna',
    style: { fontFamily: 'DM Sans, sans-serif', fontWeight: 700 },
    preview: 'EU TE AMO',
  },
  {
    id: 'serifada',
    label: 'Serifada',
    style: { fontFamily: 'Georgia, serif', fontWeight: 700 },
    preview: 'EU TE AMO',
  },
  {
    id: 'manuscrita',
    label: 'Manuscrita',
    style: { fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '1.2em' },
    preview: 'EU TE AMO',
  },
]

export function StepVisual({ data, onChange, onNext, onBack }: Props) {
  const currentFont = data.fontStyle ?? 'moderna'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 4</p>
        <h2 className="text-[19px] font-medium text-white">Escolha o visual</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Cor de fundo e fonte do título
        </p>
      </div>

      {/* Cor de fundo */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] text-white/50 tracking-wide uppercase">Cor de fundo</span>
        <div className="flex gap-3 flex-wrap">
          {BG_COLORS.map((color) => {
            const isSelected = data.bgColor === color.hex
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange('bgColor', color.hex)}
                title={color.label}
                className="flex flex-col items-center gap-1.5"
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

      {/* Fonte do título */}
      <div className="flex flex-col gap-3">
        <span className="text-[11px] text-white/50 tracking-wide uppercase">Fonte do título</span>
        <div className="flex flex-col gap-2">
          {FONT_OPTIONS.map((font) => {
            const isSelected = currentFont === font.id
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => onChange('fontStyle' as keyof MemoryFormData, font.id as MemoryFormData[keyof MemoryFormData])}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-all text-left"
                style={{
                  background: isSelected ? 'rgba(124,106,255,0.12)' : 'rgba(255,255,255,0.03)',
                  border: isSelected ? '1px solid rgba(124,106,255,0.4)' : '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <span
                  className="text-[11px] tracking-wide"
                  style={{ color: isSelected ? '#b06fff' : 'rgba(255,255,255,0.4)' }}
                >
                  {font.label}
                </span>
                <span
                  className="text-[18px] uppercase tracking-widest text-white"
                  style={font.style}
                >
                  {font.preview}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Preview */}
      <div
        className="rounded-xl border border-white/8 p-4 flex items-center gap-3 transition-colors duration-300"
        style={{ background: data.bgColor }}
      >
        <div className="w-2 h-8 rounded-sm bg-red-600 flex-shrink-0" />
        <p
          className="text-[15px] uppercase tracking-widest text-white"
          style={FONT_OPTIONS.find(f => f.id === currentFont)?.style}
        >
          Título da memória
        </p>
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
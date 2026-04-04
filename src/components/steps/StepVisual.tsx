// src/components/steps/StepVisual.tsx
import { type MemoryFormData, BG_COLORS } from '../../types/memory'

interface Props {
  data: MemoryFormData
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

export const FONT_OPTIONS = [
  {
    id: 'moderna',
    label: 'Moderna',
    style: { fontFamily: 'DM Sans, sans-serif', fontWeight: 700 },
  },
  {
    id: 'serifada',
    label: 'Serifada',
    style: { fontFamily: 'Georgia, serif', fontWeight: 700 },
  },
  {
    id: 'manuscrita',
    label: 'Manuscrita',
    style: { fontFamily: 'Caveat, cursive', fontWeight: 700, fontSize: '1.2em' },
  },
]

function FontSelector({
  label,
  value,
  onChange,
  preview,
}: {
  label: string
  value: string
  onChange: (val: string) => void
  preview: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-white/50 tracking-wide uppercase">{label}</span>
      <div className="flex flex-col gap-2">
        {FONT_OPTIONS.map((font) => {
          const isSelected = value === font.id
          return (
            <button
              key={font.id}
              type="button"
              onClick={() => onChange(font.id)}
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
                className="text-[16px] uppercase tracking-widest text-white"
                style={font.style}
              >
                {preview}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function StepVisual({ data, onChange, onNext, onBack }: Props) {
  const currentFont = data.fontStyle ?? 'moderna'
  const currentTextFont = data.textFont ?? 'moderna'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 4</p>
        <h2 className="text-[19px] font-medium text-white">Escolha o visual</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Cor de fundo e fontes da memória
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
      <FontSelector
        label="Fonte do título"
        value={currentFont}
        onChange={(val) => onChange('fontStyle', val)}
        preview="EU TE AMO"
      />

      {/* Fonte do texto */}
      <FontSelector
        label="Fonte do texto"
        value={currentTextFont}
        onChange={(val) => onChange('textFont', val)}
        preview="Cada momento..."
      />

      {/* Preview */}
      <div
        className="rounded-xl border border-white/8 p-4 flex flex-col gap-2 transition-colors duration-300"
        style={{ background: data.bgColor }}
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 rounded-sm bg-red-600 flex-shrink-0" />
          <p
            className="text-[15px] uppercase tracking-widest text-white"
            style={FONT_OPTIONS.find(f => f.id === currentFont)?.style}
          >
            Título da memória
          </p>
        </div>
        <p
          className="text-[13px] leading-relaxed mt-1"
          style={{
            color: 'rgba(240,238,248,0.7)',
            ...FONT_OPTIONS.find(f => f.id === currentTextFont)?.style,
            fontWeight: 400,
          }}
        >
          Aqui aparece o texto da memória com a fonte escolhida.
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
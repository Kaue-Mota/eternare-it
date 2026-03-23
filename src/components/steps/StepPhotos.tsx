// src/components/steps/StepPhotos.tsx
import { type MemoryFormData } from '../../types/memory'
import { type StepErrors } from '../../lib/validation'

interface Props {
  data: MemoryFormData
  errors: StepErrors
  onOpenPicker: () => void
  onRemove: (index: number) => void
  onNext: () => void
}

const MAX_SLOTS = 5

export function StepPhotos({ data, errors, onOpenPicker, onRemove, onNext }: Props) {
  const { photosPreviews } = data
  const filled = photosPreviews.filter(Boolean).length
  const isFull = filled >= MAX_SLOTS

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 1</p>
        <h2 className="text-[19px] font-medium text-white">Escolha as fotos</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Selecione até 5 fotos de uma vez — trocam automaticamente a cada 5 segundos
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenPicker}
        disabled={isFull}
        className="w-full rounded-xl border border-dashed py-6 flex flex-col items-center gap-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          borderColor: errors.photos ? 'rgba(248,113,113,0.5)' : 'rgba(124,106,255,0.3)',
          background: errors.photos ? 'rgba(248,113,113,0.04)' : 'rgba(124,106,255,0.04)',
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="opacity-50 text-white">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
        <p className="text-[12px] text-white/50">
          {isFull ? 'Limite de 5 fotos atingido' : 'Clique para selecionar imagens'}
        </p>
        <span className="text-[11px] text-[#7c6aff]">
          {!isFull && 'Você pode selecionar várias de uma vez'}
        </span>
      </button>

      {errors.photos && (
        <p className="text-[11px] text-red-400 -mt-2">{errors.photos}</p>
      )}

      <div className="grid grid-cols-5 gap-[6px]">
        {Array.from({ length: MAX_SLOTS }, (_, i) => {
          const src = photosPreviews[i]
          return (
            <div key={i} className="relative aspect-square">
              {src ? (
                <div className="group w-full h-full rounded-md overflow-hidden border border-white/10">
                  <img src={src} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => onRemove(i)}
                    className="absolute top-1 right-1 w-[18px] h-[18px] rounded-full bg-black/75 flex items-center justify-center text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenPicker}
                  disabled={isFull}
                  className="w-full h-full rounded-md border border-dashed border-white/10 bg-white/[0.03] flex items-center justify-center text-white/15 text-lg hover:border-[#7c6aff]/40 transition-colors disabled:cursor-not-allowed"
                >
                  ＋
                </button>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-[11px] text-white/30 text-right -mt-2">
        {filled} / {MAX_SLOTS} fotos adicionadas
      </p>

      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-lg py-[10px] text-[13px] font-medium text-white transition-opacity hover:opacity-85"
        style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
      >
        Continuar →
      </button>
    </div>
  )
}
// src/components/steps/StepMusic.tsx
import { type MemoryFormData } from '../../types/memory'
import { type StepErrors } from '../../lib/validation'

interface Props {
  data: MemoryFormData
  errors: StepErrors
  onChange: <K extends keyof MemoryFormData>(key: K, value: MemoryFormData[K]) => void
  onNext: () => void
  onBack: () => void
}

export function StepMusic({ data, errors, onChange, onNext, onBack }: Props) {
  const hasUrl = data.spotifyUrl.trim().length > 0
  const isValid = !errors.spotifyUrl && hasUrl

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">Etapa 5</p>
        <h2 className="text-[19px] font-medium text-white">Adicione uma música</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Cole um link do Spotify — aparece tocando dentro da página
        </p>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="text-[11px] text-white/50 tracking-wide">Link do Spotify</span>
        <input
          type="url"
          placeholder="https://open.spotify.com/track/..."
          value={data.spotifyUrl}
          onChange={(e) => onChange('spotifyUrl', e.target.value)}
          className="bg-white/[0.04] rounded-lg px-3 py-[9px] text-[13px] text-white placeholder:text-white/20 outline-none transition-colors border"
          style={{
            borderColor: errors.spotifyUrl
              ? 'rgba(248,113,113,0.5)'
              : isValid
              ? 'rgba(29,185,84,0.5)'
              : 'rgba(255,255,255,0.08)',
          }}
        />
        {errors.spotifyUrl && (
          <p className="text-[11px] text-red-400">{errors.spotifyUrl}</p>
        )}
        {isValid && (
          <p className="text-[11px] text-[#1db954]">✓ Link válido</p>
        )}
      </label>

      <div className="rounded-lg border border-white/6 bg-white/[0.02] p-3 flex flex-col gap-1">
        <p className="text-[11px] font-medium text-white/60">Como copiar o link no Spotify</p>
        <p className="text-[11px] text-white/30 leading-relaxed">
          Abra a música → clique nos três pontos (...) → Compartilhar → Copiar link da música
        </p>
      </div>

      <p className="text-[11px] text-white/30 -mt-2">Esta etapa é opcional.</p>

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
          {isValid ? 'Revisar →' : 'Pular e revisar →'}
        </button>
      </div>
    </div>
  )
}
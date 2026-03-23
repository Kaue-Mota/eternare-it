// src/pages/Memory/MemoryPage.tsx
import { useEffect, useRef, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'

interface MemoryData {
  slug: string
  title: string
  date: string
  text: string
  bgColor: string
  spotifyUrl?: string
  photos: string[]
}

function calcCounter(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr + 'T00:00:00').getTime()
  if (diff < 0) return '—'
  const totalSec = Math.floor(diff / 1000)
  const sec = totalSec % 60
  const min = Math.floor(totalSec / 60) % 60
  const hr = Math.floor(totalSec / 3600) % 24
  const days = Math.floor(totalSec / 86400) % 365
  const years = Math.floor(totalSec / 31536000)
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ano${years > 1 ? 's' : ''}`)
  if (days > 0) parts.push(`${days} dia${days > 1 ? 's' : ''}`)
  parts.push(`${hr}h ${min}m ${sec}s`)
  return parts.join(', ')
}

function LiveCounter({ date }: { date: string }) {
  const [counter, setCounter] = useState(() => calcCounter(date))
  useEffect(() => {
    const id = setInterval(() => setCounter(calcCounter(date)), 1000)
    return () => clearInterval(id)
  }, [date])
  return <>{counter}</>
}

function PhotoCarousel({ photos }: { photos: string[] }) {
  const [idx, setIdx] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (photos.length < 2) return
    intervalRef.current = setInterval(() => setIdx(p => (p + 1) % photos.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [photos.length])

  return (
    <div className="px-5">
      <div className="bg-white rounded-2xl p-3 pb-10 shadow-2xl">
        <div className="relative w-full overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {photos.map((src, i) => (
              <div key={i} className="w-full shrink-0 aspect-square">
                <img src={src} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="h-1.5 rounded-full border-none cursor-pointer transition-all duration-300 p-0"
                  style={{
                    width: i === idx ? 20 : 6,
                    background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center pt-3">
          <p className="text-[11px] tracking-widest uppercase text-black/20 font-medium">
            eternare
          </p>
        </div>
      </div>
    </div>
  )
}

function SpotifyEmbed({ url }: { url: string }) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/)
  if (!match) return null
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`}
      width="100%"
      height="80"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl block"
    />
  )
}

export default function MemoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [memory, setMemory] = useState<MemoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/memory/${slug}`)
      .then((res) => {
        if (res.status === 404) { setNotFound(true); return null }
        return res.json()
      })
      .then((data) => { if (data) setMemory(data) })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex flex-col items-center justify-center gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: '#7c6aff', borderRightColor: '#b06fff' }}
        />
        <p className="text-[13px] text-white/30">Carregando memória...</p>
      </div>
    )
  }

  if (notFound || !memory) return <Navigate to="/" replace />

  const formattedDate = new Date(memory.date + 'T12:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen text-white" style={{ background: memory.bgColor, fontFamily: 'sans-serif' }}>
      <div className="max-w-lg mx-auto pb-16">

        {/* Spotify */}
        {memory.spotifyUrl && (
          <div className="px-5 pt-5">
            <SpotifyEmbed url={memory.spotifyUrl} />
          </div>
        )}

        {/* Fotos */}
        <div className={memory.spotifyUrl ? 'mt-4' : ''}>
          <PhotoCarousel photos={memory.photos} />
        </div>

        <div className="px-5">

          {/* Contador */}
          <div
            className="mt-5 rounded-xl px-4 py-3 text-center text-[13px] font-semibold tracking-wide"
            style={{ background: 'rgba(124,106,255,0.1)', border: '1px solid rgba(124,106,255,0.2)', color: '#b06fff' }}
          >
            <LiveCounter date={memory.date} />
          </div>

          {/* Título */}
          <div className="flex items-start gap-2.5 mt-6">
            <div className="w-[3px] self-stretch rounded-sm flex-shrink-0 bg-red-600" />
            <h1 className="text-[clamp(22px,6vw,32px)] font-extrabold uppercase tracking-widest text-white leading-tight break-words m-0">
              {memory.title}
            </h1>
          </div>

          {/* Data */}
          <p className="mt-2 text-[11px] tracking-widest uppercase" style={{ color: 'rgba(240,238,248,0.35)' }}>
            {formattedDate}
          </p>

          {/* Divisor */}
          <div className="mt-5 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />

          {/* Texto */}
          <p className="mt-5 text-[15px] leading-relaxed whitespace-pre-wrap" style={{ color: 'rgba(240,238,248,0.75)' }}>
            {memory.text}
          </p>

          {/* Rodapé */}
          <div
            className="mt-12 pt-4 flex items-center justify-between"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
              >
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C8 2 4 5 4 8.5C4 10.985 5.79 13 8 13C10.21 13 12 10.985 12 8.5C12 5 8 2 8 2Z" fill="white" fillOpacity="0.9" />
                  <path d="M8 6C8 6 6 7.5 6 9C6 10.105 6.895 11 8 11C9.105 11 10 10.105 10 9C10 7.5 8 6 8 6Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="text-[12px] font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>eternare.it</span>
            </div>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.15)' }}>/m/{memory.slug}</span>
          </div>

        </div>
      </div>
    </div>
  )
}
// src/components/ui/sections/Stats.tsx
import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

const STATS = [
  { value: 2000, suffix: '+', label: 'Memórias criadas', icon: '🔥' },
  { value: 5,    suffix: 'min', label: 'Para eternizar',   icon: '⚡' },
  { value: 100,  suffix: '%',  label: 'Link permanente',  icon: '🔗' },
  { value: 4.9,  suffix: '★',  label: 'Avaliação média',  icon: '⭐', float: true },
]

const STATS_STYLES = `
  @keyframes stat-line-grow {
    from { width: 0%; opacity: 0; }
    to   { width: 100%; opacity: 1; }
  }
  @keyframes stat-fade-up {
    from { opacity: 0; transform: translateY(36px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
`

function AnimatedCounter({
  end,
  suffix,
  inView,
  float: isFloat,
  duration = 1600,
}: {
  end: number
  suffix: string
  inView: boolean
  float?: boolean
  duration?: number
}) {
  const [count, setCount] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isFloat
        ? Math.round(eased * end * 10) / 10
        : Math.round(eased * end)
      setCount(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, end, duration, isFloat])

  return (
    <>
      {isFloat ? count.toFixed(1) : count.toLocaleString('pt-BR')}
      {suffix}
    </>
  )
}

export function Stats() {
  const { ref, inView } = useInView(0.25)

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative z-10 py-16 px-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <style>{STATS_STYLES}</style>

      {/* Linha decorativa que cresce */}
      <div className="max-w-5xl mx-auto mb-12 overflow-hidden">
        <div
          style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(124,106,255,0.4), transparent)',
            width: inView ? '100%' : '0%',
            opacity: inView ? 1 : 0,
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center text-center gap-2"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.96)',
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.12}s`,
            }}
          >
            {/* Ícone */}
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-1"
              style={{
                background: 'rgba(124,106,255,0.1)',
                border: '1px solid rgba(124,106,255,0.2)',
              }}
            >
              {stat.icon}
            </div>

            {/* Número animado */}
            <p
              className="text-4xl font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #9d7fff, #e0a8ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                inView={inView}
                float={stat.float}
                duration={1400 + i * 100}
              />
            </p>

            {/* Label */}
            <p className="text-[13px]" style={{ color: 'rgba(240,238,248,0.42)' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Linha decorativa que cresce (baixo) */}
      <div className="max-w-5xl mx-auto mt-12 overflow-hidden">
        <div
          style={{
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(124,106,255,0.4), transparent)',
            width: inView ? '100%' : '0%',
            opacity: inView ? 1 : 0,
            transition: 'width 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s, opacity 0.5s ease 0.3s',
          }}
        />
      </div>
    </section>
  )
}

// src/components/ui/BgAnimation.tsx
interface Props {
  type: string
}

export function BgAnimation({ type }: Props) {
  if (!type || type === 'none') return null

  return (
    <>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 0.9; transform: scale(1) rotate(180deg); }
        }
        @keyframes floatflame {
          0% { transform: translateY(0px) scale(1) rotate(-5deg); opacity: 0.7; }
          25% { transform: translateY(-12px) scale(1.1) rotate(3deg); opacity: 1; }
          50% { transform: translateY(-6px) scale(0.95) rotate(-3deg); opacity: 0.8; }
          75% { transform: translateY(-16px) scale(1.05) rotate(5deg); opacity: 0.9; }
          100% { transform: translateY(0px) scale(1) rotate(-5deg); opacity: 0.7; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>

        {/* ── ESTRELAS ── */}
        {type === 'stars' && Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 3,
              height: 1 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 5}s ${Math.random() * 5}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* ── BRILHOS ── */}
        {type === 'sparkles' && Array.from({ length: 24 }, (_, i) => (
          <div key={i} className="absolute"
            style={{
              fontSize: 10 + Math.random() * 18,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: `hsl(${260 + Math.random() * 80}, 80%, 80%)`,
              animation: `sparkle ${2 + Math.random() * 4}s ${Math.random() * 5}s ease-in-out infinite`,
            }}
          >
            ✦
          </div>
        ))}

        {/* ── CHAMAS FLUTUANTES ── */}
        {type === 'flames' && Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute"
            style={{
              fontSize: 16 + Math.random() * 24,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatflame ${3 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite`,
              filter: 'blur(0.5px)',
              opacity: 0.6 + Math.random() * 0.4,
            }}
          >
            🔥
          </div>
        ))}

      </div>
    </>
  )
}
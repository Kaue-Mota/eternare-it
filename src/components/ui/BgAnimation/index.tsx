// src/components/ui/BgAnimation.tsx
// Animações de fundo para a página de memória — CSS puro, sem canvas

interface Props {
  type: string
  bgColor: string
}

export function BgAnimation({ type, bgColor }: Props) {
  if (!type || type === 'none') return null

  return (
    <>
      <style>{`
        /* ── Estrelas ── */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        /* ── Brilhos ── */
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }
        /* ── Ondas ── */
        @keyframes wave {
          0% { transform: translateX(0) scaleY(1); }
          50% { transform: translateX(-25%) scaleY(0.8); }
          100% { transform: translateX(-50%) scaleY(1); }
        }
        /* ── Velas ── */
        @keyframes flicker {
          0%, 100% { transform: scaleX(1) scaleY(1); opacity: 0.9; }
          25% { transform: scaleX(0.95) scaleY(1.05); opacity: 1; }
          50% { transform: scaleX(1.05) scaleY(0.95); opacity: 0.85; }
          75% { transform: scaleX(0.98) scaleY(1.02); opacity: 0.95; }
        }
        @keyframes candlerise {
          0% { transform: translateY(0px); opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }
        /* ── Chamas ── */
        @keyframes flame {
          0%, 100% { transform: scaleX(1) scaleY(1) rotate(-2deg); opacity: 0.8; }
          33% { transform: scaleX(1.1) scaleY(0.9) rotate(2deg); opacity: 1; }
          66% { transform: scaleX(0.9) scaleY(1.1) rotate(-1deg); opacity: 0.85; }
        }
        @keyframes flamerise {
          0% { transform: translateY(0) scaleX(1); opacity: 0.7; }
          100% { transform: translateY(-200px) scaleX(0.3); opacity: 0; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>

        {/* ── ESTRELAS ── */}
        {type === 'stars' && Array.from({ length: 40 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 3,
              height: 1 + Math.random() * 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* ── BRILHOS ── */}
        {type === 'sparkles' && Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="absolute text-white/70"
            style={{
              fontSize: 10 + Math.random() * 16,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ${Math.random() * 4}s ease-in-out infinite`,
            }}
          >
            ✦
          </div>
        ))}

        {/* ── ONDAS ── */}
        {type === 'waves' && (
          <div className="absolute bottom-0 left-0 w-full" style={{ height: '40%' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="absolute bottom-0"
                style={{
                  width: '200%',
                  height: `${60 + i * 20}px`,
                  left: 0,
                  background: `rgba(124,106,255,${0.04 + i * 0.03})`,
                  borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
                  animation: `wave ${6 + i * 2}s ${i * 0.8}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}

        {/* ── VELAS ── */}
        {type === 'candles' && (
          <div className="absolute bottom-0 left-0 w-full flex justify-around items-end px-8">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex flex-col items-center" style={{ marginBottom: 0 }}>
                {/* Fumaça / partículas subindo */}
                {Array.from({ length: 3 }, (_, j) => (
                  <div key={j} className="absolute rounded-full"
                    style={{
                      width: 3,
                      height: 3,
                      background: 'rgba(255,255,255,0.3)',
                      bottom: 80 + j * 10,
                      animation: `candlerise ${1.5 + j * 0.5}s ${i * 0.4 + j * 0.3}s ease-out infinite`,
                    }}
                  />
                ))}
                {/* Chama */}
                <div style={{
                  width: 12,
                  height: 20,
                  background: 'linear-gradient(to top, #ff6600, #ffcc00, #fff7aa)',
                  borderRadius: '50% 50% 30% 30%',
                  animation: `flicker ${0.3 + Math.random() * 0.3}s ${i * 0.1}s ease-in-out infinite`,
                  boxShadow: '0 0 8px rgba(255,140,0,0.8), 0 0 20px rgba(255,100,0,0.4)',
                  marginBottom: 2,
                }} />
                {/* Corpo da vela */}
                <div style={{
                  width: 10,
                  height: 40 + i * 8,
                  background: `linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.08))`,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.15)',
                }} />
              </div>
            ))}
          </div>
        )}

        {/* ── CHAMAS ── */}
        {type === 'flames' && (
          <>
            {/* Partículas subindo */}
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="absolute rounded-full"
                style={{
                  width: 3 + Math.random() * 5,
                  height: 3 + Math.random() * 5,
                  left: `${Math.random() * 100}%`,
                  bottom: 0,
                  background: `hsl(${20 + Math.random() * 40}, 100%, ${60 + Math.random() * 30}%)`,
                  animation: `flamerise ${1.5 + Math.random() * 2}s ${Math.random() * 3}s ease-out infinite`,
                  filter: 'blur(1px)',
                }}
              />
            ))}
            {/* Faixa de chamas na base */}
            <div className="absolute bottom-0 left-0 w-full" style={{ height: 60 }}>
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="absolute bottom-0"
                  style={{
                    left: `${(i / 12) * 100 + Math.random() * 5}%`,
                    width: 20 + Math.random() * 30,
                    height: 30 + Math.random() * 40,
                    background: 'linear-gradient(to top, rgba(255,60,0,0.6), rgba(255,180,0,0.3), transparent)',
                    borderRadius: '50% 50% 30% 30%',
                    animation: `flame ${0.4 + Math.random() * 0.4}s ${Math.random() * 0.5}s ease-in-out infinite`,
                    filter: 'blur(2px)',
                  }}
                />
              ))}
            </div>
          </>
        )}

      </div>
    </>
  )
}
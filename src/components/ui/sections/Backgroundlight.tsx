// src/components/ui/BackgroundLight.tsx
// Fundo animado leve — CSS puro, sem canvas, sem WebGL

const STARS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.8 + Math.random() * 1.2,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 8,
  opacity: 0.04 + Math.random() * 0.18,
}))

export function BackgroundLight() {
  return (
    <div className="fixed inset-0 pointer-events-none" aria-hidden="true" style={{ zIndex: 0 }}>
      <style>{`
        @keyframes pulse1 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.15); }
        }
        @keyframes pulse2 {
          0%, 100% { opacity: 0.3; transform: scale(1.1); }
          50% { opacity: 0.6; transform: scale(0.95); }
        }
        @keyframes pulse3 {
          0%, 100% { opacity: 0.4; transform: scale(0.95); }
          50% { opacity: 0.65; transform: scale(1.1); }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -20px); }
          66% { transform: translate(-20px, 15px); }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: var(--s-op); transform: scale(1); }
          50% { opacity: calc(var(--s-op) * 0.1); transform: scale(0.3); }
        }
        @media (max-width: 767px) {
          .bg-star { animation: none !important; }
          .bg-blob { animation: none !important; }
        }
      `}</style>

      {/* Base escura */}
      <div className="absolute inset-0" style={{ background: '#070712' }} />

      {/* Campo de estrelas */}
      {STARS.map((s) => (
        <div
          key={s.id}
          className="bg-star absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: s.id % 4 === 0 ? '#b06fff' : s.id % 4 === 1 ? '#7c6aff' : '#ffffff',
            opacity: s.opacity,
            ['--s-op' as string]: s.opacity,
            animation: `star-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Blob 1 — roxo, topo esquerdo */}
      <div
        className="bg-blob absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          top: '-15%',
          left: '-10%',
          background: 'radial-gradient(circle, rgba(100,70,220,0.22) 0%, transparent 70%)',
          animation: 'pulse1 8s ease-in-out infinite',
        }}
      />

      {/* Blob 2 — azul, centro direito */}
      <div
        className="bg-blob absolute rounded-full"
        style={{
          width: 800,
          height: 800,
          top: '20%',
          right: '-15%',
          background: 'radial-gradient(circle, rgba(40,80,220,0.18) 0%, transparent 70%)',
          animation: 'pulse2 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />

      {/* Blob 3 — roxo claro, centro */}
      <div
        className="bg-blob absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '40%',
          left: '30%',
          background: 'radial-gradient(circle, rgba(130,80,255,0.12) 0%, transparent 70%)',
          animation: 'pulse3 12s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />

      {/* Blob 4 — azul escuro, rodapé */}
      <div
        className="bg-blob absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          bottom: '-10%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(30,60,180,0.15) 0%, transparent 70%)',
          animation: 'pulse1 9s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      {/* Blob 5 — drift suave */}
      <div
        className="bg-blob absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          top: '60%',
          right: '20%',
          background: 'radial-gradient(circle, rgba(80,50,200,0.1) 0%, transparent 70%)',
          animation: 'drift 15s ease-in-out infinite, pulse2 10s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* Noise overlay leve */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  )
}

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 1.8,
  duration: 2.5 + Math.random() * 4,
  delay: Math.random() * 7,
  opacity: 0.06 + Math.random() * 0.22,
}));

const HERO_STYLES = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: var(--max-op); transform: scale(1); }
    50% { opacity: calc(var(--max-op) * 0.15); transform: scale(0.4); }
  }
  @media (max-width: 767px) {
    .hero-particle { animation: none !important; }
  }
  @keyframes badge-ring {
    0%, 100% { box-shadow: 0 0 0 0 rgba(124,106,255,0); }
    60% { box-shadow: 0 0 0 7px rgba(124,106,255,0.08); }
  }
  @keyframes btn-glow {
    0%, 100% {
      box-shadow: 0 0 24px rgba(124,106,255,0.28), 0 4px 20px rgba(0,0,0,0.35);
    }
    50% {
      box-shadow: 0 0 52px rgba(124,106,255,0.55), 0 4px 20px rgba(0,0,0,0.35);
    }
  }
  @keyframes shimmer-line {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  @keyframes dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.6); opacity: 0.6; }
  }
`;

export default function Hero() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const particlesRef = useRef(PARTICLES);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  function handleTiltMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const rx = -dy * 10;
    const ry = dx * 10;
    if (tiltRef.current) {
      tiltRef.current.style.transition = "transform 0.12s ease-out";
      tiltRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.1), transparent 55%)`;
      glareRef.current.style.opacity = "1";
    }
  }

  function handleTiltLeave() {
    if (tiltRef.current) {
      tiltRef.current.style.transition = "transform 0.7s ease-out";
      tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const fadeUp = (delay: number): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-12 md:px-10 lg:px-16">
      <style>{HERO_STYLES}</style>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {particlesRef.current.map((p) => (
          <div
            key={p.id}
            className="hero-particle absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.id % 3 === 0 ? "#7c6aff" : p.id % 3 === 1 ? "#b06fff" : "#d4a8ff",
              opacity: p.opacity,
              ["--max-op" as string]: p.opacity,
              animation: `twinkle ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Glow localizado atrás do texto */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 0,
          top: "15%",
          left: "-5%",
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(124,106,255,0.11) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">

        {/* ── Coluna esquerda ─────────────────────────────────────────────── */}
        <div className="flex max-w-xl flex-col gap-7">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 self-start rounded-full px-4 py-1.5 text-[12px] font-medium"
            style={{
              background: "rgba(124,106,255,0.1)",
              border: "1px solid rgba(124,106,255,0.28)",
              color: "#b06fff",
              animation: "badge-ring 4s ease-in-out infinite",
              letterSpacing: "0.04em",
              ...fadeUp(0.08),
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full shrink-0"
              style={{ background: "#b06fff", animation: "dot-pulse 2s ease-in-out infinite" }}
            />
            Guarde o que importa
          </div>

          {/* Heading */}
          <h1
            className="text-5xl leading-[1.06] font-light md:text-6xl lg:text-7xl"
            style={{ fontFamily: "Georgia, serif", color: "#f0eef8", ...fadeUp(0.2) }}
          >
            Transforme memórias em{" "}
            <em
              style={{
                color: "#b06fff",
                fontStyle: "italic",
                background: "linear-gradient(135deg, #9d7fff, #e0a8ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              páginas digitais únicas
            </em>
          </h1>

          {/* Subtítulo */}
          <p
            className="max-w-lg text-base leading-relaxed md:text-[17px]"
            style={{ color: "rgba(240,238,248,0.52)", ...fadeUp(0.35) }}
          >
            Crie uma página única com fotos, música e palavras que vão durar
            enquanto quiser — compartilhe com um link ou QR Code.
          </p>

          {/* CTA Button */}
          <div style={fadeUp(0.5)}>
            <button
              onClick={() => navigate("/criar")}
              className="relative w-full overflow-hidden rounded-xl px-6 py-4 text-[17px] font-bold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.75 hover:cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #7c6aff, #b06fff)",
                animation: "btn-glow 3.5s ease-in-out infinite",
              }}
            >
              {/* Shimmer sweep */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)",
                  animation: "shimmer-line 3.5s 1s ease-in-out infinite",
                }}
              />
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-2xl font-light">+</span>
                Criar memória
              </span>
            </button>
          </div>

          {/* Garantias */}
          <div
            className="flex flex-wrap gap-x-5 gap-y-2"
            style={{ ...fadeUp(0.78) }}
          >
            {[
              {
                label: "Pagamento seguro",
                icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
              },
              {
                label: "Link exclusivo",
                icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                ),
              },
              {
                label: "QR Code por email",
                icon: (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                ),
              },
            ].map((g) => (
              <div key={g.label} className="flex items-center gap-1.5" style={{ color: "rgba(240,238,248,0.35)" }}>
                {g.icon}
                <span className="text-[12px]">{g.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Coluna direita — mockup com tilt 3D ──────────────────────── */}
        <div
          className="mx-auto flex w-full max-w-xl justify-center lg:justify-end"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? "translateY(0)" : "translateY(36px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
            perspective: "900px",
          }}
          onMouseMove={handleTiltMove}
          onMouseLeave={handleTiltLeave}
        >
          {/* Wrapper do tilt — recebe rotateX/Y via ref */}
          <div
            ref={tiltRef}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            {/* Aura de fundo */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,106,255,0.2) 0%, transparent 70%)",
                transform: "scale(1.35) translateZ(-20px)",
                filter: "blur(40px)",
              }}
            />

            {/* Imagem com float */}
            <img
              src="/images/home/hero/mockuphero.webp"
              alt="Prévia de páginas digitais personalizadas de memória"
              className="relative w-full max-w-115 drop-shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
              style={{ animation: "float 4.5s ease-in-out infinite", display: "block" }}
            />

            {/* Glare — segue o cursor */}
            <div
              ref={glareRef}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                opacity: 0,
                transition: "opacity 0.25s ease",
                mixBlendMode: "screen",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 hidden flex-col items-center z-10 gap-2 animate-bounce lg:flex">
        <p className="text-[10px] uppercase tracking-widest" style={{ color: "rgba(240,238,248,0.3)" }}>
          Rolar
        </p>
        <div
          className="h-10 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(124,106,255,0.5), transparent)" }}
        />
      </div>
    </section>
  );
}

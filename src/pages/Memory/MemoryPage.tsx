// src/pages/Memory/MemoryPage.tsx
import { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { BgAnimation } from "../../components/ui/BgAnimation";

// ── Module-level constants (random values generated once, not during render) ──
const EMOJI_DROPS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x:        Math.random() * 100,
  delay:    Math.random() * 5,
  duration: 4 + Math.random() * 5,
  size:     14 + Math.random() * 18,
}));

const PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id:    i,
  angle: (i / 32) * 360,
  dist:  60 + Math.random() * 110,
  size:  14 + Math.random() * 18,
}));


// ── Types ─────────────────────────────────────────────────────────────────────
interface MemoryData {
  slug: string; title: string; date: string; text: string;
  bgColor: string; spotifyUrl?: string; photos: string[];
  emoji: string; fontStyle: string; textFont: string;
  frameStyle: string; bgAnimation: string;
}

// ── Time ──────────────────────────────────────────────────────────────────────
function calcTimeUnits(dateStr: string) {
  const diff = Date.now() - new Date(dateStr + "T00:00:00").getTime();
  if (diff < 0) return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const s = Math.floor(diff / 1000);
  return {
    years:   Math.floor(s / 31536000),
    days:    Math.floor(s / 86400) % 365,
    hours:   Math.floor(s / 3600)  % 24,
    minutes: Math.floor(s / 60)    % 60,
    seconds: s % 60,
  };
}

// ── Live Counter ──────────────────────────────────────────────────────────────
function LiveCounter({ date }: { date: string }) {
  const [u, setU] = useState(() => calcTimeUnits(date));
  useEffect(() => {
    const id = setInterval(() => setU(calcTimeUnits(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  const segs = [
    ...(u.years > 0 ? [{ v: u.years,   l: u.years   === 1 ? "ano"  : "anos", accent: false }] : []),
    {                   v: u.days,    l: u.days    === 1 ? "dia"  : "dias", accent: false },
    {                   v: u.hours,   l: "h",                                accent: false },
    {                   v: u.minutes, l: "min",                              accent: false },
    {                   v: u.seconds, l: "s",                                accent: true  },
  ];

  return (
    <div className="flex flex-col items-center gap-3 w-full overflow-hidden">
      <p className="text-[9px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
        uma memória de
      </p>
      <div className="flex items-end justify-center flex-wrap gap-y-2 w-full">
        {segs.map((seg, i) => (
          <div key={i} className="flex items-end">
            <div className="flex flex-col items-center" style={{ minWidth: "clamp(28px, 8vw, 38px)" }}>
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: "clamp(20px, 6.5vw, 32px)",
                  color: seg.accent ? "#c084fc" : "#fff",
                  textShadow: seg.accent ? "0 0 28px rgba(192,132,252,0.8)" : "0 2px 16px rgba(0,0,0,0.5)",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(seg.v).padStart(2, "0")}
              </span>
              <span className="text-[7px] tracking-[0.16em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>
                {seg.l}
              </span>
            </div>
            {i < segs.length - 1 && (
              <span className="font-thin leading-none" style={{ fontSize: "clamp(12px, 4vw, 18px)", marginBottom: "clamp(16px, 5vw, 24px)", marginInline: "clamp(4px, 1.5vw, 6px)", color: "rgba(255,255,255,0.1)" }}>
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tilt 3D ───────────────────────────────────────────────────────────────────
function Tilt3D({ children, radius = 16 }: { children: React.ReactNode; radius?: number }) {
  const innerRef             = useRef<HTMLDivElement>(null);
  const glareRef             = useRef<HTMLDivElement>(null);
  const neutralBetaRef       = useRef<number | null>(null);
  const permissionAskedRef   = useRef(false);
  const startListeningRef    = useRef<(() => void) | null>(null);

  // ── Gyroscope (mobile) ────────────────────────────────────────────────────
  useEffect(() => {
    const isMobile = "ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile) return;

    function handleOrientation(e: DeviceOrientationEvent) {
      const gamma = e.gamma ?? 0; // left-right  −90..90
      const beta  = e.beta  ?? 0; // front-back −180..180

      // Calibrate neutral on first reading
      if (neutralBetaRef.current === null) neutralBetaRef.current = beta;

      const MAX = 12;
      const ry =  Math.max(-MAX, Math.min(MAX,  gamma * 0.4));
      const rx =  Math.max(-MAX, Math.min(MAX, -(beta - neutralBetaRef.current) * 0.4));

      if (innerRef.current) {
        innerRef.current.style.transition = "transform 0.12s ease-out";
        innerRef.current.style.transform  = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
      if (glareRef.current) {
        const gx = 50 + ry * 3;
        const gy = 50 - rx * 3;
        glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.13), transparent 60%)`;
        glareRef.current.style.opacity    = "1";
      }
    }

    function startListening() {
      if (permissionAskedRef.current) return;
      permissionAskedRef.current = true;

      const DOE = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof DOE.requestPermission === "function") {
        // iOS 13+ — must be called from a user gesture
        DOE.requestPermission()
          .then((state) => {
            if (state === "granted")
              window.addEventListener("deviceorientation", handleOrientation, true);
          })
          .catch(() => {});
      } else {
        // Android / others — no permission needed
        window.addEventListener("deviceorientation", handleOrientation, true);
      }
    }

    startListeningRef.current = startListening;
    return () => window.removeEventListener("deviceorientation", handleOrientation, true);
  }, []);

  // ── Mouse (desktop) ───────────────────────────────────────────────────────
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.1s ease-out";
      innerRef.current.style.transform  = `rotateX(${-dy * 11}deg) rotateY(${dx * 11}deg)`;
    }
    const gx = ((e.clientX - rect.left) / rect.width)  * 100;
    const gy = ((e.clientY - rect.top)  / rect.height) * 100;
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.14), transparent 58%)`;
      glareRef.current.style.opacity    = "1";
    }
  }

  function onLeave() {
    if (innerRef.current) {
      innerRef.current.style.transition = "transform 0.65s cubic-bezier(0.16,1,0.3,1)";
      innerRef.current.style.transform  = "rotateX(0deg) rotateY(0deg)";
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <div
      style={{ perspective: "900px" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onTouchStart={() => startListeningRef.current?.()}
    >
      <div ref={innerRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none"
          style={{ borderRadius: radius, opacity: 0, transition: "opacity 0.25s ease", mixBlendMode: "screen", zIndex: 10 }}
        />
      </div>
    </div>
  );
}

// ── Photo Carousel ────────────────────────────────────────────────────────────
function PhotoCarousel({ photos, frameStyle }: { photos: string[]; frameStyle: string }) {
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    if (photos.length < 2) return;
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % photos.length), 5000);
  }
  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  useEffect(() => { startTimer(); return stopTimer; }, [photos.length]);

  const frame = frameStyle ?? "polaroid";

  type FrameCfg = { wrap: React.CSSProperties; inner: React.CSSProperties; radius: number; label: boolean };
  const FRAMES: Record<string, FrameCfg> = {
    polaroid:    { wrap: { background: "#fff", borderRadius: 18, padding: "14px 14px 44px", boxShadow: "0 16px 48px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.08)" }, inner: { borderRadius: 8, overflow: "hidden" }, radius: 18, label: true },
    vintage:     { wrap: { background: "#f5e6c8", borderRadius: 8, padding: "12px 12px 40px", boxShadow: "0 10px 36px rgba(0,0,0,0.5)", filter: "sepia(0.35)" }, inner: { borderRadius: 4, overflow: "hidden" }, radius: 8, label: true },
    minimalista: { wrap: { borderRadius: 18, overflow: "hidden", boxShadow: "0 16px 48px rgba(0,0,0,0.55)" }, inner: {}, radius: 18, label: false },
    neon:        { wrap: { borderRadius: 18, padding: 3, background: "linear-gradient(135deg,#7c6aff,#b06fff,#ff6aff)" }, inner: { borderRadius: 16, overflow: "hidden" }, radius: 18, label: false },
  };
  const cfg = FRAMES[frame] ?? FRAMES.polaroid;

  return (
    <Tilt3D radius={cfg.radius}>
      {frame === "neon" && (
        <style>{`@keyframes neon-glow{0%,100%{box-shadow:0 0 28px rgba(124,106,255,.75),0 0 56px rgba(176,111,255,.35)}50%{box-shadow:0 0 56px rgba(124,106,255,1),0 0 112px rgba(255,106,255,.55)}}`}</style>
      )}
      <div style={frame === "neon" ? { ...cfg.wrap, animation: "neon-glow 2s ease-in-out infinite" } : cfg.wrap}>
        <div style={cfg.inner}>
          <div className="relative w-full overflow-hidden">
            <div
              className="flex"
              style={{ transform: `translateX(-${idx * 100}%)`, transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)" }}
            >
              {photos.map((src, i) => (
                <div key={i} className="w-full shrink-0" style={{ aspectRatio: "9/16" }}>
                  <img src={src} alt="" className="w-full h-full object-cover block select-none" draggable={false} />
                </div>
              ))}
            </div>

            {/* Dots */}
            {photos.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { stopTimer(); setIdx(i); startTimer(); }}
                    className="h-1.5 rounded-full border-none cursor-pointer p-0"
                    style={{
                      width: i === idx ? 24 : 6,
                      background: i === idx ? "#b06fff" : "rgba(176,111,255,0.35)",
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Nav arrows (hover, desktop only) */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() => { stopTimer(); setIdx((p) => (p === 0 ? photos.length - 1 : p - 1)); startTimer(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 border-none cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button
                  onClick={() => { stopTimer(); setIdx((p) => (p + 1) % photos.length); startTimer(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity z-10 border-none cursor-pointer"
                  style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              </>
            )}
          </div>
        </div>

        {cfg.label && (
          <div className="flex items-center justify-center pt-2.5">
            <p className="text-[10px] tracking-widest uppercase font-medium"
              style={{ color: frame === "vintage" ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.18)" }}>
              eternare
            </p>
          </div>
        )}
      </div>
    </Tilt3D>
  );
}

// ── Spotify ───────────────────────────────────────────────────────────────────
function SpotifyEmbed({ url }: { url: string }) {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      <iframe
        src={`https://open.spotify.com/embed/track/${match[1]}?autoplay=1&utm_source=generator&theme=0`}
        width="100%" height="80" frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="block"
      />
    </div>
  );
}

// ── Emoji Rain ────────────────────────────────────────────────────────────────
function EmojiRain({ emoji }: { emoji: string }) {
  const drops = EMOJI_DROPS;

  return (
    <>
      <style>{`@keyframes emojifall{0%{transform:translateY(-50px) rotate(0deg);opacity:0}10%{opacity:.8}90%{opacity:.5}100%{transform:translateY(100vh) rotate(360deg);opacity:0}}`}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {drops.map((d) => (
          <div key={d.id} className="absolute select-none"
            style={{ left: `${d.x}%`, top: -50, fontSize: d.size, animation: `emojifall ${d.duration}s ${d.delay}s linear infinite` }}>
            {emoji}
          </div>
        ))}
      </div>
    </>
  );
}

// ── Entry Button ──────────────────────────────────────────────────────────────
function EntryButton({ emoji, bgColor, onReveal }: { emoji: string; bgColor: string; onReveal: () => void }) {
  const [exploding, setExploding] = useState(false);
  const particles = PARTICLES;

  function handleClick() {
    if (exploding) return;
    setExploding(true);
    setTimeout(onReveal, 780);
  }

  return (
    <>
      <style>{`
        @keyframes particle-fly {
          0%   { transform:translate(-50%,-50%) scale(1); opacity:1; }
          100% { transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) scale(0); opacity:0; }
        }
        @keyframes entry-ring {
          0%,100% { opacity:.3; transform:scale(1); }
          50%     { opacity:.7; transform:scale(1.12); }
        }
        @keyframes btn-glow {
          0%,100% { box-shadow:0 0 28px rgba(124,106,255,.55),0 0 56px rgba(124,106,255,.2),0 16px 48px rgba(0,0,0,.55); }
          50%     { box-shadow:0 0 56px rgba(124,106,255,.9),0 0 112px rgba(176,111,255,.45),0 16px 48px rgba(0,0,0,.55); }
        }
        @keyframes btn-float {
          0%,100% { transform:translateY(0) rotateX(10deg); }
          50%     { transform:translateY(-10px) rotateX(10deg); }
        }
        @keyframes scan-line {
          0%   { top:-100%; opacity:.5; }
          100% { top:220%;  opacity:0; }
        }
      `}</style>

      <div
        className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ zIndex: 50, background: `${bgColor}e0`, backdropFilter: "blur(14px)" }}
      >
        {/* Pulsing rings */}
        {!exploding && [
          { size: "min(200px, 56vw)", opacity: 0.2,  delay: 0 },
          { size: "min(270px, 74vw)", opacity: 0.15, delay: 0.35 },
          { size: "min(340px, 91vw)", opacity: 0.1,  delay: 0.7 },
        ].map(({ size, opacity, delay }, i) => (
          <div
            key={i}
            className="absolute rounded-full border pointer-events-none"
            style={{
              width: size, height: size,
              borderColor: `rgba(124,106,255,${opacity})`,
              animation: `entry-ring 2.2s ${delay}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Explosion particles */}
        {exploding && particles.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          return (
            <div
              key={p.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: "50%", top: "50%", fontSize: p.size,
                ["--dx" as string]: `${Math.cos(rad) * p.dist}px`,
                ["--dy" as string]: `${Math.sin(rad) * p.dist}px`,
                animation: "particle-fly 0.78s cubic-bezier(0.16,1,0.3,1) forwards",
              }}
            >
              {emoji}
            </div>
          );
        })}

        {/* Button */}
        <div style={{ perspective: "700px" }}>
          <button
            onClick={handleClick}
            className="relative overflow-hidden px-8 py-4 sm:px-12 sm:py-5 rounded-2xl text-white font-extrabold text-[16px] sm:text-[18px] tracking-wider uppercase cursor-pointer select-none border-none outline-none"
            style={{
              background: "linear-gradient(145deg, #a07fff, #6a4fff)",
              animation: exploding ? "none" : "btn-glow 2.5s ease-in-out infinite, btn-float 3s ease-in-out infinite",
              transform: "rotateX(10deg)", transformStyle: "preserve-3d",
            }}
          >
            {/* Scan line sweep */}
            {!exploding && (
              <span
                className="absolute left-0 right-0 h-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom,transparent,rgba(255,255,255,0.13),transparent)", animation: "scan-line 2.8s linear infinite" }}
              />
            )}
            {/* 3D depth face */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(145deg,#3a1fa0,#2d1580)", transform: "translateZ(-10px) translateY(10px)", zIndex: -1 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <span className="text-2xl">{emoji}</span>
              Clique Aqui
              <span className="text-2xl">{emoji}</span>
            </span>
          </button>
        </div>

        <p className="mt-8 text-[10px] tracking-[0.24em] uppercase" style={{ color: "rgba(240,238,248,0.22)" }}>
          Abrir memória
        </p>
      </div>
    </>
  );
}

// ── Memory Page ───────────────────────────────────────────────────────────────
export default function MemoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [memory, setMemory]   = useState<MemoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [visible, setVisible]   = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/memory/${slug}`)
      .then((r) => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then((d) => { if (d) setMemory(d); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  // Trigger entrance animations shortly after reveal
  useEffect(() => {
    if (!revealed) return;
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, [revealed]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090f] flex flex-col items-center justify-center gap-4">
        <div
          className="w-9 h-9 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: "#7c6aff", borderRightColor: "#b06fff" }}
        />
        <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.22)" }}>
          Carregando memória...
        </p>
      </div>
    );
  }

  if (notFound || !memory) return <Navigate to="/" replace />;

  const formattedDate = new Date(memory.date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const emoji     = memory.emoji     || "❤️";
  const titleFont = memory.fontStyle === "serifada" ? "Georgia, serif" : memory.fontStyle === "manuscrita" ? "Caveat, cursive" : "DM Sans, sans-serif";
  const bodyFont  = memory.textFont  === "serifada" ? "Georgia, serif" : memory.textFont  === "manuscrita" ? "Caveat, cursive" : "DM Sans, sans-serif";

  // Reusable entrance style — fade + slide up
  const enter = (delay: number): React.CSSProperties => ({
    opacity:    visible ? 1 : 0,
    transform:  visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
    transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden"
      style={{ background: memory.bgColor, position: "relative" }}
    >
      <BgAnimation type={memory.bgAnimation} />

      {!revealed && (
        <EntryButton emoji={emoji} bgColor={memory.bgColor} onReveal={() => setRevealed(true)} />
      )}
      {revealed && <EmojiRain emoji={emoji} />}

      {revealed && (
        <div className="relative overflow-hidden" style={{ zIndex: 2 }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-16 flex flex-col gap-6">

            {/* ── Spotify ── */}
            {memory.spotifyUrl && (
              <div style={enter(0)}>
                <SpotifyEmbed url={memory.spotifyUrl} />
              </div>
            )}

            {/* ── Main two-column layout ── */}
            <div className="flex flex-col lg:flex-row gap-6 lg:items-center">

              {/* Left — Carousel + tilt */}
              <div
                className="w-full lg:w-[320px] shrink-0 flex justify-center"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 80ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 80ms",
                }}
              >
                <div className="w-full" style={{ maxWidth: "clamp(200px, 65vw, 320px)" }}>
                  <PhotoCarousel photos={memory.photos} frameStyle={memory.frameStyle} />
                </div>
              </div>

              {/* Right — Content */}
              <div
                className="flex-1 min-w-0 flex flex-col gap-4"
                style={{
                  opacity:    visible ? 1 : 0,
                  transform:  visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 160ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 160ms",
                }}
              >

                {/* Counter card */}
                <div
                  className="rounded-2xl px-4 py-5 sm:px-6 sm:py-6"
                  style={{
                    background:     "rgba(0,0,0,0.28)",
                    backdropFilter: "blur(20px)",
                    border:         "1px solid rgba(255,255,255,0.07)",
                    boxShadow:      "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    ...enter(260),
                  }}
                >
                  <LiveCounter date={memory.date} />
                </div>

                {/* Main info card */}
                <div
                  className="rounded-2xl p-4 sm:p-6 flex flex-col gap-0"
                  style={{
                    background:     "rgba(0,0,0,0.28)",
                    backdropFilter: "blur(20px)",
                    border:         "1px solid rgba(255,255,255,0.07)",
                    boxShadow:      "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                    ...enter(360),
                  }}
                >
                  {/* Title */}
                  <div className="flex items-start gap-3 mb-2 min-w-0">
                    <div
                      className="w-1 self-stretch rounded-full shrink-0 mt-1"
                      style={{ background: "linear-gradient(to bottom, #7c6aff, #b06fff)" }}
                    />
                    <h1
                      className="font-extrabold uppercase leading-tight w-full"
                      style={{
                        fontFamily: titleFont,
                        color: "#f0eef8",
                        textShadow: "0 2px 16px rgba(0,0,0,0.6)",
                        fontSize: "clamp(20px, 5vw, 38px)",
                        letterSpacing: "clamp(0.03em, 1vw, 0.1em)",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        minWidth: 0,
                      }}
                    >
                      {memory.title}
                    </h1>
                  </div>

                  {/* Date */}
                  <p
                    className="text-[10px] tracking-[0.18em] uppercase ml-4 mb-5"
                    style={{ color: "rgba(240,238,248,0.3)" }}
                  >
                    {formattedDate}
                  </p>

                  {/* Divider */}
                  <div className="h-px mb-5" style={{ background: "linear-gradient(to right, rgba(124,106,255,0.3), rgba(255,255,255,0.05))" }} />

                  {/* Text */}
                  <p
                    className="text-[15px] leading-[1.75] whitespace-pre-wrap mb-7"
                    style={{
                      color:          "rgba(240,238,248,0.82)",
                      fontFamily:     bodyFont,
                      overflowWrap:   "break-word",
                      wordBreak:      "break-word",
                      textShadow:     "0 1px 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    {memory.text}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5.5 h-5.5 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: "linear-gradient(135deg, #7c6aff, #b06fff)" }}
                      >
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="M8 2C8 2 4 5 4 8.5C4 10.985 5.79 13 8 13C10.21 13 12 10.985 12 8.5C12 5 8 2 8 2Z" fill="white" fillOpacity="0.9" />
                          <path d="M8 6C8 6 6 7.5 6 9C6 10.105 6.895 11 8 11C9.105 11 10 10.105 10 9C10 7.5 8 6 8 6Z" fill="white" fillOpacity="0.4" />
                        </svg>
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
                        eternareit.com
                      </span>
                    </div>
                    <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.13)" }}>
                      /m/{memory.slug}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

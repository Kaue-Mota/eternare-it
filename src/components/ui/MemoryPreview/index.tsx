// src/components/ui/MemoryPreview/index.tsx
import { useEffect, useRef, useState } from "react";
import type { MemoryFormData } from "../../../types/memory";

interface Props {
  data: MemoryFormData;
}

function calcTimeUnits(dateStr: string) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr + "T00:00:00").getTime();
  if (diff < 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    years:   Math.floor(s / 31536000),
    days:    Math.floor(s / 86400) % 365,
    hours:   Math.floor(s / 3600)  % 24,
    minutes: Math.floor(s / 60)    % 60,
    seconds: s % 60,
  };
}

function getFontFamily(style: string) {
  if (style === "serifada") return "Georgia, serif";
  if (style === "manuscrita") return "Caveat, cursive";
  return "DM Sans, sans-serif";
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit", month: "long", year: "numeric",
  });
}

// ── Mini LiveCounter (mesma lógica do MemoryPage) ─────────────────────────────
function MiniLiveCounter({ date }: { date: string }) {
  const [u, setU] = useState(() => calcTimeUnits(date));
  useEffect(() => {
    setU(calcTimeUnits(date));
    if (!date) return;
    const id = setInterval(() => setU(calcTimeUnits(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  if (!u) {
    return (
      <p className="text-[9px] tracking-[0.22em] uppercase text-center" style={{ color: "rgba(255,255,255,0.28)" }}>
        {date ? "data no futuro" : "defina a data"}
      </p>
    );
  }

  const segs = [
    ...(u.years > 0 ? [{ v: u.years,   l: u.years === 1 ? "ano" : "anos", accent: false }] : []),
    {                   v: u.days,    l: u.days  === 1 ? "dia" : "dias", accent: false },
    {                   v: u.hours,   l: "h",                             accent: false },
    {                   v: u.minutes, l: "min",                           accent: false },
    {                   v: u.seconds, l: "s",                             accent: true  },
  ];

  return (
    <div className="flex flex-col items-center gap-2 w-full overflow-hidden">
      <p className="text-[7px] tracking-[0.22em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>
        uma memória de
      </p>
      <div className="flex items-end justify-center flex-wrap gap-y-1 w-full">
        {segs.map((seg, i) => (
          <div key={i} className="flex items-end">
            <div className="flex flex-col items-center" style={{ minWidth: 24 }}>
              <span
                className="font-bold leading-none"
                style={{
                  fontSize: 15,
                  color: seg.accent ? "#c084fc" : "#fff",
                  textShadow: seg.accent ? "0 0 14px rgba(192,132,252,0.8)" : "0 1px 10px rgba(0,0,0,0.5)",
                  fontVariantNumeric: "tabular-nums",
                  letterSpacing: "-0.02em",
                }}
              >
                {String(seg.v).padStart(2, "0")}
              </span>
              <span className="text-[5px] tracking-[0.16em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                {seg.l}
              </span>
            </div>
            {i < segs.length - 1 && (
              <span className="font-thin leading-none" style={{ fontSize: 10, marginBottom: 11, marginInline: 3, color: "rgba(255,255,255,0.1)" }}>
                ·
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mini BgAnimation escopado (absolute, não fixed) ──────────────────────────
function MiniBgAnimation({ type }: { type: string }) {
  if (!type || type === "none") return null;

  if (type === "stars") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {Array.from({ length: 30 }, (_, i) => (
          <div key={i} className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `mp-twinkle ${2 + Math.random() * 5}s ${Math.random() * 5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "sparkles") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <div key={i} className="absolute"
            style={{
              fontSize: 7 + Math.random() * 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: `hsl(${260 + Math.random() * 80}, 80%, 80%)`,
              animation: `mp-sparkle ${2 + Math.random() * 4}s ${Math.random() * 5}s ease-in-out infinite`,
            }}
          >
            ✦
          </div>
        ))}
      </div>
    );
  }

  if (type === "flames") {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="absolute"
            style={{
              fontSize: 10 + Math.random() * 14,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `mp-floatflame ${3 + Math.random() * 4}s ${Math.random() * 4}s ease-in-out infinite`,
              filter: "blur(0.5px)",
              opacity: 0.6 + Math.random() * 0.4,
            }}
          >
            🔥
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export function MemoryPreview({ data }: Props) {
  const { photosPreviews, title, date, text, bgColor, spotifyUrl, fontStyle, textFont, frameStyle, emoji, bgAnimation } = data;

  const photos = photosPreviews.filter(Boolean);
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSlideIdx(0);
    if (photos.length < 2) return;
    intervalRef.current = setInterval(() => setSlideIdx((p) => (p + 1) % photos.length), 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [photos.length]);

  const spotifyMatch = spotifyUrl?.match(/track\/([a-zA-Z0-9]+)/);
  const hasSpotify = Boolean(spotifyMatch);
  const frame = frameStyle ?? "polaroid";
  const titleFont = getFontFamily(fontStyle ?? "moderna");
  const bodyFont = getFontFamily(textFont ?? "moderna");

  // drops de emoji fixos para o preview
  const drops = useRef(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 3,
      size: 10 + Math.random() * 10,
    }))
  ).current;

  const frameWrapStyle: React.CSSProperties =
    frame === "polaroid" ? { background: "#fff", borderRadius: 12, padding: "8px 8px 28px", boxShadow: "0 4px 16px rgba(0,0,0,0.4)" } :
    frame === "vintage" ? { background: "#f5e6c8", borderRadius: 6, padding: "7px 7px 24px", boxShadow: "0 3px 12px rgba(0,0,0,0.4)", filter: "sepia(0.3)" } :
    frame === "minimalista" ? { borderRadius: 10, overflow: "hidden", boxShadow: "0 3px 12px rgba(0,0,0,0.3)" } :
    frame === "neon" ? { borderRadius: 10, padding: 2, background: "linear-gradient(135deg, #7c6aff, #b06fff, #ff6aff)", boxShadow: "0 0 12px rgba(124,106,255,0.7)" } :
    { background: "#fff", borderRadius: 12, padding: "8px 8px 28px" };

  const frameInnerStyle: React.CSSProperties =
    frame === "neon" ? { borderRadius: 9, overflow: "hidden" } :
    frame === "minimalista" ? {} :
    { borderRadius: 6, overflow: "hidden" };

  // Card glass igual ao MemoryPage
  const cardStyle: React.CSSProperties = {
    background:     "rgba(0,0,0,0.28)",
    backdropFilter: "blur(20px)",
    border:         "1px solid rgba(255,255,255,0.07)",
    boxShadow:      "0 6px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
    borderRadius:   14,
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[10px] tracking-widest uppercase text-white/30">
        Preview em tempo real
      </span>

      <div
        className="rounded-[30px] border-2 border-white/10 overflow-hidden flex flex-col relative"
        style={{
          width: 300,
          padding: 14,
          background: bgColor,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px rgba(0,0,0,0.7)",
          gap: 10,
        }}
      >
        {/* Animação de fundo escopada */}
        <style>{`
          @keyframes previewfall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 0.7; } 100% { transform: translateY(700px) rotate(360deg); opacity: 0; } }
          @keyframes mp-twinkle { 0%, 100% { opacity: 0.15; transform: scale(1); } 50% { opacity: 1; transform: scale(1.5); } }
          @keyframes mp-sparkle { 0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 0.9; transform: scale(1) rotate(180deg); } }
          @keyframes mp-floatflame { 0% { transform: translateY(0) scale(1) rotate(-5deg); opacity: 0.7; } 25% { transform: translateY(-12px) scale(1.1) rotate(3deg); opacity: 1; } 50% { transform: translateY(-6px) scale(0.95) rotate(-3deg); opacity: 0.8; } 75% { transform: translateY(-16px) scale(1.05) rotate(5deg); opacity: 0.9; } 100% { transform: translateY(0) scale(1) rotate(-5deg); opacity: 0.7; } }
        `}</style>
        <MiniBgAnimation type={bgAnimation} />

        {/* Chuva de emojis */}
        {emoji && (
          <>
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
              {drops.map(drop => (
                <div
                  key={drop.id}
                  className="absolute"
                  style={{
                    left: `${drop.x}%`,
                    top: -20,
                    fontSize: drop.size,
                    animation: `previewfall ${drop.duration}s ${drop.delay}s linear infinite`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Spotify — igual ao MemoryPage: iframe rounded-2xl com borda */}
        {hasSpotify && spotifyMatch && (
          <div
            className="relative"
            style={{ zIndex: 2, height: 80 }}
          >
            <iframe
              src={`https://open.spotify.com/embed/track/${spotifyMatch[1]}?utm_source=generator&theme=0`}
              width="100%" height="80" frameBorder="0" scrolling="no"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="block w-full rounded-xl"
              style={{ border: "none", colorScheme: "dark" }}
            />
          </div>
        )}

        {/* Foto carrossel */}
        <div style={{ position: "relative", zIndex: 2 }} className="flex justify-center">
          <div style={{ width: "70%" }}>
            <div style={frameWrapStyle}>
              <div style={frameInnerStyle}>
                <div className="relative overflow-hidden w-full" style={{ aspectRatio: "9/16" }}>
                  {photos.length > 0 ? (
                    <div
                      className="flex transition-transform duration-500 ease-in-out h-full"
                      style={{ transform: `translateX(-${slideIdx * 100}%)` }}
                    >
                      {photos.map((src, i) => (
                        <div key={i} className="w-full h-full shrink-0">
                          <img src={src} alt="" className="w-full h-full object-cover block" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
                        <rect x="3" y="3" width="18" height="18" rx="3" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                  {photos.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                      {photos.map((_, i) => (
                        <button key={i} onClick={() => setSlideIdx(i)}
                          className="h-1 rounded-full border-none p-0 cursor-pointer transition-all duration-300"
                          style={{ width: i === slideIdx ? 14 : 4, background: i === slideIdx ? "#fff" : "rgba(255,255,255,0.4)" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {(frame === "polaroid" || frame === "vintage") && (
                <p className="text-center text-[8px] tracking-widest uppercase mt-2 font-medium"
                  style={{ color: frame === "vintage" ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.2)" }}>
                  eternare
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Counter card — igual ao MemoryPage */}
        <div style={{ ...cardStyle, padding: "10px 12px", position: "relative", zIndex: 2 }}>
          <MiniLiveCounter date={date} />
        </div>

        {/* Main info card — igual ao MemoryPage */}
        <div style={{ ...cardStyle, padding: 12, position: "relative", zIndex: 2 }}>
          {/* Title com barra roxa */}
          <div className="flex items-start gap-2 mb-1 min-w-0">
            <div
              className="self-stretch rounded-full shrink-0 mt-0.5"
              style={{ width: 3, background: "linear-gradient(to bottom, #7c6aff, #b06fff)" }}
            />
            {title ? (
              <h1
                className="font-extrabold uppercase leading-tight w-full wrap-break-word"
                style={{
                  fontFamily: titleFont,
                  color: "#f0eef8",
                  textShadow: "0 1px 10px rgba(0,0,0,0.6)",
                  fontSize: 14,
                  letterSpacing: "0.04em",
                  minWidth: 0,
                }}
              >
                {title}
              </h1>
            ) : (
              <p className="text-[10px] text-white/30 italic">Seu título aqui</p>
            )}
          </div>

          {/* Data */}
          {date && (
            <p
              className="text-[8px] tracking-[0.18em] uppercase ml-3 mb-2"
              style={{ color: "rgba(240,238,248,0.3)" }}
            >
              {formatDate(date)}
            </p>
          )}

          {/* Divisor */}
          <div className="h-px mb-2" style={{ background: "linear-gradient(to right, rgba(124,106,255,0.3), rgba(255,255,255,0.05))" }} />

          {/* Texto */}
          {text ? (
            <p
              className="whitespace-pre-wrap wrap-break-word mb-3"
              style={{
                color:      "rgba(240,238,248,0.82)",
                fontFamily: bodyFont,
                fontSize:   9.5,
                lineHeight: 1.7,
                textShadow: "0 1px 6px rgba(0,0,0,0.4)",
              }}
            >
              {text}
            </p>
          ) : (
            <p className="text-[10px] text-white/25 italic mb-3">O texto da sua memória aparecerá aqui...</p>
          )}

          {/* Footer eternare */}
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-1.5">
              <div
                className="rounded-md flex items-center justify-center shrink-0"
                style={{ width: 16, height: 16, background: "linear-gradient(135deg, #7c6aff, #b06fff)" }}
              >
                <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2C8 2 4 5 4 8.5C4 10.985 5.79 13 8 13C10.21 13 12 10.985 12 8.5C12 5 8 2 8 2Z" fill="white" fillOpacity="0.9" />
                  <path d="M8 6C8 6 6 7.5 6 9C6 10.105 6.895 11 8 11C9.105 11 10 10.105 10 9C10 7.5 8 6 8 6Z" fill="white" fillOpacity="0.4" />
                </svg>
              </div>
              <span className="text-[8px] font-medium" style={{ color: "rgba(255,255,255,0.22)" }}>
                eternareit.com
              </span>
            </div>
            <span className="text-[7px]" style={{ color: "rgba(255,255,255,0.13)" }}>
              /m/suamemoria
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

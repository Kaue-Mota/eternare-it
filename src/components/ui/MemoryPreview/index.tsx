// src/components/ui/MemoryPreview/index.tsx
import { useEffect, useRef, useState } from "react";
import type { MemoryFormData } from "../../../types/memory";

interface Props {
  data: MemoryFormData;
}

function calcCounter(dateStr: string): string {
  if (!dateStr) return "defina a data para o contador";
  const diff = Date.now() - new Date(dateStr + "T00:00:00").getTime();
  if (diff < 0) return "data no futuro";
  const totalSec = Math.floor(diff / 1000);
  const sec = totalSec % 60;
  const min = Math.floor(totalSec / 60) % 60;
  const hr = Math.floor(totalSec / 3600) % 24;
  const days = Math.floor(totalSec / 86400) % 365;
  const years = Math.floor(totalSec / 31536000);
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ano${years > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} dia${days > 1 ? "s" : ""}`);
  parts.push(`${hr}h ${min}m ${sec}s`);
  return parts.join(", ");
}

function getFontFamily(style: string) {
  if (style === "serifada") return "Georgia, serif";
  if (style === "manuscrita") return "Caveat, cursive";
  return "DM Sans, sans-serif";
}

export function MemoryPreview({ data }: Props) {
  const { photosPreviews, title, date, text, bgColor, spotifyUrl, fontStyle, textFont, frameStyle, emoji } = data;

  const [counter, setCounter] = useState(() => calcCounter(date));
  useEffect(() => {
    setCounter(calcCounter(date));
    if (!date) return;
    const id = setInterval(() => setCounter(calcCounter(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

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

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-[10px] tracking-widest uppercase text-white/30">
        Preview em tempo real
      </span>

      {/* Moldura do celular — largura maior */}
      <div
        className="rounded-[30px] border-2 border-white/10 overflow-hidden flex flex-col relative"
        style={{
          width: 320,
          padding: 20,
          background: bgColor,
          boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px rgba(0,0,0,0.7)",
        }}
      >
        {/* Chuva de emojis no preview */}
        {emoji && (
          <>
            <style>{`
              @keyframes previewfall {
                0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 0.7; }
                100% { transform: translateY(700px) rotate(360deg); opacity: 0; }
              }
            `}</style>
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

        {/* Spotify iframe real */}
        {hasSpotify && spotifyMatch && (
          <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
            <div className="w-full h-20 ">
              <iframe
              className="w-full h-full rounded-lg scale-90 origin-center pointer-events-auto mt-5"
                src={`https://open.spotify.com/embed/track/${spotifyMatch[1]}?utm_source=generator&theme=0`}
               
                
                frameBorder="0"
                scrolling="no"
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                style={{ border: "none"}}
              />
            </div>
          </div>
        )}

        {/* Foto com moldura */}
        <div className="mx-3 my-3" style={{ position: "relative", zIndex: 2 }}>
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

        {/* Corpo */}
        <div className="flex flex-col gap-2 px-3 pb-5" style={{ background: bgColor, position: "relative", zIndex: 2 }}>
          <div className="rounded-lg border border-[#7c6aff]/20 bg-[#7c6aff]/10 px-2 py-1.5 text-center">
            <p className="text-[8px] font-medium text-[#b06fff]">{counter}</p>
          </div>

          <div className="flex items-start gap-1.5">
            <div className="w-0.5 self-stretch rounded-sm shrink-0 bg-red-600" />
            {title ? (
              <p className="text-[13px] font-bold uppercase tracking-wider text-white leading-tight break-words w-full"
                style={{ fontFamily: getFontFamily(fontStyle ?? "moderna") }}>
                {title}
              </p>
            ) : (
              <p className="text-[10px] text-white/30 italic">Seu título aqui</p>
            )}
          </div>

          {text ? (
            <p className="text-[10px] leading-relaxed whitespace-pre-wrap break-words"
              style={{ color: "rgba(240,238,248,0.7)", fontFamily: getFontFamily(textFont ?? "moderna") }}>
              {text}
            </p>
          ) : (
            <p className="text-[10px] text-white/20 italic">O texto da sua memória aparecerá aqui...</p>
          )}
        </div>
      </div>
    </div>
  );
}
// src/components/MemoryPreview.tsx
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
  parts.push(`${hr} hora${hr !== 1 ? "s" : ""}`);
  parts.push(`${min} minuto${min !== 1 ? "s" : ""}`);
  parts.push(`${sec} segundo${sec !== 1 ? "s" : ""}`);
  return parts.join(", ");
}

function extractSpotifyTrackId(url: string): string | null {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}

export function MemoryPreview({ data }: Props) {
  const { photosPreviews, title, date, text, bgColor, spotifyUrl } = data;

  // ── contador ao vivo ──────────────────────────────────────────────────────
  const [counter, setCounter] = useState(() => calcCounter(date));

  useEffect(() => {
    setCounter(calcCounter(date));
    if (!date) return;
    const id = setInterval(() => setCounter(calcCounter(date)), 1000);
    return () => clearInterval(id);
  }, [date]);

  // ── carrossel automático a cada 5s ────────────────────────────────────────
  const photos = photosPreviews.filter(Boolean);
  const [slideIdx, setSlideIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (photos.length < 2) {
      setSlideIdx(0);
      return;
    }
    intervalRef.current = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [photos.length]);

  // garante que o índice não fique fora do range se uma foto for removida
  useEffect(() => {
    if (slideIdx >= photos.length) setSlideIdx(0);
  }, [photos.length, slideIdx]);

  const trackId = extractSpotifyTrackId(spotifyUrl);
  const hasSpotify = Boolean(trackId);

  return (
    <div className="flex flex-col  lg:my-0  items-center gap-3">
      <span className="center text-[10px] tracking-widest uppercase text-white/30">
        Preview em tempo real
      </span>

      {/* Moldura do celular */}
      <div
        className="w-55 scale-150 lg:scale-200 h-100 my-30 rounded-[34px] border-2 border-white/10  flex flex-col  overflow-y-auto scroll-smooth no-scrollbar pt-5"
        style={{
          background: bgColor,
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 20px 50px rgba(0,0,0,0.7)",
        }}
      >
        

        {/* Spotify — dentro da moldura, no topo */}
        {hasSpotify && (
          <div className="pt-5 pb-2 px-3 flex flex-col gap-1 bg-black/35">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1db954] flex items-center justify-center shrink-0">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.622.622 0 11-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.972c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.071zm.105-2.835C14.692 9.15 9.375 8.977 6.297 9.92a.935.935 0 11-.543-1.79c3.533-1.072 9.404-.865 13.115 1.338a.936.936 0 01-.955 1.599z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium text-white truncate">
                  Música da memória
                </p>
                <p className="text-[9px] text-white/40">
                  Spotify • tocando agora
                </p>
              </div>
              <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                <svg
                  width="6"
                  height="6"
                  viewBox="0 0 10 10"
                  fill="rgba(255,255,255,0.7)"
                >
                  <polygon points="2,1 9,5 2,9" />
                </svg>
              </div>
            </div>
            {/* Barra de progresso animada */}
            <SpotifyProgressBar />
          </div>
        )}

        {/* Carrossel de fotos */}
        <div className="bg-white rounded-2xl mx-3 my-4 p-3 pb-10 shadow-2xl">
          <div className="relative rounded-md w-full h-49 overflow-hidden shrink-0">
            {photos.length > 0 ? (
              <>
                <div
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${slideIdx * 100}%)` }}
                >
                  {photos.map((src, i) => (
                    <div key={i} className="min-w-full h-full shrink-0">
                      <img
                        src={src}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 opacity-15">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <span className="text-[10px] text-white/50">suas fotos</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dots do carrossel */}
        <div
          className="flex justify-center gap-1.25 py-2"
          style={{ background: bgColor }}
        >
          {(photos.length > 0 ? photos : [null]).map((_, i) => (
            <button
              key={i}
              onClick={() => setSlideIdx(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === slideIdx ? 18 : 6,
                background:
                  i === slideIdx ? "#b06fff" : "rgba(255,255,255,0.22)",
              }}
            />
          ))}
        </div>

        {/* Corpo da memória */}
        <div
          className="flex flex-col gap-2 px-3 pb-4"
          style={{ background: bgColor }}
        >
          {/* Contador */}
          <div className="rounded-lg border border-[#7c6aff]/20 bg-[#7c6aff]/10 px-2 py-1.5 text-center">
            <p className="text-[9.5px] font-medium leading-relaxed text-[#b06fff]">
              {counter}
            </p>
          </div>

          {/* Título */}
          <div className="flex items-start gap-2">
            <div className="w-0.75 self-stretch rounded-sm shrink-0 bg-red-600" />
            {title ? (
              <p className="text-[15px] font-bold uppercase tracking-wider break-words w-full text-white leading-tight">
                {title}
              </p>
            ) : (
              <p className="text-[11px] text-white/30 italic">
                Seu título aqui
              </p>
            )}
          </div>

          {/* Texto */}
          {text ? (
            <div className="max-h-40  overflow-y-auto scroll-smooth no-scrollbar pt-5">
              <p className="text-[11px] text-white/75 leading-relaxed break-words whitespace-normal">
                {text}
              </p>
            </div>
          ) : (
            <p className="text-[11px] text-white/20 italic">
              O texto da sua memória aparecerá aqui...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── barra de progresso do Spotify (animada em CSS) ────────────────────────────
function SpotifyProgressBar() {
  const [fill, setFill] = useState(35);

  useEffect(() => {
    const id = setInterval(() => {
      setFill((prev) => (prev >= 100 ? 0 : prev + 0.15));
    }, 100);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="h-0.5 rounded-full bg-white/10 mx-1">
      <div
        className="h-full rounded-full bg-[#1db954] transition-none"
        style={{ width: `${fill.toFixed(1)}%` }}
      />
    </div>
  );
}

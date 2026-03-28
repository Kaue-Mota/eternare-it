// src/components/ui/sections/Hero.tsx
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center pt-40 pb-12 px-20 relative overflow-hidden bg-[#0a0a1f]">
      {/* glow roxo */}
      <div className="absolute -top-40 -left-40 h-100 w-100 rounded-full bg-purple-600/30 blur-[120px] animate-pulse" />

      {/* glow azul */}
      <div className="absolute top-40 -right-25 h-100 w-100 rounded-full bg-blue-500/30 blur-[120px]" />

      {/* glow azul */}
      <div className="absolute top-50 right-250 h-100 w-100 rounded-full bg-blue-500/30 blur-[120px] animate-pulse" />

      {/* conteúdo */}
      <div className="relative z-10">{/* sua landing */}</div>
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-50 items-center">
        {/* Coluna esquerda — texto */}
        <div className="flex flex-col gap-6 mr-10">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] self-start"
            style={{
              background: "rgba(124,106,255,0.1)",
              border: "1px solid rgba(124,106,255,0.25)",
              color: "#b06fff",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#b06fff", animation: "pulse 2s infinite" }}
            />
            Eternize o que importa
          </div>

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight"
            style={{ fontFamily: "Georgia, serif", color: "#f0eef8" }}
          >
            Transforme memórias em{" "}
            <em style={{ color: "#b06fff" }}>páginas eternas</em>
          </h1>

          <p
            className="text-[16px] leading-relaxed max-w-md"
            style={{ color: "rgba(240,238,248,0.55)" }}
          >
            Crie uma página única com fotos, música e palavras que vão durar
            para sempre — compartilhe com um link ou QR Code.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/criar")}
              className="px-6 py-3.5 rounded-xl text-[20px] font-medium text-white transition-all hover:opacity-88 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #7c6aff, #b06fff)",
                boxShadow: "0 0 32px rgba(124,106,255,0.3)",
              }}
            >
              Criar minha memória
            </button>
          </div>
        </div>

        <div className="mb-20">
          <img
            src="/images/home/hero/mockuphero.webp"
            alt="Ilustração de uma pessoa criando uma página de memória em um laptop, cercada por fotos, música e palavras flutuantes"
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce ">
          <p
            className="text-[10px] tracking-widest uppercase"
            style={{ color: "rgba(240,238,248,0.50)" }}
          >
            Rolar
          </p>
          <div
            className="w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(124,106,255,0.6), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

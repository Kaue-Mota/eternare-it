import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-full overflow-hidden  px-6 pt-32 pb-12 md:px-10 lg:px-16">
      
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Coluna esquerda */}
        <div className="flex max-w-xl flex-col gap-6">
          <div
            className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5 text-[12px]"
            style={{
              background: "rgba(124,106,255,0.1)",
              border: "1px solid rgba(124,106,255,0.25)",
              color: "#b06fff",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#b06fff", animation: "pulse 2s infinite" }}
            />
            Eternize o que importa
          </div>

          <h1
            className="text-5xl leading-[1.05] font-light md:text-6xl lg:text-7xl"
            style={{ fontFamily: "Georgia, serif", color: "#f0eef8" }}
          >
            Transforme memórias em{" "}
            <em style={{ color: "#b06fff" }}>páginas eternas</em>
          </h1>

          <p
            className="max-w-lg text-base leading-relaxed md:text-lg"
            style={{ color: "rgba(240,238,248,0.55)" }}
          >
            Crie uma página única com fotos, música e palavras que vão durar
            para sempre — compartilhe com um link ou QR Code.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/criar")}
              className="rounded-xl px-6 py-3.5 text-lg font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7c6aff, #b06fff)",
                boxShadow: "0 0 32px rgba(124,106,255,0.3)",
              }}
            >
              Criar minha memória
            </button>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="mx-auto flex w-full max-w-xl justify-center lg:justify-end">
          <img
            src="/images/home/hero/mockuphero.webp"
            alt="Prévia de páginas digitais personalizadas de memória"
            className="w-full max-w-115 animate- drop-shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-15 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 animate-bounce">
        <p
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "rgba(240,238,248,0.50)" }}
        >
          Rolar
        </p>
        <div
          className="h-10 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(124,106,255,0.6), transparent)",
          }}
        />
      </div>
    </section>
  );
}
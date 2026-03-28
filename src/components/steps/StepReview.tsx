// src/components/steps/StepReview.tsx
import { useState } from "react";
import {
  type MemoryFormData,
  BG_COLORS,
  type StepId,
} from "../../types/memory";

interface Props {
  data: MemoryFormData;
  onEdit: (step: StepId) => void;
  onBack: () => void;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function calcDays(dateStr: string): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr + "T00:00:00").getTime();
  if (diff < 0) return "—";
  return Math.floor(diff / 86400000) + " dias";
}

export function StepReview({ data, onEdit, onBack }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const colorLabel =
    BG_COLORS.find((c) => c.hex === data.bgColor)?.label ?? "—";

  const rows: { label: string; value: React.ReactNode; step: StepId }[] = [
    {
      label: "Fotos",
      value: `${data.photos.filter(Boolean).length} foto(s)`,
      step: 1,
    },
    { label: "Título", value: data.title || "—", step: 2 },
    { label: "Data", value: formatDate(data.date), step: 2 },
    { label: "Tempo eternizado", value: calcDays(data.date), step: 2 },
    {
      label: "Texto",
      value: data.text
        ? data.text.slice(0, 80) + (data.text.length > 80 ? "…" : "")
        : "—",
      step: 3,
    },
    {
      label: "Cor de fundo",
      value: (
        <span className="flex items-center gap-2 justify-end">
          <span
            className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block"
            style={{ background: data.bgColor }}
          />
          {colorLabel}
        </span>
      ),
      step: 4,
    },
    {
      label: "Música",
      value: data.spotifyUrl ? "Adicionada" : "Não adicionada",
      step: 5,
    },
  ];

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      // 1. monta o FormData com fotos + campos de texto
      const formData = new FormData();
      data.photos
        .filter(Boolean)
        .forEach((file) => formData.append("photos", file));
      formData.append("title", data.title);
      formData.append("date", data.date);
      formData.append("text", data.text);
      formData.append("bgColor", data.bgColor);
      if (data.spotifyUrl) formData.append("spotifyUrl", data.spotifyUrl);

      // 2. cria a memória no banco (paid = false)
      const createRes = await fetch("/api/memory", {
        method: "POST",
        body: formData,
      });

      if (!createRes.ok) {
        const body = await createRes.json();
        throw new Error(body.error || "Erro ao salvar memória");
      }
      const { slug } = await createRes.json();

      // 3. cria a sessão de checkout no Stripe
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      if (!checkoutRes.ok) {
        const body = await checkoutRes.json();
        throw new Error(body.error || "Erro ao iniciar pagamento");
      }

      const { url } = await checkoutRes.json();

      // 4. redireciona para o Stripe Checkout
      window.location.href = url;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Algo deu errado. Tente novamente.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-[10px] tracking-[0.14em] uppercase text-[#b06fff] mb-1">
          Revisão final
        </p>
        <h2 className="text-[19px] font-medium text-white">Tudo certo?</h2>
        <p className="text-[12px] text-white/50 mt-1">
          Confira os dados antes de finalizar
        </p>
      </div>

      {/* Tabela de revisão */}
      <div className="rounded-xl border border-white/[0.07] overflow-hidden">
        {rows.map(({ label, value, step }, i) => (
          <div
            key={label}
            className="flex items-center justify-between px-4 py-3 gap-4"
            style={{
              borderBottom:
                i < rows.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
              background:
                i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent",
            }}
          >
            <span className="text-[11px] text-white/40 flex-shrink-0">
              {label}
            </span>
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-[12px] text-white/80 text-right truncate">
                {value}
              </span>
              <button
                type="button"
                onClick={() => onEdit(step)}
                className="text-[10px] text-[#7c6aff] hover:text-[#b06fff] transition-colors flex-shrink-0"
              >
                editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preço */}
      <div className="rounded-xl border border-[#7c6aff]/20 bg-[#7c6aff]/[0.06] px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-[13px] font-medium text-white">
            Memória eternizada
          </p>
          <p className="text-[11px] text-white/40 mt-0.5">
            Página pública + link permanente + QR Code
          </p>
        </div>
        <div className="text-right">
          <p className="text-[20px] font-semibold text-white">R$ 19,90</p>
          <p className="text-[10px] text-white/30">pagamento único</p>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3">
          <p className="text-[12px] text-red-400">{error}</p>
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="rounded-lg border border-white/8 px-4 py-[10px] text-[13px] text-white/50 hover:text-white transition-colors disabled:opacity-30"
        >
          ← Editar
        </button>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="flex-1 rounded-lg py-[10px] text-[13px] font-medium text-white transition-opacity hover:opacity-88 flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #7c6aff, #b06fff)" }}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <path d="M1 10h22" />
              </svg>
              Finalizar e pagar
            </>
          )}
        </button>
      </div>

      <p className="text-[10px] text-white/20 text-center">
        Pagamento seguro via Stripe · Não guardamos dados do cartão
      </p>
    </div>
  );
}

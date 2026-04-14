// src/pages/SuccessPage.tsx
import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ReactQRCode from 'react-qr-code'
import QRCodeLib from 'qrcode'

const QRCode = (ReactQRCode as any).default ?? ReactQRCode

export function SuccessPage() {
  const [searchParams] = useSearchParams()
  const slug = searchParams.get('slug')
  const memoryUrl = `${window.location.origin}/m/${slug}`

  const [copied, setCopied] = useState(false)

  // rola para o topo ao entrar na página
  useEffect(() => { window.scrollTo(0, 0) }, [])

  async function copyLink() {
    await navigator.clipboard.writeText(memoryUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  if (!slug) return <Link to="/" replace />

  return (
    <div className="min-h-screen bg-[#09090f] text-white flex flex-col items-center justify-center px-4 py-16">

      {/* Ícone de sucesso */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 className="text-3xl font-semibold text-white text-center mb-2">
        Memória criada!
      </h1>
      <p className="text-white/50 text-center text-sm max-w-sm mb-10">
        Sua página exclusiva está pronta. Compartilhe o link ou o QR Code com quem você ama.
      </p>

      {/* QR Code */}
      <div className="bg-white rounded-2xl p-5 mb-6">
        <QRCode
          value={memoryUrl}
          size={180}
          bgColor="#ffffff"
          fgColor="#09090f"
        />
      </div>

      <p className="text-[11px] text-white/30 mb-8">
        Escaneie para abrir a memória
      </p>

      {/* Link da memória */}
      <div className="w-full max-w-sm flex gap-2 mb-4">
        <div className="flex-1 bg-white/[0.04] border border-white/8 rounded-lg px-3 py-[10px] text-[13px] text-white/60 truncate">
          {memoryUrl}
        </div>
        <button
          type="button"
          onClick={copyLink}
          className="px-4 rounded-lg text-[13px] font-medium text-white transition-all flex-shrink-0"
          style={{ background: copied ? '#1db954' : 'linear-gradient(135deg, #7c6aff, #b06fff)' }}
        >
          {copied ? '✓ Copiado' : 'Copiar'}
        </button>
      </div>

      {/* Botão ver memória */}
      <Link
        to={`/m/${slug}`}
        className="w-full max-w-sm rounded-lg py-[11px] text-[13px] font-medium text-center text-white/70 border border-white/10 hover:text-white hover:border-white/20 transition-colors mb-10"
      >
        Ver minha memória →
      </Link>

      {/* Download do QR Code */}
      <button
        type="button"
        onClick={() => downloadQR(memoryUrl, slug)}
        className="text-[12px] text-white/30 hover:text-white/60 transition-colors underline underline-offset-4"
      >
        Baixar QR Code em PNG
      </button>

      <Link to="/" className="mt-8 text-[11px] text-white/20 hover:text-white/40 transition-colors">
        Voltar para o início
      </Link>
    </div>
  )
}

// ── gera e baixa o QR Code como PNG via canvas ────────────────────────────────


async function downloadQR(url: string, slug: string) {
  const canvas = document.createElement('canvas')
  await QRCodeLib.toCanvas(canvas, url, {
    width: 400,
    margin: 2,
    color: { dark: '#09090f', light: '#ffffff' },
  })
  const link = document.createElement('a')
  link.download = `eternare-${slug}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
  

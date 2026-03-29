// server/src/lib/email.ts
import { Resend } from 'resend'
import QRCode from 'qrcode'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendMemoryEmailParams {
  to: string
  memoryTitle: string
  memorySlug: string
  memoryUrl: string
}

export async function sendMemoryEmail({
  to,
  memoryTitle,
  memorySlug,
  memoryUrl,
}: SendMemoryEmailParams) {
  // gera o QR Code como buffer PNG para anexar no email
  const qrBuffer = await QRCode.toBuffer(memoryUrl, {
    width: 400,
    margin: 2,
    color: { dark: '#09090f', light: '#ffffff' },
  })

  // converte para base64 para exibir inline no email também
  const qrBase64 = qrBuffer.toString('base64')

  await resend.emails.send({
    from: 'Eternare <noreply@eternareit.com>',
    to,
    subject: `Sua memória "${memoryTitle}" está pronta ✨`,
    attachments: [
      {
        filename: `qrcode-${memorySlug}.png`,
        content: qrBuffer,
      },
    ],
    html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#09090f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#09090f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:linear-gradient(135deg,#7c6aff,#b06fff);border-radius:10px;padding:10px 16px;">
                    <span style="color:#fff;font-size:15px;font-weight:600;letter-spacing:0.02em;">eternareit.com</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card principal -->
          <tr>
            <td style="background:#0f0f1a;border-radius:20px;border:1px solid rgba(255,255,255,0.07);padding:40px 36px;">

              <!-- Ícone de sucesso -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <div style="width:56px;height:56px;background:linear-gradient(135deg,#7c6aff,#b06fff);border-radius:14px;display:inline-block;text-align:center;line-height:56px;">
                      <span style="color:#fff;font-size:28px;font-weight:bold;">✓</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Título -->
              <h1 style="color:#f0eef8;font-size:22px;font-weight:600;text-align:center;margin:0 0 8px;">
                Memória eternizada!
              </h1>
              <p style="color:rgba(240,238,248,0.5);font-size:14px;text-align:center;margin:0 0 32px;line-height:1.6;">
                Sua página <strong style="color:#b06fff;">"${memoryTitle}"</strong> está pronta e acessível pelo link abaixo.
              </p>

              <!-- QR Code inline -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <div style="background:#fff;border-radius:16px;padding:16px;display:inline-block;">
                      <img src="cid:qrcode" width="160" height="160" alt="QR Code da memória" style="display:block;" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:24px;">
                    <p style="color:rgba(240,238,248,0.3);font-size:11px;margin:8px 0 0;letter-spacing:0.08em;text-transform:uppercase;">
                      QR Code também em anexo para download
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Link -->
              <div style="background:rgba(124,106,255,0.08);border:1px solid rgba(124,106,255,0.2);border-radius:12px;padding:16px;margin-bottom:24px;">
                <p style="color:rgba(240,238,248,0.4);font-size:11px;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em;">
                  Link da sua memória
                </p>
                <p style="color:#b06fff;font-size:13px;margin:0;word-break:break-all;">
                  ${memoryUrl}
                </p>
              </div>

              <!-- Botão -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a
                      href="${memoryUrl}"
                      style="display:inline-block;background:linear-gradient(135deg,#7c6aff,#b06fff);color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:14px 32px;border-radius:12px;letter-spacing:0.02em;"
                    >
                      Ver minha memória →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Aviso -->
          <tr>
            <td style="padding:24px 0 0;">
              <p style="color:rgba(240,238,248,0.2);font-size:11px;text-align:center;line-height:1.7;margin:0;">
                Guarde este email — ele contém o link permanente da sua memória.<br/>
                O QR Code está anexado neste email para você salvar e compartilhar.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  })
}
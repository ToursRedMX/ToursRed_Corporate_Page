/**
 * Avisos operativos por un canal independiente del correo (si SMTP2GO falla, un
 * aviso por correo tampoco llegaría). Usa un webhook entrante compatible con Slack
 * (cuerpo `{ "text": "..." }`); Discord lo acepta agregando `/slack` al final de
 * la URL del webhook. Si `ALERT_WEBHOOK_URL` no está definida, no hace nada.
 */
const MIN_INTERVAL_MS = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 5000;

// Memoria por instancia: durante una caída (cada envío falla) basta un aviso
// cada 10 minutos en lugar de uno por formulario.
let lastAlertAt = 0;
let suppressed = 0;

export async function sendOpsAlert(text: string): Promise<void> {
  const url = process.env.ALERT_WEBHOOK_URL;
  if (!url) return;

  const now = Date.now();
  if (lastAlertAt && now - lastAlertAt < MIN_INTERVAL_MS) {
    suppressed++;
    return;
  }
  const extra = suppressed > 0 ? ` (+${suppressed} avisos parecidos desde el anterior)` : '';
  lastAlertAt = now;
  suppressed = 0;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text + extra }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error('[alerts] El webhook respondió', response.status);
    }
  } catch (error) {
    console.error('[alerts] No se pudo enviar el aviso:', error);
  }
}

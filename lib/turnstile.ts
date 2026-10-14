const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const REQUEST_TIMEOUT_MS = 5000;
const MAX_TOKEN_LENGTH = 2048;

export type TurnstileResult =
  | { ok: true; hostname?: string }
  // `unavailable`: no se pudo consultar a Cloudflare (no es culpa del visitante).
  | { ok: false; reason: string; unavailable?: boolean };

/** Verifica con Cloudflare el token que generó el widget de Turnstile en el navegador. */
export async function verifyTurnstile(
  secret: string,
  token: unknown,
  ip?: string
): Promise<TurnstileResult> {
  if (typeof token !== 'string' || token.length === 0) {
    return { ok: false, reason: 'missing-token' };
  }
  if (token.length > MAX_TOKEN_LENGTH) {
    return { ok: false, reason: 'invalid-token' };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set('remoteip', ip);

    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      redirect: 'error',
    });
    if (!response.ok) {
      return { ok: false, reason: `siteverify-http-${response.status}`, unavailable: true };
    }

    const data = await response.json();
    if (data?.success === true) {
      return { ok: true, hostname: typeof data.hostname === 'string' ? data.hostname : undefined };
    }
    const codes = Array.isArray(data?.['error-codes']) ? data['error-codes'].join(',') : '';
    return { ok: false, reason: codes || 'rejected' };
  } catch {
    return { ok: false, reason: 'siteverify-unreachable', unavailable: true };
  }
}

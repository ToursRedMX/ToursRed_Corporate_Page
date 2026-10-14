import { NextResponse } from 'next/server';
import { verifyTurnstile } from './turnstile';

/** Tamaño máximo del cuerpo de una petición (bytes aprox., en caracteres). */
const MAX_BODY_CHARS = 40_000;
const MAX_KEYS = 80;
const MAX_ARRAY_ITEMS = 50;
const MAX_DEPTH = 3;
/** Campos normales: nombres, correos, teléfonos, direcciones, destinos, etc. */
const MAX_FIELD_CHARS = 1_000;
/** Campos de texto libre (mensajes, comentarios, descripciones, links). */
const MAX_LONG_FIELD_CHARS = 5_000;
/** Token que genera el widget de Turnstile en el navegador (hasta 2048 caracteres). */
const TURNSTILE_TOKEN_FIELD = 'turnstileToken';
const MAX_TURNSTILE_TOKEN_CHARS = 2_100;
const LONG_FIELD = /(message|comments|details|observations|description|notes|links)$/i;

/** Máximo de envíos por IP: ráfaga corta y ventana de una hora. */
const RATE_LIMITS = [
  { windowMs: 60_000, max: 3 },
  { windowMs: 3_600_000, max: 12 },
];
const LONGEST_WINDOW_MS = Math.max(...RATE_LIMITS.map((l) => l.windowMs));
const MAX_TRACKED_IPS = 5_000;

// Memoria por instancia. En serverless cada instancia caliente lleva su propia
// cuenta: frena ráfagas y bots simples, pero no es un límite global exacto.
const hits = new Map<string, number[]>();

export function getClientIp(request: Request): string | undefined {
  const netlifyIp = request.headers.get('x-nf-client-connection-ip');
  if (netlifyIp) return netlifyIp.trim();
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  return first || undefined;
}

/** Devuelve los segundos a esperar si la IP excedió el límite; 0 si puede pasar. */
export function checkRateLimit(ip: string | undefined, now = Date.now()): number {
  if (!ip) return 0;

  if (hits.size > MAX_TRACKED_IPS) {
    hits.forEach((stored, key) => {
      if (!stored.some((t) => now - t < LONGEST_WINDOW_MS)) hits.delete(key);
    });
  }

  const times = (hits.get(ip) ?? []).filter((t) => now - t < LONGEST_WINDOW_MS);
  for (const { windowMs, max } of RATE_LIMITS) {
    const inWindow = times.filter((t) => now - t < windowMs);
    if (inWindow.length >= max) {
      hits.set(ip, times);
      return Math.max(1, Math.ceil((inWindow[0] + windowMs - now) / 1000));
    }
  }

  times.push(now);
  hits.set(ip, times);
  return 0;
}

/** Valida la forma del JSON: objeto plano, sin exceso de campos ni de longitud. */
export function validatePayloadShape(body: unknown): string | null {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return 'Formato de solicitud inválido';
  }
  if (Object.keys(body).length > MAX_KEYS) {
    return 'La solicitud contiene demasiados campos';
  }

  const visit = (value: unknown, key: string, depth: number): string | null => {
    if (typeof value === 'string') {
      const max =
        key === TURNSTILE_TOKEN_FIELD
          ? MAX_TURNSTILE_TOKEN_CHARS
          : LONG_FIELD.test(key)
            ? MAX_LONG_FIELD_CHARS
            : MAX_FIELD_CHARS;
      return value.length > max ? `El campo "${key}" es demasiado largo` : null;
    }
    if (Array.isArray(value)) {
      if (depth >= MAX_DEPTH || value.length > MAX_ARRAY_ITEMS) {
        return `El campo "${key}" es demasiado grande`;
      }
      for (const item of value) {
        const err = visit(item, key, depth + 1);
        if (err) return err;
      }
      return null;
    }
    if (value && typeof value === 'object') {
      if (depth >= MAX_DEPTH) return `El campo "${key}" es demasiado complejo`;
      for (const [k, v] of Object.entries(value)) {
        const err = visit(v, k, depth + 1);
        if (err) return err;
      }
    }
    return null;
  };

  for (const [key, value] of Object.entries(body)) {
    const err = visit(value, key, 1);
    if (err) return err;
  }
  return null;
}

function fail(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ success: false, error }, { status, headers });
}

type GuardResult =
  | { ok: true; body: any }
  | { ok: false; response: NextResponse };

/**
 * Protege las rutas públicas de formularios: límite de peticiones por IP,
 * tamaño máximo del cuerpo, JSON válido y longitud de los campos.
 */
export async function guardRequest(request: Request): Promise<GuardResult> {
  const retryAfter = checkRateLimit(getClientIp(request));
  if (retryAfter > 0) {
    return {
      ok: false,
      response: fail(
        'Demasiadas solicitudes. Por favor, intenta de nuevo en unos minutos.',
        429,
        { 'Retry-After': String(retryAfter) }
      ),
    };
  }

  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > MAX_BODY_CHARS * 2) {
    return { ok: false, response: fail('La solicitud es demasiado grande', 413) };
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) {
    return { ok: false, response: fail('La solicitud es demasiado grande', 413) };
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return { ok: false, response: fail('Solicitud inválida', 400) };
  }

  const shapeError = validatePayloadShape(body);
  if (shapeError) {
    return { ok: false, response: fail(shapeError, 400) };
  }

  // Turnstile (captcha de Cloudflare). Solo actúa si TURNSTILE_SECRET_KEY existe.
  // Por defecto es "modo vigilancia": verifica y deja constancia en los logs, pero
  // no bloquea a nadie. Con TURNSTILE_ENFORCE=true rechaza los envíos sin un token
  // válido. Si Cloudflare no responde, nunca se bloquea al visitante.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const enforce = process.env.TURNSTILE_ENFORCE === 'true';
    const token = (body as Record<string, unknown>)[TURNSTILE_TOKEN_FIELD];
    const result = await verifyTurnstile(turnstileSecret, token, getClientIp(request));
    if (result.ok) {
      console.log(`[turnstile] válido (hostname: ${result.hostname ?? 'desconocido'})`);
    } else {
      // console.log y no console.warn: Netlify no lista las líneas WARN en sus logs
      // de funciones, y estos bloqueos tienen que poder verse ahí.
      console.log(
        `[turnstile] ${enforce && !result.unavailable ? 'BLOQUEADO' : 'modo vigilancia, no se bloquea'}: ${result.reason}`
      );
      if (enforce && !result.unavailable) {
        return {
          ok: false,
          response: fail(
            'No se pudo completar la verificación de seguridad. Recarga la página e inténtalo de nuevo.',
            400
          ),
        };
      }
    }
  }

  return { ok: true, body };
}

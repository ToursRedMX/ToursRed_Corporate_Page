const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapa texto que viene del usuario antes de insertarlo en HTML (cuerpo de
 * correos). Sirve tanto para contenido como para valores de atributos entre
 * comillas.
 */
export function escapeHtml(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** Escapa recursivamente todos los strings de un objeto o arreglo. */
export function escapeHtmlDeep<T>(value: T): T {
  if (typeof value === 'string') return escapeHtml(value) as T;
  if (Array.isArray(value)) return value.map((v) => escapeHtmlDeep(v)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, escapeHtmlDeep(v)])
    ) as T;
  }
  return value;
}

/** Devuelve la URL escapada solo si es http(s); si no, cadena vacía. */
export function safeHttpUrl(value: unknown): string {
  const url = String(value ?? '').trim();
  return /^https?:\/\//i.test(url) ? escapeHtml(url) : '';
}

'use client';

import { useEffect, useRef } from 'react';

// Llave PÚBLICA del widget de Cloudflare Turnstile (la misma que usa el
// marketplace). Es pública por diseño, así que va fija en el código: una variable
// NEXT_PUBLIC_* vieja en Netlify podía sobrescribirla y provocar el error 400020.
const SITE_KEY = '0x4AAAAAAEPafX7zzdCsVdYB';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
let currentWidgetId: string | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error('No se pudo cargar Turnstile'));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/** Token del widget (cadena vacía si todavía no hay uno). */
export function getTurnstileToken(): string {
  const input = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  return input?.value ?? '';
}

/** Los tokens son de un solo uso: se pide uno nuevo después de cada intento de envío. */
export function resetTurnstile(): void {
  try {
    if (currentWidgetId) window.turnstile?.reset(currentWidgetId);
  } catch {
    // sin widget: el servidor decide qué hacer
  }
}

/**
 * Widget de Turnstile. Es invisible salvo que Cloudflare necesite una
 * interacción. Si no carga (bloqueador de anuncios, sin red), el formulario sigue
 * funcionando y el servidor decide si exige o no la verificación.
 */
export function TurnstileWidget() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        currentWidgetId = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          appearance: 'interaction-only',
          theme: 'light',
          // Un fallo del widget no debe romper la página ni llenar la consola de
          // errores sin capturar; el servidor decide qué hacer sin token.
          'error-callback': (code: unknown) => {
            console.warn(`[turnstile] el widget no se pudo cargar (código ${String(code)})`);
            return true;
          },
        });
      })
      .catch(() => {
        // sin widget: se envía sin token
      });

    return () => {
      cancelled = true;
      if (currentWidgetId && window.turnstile) {
        try {
          window.turnstile.remove(currentWidgetId);
        } catch {
          // ya no existe
        }
      }
      currentWidgetId = null;
    };
  }, []);

  return <div ref={containerRef} />;
}

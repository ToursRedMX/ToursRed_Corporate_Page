'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookieConsent } from '@/lib/cookieConsent';

const TIKTOK_PIXEL_ID = 'D92LMIRC77UBI6V960KG';

type TikTokContent = {
  content_id: string;
  content_type: 'product' | 'product_group';
  content_name: string;
};

type TikTokEventParams = {
  contents?: TikTokContent[];
  value?: number;
  currency?: string;
};

async function sha256Hash(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  const encoded = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function trackTikTokIdentify(email: string, phone?: string): Promise<void> {
  if (typeof window === 'undefined') return;
  const ttq = (window as any).ttq;
  if (!ttq) return;
  const payload: Record<string, string> = {};
  if (email) payload.email = await sha256Hash(email);
  if (phone) payload.phone_number = await sha256Hash(phone);
  ttq.identify(payload);
}

export function trackTikTokEvent(eventName: string, params?: TikTokEventParams) {
  if (typeof window === 'undefined') return;
  const ttq = (window as any).ttq;
  if (!ttq) return;
  ttq.track(eventName, params ?? {});
}

export function TikTokPixel() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookieConsent();
      setHasConsent(consent === 'accepted');
    };

    checkConsent();

    const handleConsentAccepted = () => setHasConsent(true);
    const handleConsentRejected = () => setHasConsent(false);

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted);
    window.addEventListener('cookieConsentRejected', handleConsentRejected);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
      window.removeEventListener('cookieConsentRejected', handleConsentRejected);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <Script
      id="tiktok-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${TIKTOK_PIXEL_ID}');ttq.page()}(window,document,'ttq');`,
      }}
    />
  );
}

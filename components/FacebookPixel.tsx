'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookieConsent } from '@/lib/cookieConsent';

const FB_PIXEL_ID = '1647544767377314';

export function FacebookPixel() {
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
      id="facebook-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`,
      }}
    />
  );
}

export function FacebookPixelNoscript() {
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}

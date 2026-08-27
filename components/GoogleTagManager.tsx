'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getCookieConsent } from '@/lib/cookieConsent';

const GTM_ID = 'GTM-P44BXHFR';
const GA4_ID = 'G-RPFEYJ6JP5';

export function GoogleTagManager() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = getCookieConsent();
      setHasConsent(consent === 'accepted');
    };

    checkConsent();

    const handleConsentAccepted = () => {
      setHasConsent(true);
    };

    const handleConsentRejected = () => {
      setHasConsent(false);
    };

    window.addEventListener('cookieConsentAccepted', handleConsentAccepted);
    window.addEventListener('cookieConsentRejected', handleConsentRejected);

    return () => {
      window.removeEventListener('cookieConsentAccepted', handleConsentAccepted);
      window.removeEventListener('cookieConsentRejected', handleConsentRejected);
    };
  }, []);

  if (!hasConsent) return null;

  return (
    <>
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_ID}');`,
        }}
      />
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoscript() {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

const REVIEW_URL = 'https://es.trustpilot.com/review/toursred.com';

export function TrustpilotWidget({ lang }: { lang: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isEn = lang === 'en';

  const init = () => {
    if (ref.current && window.Trustpilot) {
      window.Trustpilot.loadFromElement(ref.current, true);
    }
  };

  // Re-initialize on client-side navigations / remounts if the script is already loaded
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <Script
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="lazyOnload"
        onLoad={init}
      />
      {/* TrustBox widget - Review Collector (iframe has a white background) */}
      <div className="rounded-lg bg-white px-3 py-2 w-full min-w-[240px]">
        <div
          ref={ref}
          className="trustpilot-widget"
          data-locale={isEn ? 'en-US' : 'es-ES'}
          data-template-id="56278e9abfbba0bdcd568bc"
          data-businessunit-id="6aed35be828001f8780e30ba"
          data-style-height="52px"
          data-style-width="100%"
        >
          <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
            Trustpilot
          </a>
        </div>
      </div>
      {/* End TrustBox widget */}
      <a
        href={REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm text-gray-400 hover:text-white transition-colors"
      >
        {isEn ? 'Leave us a review on Trustpilot' : 'Déjanos tu opinión en Trustpilot'}
      </a>
    </>
  );
}

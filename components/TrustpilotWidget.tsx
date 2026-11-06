'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    Trustpilot?: { loadFromElement: (el: HTMLElement, force?: boolean) => void };
  }
}

export function TrustpilotWidget({ locale = 'es-ES' }: { locale?: string }) {
  const ref = useRef<HTMLDivElement>(null);

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
      {/* TrustBox widget - Review Collector */}
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id="56278e9abfbba0bdcd568bc"
        data-businessunit-id="6aed35be828001f8780e30ba"
        data-style-height="52px"
        data-style-width="100%"
        data-theme="dark"
      >
        <a
          href="https://es.trustpilot.com/review/toursred.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Trustpilot
        </a>
      </div>
      {/* End TrustBox widget */}
    </>
  );
}

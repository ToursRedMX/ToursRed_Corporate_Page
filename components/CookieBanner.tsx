'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie } from 'lucide-react';
import { getCookieConsent, setCookieConsent, hasUserDecided } from '@/lib/cookieConsent';
import { Locale } from '@/lib/i18n/config';

interface CookieBannerProps {
  lang: Locale;
  dictionary: any;
}

export function CookieBanner({ lang, dictionary }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!hasUserDecided()) {
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    setCookieConsent('accepted');
    closeBanner();
  };

  const handleReject = () => {
    setCookieConsent('rejected');
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-1">
                <Cookie className="h-6 w-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-200 leading-relaxed">
                  {dictionary.cookieBanner.message}{' '}
                  <Link
                    href={`/${lang}/legal/cookies`}
                    className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
                  >
                    {dictionary.cookieBanner.learnMore}
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-500 rounded-lg transition-all hover:bg-slate-800"
              >
                {dictionary.cookieBanner.reject}
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {dictionary.cookieBanner.accept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

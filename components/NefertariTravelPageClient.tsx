'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { ChevronRight, Info, CircleAlert as AlertCircle, MessageSquare, Loader, RotateCcw } from 'lucide-react';
import { NefertariTravelQuoteForm } from './NefertariTravelQuoteForm';
import { trackTikTokEvent } from '@/components/TikTokPixel';

interface NefertariTravelPageClientProps {
  lang: 'es' | 'en';
  dict: any;
}

type ActiveView = 'internacional' | 'nacional';

const IFRAME_URLS: Record<ActiveView, string> = {
  internacional: 'https://iframe.nefertaritravel.com.mx/?&cp=db2f21&cs=126865&cf=8ecdd7',
  nacional: 'https://iframe.nefertaritravel.com.mx/?destino=salidas-nacionales&moneda=MXN&cp=db2f21&cs=126865&cf=8ecdd7',
};

export function NefertariTravelPageClient({ lang, dict }: NefertariTravelPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [activeView, setActiveView] = useState<ActiveView>('internacional');

  const iframeUrl = IFRAME_URLS[activeView];

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'nefertari-travel', content_type: 'product', content_name: 'Nefertari Travel' }], currency: 'MXN', value: 0 });
  }, []);

  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);

    const timeoutId = setTimeout(() => {
      setIframeLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [iframeKey, activeView]);

  const handleSwitchView = (view: ActiveView) => {
    if (view !== activeView) {
      setActiveView(view);
      setIframeKey(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href={`/${lang}`}
                className="text-slate-600 hover:text-purple-600 transition-colors"
              >
                {dict.breadcrumbs.home}
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
                <span className="text-slate-600">{dict.breadcrumbs.tours}</span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
                <span className="text-slate-600">{dict.breadcrumbs.internationalTours}</span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
                <span className="font-medium text-slate-900">{dict.breadcrumbs.nefertariTravel}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg shadow-lg p-6 md:p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.hero.title}</h1>
          <p className="text-lg mb-6 text-purple-100">
            {dict.hero.subtitle}
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-2">{dict.howItWorks.title}</p>
                <p className="text-sm text-purple-100">
                  {dict.howItWorks.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-amber-500 text-slate-900 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">
              {dict.warning.message}
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-6 gap-3 flex-wrap">
          <button
            onClick={() => handleSwitchView('internacional')}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm border-2 ${
              activeView === 'internacional'
                ? 'bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600'
                : 'bg-white border-amber-500 text-amber-600 hover:bg-amber-50'
            }`}
          >
            <RotateCcw className="h-5 w-5" />
            <span>{dict.internationalDepartures}</span>
          </button>
          <button
            onClick={() => handleSwitchView('nacional')}
            className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors shadow-sm border-2 ${
              activeView === 'nacional'
                ? 'bg-amber-500 border-amber-500 text-white hover:bg-amber-600 hover:border-amber-600'
                : 'bg-white border-amber-500 text-amber-600 hover:bg-amber-50'
            }`}
          >
            <RotateCcw className="h-5 w-5" />
            <span>{dict.nationalDepartures}</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative">
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="text-center">
                  <Loader className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-slate-600">{dict.loading}</p>
                </div>
              </div>
            )}

            {iframeError ? (
              <div className="p-12 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">{dict.error.title}</p>
                <a
                  href={iframeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-medium rounded-md hover:bg-amber-600 transition-colors"
                >
                  {dict.error.button}
                </a>
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={iframeUrl}
                className="w-full h-[600px] md:h-[800px]"
                title={dict.breadcrumbs.nefertariTravel}
                onLoad={() => setIframeLoading(false)}
                onError={() => {
                  setIframeLoading(false);
                  setIframeError(true);
                }}
              />
            )}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 z-40"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="font-semibold">{dict.floatingButton}</span>
        </button>
      </div>

      <NefertariTravelQuoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang as Locale}
        dict={dict}
      />
    </div>
  );
}

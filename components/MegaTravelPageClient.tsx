'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { ChevronRight, Info, CircleAlert as AlertCircle, MessageSquare, Loader } from 'lucide-react';
import { MegaTravelQuoteForm } from './MegaTravelQuoteForm';
import { trackTikTokEvent } from '@/components/TikTokPixel';

interface DestinationTab {
  id: string;
  label: string;
  url: string;
}

interface MegaTravelPageClientProps {
  lang: 'es' | 'en';
  dict: any;
}

export function MegaTravelPageClient({ lang, dict }: MegaTravelPageClientProps) {
  const destinations: DestinationTab[] = [
    {
      id: 'best-offers',
      label: dict.tabs.bestOffers,
      url: 'https://www.megatravel.com.mx/tools/ofertas-viaje.php'
    },
    {
      id: 'current-promotions',
      label: dict.tabs.currentPromotions,
      url: 'https://www.megatravel.com.mx/tools/vi.php'
    },
    {
      id: 'europe',
      label: dict.tabs.europe,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=1'
    },
    {
      id: 'middle-east',
      label: dict.tabs.middleEast,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=2'
    },
    {
      id: 'canada',
      label: dict.tabs.canada,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=3'
    },
    {
      id: 'asia',
      label: dict.tabs.asia,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=4'
    },
    {
      id: 'africa',
      label: dict.tabs.africa,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=5'
    },
    {
      id: 'pacific',
      label: dict.tabs.pacific,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=6'
    },
    {
      id: 'south-america',
      label: dict.tabs.southAmerica,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=7'
    },
    {
      id: 'united-states',
      label: dict.tabs.unitedStates,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=8'
    },
    {
      id: 'central-america',
      label: dict.tabs.centralAmerica,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=9'
    },
    {
      id: 'caribbean',
      label: dict.tabs.caribbean,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=10'
    },
    {
      id: 'special-events',
      label: dict.tabs.specialEvents,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=12'
    },
    {
      id: 'cruises',
      label: dict.tabs.cruises,
      url: 'https://www.megatravel.com.mx/tools/vi.php?Dest=13'
    },
  ];

  const [activeTab, setActiveTab] = useState(destinations[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const activeDestination = destinations.find(d => d.id === activeTab) || destinations[0];

  const iframeUrl = `${activeDestination.url}${activeDestination.url.includes('?') ? '&' : '?'}colorPrimario=2563eb&colorSecundario=f59e0b&colorTexto=000000&colorFondo=ffffff`;

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'mega-travel', content_type: 'product', content_name: 'Mega Travel' }], currency: 'MXN', value: 0 });
  }, []);

  useEffect(() => {
    setIframeLoading(true);
    setIframeError(false);

    const timeoutId = setTimeout(() => {
      setIframeLoading(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href={`/${lang}`}
                className="text-slate-600 hover:text-blue-600 transition-colors"
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
                <span className="font-medium text-slate-900">{dict.breadcrumbs.megaTravel}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-6 md:p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.hero.title}</h1>
          <p className="text-lg mb-6 text-blue-100">
            {dict.hero.subtitle}
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 border border-white/20">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-2">{dict.howItWorks.title}</p>
                <p className="text-sm text-blue-100">
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="overflow-x-auto">
              <nav className="flex space-x-2 p-4 min-w-max" aria-label="Tabs">
                {destinations.map((dest) => (
                  <button
                    key={dest.id}
                    onClick={() => handleTabChange(dest.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                      activeTab === dest.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {dest.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="relative">
            {iframeLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 z-10">
                <div className="text-center">
                  <Loader className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-slate-600">{dict.loading}</p>
                </div>
              </div>
            )}

            {iframeError ? (
              <div className="p-12 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <p className="text-slate-600 mb-4">{dict.error.title}</p>
                <a
                  href={activeDestination.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  {dict.error.button}
                </a>
              </div>
            ) : (
              <iframe
                key={activeTab}
                src={iframeUrl}
                className="w-full h-[600px] md:h-[800px]"
                title={`${dict.breadcrumbs.megaTravel} - ${activeDestination.label}`}
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

      <MegaTravelQuoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang as Locale}
        dict={dict}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { trackTikTokEvent } from '@/components/TikTokPixel';
import Link from 'next/link';
import { ChevronRight, Car, Globe, Tag, RotateCcw, Headphones, Search, SquareCheck as CheckSquare, MapPin, Lightbulb, MessageSquare } from 'lucide-react';
import { CarRentalQuoteForm } from './CarRentalQuoteForm';

interface CarRentalPageClientProps {
  lang: 'es' | 'en';
  dict: any;
}

export function CarRentalPageClient({ lang, dict }: CarRentalPageClientProps) {
  const [activeProvider, setActiveProvider] = useState<'bookingcars' | 'agentcars'>('bookingcars');
  const [iframeBookingLoaded, setIframeBookingLoaded] = useState(false);
  const [iframeAgentLoaded, setIframeAgentLoaded] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'rent-a-car', content_type: 'product', content_name: 'Renta de Auto' }], currency: 'MXN', value: 0 });
  }, []);

  const steps = [
    { icon: MapPin, step: '01', ...dict.howItWorks.step1 },
    { icon: Search, step: '02', ...dict.howItWorks.step2 },
    { icon: CheckSquare, step: '03', ...dict.howItWorks.step3 },
    { icon: Car, step: '04', ...dict.howItWorks.step4 },
  ];

  const benefitIcons = [Tag, Globe, RotateCcw, Headphones];
  const benefits = [
    dict.benefits.benefit1,
    dict.benefits.benefit2,
    dict.benefits.benefit3,
    dict.benefits.benefit4,
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href={`/${lang}`} className="text-slate-600 hover:text-red-600 transition-colors text-sm">
                {lang === 'es' ? 'Inicio' : 'Home'}
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
                <span className="text-slate-600 text-sm">{dict.breadcrumbs.services}</span>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
                <span className="font-medium text-slate-900 text-sm">{dict.breadcrumbs.carRental}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-red-900 rounded-2xl shadow-xl p-6 md:p-10 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-8 right-8 w-64 h-64 rounded-full border-2 border-white" />
            <div className="absolute bottom-4 right-32 w-32 h-32 rounded-full border border-white" />
            <div className="absolute top-24 right-48 w-16 h-16 rounded-full border border-white" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-red-600/30 border border-red-400/40 text-red-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Car className="h-3.5 w-3.5" />
              {dict.hero.badge}
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-red-600 p-3 rounded-xl flex-shrink-0">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">{dict.hero.title}</h1>
              </div>
            </div>
            <p className="text-slate-200 text-lg leading-relaxed max-w-3xl">
              {dict.hero.subtitle}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{dict.howItWorks.title}</h2>
          <p className="text-slate-600 mb-8">{dict.howItWorks.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent z-0" />
                )}
                <div className="relative z-10 flex flex-col items-start gap-3">
                  <div className="bg-red-50 border border-red-100 w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <step.icon className="h-7 w-7 text-red-600" />
                  </div>
                  <span className="text-3xl font-black text-red-100 leading-none">{step.step}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{dict.benefits.title}</h2>
          <p className="text-slate-600 mb-8">{dict.benefits.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {benefits.map((benefit, idx) => {
              const Icon = benefitIcons[idx];
              const gradients = [
                'from-red-500 to-red-600',
                'from-blue-500 to-blue-600',
                'from-emerald-500 to-emerald-600',
                'from-amber-500 to-amber-600',
              ];
              return (
                <div key={idx} className="flex gap-4 p-5 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                  <div className={`bg-gradient-to-br ${gradients[idx]} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-1">{dict.booking.title}</h2>
            <p className="text-slate-300 text-sm">{dict.booking.subtitle}</p>
          </div>

          {/* Provider tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => setActiveProvider('bookingcars')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeProvider === 'bookingcars'
                  ? 'border-red-600 text-red-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <img src="/BookingCars.jpg" alt="BookingCars" className="h-6 object-contain" />
              BookingCars
            </button>
            <button
              onClick={() => setActiveProvider('agentcars')}
              className={`flex items-center gap-3 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeProvider === 'agentcars'
                  ? 'border-red-600 text-red-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              <img src="/logo_agentcars_es copy.png" alt="Agent Cars" className="h-6 object-contain" />
              Agent Cars
            </button>
          </div>

          {/* Tip bar */}
          <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center gap-3">
            <Lightbulb className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-amber-800 text-sm font-medium">
              {activeProvider === 'bookingcars' ? dict.booking.tipBookingCars : dict.booking.tipAgentCars}
            </p>
          </div>

          {/* BookingCars iframe */}
          {activeProvider === 'bookingcars' && (
            <div className="relative bg-slate-100" style={{ height: '680px' }}>
              {!iframeBookingLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-100 z-10">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-500 text-sm">{lang === 'es' ? 'Cargando buscador...' : 'Loading search engine...'}</p>
                </div>
              )}
              <iframe
                src="https://toursred.bookingcars.com/mx"
                className="w-full h-full border-0"
                title="BookingCars - Renta de Autos"
                onLoad={() => setIframeBookingLoaded(true)}
                allow="payment *"
              />
            </div>
          )}

          {/* Agent Cars iframe */}
          {activeProvider === 'agentcars' && (
            <div className="relative bg-white p-4">
              {!iframeAgentLoaded && (
                <div className="flex flex-col items-center justify-center gap-4 py-16">
                  <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-slate-500 text-sm">{lang === 'es' ? 'Cargando buscador...' : 'Loading search engine...'}</p>
                </div>
              )}
              <iframe
                src="https://subsite.agentcars.com/es/site/form-iframe?agency=toursred"
                width="100%"
                height="420px"
                className="border-0"
                title="Agent Cars - Renta de Autos"
                onLoad={() => setIframeAgentLoaded(true)}
              >
                {lang === 'es' ? 'Tu navegador no soporta iframes' : 'Your browser does not support iframes'}
              </iframe>
            </div>
          )}
        </div>

        <div className="bg-slate-100 border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-base font-bold text-slate-900 mb-4">{dict.legalNotice.title}</h3>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              {dict.legalNotice.line1}{' '}
              <span className="font-semibold text-slate-800">{dict.legalNotice.provider}</span>
              {dict.legalNotice.line1End}
            </p>
            <p>{dict.legalNotice.line2}</p>
            <p>{dict.legalNotice.line3}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">{dict.cta.title}</h2>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">{dict.cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setFormOpen(true)}
              className="bg-white text-red-700 hover:bg-red-50 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              {dict.cta.primaryButton}
            </button>
            <Link
              href={`/${lang}/services/traveler-services`}
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              {dict.cta.secondaryButton}
            </Link>
          </div>
        </div>

      </div>

      <button
        onClick={() => setFormOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 z-40"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="font-semibold">{dict.floatingButton}</span>
      </button>

      <CarRentalQuoteForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        lang={lang as Locale}
        dict={dict}
      />
    </div>
  );
}

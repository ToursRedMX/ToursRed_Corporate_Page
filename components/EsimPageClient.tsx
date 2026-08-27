'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { trackTikTokEvent } from '@/components/TikTokPixel';
import { Wifi, Smartphone, Globe, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PartnerFlipCard } from '@/components/PartnerFlipCard';
import { EsimQuoteForm } from '@/components/EsimQuoteForm';

interface EsimPageClientProps {
  lang: string;
  dict: any;
}

export function EsimPageClient({ lang, dict }: EsimPageClientProps) {
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const d = dict.esim;

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'esim', content_type: 'product', content_name: 'eSIM' }], currency: 'MXN', value: 0 });
  }, []);

  const benefitIcons = [Smartphone, Globe, Zap, Wifi];
  const colors = [
    'from-sky-500 to-blue-600',
    'from-teal-500 to-cyan-600',
    'from-orange-500 to-amber-600',
    'from-emerald-500 to-green-600',
  ];

  const benefits = [
    d.intro.benefit1,
    d.intro.benefit2,
    d.intro.benefit3,
    d.intro.benefit4,
  ];

  const howToSteps = [
    { number: '1', ...d.howTo.step1 },
    { number: '2', ...d.howTo.step2 },
    { number: '3', ...d.howTo.step3 },
    { number: '4', ...d.howTo.step4 },
  ];

  const partners = [
    {
      name: 'Saily',
      logo: '/Saily.png',
      discountCode: 'TOURSRED10',
      discountPercentage: '10% de descuento',
      linkUrl: 'https://saily.com/toursred',
      badgeText: '10% OFF',
    },
    {
      name: 'Datos de Viaje',
      logo: '/DatosdeViaje.png',
      discountCode: 'TOURSRED',
      discountPercentage: 'Descuento exclusivo',
      linkUrl: 'https://datosdeviaje.com?sca_ref=726218.u5pudlzr36',
      badgeText: 'DESCUENTO',
    },
    {
      name: 'WIM by AT&T',
      logo: '/WIM copy.jpg',
    },
    {
      name: 'Sim Local',
      logo: '/SimLocal copy.jpg',
    },
    {
      name: 'HolaSim',
      logo: '/HolaSIM copy.jpg',
    },
    {
      name: 'Surfroam',
      logo: '/Surfroam copy.png',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?w=1920&q=80"
            alt="Travel eSIM"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/90 via-blue-900/85 to-cyan-900/90"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Wifi className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {d.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-sky-100 max-w-3xl mx-auto">
            {d.hero.subtitle}
          </p>
        </div>
      </section>

      {/* What is eSIM Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">{d.intro.title}</h2>
          <p className="text-lg text-slate-700 leading-relaxed">
            {d.intro.description}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefitIcons[index];
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className={`bg-gradient-to-br ${colors[index]} rounded-2xl p-5 mb-6`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {d.partners.title}
            </h2>
            <p className="text-lg text-slate-600">
              {d.partners.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col">
                <PartnerFlipCard
                  partnerName={partner.name}
                  logo={partner.logo}
                  discountCode={(partner as any).discountCode}
                  discountPercentage={(partner as any).discountPercentage}
                  linkUrl={(partner as any).linkUrl}
                  badgeText={(partner as any).badgeText}
                />
                <p className="text-center text-sm text-slate-500 mt-3 font-medium">{partner.name}</p>
              </div>
            ))}
          </div>

          <div className="bg-sky-50 p-6 rounded-lg text-center border-l-4 border-sky-600">
            <p className="text-sm text-slate-600">
              {d.partners.legal}
            </p>
          </div>

          {/* CTA cotización */}
          <div className="mt-12 bg-gradient-to-br from-sky-600 to-cyan-700 rounded-2xl p-8 text-center text-white shadow-xl">
            <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">¿No sabes cuál elegir?</h3>
            <p className="text-sky-100 mb-6 max-w-xl mx-auto">
              Cuéntanos tu destino, modelo de celular y necesidades de datos — te orientamos y buscamos la mejor opción para tu viaje.
            </p>
            <Button
              onClick={() => setQuoteFormOpen(true)}
              size="lg"
              className="bg-white text-sky-700 hover:bg-sky-50 font-bold px-8 py-3 text-base shadow-lg"
            >
              Solicitar cotización de eSIM
            </Button>
          </div>
        </div>
      </section>

      <EsimQuoteForm
        lang={lang as Locale}
        dict={dict}
        isOpen={quoteFormOpen}
        onClose={() => setQuoteFormOpen(false)}
      />

      {/* How To Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {d.howTo.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howToSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-lg bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-sky-600 text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      {index < 3 && (
                        <ArrowRight className="w-6 h-6 text-sky-600 hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-sky-600 to-blue-700 rounded-2xl p-10 text-center text-white shadow-xl">
            <Smartphone className="h-14 w-14 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl font-bold mb-4">{d.compatible.title}</h2>
            <p className="text-sky-100 leading-relaxed text-lg">
              {d.compatible.description}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { trackTikTokEvent } from '@/components/TikTokPixel';
import { Heart, Shield, Briefcase, Phone, CircleCheck as CheckCircle, ArrowRight, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TravelInsuranceQuoteForm } from '@/components/TravelInsuranceQuoteForm';
import { PartnerFlipCard } from '@/components/PartnerFlipCard';
import { IframeModal } from '@/components/IframeModal';

interface TravelInsurancePageClientProps {
  lang: string;
  dict: any;
}

export function TravelInsurancePageClient({ lang, dict }: TravelInsurancePageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIframeModalOpen, setIsIframeModalOpen] = useState(false);

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'travel-insurance', content_type: 'product', content_name: 'Seguro de Viaje' }], currency: 'MXN', value: 0 });
  }, []);

  const benefitIcons = [Heart, Shield, Briefcase, Phone];
  const colors = [
    'from-red-500 to-pink-600',
    'from-orange-500 to-red-600',
    'from-yellow-500 to-orange-600',
    'from-teal-500 to-cyan-600',
  ];

  const benefits = [
    dict.services.travelInsurance.benefits.benefit1,
    dict.services.travelInsurance.benefits.benefit2,
    dict.services.travelInsurance.benefits.benefit3,
    dict.services.travelInsurance.benefits.benefit4,
  ];

  const processSteps = [
    {
      number: '1',
      title: dict.services.travelInsurance.process.step1.title,
      description: dict.services.travelInsurance.process.step1.description,
    },
    {
      number: '2',
      title: dict.services.travelInsurance.process.step2.title,
      description: dict.services.travelInsurance.process.step2.description,
    },
    {
      number: '3',
      title: dict.services.travelInsurance.process.step3.title,
      description: dict.services.travelInsurance.process.step3.description,
    },
    {
      number: '4',
      title: dict.services.travelInsurance.process.step4.title,
      description: dict.services.travelInsurance.process.step4.description,
    },
  ];

  const partners = [
    { name: 'Assist Card', logo: '/assist-card copy.png' },
    { name: 'Universal Assistance', logo: '/universalAssitance.png' },
    { name: 'Auras Insurance', logo: '/Auras-Insurance.png' },
    { name: 'Assist 365', logo: '/Assist365.png' },
    { name: 'Protege Tu Viaje', logo: '/Protegetuviaje.png' },
    { name: 'SafeTravel', logo: '/SafeTravel.png' },
    { name: 'Go Assistance', logo: '/GoAssistance copy.jpg' },
    { name: 'Terrawind', logo: '/terrawind.png' },
    { name: 'IATI Seguros', logo: '/IATI copy.jpg' },
    { name: 'TravelKit', logo: '/TravelKit copy.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1370969/pexels-photo-1370969.jpeg?w=1920&q=80"
            alt="Travel Insurance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-pink-900/90"></div>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {dict.services.travelInsurance.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            {dict.services.travelInsurance.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {dict.services.travelInsurance.intro.description}
          </p>
          <p className="text-lg text-slate-700 leading-relaxed mb-6">
            {dict.services.travelInsurance.intro.partners}
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {dict.services.travelInsurance.intro.goal}
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.services.travelInsurance.benefits.title}
            </h2>
          </div>

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

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.services.travelInsurance.process.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      {index < 3 && (
                        <ArrowRight className="w-6 h-6 text-red-600 hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2" />
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

      {/* Partners Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.services.travelInsurance.partners.title}
            </h2>
            <p className="text-lg text-slate-600">
              {dict.services.travelInsurance.partners.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {partners.map((partner, index) => (
              <div key={index}>
                {partner.name === 'Auras Insurance' ? (
                  <PartnerFlipCard
                    partnerName={partner.name}
                    logo={partner.logo}
                    discountCode="WRTY100480"
                    discountPercentage="10% de descuento"
                    linkUrl="https://auras.insure/es-MX/?partner_id=480"
                    badgeText="10% OFF"
                  />
                ) : partner.name === 'Assist 365' ? (
                  <PartnerFlipCard
                    partnerName={partner.name}
                    logo={partner.logo}
                    discountCode="TOURSRED"
                    discountPercentage="Descuento especial"
                    linkUrl="https://assist-365.com/mx/?voucher=TOURSRED"
                    badgeText="PROMO"
                  />
                ) : partner.name === 'Protege Tu Viaje' ? (
                  <div
                    onClick={() => setIsIframeModalOpen(true)}
                    className="relative flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-32 cursor-pointer hover:scale-105 transform transition-transform"
                  >
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse z-10">
                      Cotiza Aquí
                    </div>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-32">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg text-center border-l-4 border-red-600">
            <p className="text-sm text-slate-600">
              {dict.services.travelInsurance.partners.legal}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {dict.services.travelInsurance.cta.title}
          </h2>
          <p className="text-xl text-red-100 mb-12">
            {dict.services.travelInsurance.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 rounded-full px-8 font-semibold"
            >
              {dict.services.travelInsurance.cta.primaryButton}
            </Button>
            <a href="https://wa.me/525547127668" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-slate-900 bg-white hover:bg-gray-100 rounded-full px-8 font-semibold w-full sm:w-auto"
              >
                {dict.services.travelInsurance.cta.secondaryButton}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 z-40"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="font-semibold">Solicitar Cotización</span>
      </button>

      {/* Quote Form Modal */}
      <TravelInsuranceQuoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang as Locale}
        dict={dict}
      />

      {/* Protege Tu Viaje Iframe Modal */}
      <IframeModal
        isOpen={isIframeModalOpen}
        onClose={() => setIsIframeModalOpen(false)}
        url="https://cotizadorv2.protegetuviaje.com/#/partners/toursred"
        title="Protege Tu Viaje - Cotizador"
      />
    </div>
  );
}

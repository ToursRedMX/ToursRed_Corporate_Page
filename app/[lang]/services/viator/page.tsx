import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isSpanish = (lang as Locale) === 'es';

  return {
    title: isSpanish
      ? 'Tours y experiencias con Viator | ToursRed'
      : 'Tours and experiences with Viator | ToursRed',
    description: isSpanish
      ? 'Descubre miles de tours, actividades y experiencias en México y el mundo con Viator, nuestro aliado turístico global.'
      : 'Discover thousands of tours, activities and experiences in Mexico and around the world with Viator, our global tourism partner.',
  };
}

export default async function ViatorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const isSpanish = (lang as Locale) === 'es';

  const content = {
    es: {
      breadcrumbs: {
        home: 'Inicio',
        services: 'Servicios',
        viator: 'Viator',
      },
      hero: {
        title: 'Descubre experiencias en México y el mundo con Viator',
        subtitle: 'Miles de tours y actividades en más de 2,500 destinos',
      },
      intro: {
        text1: 'En ToursRed trabajamos con aliados turísticos para ofrecerte acceso a miles de tours, actividades y experiencias en los destinos más populares.',
        text2: 'Uno de nuestros aliados es Viator, una plataforma global especializada en experiencias de viaje, donde podrás encontrar desde city tours y excursiones de un día, hasta actividades culturales, aventuras al aire libre y experiencias únicas en más de 2,500 destinos.',
        text3: 'A través de este buscador, puedes explorar y reservar directamente las experiencias disponibles.',
      },
      ctaButton: 'Visitar Viator',
      legal: {
        title: 'Información importante',
        point1: 'Las experiencias mostradas en esta sección son operadas y gestionadas directamente por Viator y sus proveedores locales.',
        point2: 'ToursRed actúa únicamente como intermediario comercial afiliado.',
        point3: 'La operación del tour, atención al cliente, políticas de cancelación, cambios y reembolsos son responsabilidad exclusiva de Viator.',
        point4: 'Al reservar, aceptas los términos y condiciones de Viator.',
        closing: 'Nuestro objetivo es facilitarte el acceso a experiencias confiables a nivel internacional, mientras seguimos desarrollando nuestra propia plataforma de tours nacionales.',
      },
    },
    en: {
      breadcrumbs: {
        home: 'Home',
        services: 'Services',
        viator: 'Viator',
      },
      hero: {
        title: 'Discover experiences in Mexico and around the world with Viator',
        subtitle: 'Thousands of tours and activities in over 2,500 destinations',
      },
      intro: {
        text1: 'At ToursRed we work with tourism partners to offer you access to thousands of tours, activities and experiences in the most popular destinations.',
        text2: 'One of our partners is Viator, a global platform specialized in travel experiences, where you can find everything from city tours and day trips, to cultural activities, outdoor adventures and unique experiences in over 2,500 destinations.',
        text3: 'Through this search tool, you can explore and book available experiences directly.',
      },
      ctaButton: 'Visit Viator',
      legal: {
        title: 'Important information',
        point1: 'The experiences shown in this section are operated and managed directly by Viator and its local providers.',
        point2: 'ToursRed acts only as an affiliated commercial intermediary.',
        point3: 'Tour operation, customer service, cancellation policies, changes and refunds are the sole responsibility of Viator.',
        point4: 'By booking, you accept Viator\'s terms and conditions.',
        closing: 'Our goal is to facilitate your access to reliable international experiences, while we continue to develop our own national tours platform.',
      },
    },
  };

  const t = isSpanish ? content.es : content.en;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-600">
            <ol className="flex items-center space-x-2">
              <li>{t.breadcrumbs.home}</li>
              <li>/</li>
              <li>{t.breadcrumbs.services}</li>
              <li>/</li>
              <li className="text-red-600 font-medium">{t.breadcrumbs.viator}</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🌍 {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.hero.subtitle}
            </p>
          </div>

          {/* Introduction */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.intro.text1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.intro.text2}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.intro.text3}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center pt-6">
                <Button
                  asChild
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full"
                >
                  <a
                    href="https://www.viator.com/es-MX/?pid=P00287661&uid=U00774291&mcid=58086&currency=MXN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {t.ctaButton}
                    <ExternalLink className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-3 mb-6">
                <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                <h2 className="text-2xl font-bold text-gray-900">
                  ℹ️ {t.legal.title}
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  {t.legal.point1}
                </p>
                <p className="leading-relaxed">
                  {t.legal.point2}
                </p>
                <p className="leading-relaxed">
                  {t.legal.point3}
                </p>
                <p className="leading-relaxed">
                  {t.legal.point4}
                </p>
                <p className="leading-relaxed pt-4 border-t border-blue-200">
                  {t.legal.closing}
                </p>
              </div>
            </div>
          </div>

          {/* Viator Widget */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <div
                data-vi-partner-id="U00774291"
                data-vi-widget-ref="W-ba120a0c-94d7-4418-9117-1e4297d5364b"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Viator Widget Script */}
      <Script
        src="https://www.viator.com/orion/partner/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}

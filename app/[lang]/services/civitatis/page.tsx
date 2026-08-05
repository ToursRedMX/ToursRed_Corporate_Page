import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, Globe } from 'lucide-react';
import { Metadata } from 'next';
import { CivitatisAdBanner, CivitatisBannerWidget } from '@/components/CivitatisBannerWidget';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isSpanish = (lang as Locale) === 'es';

  return {
    title: isSpanish
      ? 'Tours y actividades con Civitatis | ToursRed'
      : 'Tours and activities with Civitatis | ToursRed',
    description: isSpanish
      ? 'Descubre +12,000 tours, actividades y visitas guiadas en español en todo el mundo con Civitatis, nuestro aliado turistico global.'
      : 'Discover +12,000 tours, activities and guided tours in Spanish worldwide with Civitatis, our global tourism partner.',
  };
}

export default async function CivitatiPage({
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
        civitatis: 'Civitatis',
      },
      hero: {
        title: 'Descubre tours y actividades en todo el mundo con Civitatis',
        subtitle: '+12,000 actividades y visitas guiadas en espanol por todo el mundo',
      },
      intro: {
        text1: 'En ToursRed trabajamos con aliados turisticos para ofrecerte acceso a las mejores experiencias de viaje alrededor del mundo.',
        text2: 'Civitatis es una plataforma lider especializada en tours, actividades y visitas guiadas en espanol, con presencia en mas de 4,000 destinos en todo el mundo. A traves de nuestra alianza, puedes explorar y reservar directamente miles de experiencias disponibles.',
        text3: 'Desde free tours hasta excursiones de un dia, actividades culturales, aventuras al aire libre y experiencias gastronomicas, Civitatis tiene algo para cada viajero.',
      },
      ctaButton: 'Explorar Civitatis',
      legal: {
        title: 'Informacion importante',
        point1: 'Las actividades mostradas en esta seccion son operadas y gestionadas directamente por Civitatis y sus proveedores locales.',
        point2: 'ToursRed actua unicamente como intermediario comercial afiliado.',
        point3: 'La operacion del tour, atencion al cliente, politicas de cancelacion, cambios y reembolsos son responsabilidad exclusiva de Civitatis.',
        point4: 'Al reservar, aceptas los terminos y condiciones de Civitatis.',
        closing: 'Nuestro objetivo es facilitarte el acceso a experiencias confiables a nivel internacional, mientras seguimos desarrollando nuestra propia plataforma de tours.',
      },
    },
    en: {
      breadcrumbs: {
        home: 'Home',
        services: 'Services',
        civitatis: 'Civitatis',
      },
      hero: {
        title: 'Discover tours and activities worldwide with Civitatis',
        subtitle: '+12,000 activities and guided tours in Spanish around the world',
      },
      intro: {
        text1: 'At ToursRed we work with tourism partners to offer you access to the best travel experiences around the world.',
        text2: 'Civitatis is a leading platform specialized in tours, activities and guided tours in Spanish, with presence in over 4,000 destinations worldwide. Through our partnership, you can explore and book thousands of available experiences directly.',
        text3: 'From free tours to day trips, cultural activities, outdoor adventures and gastronomic experiences, Civitatis has something for every traveler.',
      },
      ctaButton: 'Explore Civitatis',
      legal: {
        title: 'Important information',
        point1: 'The activities shown in this section are operated and managed directly by Civitatis and its local providers.',
        point2: 'ToursRed acts only as an affiliated commercial intermediary.',
        point3: 'Tour operation, customer service, cancellation policies, changes and refunds are the sole responsibility of Civitatis.',
        point4: 'By booking, you accept Civitatis\' terms and conditions.',
        closing: 'Our goal is to facilitate your access to reliable international experiences, while we continue to develop our own tours platform.',
      },
    },
  };

  const t = isSpanish ? content.es : content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <nav className="mb-8 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>{t.breadcrumbs.home}</li>
            <li>/</li>
            <li>{t.breadcrumbs.services}</li>
            <li>/</li>
            <li className="text-red-600 font-medium">{t.breadcrumbs.civitatis}</li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Globe className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.hero.subtitle}
          </p>
        </div>

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

            <div className="flex justify-center pt-6">
              <Button
                asChild
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full"
              >
                <a
                  href="https://www.civitatis.com/es/destinos/?ag_aid=90955"
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

        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 md:p-12">
            <div className="flex items-start gap-3 mb-6">
              <Info className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <h2 className="text-2xl font-bold text-gray-900">
                {t.legal.title}
              </h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">{t.legal.point1}</p>
              <p className="leading-relaxed">{t.legal.point2}</p>
              <p className="leading-relaxed">{t.legal.point3}</p>
              <p className="leading-relaxed">{t.legal.point4}</p>
              <p className="leading-relaxed pt-4 border-t border-blue-200">
                {t.legal.closing}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {isSpanish ? 'Explora actividades' : 'Explore activities'}
            </h2>
            <CivitatisBannerWidget />
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-8 flex justify-center">
            <CivitatisAdBanner />
          </div>
        </div>
      </div>
    </div>
  );
}

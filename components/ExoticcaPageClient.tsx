'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { trackTikTokEvent } from '@/components/TikTokPixel';
import Link from 'next/link';
import { ChevronRight, Info, CircleAlert as AlertCircle, MessageSquare, ExternalLink, MapPin, DollarSign, Shield, Star, Clock, Headphones as HeadphonesIcon } from 'lucide-react';
import { ExoticcaQuoteForm } from './ExoticcaQuoteForm';

interface ExoticcaPageClientProps {
  lang: 'es' | 'en';
  dict: any;
}

export function ExoticcaPageClient({ lang, dict }: ExoticcaPageClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'exoticca', content_type: 'product', content_name: 'Exoticca Viajes' }], currency: 'MXN', value: 0 });
  }, []);

  const exoticcaUrl = 'https://www.exoticca.com/mx?advisor_token=alan-axel-alvarez-hernandez-019c2fa9-0f7e-717c-9187-65995b917bc6';

  const handleExploreClick = () => {
    window.open(exoticcaUrl, '_blank', 'noopener,noreferrer');
  };

  const features = [
    {
      icon: MapPin,
      title: dict.features?.uniqueDestinations?.title || 'Destinos Únicos',
      description: dict.features?.uniqueDestinations?.description || 'Accede a experiencias exclusivas en más de 60 países alrededor del mundo con itinerarios cuidadosamente diseñados.'
    },
    {
      icon: DollarSign,
      title: dict.features?.competitivePrices?.title || 'Precios Competitivos',
      description: dict.features?.competitivePrices?.description || 'Obtén las mejores tarifas con paquetes todo incluido que combinan vuelos, hoteles, tours y más.'
    },
    {
      icon: Shield,
      title: dict.features?.safeTravel?.title || 'Viajes Seguros',
      description: dict.features?.safeTravel?.description || 'Disfruta de la tranquilidad con protección completa y asistencia 24/7 durante todo tu viaje.'
    },
    {
      icon: Star,
      title: dict.features?.premiumExperiences?.title || 'Experiencias Premium',
      description: dict.features?.premiumExperiences?.description || 'Vive aventuras extraordinarias con guías expertos y servicios de alta calidad en cada destino.'
    },
    {
      icon: Clock,
      title: dict.features?.flexibility?.title || 'Flexibilidad',
      description: dict.features?.flexibility?.description || 'Elige entre múltiples fechas de salida y opciones de personalización para adaptar tu viaje.'
    },
    {
      icon: HeadphonesIcon,
      title: dict.features?.dedicatedSupport?.title || 'Soporte Dedicado',
      description: dict.features?.dedicatedSupport?.description || 'Recibe atención personalizada desde la planificación hasta el regreso de tu viaje.'
    }
  ];

  const destinations = dict.destinations?.list || [
    'Asia: Tailandia, Vietnam, Japón, India, Sri Lanka',
    'África: Marruecos, Egipto, Sudáfrica, Tanzania, Kenia',
    'Europa: Grecia, Italia, España, Portugal, Turquía',
    'América del Sur: Perú, Brasil, Argentina, Chile, Ecuador',
    'Oceanía: Australia, Nueva Zelanda, Polinesia Francesa',
    'Oriente Medio: Jordania, Emiratos Árabes, Israel'
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href={`/${lang}`}
                className="text-slate-600 hover:text-yellow-600 transition-colors"
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
                <span className="font-medium text-slate-900">{dict.breadcrumbs.exoticca}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-gradient-to-r from-black via-slate-900 to-slate-800 rounded-lg shadow-lg p-6 md:p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{dict.hero.title}</h1>
          <p className="text-lg mb-6 text-slate-100">
            {dict.hero.subtitle}
          </p>

          <div className="bg-yellow-400/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-yellow-400/40">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 flex-shrink-0 mt-0.5 text-yellow-400" />
              <div>
                <p className="font-semibold mb-2 text-yellow-400">{dict.howItWorks.title}</p>
                <p className="text-sm text-slate-100">
                  {dict.howItWorks.description}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-400 text-slate-900 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <ExternalLink className="h-6 w-6 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium">
              {dict.exploreNotice || 'Al hacer clic en "Explorar Tours", se abrirá una nueva ventana con el catálogo completo de Exoticca donde podrás ver todos los destinos disponibles, precios y hacer tu reservación directamente.'}
            </p>
          </div>

          <button
            onClick={handleExploreClick}
            className="bg-white text-black hover:bg-yellow-50 px-8 py-4 rounded-lg font-bold text-lg flex items-center space-x-3 transition-all hover:scale-105 shadow-lg"
          >
            <span>{dict.exploreCatalogButton || 'Explorar Tours en Exoticca'}</span>
            <ExternalLink className="h-6 w-6" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{dict.whyChooseTitle || '¿Por qué elegir Exoticca?'}</h2>
          <p className="text-slate-600 mb-8">
            {dict.whyChooseSubtitle || 'Exoticca se dedica a hacer realidad los viajes de tus sueños con servicios premium y atención al detalle'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="bg-yellow-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{dict.popularDestinationsTitle || 'Destinos Populares'}</h2>
          <p className="text-slate-600 mb-6">
            {dict.popularDestinationsSubtitle || 'Explora algunos de los destinos más fascinantes que Exoticca tiene para ofrecerte:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinations.map((dest: string, index: number) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-slate-50 rounded-lg">
                <MapPin className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{dest}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="font-bold text-slate-900 mb-2">{dict.allInclusiveTitle || 'Paquetes Todo Incluido'}</h3>
            <p className="text-slate-700 text-sm">
              {dict.allInclusiveDescription || 'Todos los paquetes de Exoticca incluyen vuelos internacionales, hoteles seleccionados, traslados, tours guiados en español, algunas comidas y asistencia durante todo el viaje. Solo necesitas preparar tu maleta y disfrutar de la experiencia.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-100 border border-slate-300 rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">{dict.legalNoticeTitle || 'Aviso Legal'}</h3>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              {dict.legalNotice1 || 'Los paquetes y servicios turísticos internacionales ofrecidos en esta sección son prestados, operados y administrados directamente por'} <span className="font-semibold">Exoticca</span>{dict.legalNotice1End || ', quien actúa como proveedor final del servicio.'}
            </p>
            <p>
              {dict.legalNotice2 || 'Exoticca es el único responsable de la ejecución del viaje, calidad de los servicios, atención al cliente, políticas de cancelación, modificaciones, reembolsos y cualquier reclamación relacionada con la experiencia de viaje.'}
            </p>
            <p>
              {dict.legalNotice3 || 'ToursRed no opera, organiza ni administra los viajes, y participa exclusivamente como intermediario de referencia, limitando su responsabilidad a la promoción y canalización del usuario hacia el proveedor externo.'}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg shadow-lg p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">{dict.readyTitle || '¿Listo para tu próxima aventura?'}</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            {dict.readySubtitle || 'Explora el catálogo completo de Exoticca, encuentra tu destino ideal y reserva con confianza. Si tienes dudas, nuestro equipo está listo para ayudarte.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleExploreClick}
              className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg font-bold flex items-center space-x-2 transition-all hover:scale-105"
            >
              <span>{dict.viewFullCatalog || 'Ver Catálogo Completo'}</span>
              <ExternalLink className="h-5 w-5" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-8 py-3 rounded-lg font-bold transition-colors"
            >
              {dict.requestQuoteButton || 'Solicitar Cotización'}
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 z-40"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="font-semibold">{dict.floatingButton}</span>
        </button>
      </div>

      <ExoticcaQuoteForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang as Locale}
        dict={dict}
      />
    </div>
  );
}

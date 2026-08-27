import { Metadata } from 'next';
import { CircleCheck as CheckCircle, MapPin, Package, Plane, Sparkles } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { Section } from '@/components/Section';
import { TravelerServicesPageClient } from '@/components/TravelerServicesPageClient';

export const metadata: Metadata = {
  title: 'Servicios Para Viajeros | ToursRed',
  description: 'Servicios personalizados para hacer tu viaje perfecto.',
};

export default async function TravelerServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="min-h-screen bg-white">
      <Section className="bg-gradient-to-br from-red-600 to-red-800 text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {dictionary.services.travelerServices.hero.title}
          </h1>
          <p className="text-xl opacity-90">
            {dictionary.services.travelerServices.hero.subtitle}
          </p>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-white to-red-50">
        <div className="max-w-5xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Te ayudamos a planear mejor tu viaje
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              Además de conectar viajeros con experiencias locales, en ToursRed ofrecemos servicios personalizados para quienes buscan apoyo adicional al organizar su viaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Armado de itinerarios
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Creamos rutas personalizadas según tu presupuesto, fechas y destinos deseados.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Ruta personalizada</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Recomendaciones locales</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Hospedaje y transporte</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Coordinación de reservas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Viajes y paquetes
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Cotización de viajes completos a través de nuestros socios mayoristas y agencias aliadas.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Cotización de paquetes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Opciones de alojamiento</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Tours y actividades</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Asesoría completa</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Plane className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Cotización de transporte
                </h3>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  Apoyo para traslados, vuelos o transporte terrestre con opciones disponibles.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Opciones de transporte</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Comparación de alternativas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Asesoría para reservar</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Mejores precios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <Sparkles className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Aviso importante</h4>
                <p className="text-sm text-slate-700">
                  ToursRed actúa como intermediario en la coordinación de estos servicios. La operación final depende del proveedor o agencia seleccionada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Planificación personalizada</span>
          </div>

          <h2 className="text-5xl font-bold mb-6 leading-tight">
            ¿Necesitas ayuda con tu viaje?
          </h2>
          <p className="text-xl text-red-50 mb-4 leading-relaxed">
            Nuestro equipo de especialistas está listo para ayudarte
          </p>
          <p className="text-lg text-red-100 mb-12">
            Te contactaremos para presentarte opciones personalizadas y presupuestos sin costo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <TravelerServicesPageClient lang={lang as Locale} />
          </div>
        </div>
      </Section>
    </div>
  );
}

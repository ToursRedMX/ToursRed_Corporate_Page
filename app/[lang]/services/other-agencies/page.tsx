import { Metadata } from 'next';
import { CircleCheck as CheckCircle, Sparkles, Globe, Plane, Compass, CircleAlert as AlertCircle } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { Section } from '@/components/Section';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Otras Agencias y Viajes Internacionales | ToursRed',
  description: 'Próximamente más experiencias internacionales en ToursRed. Regístrate si operas viajes al extranjero.',
};

export default async function OtherAgenciesPage({
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
          <div className="inline-flex items-center justify-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {(lang as Locale) === 'es' ? 'Próximamente' : 'Coming Soon'}
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6">
            {(lang as Locale) === 'es' ? 'Otras Agencias y Viajes Internacionales' : 'Other Agencies and International Travel'}
          </h1>
          <p className="text-xl opacity-90">
            {(lang as Locale) === 'es'
              ? 'Próximamente más experiencias en ToursRed'
              : 'Coming soon more experiences on ToursRed'}
          </p>
        </div>
      </Section>

      <Section className="bg-white py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg text-slate-700 leading-relaxed">
              {(lang as Locale) === 'es'
                ? 'En esta primera etapa, ToursRed está enfocado en conectar viajeros con experiencias y tours nacionales operados por agencias locales en México.'
                : 'In this first stage, ToursRed is focused on connecting travelers with national experiences and tours operated by local agencies in Mexico.'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <p className="text-slate-700 leading-relaxed">
              {(lang as Locale) === 'es'
                ? 'Sin embargo, nuestro roadmap contempla que en una siguiente fase también podrán integrarse agencias que operen viajes internacionales de forma directa, es decir que no son operados a través de Mayoristas, dentro de la plataforma.'
                : 'However, our roadmap contemplates that in a next phase, agencies that operate international travel directly, that is, not operated through Wholesalers, can also be integrated into the platform.'}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <Globe className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              {(lang as Locale) === 'es' ? '¿Eres una agencia que organiza viajes internacionales?' : 'Are you an agency that organizes international travel?'}
            </h2>
            <p className="text-xl text-red-600 font-semibold">
              {(lang as Locale) === 'es' ? 'Queremos conocerte.' : 'We want to meet you.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {(lang as Locale) === 'es'
                ? 'Aunque actualmente la plataforma prioriza experiencias nacionales, estamos construyendo una red de agencias que también operan viajes al extranjero, con el objetivo de integrarlas en próximas etapas del proyecto.'
                : 'Although the platform currently prioritizes national experiences, we are building a network of agencies that also operate travel abroad, with the aim of integrating them in future stages of the project.'}
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              {(lang as Locale) === 'es'
                ? 'Si tu agencia organiza viajes internacionales por cuenta propia y te interesa formar parte del ecosistema ToursRed, puedes registrarte desde ahora.'
                : 'If your agency organizes international travel on its own and you are interested in being part of the ToursRed ecosystem, you can register now.'}
            </p>

            <div className="text-center">
              <Link
                href={`/${lang}/join-agency`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {(lang as Locale) === 'es' ? 'Quiero Ser Agencia Aliada' : 'I Want to Be an Allied Agency'}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Plane className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900">
              {(lang as Locale) === 'es' ? '¿Ya manejas esquemas de comisión?' : 'Do you already handle commission schemes?'}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-10">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {(lang as Locale) === 'es'
                ? 'Si tu agencia cuenta con un esquema de comisiones (similar al modelo de mayoristas), también podemos evaluar la integración de tus tours dentro de ToursRed desde esta etapa.'
                : 'If your agency has a commission scheme (similar to the wholesaler model), we can also evaluate the integration of your tours within ToursRed from this stage.'}
            </p>
            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              {(lang as Locale) === 'es'
                ? 'Nuestro equipo revisará tu propuesta y te contactará para analizar una posible colaboración.'
                : 'Our team will review your proposal and contact you to analyze a possible collaboration.'}
            </p>

            <div className="text-center">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-700 rounded-full hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {(lang as Locale) === 'es' ? 'Contáctanos' : 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-white py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Compass className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              {(lang as Locale) === 'es' ? 'Nuestro enfoque por etapas' : 'Our phased approach'}
            </h2>
            <p className="text-lg text-slate-600">
              {(lang as Locale) === 'es'
                ? 'Para asegurar calidad y orden en el crecimiento de la plataforma, ToursRed avanza por fases:'
                : 'To ensure quality and order in the growth of the platform, ToursRed advances in phases:'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold">
                  {(lang as Locale) === 'es' ? 'Etapa actual' : 'Current stage'}
                </h3>
              </div>
              <p className="text-red-50 leading-relaxed">
                {(lang as Locale) === 'es'
                  ? 'Experiencias y tours nacionales operados por agencias locales en México.'
                  : 'National experiences and tours operated by local agencies in Mexico.'}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold">
                  {(lang as Locale) === 'es' ? 'Próxima etapa' : 'Next stage'}
                </h3>
              </div>
              <p className="text-blue-50 leading-relaxed">
                {(lang as Locale) === 'es'
                  ? 'Integración de agencias que operen viajes internacionales de forma directa.'
                  : 'Integration of agencies that operate international travel directly.'}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-600 leading-relaxed">
              {(lang as Locale) === 'es'
                ? 'Este enfoque nos permite construir una base sólida antes de expandir la oferta internacional.'
                : 'This approach allows us to build a solid foundation before expanding the international offer.'}
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-amber-50 to-orange-50 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-2 border-amber-300 rounded-2xl p-8">
            <div className="flex items-start space-x-4">
              <AlertCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {(lang as Locale) === 'es' ? 'Aviso importante' : 'Important notice'}
                </h3>
                <p className="text-lg text-slate-700 leading-relaxed mb-3">
                  {(lang as Locale) === 'es'
                    ? 'ToursRed es una plataforma de intermediación tecnológica.'
                    : 'ToursRed is a technological intermediation platform.'}
                </p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {(lang as Locale) === 'es'
                        ? 'Las experiencias publicadas son operadas directamente por cada agencia aliada.'
                        : 'The published experiences are operated directly by each allied agency.'}
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>
                      {(lang as Locale) === 'es'
                        ? 'ToursRed no actúa como operador turístico.'
                        : 'ToursRed does not act as a tour operator.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-16">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center justify-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {(lang as Locale) === 'es' ? 'Únete a ToursRed' : 'Join ToursRed'}
            </span>
          </div>

          <h2 className="text-5xl font-bold mb-6 leading-tight">
            {(lang as Locale) === 'es' ? '¿Quieres crecer junto con ToursRed?' : 'Do you want to grow with ToursRed?'}
          </h2>
          <p className="text-xl text-red-50 mb-12 leading-relaxed">
            {(lang as Locale) === 'es'
              ? 'Forma parte del ecosistema de agencias más innovador de México'
              : 'Be part of the most innovative agency ecosystem in Mexico'}
          </p>

          <Link
            href={`/${lang}/join-agency`}
            className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-red-600 bg-white rounded-full hover:bg-red-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            {(lang as Locale) === 'es' ? 'Unirme como agencia aliada' : 'Join as an allied agency'}
          </Link>
        </div>
      </Section>
    </div>
  );
}

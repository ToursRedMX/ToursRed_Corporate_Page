import { Metadata } from 'next';
import { CircleCheck as CheckCircle, Sparkles } from 'lucide-react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { Section } from '@/components/Section';
import { AgencySupportPageClient } from '@/components/AgencySupportPageClient';

export const metadata: Metadata = {
  title: 'Servicios de Apoyo para Agencias | ToursRed',
  description: 'Herramientas y acompañamiento para ayudarte a lanzar y/o profesionalizar tu agencia de viajes.',
};

export default async function AgencyServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  const services = [
    {
      icon: '🎨',
      title: (lang as Locale) === 'es' ? 'Diseño de Logotipo' : 'Logo Design',
      description: (lang as Locale) === 'es'
        ? 'Creamos la identidad visual perfecta para tu agencia de viajes. Un logotipo profesional que refleje tus valores y atraiga a tus clientes ideales.'
        : 'We create the perfect visual identity for your travel agency. A professional logo that reflects your values and attracts your ideal clients.',
      points: (lang as Locale) === 'es'
        ? ['Diseño original y único', 'Múltiples propuestas', 'Archivos en todos los formatos', 'Revisiones incluidas']
        : ['Original and unique design', 'Multiple proposals', 'Files in all formats', 'Revisions included']
    },
    {
      icon: '🌐',
      title: (lang as Locale) === 'es' ? 'Desarrollo de Página Web' : 'Website Development',
      description: (lang as Locale) === 'es'
        ? 'Diseñamos y desarrollamos sitios web modernos, responsivos y optimizados para convertir visitantes en clientes. Incluye integración con sistemas de reservas.'
        : 'We design and develop modern, responsive websites optimized to convert visitors into clients. Includes integration with booking systems.',
      points: (lang as Locale) === 'es'
        ? ['Diseño responsive', 'Optimización SEO', 'Sistema de reservas integrado', 'Hosting y dominio']
        : ['Responsive design', 'SEO optimization', 'Integrated booking system', 'Hosting and domain']
    },
    {
      icon: '📄',
      title: (lang as Locale) === 'es' ? 'Consultoría para obtener el RNT' : 'Advice to obtain your RNT',
      description: (lang as Locale) === 'es'
        ? 'Te guiamos en todo el proceso de obtención del Registro Nacional de Turismo. Asesoría completa para cumplir con todos los requisitos legales.'
        : 'We guide you through the entire process of obtaining the National Tourism Registry. Complete advice to comply with all legal requirements.',
      points: (lang as Locale) === 'es'
        ? ['Revisión de requisitos', 'Preparación de documentos', 'Seguimiento del trámite', 'Asesoría legal especializada']
        : ['Requirements review', 'Document preparation', 'Procedure follow-up', 'Specialized legal advice']
    },
    {
      icon: '🏢',
      title: (lang as Locale) === 'es' ? 'Consultoría para dar de alta la agencia como SAS' : 'Advice for registering your agency as SAS',
      description: (lang as Locale) === 'es'
        ? 'Asesoría completa para constituir tu agencia como Sociedad por Acciones Simplificada. Proceso rápido, económico y sin complicaciones.'
        : 'Complete advice to establish your agency as a Simplified Joint Stock Company. Fast, economical process without complications.',
      points: (lang as Locale) === 'es'
        ? ['Constitución en 48 horas', 'Sin notario requerido', 'Costos reducidos', 'Asesoría fiscal incluida']
        : ['Incorporation in 48 hours', 'No notary required', 'Reduced costs', 'Tax advice included']
    },
    {
      icon: '®️',
      title: (lang as Locale) === 'es' ? 'Asesoría para registro de marca ante IMPI' : 'Advice for trademark registration with IMPI',
      description: (lang as Locale) === 'es'
        ? 'Te apoyamos en el proceso para registrar tu marca y proteger legalmente el nombre de tu agencia.'
        : 'We support you in the process to register your brand and legally protect your agency name.',
      points: (lang as Locale) === 'es'
        ? ['Orientación sobre clases y búsqueda previa', 'Preparación de información requerida', 'Acompañamiento durante el trámite']
        : ['Guidance on classes and preliminary search', 'Preparation of required information', 'Support during the process']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Section className="bg-gradient-to-br from-red-600 to-red-800 text-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            {(lang as Locale) === 'es' ? 'Servicios de Apoyo para Agencias' : 'Agency Support Services'}
          </h1>
          <p className="text-xl opacity-90">
            {(lang as Locale) === 'es'
              ? 'Herramientas y acompañamiento para ayudarte a lanzar y/o profesionalizar tu agencia de viajes'
              : 'Tools and support to help you launch and/or professionalize your travel agency'}
          </p>
        </div>
      </Section>

      <Section className="bg-gradient-to-b from-white to-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {(lang as Locale) === 'es' ? 'Servicios disponibles' : 'Available services'}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {(lang as Locale) === 'es'
                ? 'Contamos con servicios complementarios diseñados para ayudarte en diferentes etapas de tu agencia.'
                : 'We offer complementary services designed to help you at different stages of your agency.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative p-8">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 text-sm">
                    {service.points.map((point, pidx) => (
                      <li key={pidx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                  {idx === 4 && (
                    <p className="text-xs text-slate-500 mt-4 italic leading-relaxed">
                      {(lang as Locale) === 'es'
                        ? '(El registro ante IMPI se realiza directamente por el solicitante. ToursRed brinda apoyo y guía durante el proceso.)'
                        : '(Registration with IMPI is done directly by the applicant. ToursRed provides support and guidance during the process.)'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start space-x-4">
              <Sparkles className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  {(lang as Locale) === 'es' ? 'Nota importante' : 'Important note'}
                </h4>
                <p className="text-sm text-slate-700">
                  {(lang as Locale) === 'es'
                    ? 'Los servicios se brindan como apoyo complementario y tienen un costo adicional según el alcance solicitado.'
                    : 'Services are provided as complementary support and have an additional cost depending on the scope requested.'}
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
            <span className="text-sm font-semibold">
              {(lang as Locale) === 'es' ? 'Solicitud personalizada' : 'Personalized request'}
            </span>
          </div>

          <h2 className="text-5xl font-bold mb-6 leading-tight">
            {(lang as Locale) === 'es' ? '¿Listo para profesionalizar tu agencia?' : 'Ready to professionalize your agency?'}
          </h2>
          <p className="text-xl text-red-50 mb-4 leading-relaxed">
            {(lang as Locale) === 'es'
              ? 'Cuéntanos sobre tu proyecto y nos pondremos en contacto'
              : 'Tell us about your project and we will contact you'}
          </p>
          <p className="text-lg text-red-100 mb-12">
            {(lang as Locale) === 'es'
              ? 'Nuestro equipo evaluará tus necesidades y te presentará las opciones más adecuadas.'
              : 'Our team will evaluate your needs and present you with the most suitable options.'}
          </p>

          <AgencySupportPageClient lang={lang as Locale} />
        </div>
      </Section>
    </div>
  );
}

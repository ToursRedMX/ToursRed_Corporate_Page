import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Mail, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import { Section } from '@/components/Section';
import { createPageMetadata } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata({
    title: {
      es: 'Trabaja con Nosotros',
      en: 'Work with Us',
    },
    description: {
      es: 'Únete a nuestro equipo y construye el futuro del turismo digital',
      en: 'Join our team and build the future of digital tourism',
    },
    lang: lang as Locale, path: '/careers',
  });
}

export default async function CareersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const t = dictionary.careers;

  return (
    <div className="min-h-screen">
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <Briefcase className="h-16 w-16 text-teal-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t.hero.title}</h1>
          <p className="text-xl text-gray-300">{t.hero.subtitle}</p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              {t.intro.paragraph1}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.intro.paragraph2}
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t.currentOpenings.title}
            </h2>

            <div className="space-y-8">
              <Card className="border-2 border-teal-100 hover:border-teal-300 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                        📊 {t.positions.accountant.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        {t.positions.accountant.badge}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      {t.positions.accountant.responsibilities.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.positions.accountant.responsibilities.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      {t.positions.accountant.requirements.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.positions.accountant.requirements.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-teal-100 hover:border-teal-300 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                        📱 {t.positions.communityManager.title}
                      </CardTitle>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                        {t.positions.communityManager.badge}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      {t.positions.communityManager.responsibilities.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.positions.communityManager.responsibilities.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-gray-900">
                      {t.positions.communityManager.requirements.title}
                    </h3>
                    <ul className="space-y-2">
                      {t.positions.communityManager.requirements.items.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-2 border-teal-200 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="h-6 w-6 text-teal-600" />
                {t.application.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{t.application.description}</p>
              <div className="bg-white p-4 rounded-lg border border-teal-200">
                <p className="font-semibold text-teal-700 text-lg">
                  📧 {t.application.email}
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{t.application.subject.title}</p>
                <p className="text-gray-700">👉 {t.application.subject.accountant}</p>
                <p className="text-gray-700">{lang as Locale === 'es' ? 'o' : 'or'}</p>
                <p className="text-gray-700">👉 {t.application.subject.communityManager}</p>
              </div>
              <p className="text-gray-600 italic">{t.application.response}</p>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-2 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  {t.legalNotice.text}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

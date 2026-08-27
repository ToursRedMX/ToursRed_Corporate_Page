import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/Section';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, Cookie, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Section background="white" className="pt-20">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {dict.legal.hero.title}
          </h1>
          <p className="text-lg text-slate-200">{dict.legal.hero.subtitle}</p>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <FileText className="h-8 w-8 text-red-600" />
                {dict.legal.notice.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {dict.legal.notice.lastUpdate}
              </p>
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
              <p className="leading-relaxed">{dict.legal.notice.paragraph1}</p>
              <p className="leading-relaxed">{dict.legal.notice.paragraph2}</p>
              <p className="leading-relaxed">{dict.legal.notice.paragraph3}</p>

              <div className="bg-slate-50 rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {dict.legal.notice.responsibility.title}
                </h3>
                <p className="mb-3">{dict.legal.notice.responsibility.intro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{dict.legal.notice.responsibility.item1}</li>
                  <li>{dict.legal.notice.responsibility.item2}</li>
                  <li>{dict.legal.notice.responsibility.item3}</li>
                  <li>{dict.legal.notice.responsibility.item4}</li>
                </ul>
                <p className="mt-3 font-medium">
                  {dict.legal.notice.responsibility.footer}
                </p>
              </div>

              <p className="leading-relaxed">
                {dict.legal.notice.intellectualProperty}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href={`/${lang}/legal/terms`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="bg-blue-100 p-4 rounded-lg w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.legal.sections.terms.title}
                  </h3>
                  <div className="flex items-center text-blue-600 mt-4">
                    <span className="text-sm font-medium">{dict.legal.sections.readMore}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${lang}/legal/privacy`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="bg-green-100 p-4 rounded-lg w-fit mb-4 group-hover:bg-green-200 transition-colors">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.legal.sections.privacy.title}
                  </h3>
                  <div className="flex items-center text-green-600 mt-4">
                    <span className="text-sm font-medium">{dict.legal.sections.readMore}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/${lang}/legal/cookies`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="bg-amber-100 p-4 rounded-lg w-fit mb-4 group-hover:bg-amber-200 transition-colors">
                    <Cookie className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {dict.legal.sections.cookies.title}
                  </h3>
                  <div className="flex items-center text-amber-600 mt-4">
                    <span className="text-sm font-medium">{dict.legal.sections.readMore}</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

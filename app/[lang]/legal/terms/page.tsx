import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function TermsPage({
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
          <Link href={`/${lang}/legal`}>
            <Button
              variant="ghost"
              className="text-white hover:bg-slate-700 mb-4 -ml-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {dict.legal.sections.backToLegal}
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {dict.legal.sections.terms.title}
            </h1>
          </div>
          <p className="text-sm text-slate-300">
            {dict.legal.notice.lastUpdate}
          </p>
        </div>
      </Section>

      <Section background="gray">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div dangerouslySetInnerHTML={{ __html: dict.legal.sections.terms.content }} />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

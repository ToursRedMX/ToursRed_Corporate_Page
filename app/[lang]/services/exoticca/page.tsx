import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { ExoticcaPageClient } from '@/components/ExoticcaPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: (lang as Locale) === 'es' ? 'Exoticca - Viajes Internacionales | ToursRed' : 'Exoticca - International Travel | ToursRed',
    description:
      (lang as Locale) === 'es'
        ? 'Viajes que te llevan al rededor del mundo al mejor precio con nuestro aliado de confianza Exoticca'
        : 'Trips that take you around the world at the best price with our trusted partner Exoticca',
  };
}

export default async function ExoticcaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <ExoticcaPageClient lang={lang as Locale} dict={dictionary.exoticca} />;
}

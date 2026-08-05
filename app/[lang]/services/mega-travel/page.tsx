import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { MegaTravelPageClient } from '@/components/MegaTravelPageClient';

export const metadata: Metadata = {
  title: 'Mega Travel - Tours Internacionales | ToursRed',
  description: 'Explora más de 100 destinos alrededor del mundo con Mega Travel, nuestro aliado de confianza en tours internacionales.',
};

export default async function MegaTravelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <MegaTravelPageClient lang={lang as Locale} dict={dictionary.megaTravel} />;
}

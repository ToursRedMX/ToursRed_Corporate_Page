import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { NefertariTravelPageClient } from '@/components/NefertariTravelPageClient';

export const metadata: Metadata = {
  title: 'Nefertari Travel - Tours Internacionales | ToursRed',
  description: 'Explora diferentes destinos alrededor del mundo con Nefertari Travel, nuestro aliado de confianza en tours internacionales.',
};

export default async function NefertariTravelPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <NefertariTravelPageClient lang={lang as Locale} dict={dictionary.nefertariTravel} />;
}

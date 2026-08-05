import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { EsimPageClient } from '@/components/EsimPageClient';

export const metadata: Metadata = {
  title: 'ESIM de Viaje | ToursRed',
  description: 'Mantente conectado en todo el mundo con una eSIM de viaje. Obtén descuentos exclusivos con nuestros socios Saily y Datos de Viaje.',
};

export default async function EsimPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <EsimPageClient lang={lang as Locale} dict={dictionary} />;
}

import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { TravelInsurancePageClient } from '@/components/TravelInsurancePageClient';

export const metadata: Metadata = {
  title: 'Asegura tu Viaje | ToursRed',
  description: 'Protección completa para tu viaje con seguros de viaje confiables.',
};

export default async function TravelInsurancePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <TravelInsurancePageClient lang={lang as Locale} dict={dictionary} />;
}

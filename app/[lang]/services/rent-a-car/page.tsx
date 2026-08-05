import { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Locale } from '@/lib/i18n/config';
import { CarRentalPageClient } from '@/components/CarRentalPageClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: (lang as Locale) === 'es' ? 'Renta un Auto | ToursRed' : 'Rent a Car | ToursRed',
    description:
      (lang as Locale) === 'es'
        ? 'Busca, compara y reserva autos de renta en México y el mundo con las mejores tarifas garantizadas.'
        : 'Search, compare and book rental cars in Mexico and worldwide with the best guaranteed rates.',
  };
}

export default async function CarRentalPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <CarRentalPageClient lang={lang as Locale} dict={dictionary.carRental} />;
}

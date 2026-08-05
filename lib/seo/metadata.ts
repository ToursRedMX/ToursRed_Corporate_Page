import type { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';

const SITE_URL = 'https://www.toursred.com';

export function createPageMetadata({
  lang,
  title,
  description,
  path,
  image,
}: {
  lang: Locale;
  title: { es: string; en: string };
  description: { es: string; en: string };
  path: string;
  image?: string;
}): Metadata {
  const otherLang = lang === 'es' ? 'en' : 'es';

  return {
    title: title[lang],
    description: description[lang],
    alternates: {
      canonical: `${SITE_URL}/${lang}${path}`,
      languages: {
        'es': `${SITE_URL}/es${path}`,
        'en': `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: title[lang],
      description: description[lang],
      url: `${SITE_URL}/${lang}${path}`,
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      alternateLocale: lang === 'es' ? 'en_US' : 'es_MX',
      ...(image && { images: [{ url: image }] }),
    },
  };
}

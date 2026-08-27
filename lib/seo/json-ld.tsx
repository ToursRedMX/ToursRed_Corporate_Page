const SITE_URL = 'https://www.toursred.com';

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToursRed',
    url: SITE_URL,
    logo: `${SITE_URL}/logo_toursred_transparente.png`,
    description: 'La red de turismo más confiable de México. Tours, experiencias y servicios para viajeros y agencias de viajes.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Homero 229-501, Polanco',
      addressLocality: 'Ciudad de México',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+52-55-47127668',
      contactType: 'customer service',
      email: 'contacto@toursred.com',
      availableLanguage: ['Spanish', 'English'],
    },
    sameAs: [
      'https://www.toursred.com',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd({ lang }: { lang: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToursRed',
    url: `${SITE_URL}/${lang}`,
    inLanguage: lang === 'es' ? 'es-MX' : 'en-US',
    description: lang === 'es'
      ? 'La red de turismo más confiable de México. Tours, experiencias y servicios para viajeros y agencias de viajes.'
      : 'Mexico\'s most trusted tourism network. Tours, experiences and services for travelers and travel agencies.',
    publisher: {
      '@type': 'Organization',
      name: 'ToursRed',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo_toursred_transparente.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  image,
  datePublished,
  author,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  author?: string;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url,
    image: image || `${SITE_URL}/logo_toursred_transparente.png`,
    datePublished,
    author: {
      '@type': 'Organization',
      name: author || 'ToursRed',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ToursRed',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo_toursred_transparente.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

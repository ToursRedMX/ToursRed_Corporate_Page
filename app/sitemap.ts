import { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n/config';
import { getAllPostSlugs } from '@/lib/mdx';

const SITE_URL = 'https://www.toursred.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/how-it-works',
    '/join-agency',
    '/legal',
    '/press',
    '/sustainability',
    '/services/agency-services',
    '/services/exoticca',
    '/services/mega-travel',
    '/services/nefertari-travel',
    '/services/other-agencies',
    '/services/travel-insurance',
    '/services/traveler-services',
    '/services/viator',
    '/services/civitatis',
    '/services/rent-a-car',
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  for (const lang of locales) {
    const blogSlugs = getAllPostSlugs('blog', lang);
    for (const slug of blogSlugs) {
      entries.push({
        url: `${SITE_URL}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    const pressSlugs = getAllPostSlugs('press', lang);
    for (const slug of pressSlugs) {
      entries.push({
        url: `${SITE_URL}/${lang}/press/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}

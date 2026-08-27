import localFont from 'next/font/local';
import { Locale, locales } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { NavbarWrapper } from '@/components/NavbarWrapper';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import { GoogleTagManager, GoogleTagManagerNoscript } from '@/components/GoogleTagManager';
import { FacebookPixel, FacebookPixelNoscript } from '@/components/FacebookPixel';
import { TikTokPixel } from '@/components/TikTokPixel';
import { CookieBanner } from '@/components/CookieBanner';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/lib/seo/json-ld';
import type { Metadata } from 'next';
import '../globals.css';

const inter = localFont({
  src: [
    { path: '../../public/fonts/inter-latin-400.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/inter-latin-500.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/inter-latin-600.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/inter-latin-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = 'https://www.toursred.com';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ToursRed | Red de Turismo en México',
    template: '%s | ToursRed',
  },
  description: 'La red de turismo más confiable de México. Tours, experiencias y servicios para viajeros y agencias de viajes.',
  applicationName: 'ToursRed',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ToursRed',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: 'ToursRed',
    images: [
      {
        url: '/logo_toursred_transparente.png',
        width: 800,
        height: 600,
        alt: 'ToursRed - Red de Turismo en México',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo_toursred_transparente.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <GoogleTagManager />
      <FacebookPixel />
      <TikTokPixel />
      <body className={inter.className}>
        <GoogleTagManagerNoscript />
        <FacebookPixelNoscript />
        <OrganizationJsonLd />
        <WebSiteJsonLd lang={locale} />
        <NavbarWrapper lang={locale} dictionary={dictionary} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={locale} dictionary={dictionary} />
        <Toaster />
        <CookieBanner lang={locale} dictionary={dictionary} />
      </body>
    </html>
  );
}

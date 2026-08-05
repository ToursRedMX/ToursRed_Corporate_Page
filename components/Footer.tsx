import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';

interface FooterProps {
  lang: Locale;
  dictionary: any;
}

export function Footer({ lang, dictionary }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link href={`/${lang}`} className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="ToursRed"
                width={120}
                height={120}
                className="h-24 w-auto"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 text-center">
              {dictionary.footer.tagline}
            </p>
            <div>
              <p className="text-sm text-gray-400 mb-3">{dictionary.footer.social}</p>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/ToursRedMX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 text-gray-300" />
                </a>
                <a
                  href="https://www.instagram.com/toursredmx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-gray-300" />
                </a>
                <a
                  href="https://www.tiktok.com/@toursredmx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-300">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/toursredmx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-gray-300" />
                </a>
                <a
                  href="https://x.com/ToursRedMX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
                  aria-label="X"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-gray-300">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              {dictionary.footer.companyMenu.title}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/about`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.companyMenu.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/how-it-works`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.companyMenu.howItWorks}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/sustainability`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.companyMenu.sustainability}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/contact`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.companyMenu.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              {dictionary.footer.resources.title}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/blog`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.resources.blog}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/press`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.resources.press}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/careers`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.resources.careers}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4 text-lg">
              <Link
                href={`/${lang}/legal`}
                className="hover:text-gray-300 transition-colors"
              >
                {dictionary.footer.legal.title}
              </Link>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}/legal/terms`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.legal.terms}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal/privacy`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.legal.privacy}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/legal/cookies`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {dictionary.footer.legal.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <a
                  href="https://rnt-consulta.sectur.gob.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src="/image.png"
                    alt="Secretaría de Turismo - Registro Nacional de Turismo"
                    width={200}
                    height={80}
                    className="h-20 w-auto"
                  />
                </a>
                <p className="text-gray-400 text-sm">RNT: 04090165582a1</p>
              </div>
              <a
                href="https://amavmexico.mx/socios/tours-red/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src="/LogoAMAV.jpeg"
                  alt="AMAV Ciudad de México"
                  width={200}
                  height={80}
                  className="h-20 w-auto"
                />
              </a>
              <Image
                src="/LogoFematur.jpg"
                alt="FEMATUR"
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {dictionary.footer.company}.{' '}
                {dictionary.footer.rights}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

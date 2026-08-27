'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';
import { Locale } from '@/lib/i18n/config';

interface NavbarWrapperProps {
  lang: Locale;
  dictionary: any;
}

export function NavbarWrapper({ lang, dictionary }: NavbarWrapperProps) {
  const pathname = usePathname();
  const isHomePage = pathname === `/${lang}` || pathname === `/${lang}/`;

  return <Navbar lang={lang as Locale} dictionary={dictionary} transparent={isHomePage} />;
}

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from './lib/i18n/config';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }

  const locale = pathname.split('/')[1];
  if (!isValidLocale(locale)) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname.slice(locale.length + 1)}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.svg|.*\\.ico|.*\\.gif).*)'],
};

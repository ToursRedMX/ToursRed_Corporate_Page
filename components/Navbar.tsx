'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Locale } from '@/lib/i18n/config';

interface NavbarProps {
  lang: Locale;
  dictionary: any;
  transparent?: boolean;
}

interface SubMenuItem {
  label: string;
  href?: string;
  external?: boolean;
  submenu?: SubMenuItem[];
}

interface NavItem {
  label: string;
  href?: string;
  submenu?: SubMenuItem[];
}

export function Navbar({ lang, dictionary, transparent = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState<string | null>(null);
  const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(new Set());
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nestedCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!transparent) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transparent]);

  useEffect(() => {
    const handleScroll = () => {
      setOpenDropdown(null);
      setOpenNestedDropdown(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    {
      label: dictionary.nav.about,
      submenu: [
        { label: dictionary.nav.ourHistory, href: `/${lang}/about` },
        { label: 'separator' },
        { label: dictionary.nav.howItWorks, href: `/${lang}/how-it-works` },
        { label: dictionary.nav.sustainability, href: `/${lang}/sustainability` },
      ],
    },
    {
      label: dictionary.nav.services,
      submenu: [
        { label: dictionary.nav.nationalTours, href: 'https://www.toursred.com.mx', external: true },
        {
          label: dictionary.nav.internationalTours,
          submenu: [
            { label: dictionary.nav.megaTravel, href: `/${lang}/services/mega-travel` },
            { label: dictionary.nav.nefertariTravel, href: `/${lang}/services/nefertari-travel` },
            { label: dictionary.nav.exoticca, href: `/${lang}/services/exoticca` },
            { label: dictionary.nav.otherAgencies, href: `/${lang}/services/other-agencies` },
          ],
        },
        {
          label: dictionary.nav.otherTours,
          submenu: [
            { label: dictionary.nav.civitatis, href: `/${lang}/services/civitatis` },
            { label: dictionary.nav.viator, href: `/${lang}/services/viator` },
          ],
        },
        { label: 'separator' },
        { label: dictionary.nav.carRental, href: `/${lang}/services/rent-a-car` },
        { label: dictionary.nav.travelInsurance, href: `/${lang}/services/travel-insurance` },
        { label: dictionary.nav.esim, href: `/${lang}/services/esim` },
        { label: 'separator' },
        { label: dictionary.nav.servicesForTravelers, href: `/${lang}/services/traveler-services` },
        { label: dictionary.nav.servicesForAgencies, href: `/${lang}/services/agency-services` },
        { label: dictionary.nav.travelProducts, href: 'https://mercadolibre.com/sec/2EJm4Z5', external: true },
      ],
    },
    { label: dictionary.nav.blog, href: `/${lang}/blog` },
    { label: dictionary.nav.press, href: `/${lang}/press` },
    { label: dictionary.nav.contact, href: `/${lang}/contact` },
  ];

  const toggleLanguage = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const currentPath = window.location.pathname.replace(`/${lang}`, '');
    window.location.href = `/${newLang}${currentPath}`;
  };

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenNestedDropdown(null);
    }, 200);
  };

  const handleNestedMouseEnter = (label: string) => {
    if (nestedCloseTimeoutRef.current) {
      clearTimeout(nestedCloseTimeoutRef.current);
      nestedCloseTimeoutRef.current = null;
    }
    setOpenNestedDropdown(label);
  };

  const handleNestedMouseLeave = () => {
    nestedCloseTimeoutRef.current = setTimeout(() => {
      setOpenNestedDropdown(null);
    }, 200);
  };

  const toggleMobileMenu = (label: string) => {
    setMobileOpenMenus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const isTransparent = transparent && !scrolled && !isOpen;
  const textColor = isTransparent ? 'text-white' : 'text-gray-900';
  const linkColor = isTransparent ? 'text-white hover:text-red-400' : 'text-gray-700 hover:text-red-600';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={`/${lang}`} className="flex items-center">
            <Image
              src="/header.png"
              alt="ToursRed"
              width={200}
              height={120}
              className="h-12 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.submenu ? (
                  <button
                    className={`${linkColor} transition-colors text-sm font-medium flex items-center space-x-1`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href!}
                    className={`${linkColor} transition-colors text-sm font-medium`}
                  >
                    {item.label}
                  </Link>
                )}

                {item.submenu && openDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-3 min-w-[240px]">
                    {item.submenu.map((subItem, idx) => {
                      if (subItem.label === 'separator') {
                        return <div key={idx} className="border-t border-gray-200 my-2" />;
                      }

                      if (subItem.submenu) {
                        return (
                          <div
                            key={idx}
                            className="relative"
                            onMouseEnter={() => handleNestedMouseEnter(subItem.label)}
                            onMouseLeave={handleNestedMouseLeave}
                          >
                            <div className="px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors cursor-pointer flex items-center justify-between">
                              <span className="text-sm font-medium">{subItem.label}</span>
                              <ChevronRight className="h-4 w-4" />
                            </div>

                            {openNestedDropdown === subItem.label && (
                              <div className="absolute left-full top-0 ml-1 bg-white rounded-lg shadow-lg py-3 min-w-[220px]">
                                {subItem.submenu.map((nestedItem, nestedIdx) => (
                                  <Link
                                    key={nestedIdx}
                                    href={nestedItem.href!}
                                    className="block px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors text-sm"
                                    onClick={() => {
                                      setOpenDropdown(null);
                                      setOpenNestedDropdown(null);
                                    }}
                                  >
                                    {nestedItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      if (subItem.external) {
                        return (
                          <a
                            key={idx}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors text-sm font-medium flex items-center justify-between"
                          >
                            <span>{subItem.label}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={idx}
                          href={subItem.href!}
                          className="block px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors text-sm font-medium"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {subItem.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 ${linkColor} transition-colors`}
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium uppercase">{lang}</span>
            </button>
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
            >
              <Link href={`/${lang}/join-agency`}>
                {dictionary.nav.becomePartner}
              </Link>
            </Button>
          </div>

          <button
            className={`lg:hidden ${textColor}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileMenu(item.label)}
                      className="flex items-center justify-between w-full text-gray-700 hover:text-red-600 transition-colors py-2 text-base font-medium"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          mobileOpenMenus.has(item.label) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {mobileOpenMenus.has(item.label) && (
                      <div className="pl-4 space-y-1 mt-1">
                        {item.submenu.map((subItem, idx) => {
                          if (subItem.label === 'separator') {
                            return <div key={idx} className="border-t border-gray-200 my-2" />;
                          }

                          if (subItem.submenu) {
                            return (
                              <div key={idx}>
                                <button
                                  onClick={() => toggleMobileMenu(`${item.label}-${subItem.label}`)}
                                  className="flex items-center justify-between w-full text-gray-600 hover:text-red-600 transition-colors py-2 text-sm bg-gray-50 px-3 rounded"
                                >
                                  <span>{subItem.label}</span>
                                  <ChevronRight
                                    className={`h-4 w-4 transition-transform ${
                                      mobileOpenMenus.has(`${item.label}-${subItem.label}`) ? 'rotate-90' : ''
                                    }`}
                                  />
                                </button>
                                {mobileOpenMenus.has(`${item.label}-${subItem.label}`) && (
                                  <div className="pl-4 space-y-1 mt-1">
                                    {subItem.submenu.map((nestedItem, nestedIdx) => (
                                      <Link
                                        key={nestedIdx}
                                        href={nestedItem.href!}
                                        className="block text-gray-600 hover:text-red-600 transition-colors py-2 text-sm bg-gray-100 px-3 rounded"
                                        onClick={() => setIsOpen(false)}
                                      >
                                        {nestedItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          if (subItem.external) {
                            return (
                              <a
                                key={idx}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between text-gray-600 hover:text-red-600 transition-colors py-2 text-sm bg-gray-50 px-3 rounded"
                              >
                                <span>{subItem.label}</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            );
                          }

                          return (
                            <Link
                              key={idx}
                              href={subItem.href!}
                              className="block text-gray-600 hover:text-red-600 transition-colors py-2 text-sm bg-gray-50 px-3 rounded"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="block text-gray-700 hover:text-red-600 transition-colors py-2 text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors py-2 w-full"
            >
              <Globe className="h-5 w-5" />
              <span className="text-base font-medium uppercase">{lang}</span>
            </button>
            <Button
              asChild
              className="bg-red-600 hover:bg-red-700 text-white w-full"
            >
              <Link href={`/${lang}/join-agency`}>
                {dictionary.nav.becomePartner}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

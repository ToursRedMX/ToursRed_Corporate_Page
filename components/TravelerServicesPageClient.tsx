'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';
import { trackTikTokEvent } from '@/components/TikTokPixel';
import { Button } from '@/components/ui/button';
import { TravelerServicesRequestForm } from '@/components/TravelerServicesRequestForm';
import { ArrowRight } from 'lucide-react';

export function TravelerServicesPageClient({ lang }: { lang: string }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    trackTikTokEvent('ViewContent', { contents: [{ content_id: 'traveler-services', content_type: 'product', content_name: 'Servicios al Viajero' }], currency: 'MXN', value: 0 });
  }, []);

  return (
    <>
      <Button
        size="lg"
        className="bg-white hover:bg-slate-100 text-red-600 hover:text-red-700 rounded-full px-8 font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
        onClick={() => setIsFormOpen(true)}
      >
        Solicitar asesoría
        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>

      <TravelerServicesRequestForm
        lang={lang as Locale}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
    </>
  );
}

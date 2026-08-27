'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { CircleCheck as CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const content = {
  es: {
    title: '¡Gracias por contactarnos!',
    subtitle: 'Tu mensaje ha sido recibido',
    description:
      'Hemos recibido tu solicitud correctamente. Nuestro equipo la revisará y se pondrá en contacto contigo a la brevedad posible.',
    emailNote: 'Revisa tu bandeja de entrada — también te enviamos una copia de tu solicitud.',
    backHome: 'Volver al inicio',
    exploreServices: 'Ver nuestros servicios',
  },
  en: {
    title: 'Thank you for reaching out!',
    subtitle: 'Your message has been received',
    description:
      'We have successfully received your request. Our team will review it and get back to you as soon as possible.',
    emailNote: 'Check your inbox — we also sent you a copy of your request.',
    backHome: 'Back to home',
    exploreServices: 'Explore our services',
  },
};

export default function GraciasPage() {
  const params = useParams();
  const lang = (params?.lang as string) === 'en' ? 'en' : 'es';
  const t = content[lang];
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/${lang}`);
    }, 10000);
    return () => clearTimeout(timer);
  }, [lang, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={1.5} />
            </div>
            <div className="absolute -inset-2 bg-green-50 rounded-full -z-10 animate-ping opacity-30" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t.title}</h1>
        <p className="text-lg font-medium text-slate-600 mb-4">{t.subtitle}</p>
        <p className="text-slate-500 leading-relaxed mb-6">{t.description}</p>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-8 text-left">
          <Mail className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-700">{t.emailNote}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href={`/${lang}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backHome}
            </Link>
          </Button>
          <Button asChild className="rounded-full px-6 bg-red-600 hover:bg-red-700 text-white">
            <Link href={`/${lang}#services`}>{t.exploreServices}</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          {lang === 'es'
            ? 'Serás redirigido al inicio en unos segundos...'
            : 'You will be redirected to home in a few seconds...'}
        </p>
      </div>
    </div>
  );
}

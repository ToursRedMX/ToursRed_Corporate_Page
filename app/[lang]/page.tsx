import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Headphones, DollarSign, MapPin, Shield, Users, Lightbulb, Building2, Award, CircleCheck as CheckCircle2, FileCheck, Handshake, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/85 to-teal-900/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <div className="mb-12 flex justify-center">
            <img
              src="/logo_toursred_transparente.png"
              alt="ToursRed Logo"
              className="h-48 md:h-64 lg:h-72 w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {dict.home.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            {dict.home.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              <a href="https://www.toursred.com.mx" target="_blank" rel="noopener noreferrer">
                {dict.home.hero.ctaPrimary}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white border-2 border-white text-lg px-10 py-6 rounded-full shadow-xl transition-all font-semibold"
            >
              <Link href={`/${lang}/join-agency`}>
                {dict.home.hero.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {dict.home.whyUs.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-red-100 rounded-2xl">
                    <ShieldCheck className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {dict.home.whyUs.feature1.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.home.whyUs.feature1.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-red-100 rounded-2xl">
                    <Headphones className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {dict.home.whyUs.feature2.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.home.whyUs.feature2.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6 p-4 bg-red-100 rounded-2xl">
                    <DollarSign className="h-12 w-12 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {dict.home.whyUs.feature3.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {dict.home.whyUs.feature3.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Travelers"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                {dict.home.forTravelers.title}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                {dict.home.forTravelers.subtitle}
              </p>

              <div className="space-y-4">
                {[
                  { icon: MapPin, text: dict.home.forTravelers.benefit1 },
                  { icon: Shield, text: dict.home.forTravelers.benefit2 },
                  { icon: Users, text: dict.home.forTravelers.benefit3 },
                  { icon: CheckCircle2, text: dict.home.forTravelers.benefit4 },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-2 bg-teal-100 rounded-lg">
                        <benefit.icon className="h-6 w-6 text-teal-600" />
                      </div>
                    </div>
                    <p className="text-slate-700 text-lg">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-4">
                {dict.home.forAgencies.title}
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                {dict.home.forAgencies.subtitle}
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: DollarSign, text: dict.home.forAgencies.benefit1 },
                  { icon: Lightbulb, text: dict.home.forAgencies.benefit2 },
                  { icon: Users, text: dict.home.forAgencies.benefit3 },
                  { icon: Award, text: dict.home.forAgencies.benefit4 },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all"
                  >
                    <div className="flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-teal-400" />
                    </div>
                    <p className="text-white text-lg">{benefit.text}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-xl"
              >
                <Link href={`/${lang}/join-agency`}>
                  {dict.home.forAgencies.cta}
                </Link>
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Agencies"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {dict.home.trust.title}
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              {dict.home.trust.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Building2, item: dict.home.trust.item1 },
              { icon: FileCheck, item: dict.home.trust.item2 },
              { icon: MapPin, item: dict.home.trust.item3 },
              { icon: Handshake, item: dict.home.trust.item4 },
              { icon: Award, item: dict.home.trust.item5 },
              { icon: Lock, item: dict.home.trust.item6 },
            ].map((entry, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg mt-0.5">
                      <entry.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-slate-800 font-semibold leading-snug">{entry.item.title}</p>
                      <p className="text-slate-500 text-sm mt-1 leading-relaxed">{entry.item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            {dict.home.cta.title}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 rounded-full shadow-xl"
            >
              <a href="https://www.toursred.com.mx" target="_blank" rel="noopener noreferrer">
                {dict.home.cta.ctaPrimary}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white border-2 border-white text-lg px-10 py-6 rounded-full font-semibold"
            >
              <Link href={`/${lang}/join-agency`}>
                {dict.home.cta.ctaSecondary}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

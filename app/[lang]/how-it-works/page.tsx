import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Calendar, MapPin, Share2, UserPlus, CircleCheck as CheckCircle, Briefcase, TrendingUp, Megaphone, Ticket, ShieldCheck, CircleAlert as AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-slate-800 via-slate-700 to-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.howItWorks.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {dict.howItWorks.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.howItWorks.whatWeDo.title}
            </h2>
            <p className="text-lg text-slate-600">
              {dict.howItWorks.whatWeDo.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <Megaphone className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.howItWorks.whatWeDo.feature1.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {dict.howItWorks.whatWeDo.feature1.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-teal-100 rounded-2xl">
                    <Ticket className="h-10 w-10 text-teal-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.howItWorks.whatWeDo.feature2.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {dict.howItWorks.whatWeDo.feature2.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-2xl">
                    <ShieldCheck className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.howItWorks.whatWeDo.feature3.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {dict.howItWorks.whatWeDo.feature3.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 border-amber-300 bg-white shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {dict.howItWorks.whatWeDont.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {dict.howItWorks.whatWeDont.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {dict.howItWorks.forTravelers.title}
            </h2>
            <p className="text-lg text-slate-600">
              {dict.howItWorks.forTravelers.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {dict.howItWorks.forTravelers.step1.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict.howItWorks.forTravelers.step1.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {dict.howItWorks.forTravelers.step2.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict.howItWorks.forTravelers.step2.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {dict.howItWorks.forTravelers.step3.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict.howItWorks.forTravelers.step3.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {dict.howItWorks.forTravelers.step4.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {dict.howItWorks.forTravelers.step4.description}
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <Image
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="Traveler"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-teal-900/80"></div>
            </div>
            <div className="relative z-10 py-16 px-8 text-center text-white">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {dict.howItWorks.forTravelers.banner.title}
              </h3>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {dict.howItWorks.forTravelers.banner.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {dict.howItWorks.forAgencies.title}
            </h2>
            <p className="text-xl text-gray-200">
              {dict.howItWorks.forAgencies.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {dict.howItWorks.forAgencies.step1.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.howItWorks.forAgencies.step1.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {dict.howItWorks.forAgencies.step2.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.howItWorks.forAgencies.step2.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {dict.howItWorks.forAgencies.step3.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.howItWorks.forAgencies.step3.description}
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-3xl font-bold text-white">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">
                {dict.howItWorks.forAgencies.step4.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {dict.howItWorks.forAgencies.step4.description}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-slate-900 hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-xl"
            >
              <Link href={`/${lang}/join-agency`}>
                {dict.howItWorks.forAgencies.cta}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {dict.howItWorks.questions.title}
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {dict.howItWorks.questions.description}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white text-lg px-10 py-6 rounded-full"
          >
            <Link href={`/${lang}/contact`}>
              {dict.howItWorks.questions.cta}
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

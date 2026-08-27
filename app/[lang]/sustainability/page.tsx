import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Users, DollarSign, Check, Sprout, Heart, TrendingUp, Shield, Lightbulb, Handshake, Share2, Globe, MessageSquare, Star, Briefcase, FileText, CircleCheck as CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const actions = [
    dict.sustainability.actions.action1,
    dict.sustainability.actions.action2,
    dict.sustainability.actions.action3,
    dict.sustainability.actions.action4,
  ];

  return (
    <>
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=1920&q=80"
            alt="Sustainability"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-teal-900/85 to-emerald-900/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full">
              <Leaf className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {dict.sustainability.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            {dict.sustainability.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {dict.sustainability.approach.title}
            </h2>
            <p className="text-xl text-slate-700 font-semibold mb-4">
              {dict.sustainability.approach.intro}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {dict.sustainability.approach.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.sustainability.pillars.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-2xl bg-white hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <Leaf className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {dict.sustainability.pillars.environmental.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {dict.sustainability.pillars.environmental.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-white hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl shadow-lg">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {dict.sustainability.pillars.social.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {dict.sustainability.pillars.social.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-white hover:shadow-3xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                    <TrendingUp className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {dict.sustainability.pillars.economic.title}
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {dict.sustainability.pillars.economic.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.sustainability.actions.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {actions.map((action, index) => {
              const icons = [Sprout, Heart, Shield, TrendingUp];
              const Icon = icons[index];
              const colors = [
                'bg-green-100 text-green-600',
                'bg-rose-100 text-rose-600',
                'bg-blue-100 text-blue-600',
                'bg-amber-100 text-amber-600'
              ];

              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`${colors[index]} rounded-xl p-3`}>
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed pt-2">
                      {action}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {dict.sustainability.travelerManifesto.title}
            </h2>
            <div className="space-y-3 mb-8 max-w-3xl mx-auto">
              <p className="text-lg text-slate-700 font-semibold">
                {dict.sustainability.travelerManifesto.intro1}
              </p>
              <p className="text-lg text-slate-700 font-semibold">
                {dict.sustainability.travelerManifesto.intro2}
              </p>
              <p className="text-lg text-slate-700">
                {dict.sustainability.travelerManifesto.intro3}
              </p>
            </div>

            <p className="text-lg font-semibold text-slate-900 mb-12">
              {dict.sustainability.travelerManifesto.inviteText}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dict.sustainability.travelerManifesto.points.map((point, index) => {
                const icons = [Lightbulb, Handshake, Leaf, DollarSign, CheckCircle, Heart, Share2];
                const Icon = icons[index];
                const colors = [
                  'from-blue-500 to-cyan-600',
                  'from-emerald-500 to-teal-600',
                  'from-green-500 to-emerald-600',
                  'from-amber-500 to-orange-600',
                  'from-purple-500 to-pink-600',
                  'from-rose-500 to-pink-600',
                  'from-indigo-500 to-blue-600'
                ];

                return (
                  <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className={`bg-gradient-to-br ${colors[index]} rounded-2xl p-4 mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {point}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="text-lg text-slate-700 italic font-semibold max-w-3xl mx-auto">
              {dict.sustainability.travelerManifesto.closing}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              {dict.sustainability.agencyPrinciples.title}
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4 max-w-3xl mx-auto">
              {dict.sustainability.agencyPrinciples.intro}
            </p>
            <p className="text-lg font-semibold text-slate-900 mb-12">
              {dict.sustainability.agencyPrinciples.expectation}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {dict.sustainability.agencyPrinciples.points.map((point, index) => {
                const icons = [Briefcase, FileText, Globe, Shield, MessageSquare, Leaf, Star];
                const Icon = icons[index];
                const colors = [
                  'from-slate-600 to-slate-700',
                  'from-blue-500 to-blue-600',
                  'from-teal-500 to-emerald-600',
                  'from-red-500 to-rose-600',
                  'from-orange-500 to-amber-600',
                  'from-green-500 to-emerald-600',
                  'from-yellow-500 to-amber-600'
                ];

                return (
                  <Card key={index} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-slate-50">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className={`bg-gradient-to-br ${colors[index]} rounded-2xl p-4 mb-4`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {point}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <p className="text-lg text-slate-700 font-semibold max-w-3xl mx-auto">
              {dict.sustainability.agencyPrinciples.goal}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-emerald-900 to-green-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
          </div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-8">
            <div className="p-5 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
            {dict.sustainability.future.title}
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto text-white text-lg leading-relaxed">
            <p>{dict.sustainability.future.paragraph1}</p>
            <p>{dict.sustainability.future.paragraph2}</p>
            <p className="whitespace-pre-wrap">{dict.sustainability.future.paragraph3}</p>
            <p>{dict.sustainability.future.paragraph4}</p>
            <p className="whitespace-pre-wrap italic">{dict.sustainability.future.paragraph5}</p>
          </div>
        </div>
      </section>
    </>
  );
}

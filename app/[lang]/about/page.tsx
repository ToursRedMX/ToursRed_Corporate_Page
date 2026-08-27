import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Target,
  Eye,
  Heart,
  Users,
  Lightbulb,
  Handshake,
  Shield,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import Image from 'next/image';
import NatureStayHubSection from '@/components/NatureStayHubSection';
import PartnerLogosSection from '@/components/PartnerLogosSection';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.about.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {dict.about.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 text-center">
              {dict.about.whatIs.title}
            </h2>
            <div className="text-lg text-slate-600 leading-relaxed mb-8 text-center space-y-4">
              {dict.about.whatIs.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-600 rounded-full">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium mb-3">
                    {dict.about.whatIs.feature1}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {dict.about.whatIs.feature1Description}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-teal-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-teal-600 rounded-full">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium mb-3">
                    {dict.about.whatIs.feature2}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {dict.about.whatIs.feature2Description}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-red-600 rounded-full">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium mb-3">
                    {dict.about.whatIs.feature3}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {dict.about.whatIs.feature3Description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-red-600 to-red-700 text-white hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {dict.about.purpose.title}
                  </h3>
                </div>
                <p className="text-red-100 leading-relaxed">
                  {dict.about.purpose.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-teal-600 to-teal-700 text-white hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {dict.about.mission.title}
                  </h3>
                </div>
                <p className="text-teal-100 leading-relaxed">
                  {dict.about.mission.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:shadow-2xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {dict.about.vision.title}
                  </h3>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  {dict.about.vision.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
            {dict.about.values.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-green-100 rounded-2xl">
                    <Handshake className="h-10 w-10 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {dict.about.values.collaboration.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.about.values.collaboration.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-orange-100 rounded-2xl">
                    <Target className="h-10 w-10 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {dict.about.values.commitment.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.about.values.commitment.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <Shield className="h-10 w-10 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {dict.about.values.trust.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.about.values.trust.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-100 rounded-2xl">
                    <Eye className="h-10 w-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {dict.about.values.transparency.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.about.values.transparency.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-yellow-100 rounded-2xl">
                    <Lightbulb className="h-10 w-10 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {dict.about.values.innovation.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.about.values.innovation.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.about.brands.title}
            </h2>
            <p className="text-lg text-slate-600">
              {dict.about.brands.subtitle}
            </p>
          </div>

          <NatureStayHubSection
            name={dict.about.brands.natureStayHub.name}
            description={dict.about.brands.natureStayHub.description}
            features={dict.about.brands.natureStayHub.features}
            cta={dict.about.brands.natureStayHub.cta}
            hostCta={dict.about.brands.natureStayHub.hostCta}
            hostButton={dict.about.brands.natureStayHub.hostButton}
            legal={dict.about.brands.natureStayHub.legal}
            lang={lang as Locale}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.about.partners.title}
            </h2>
            <p className="text-lg text-slate-600">
              {dict.about.partners.subtitle}
            </p>
          </div>

          <PartnerLogosSection />
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Team"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {dict.about.team.title}
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            {dict.about.team.description}
          </p>
        </div>
      </section>
    </>
  );
}

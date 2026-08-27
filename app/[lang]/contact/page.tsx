'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { FormConsentSection } from '@/components/FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from '@/components/TikTokPixel';

export default function ContactPage() {
  const params = useParams();
  const lang = params.lang as Locale;
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const isSpanish = lang === 'es';

  const dict = {
    hero: {
      title: isSpanish ? 'Contacto' : 'Contact',
      subtitle: isSpanish ? 'Estamos aquí para ayudarte' : "We're here to help you",
    },
    form: {
      fullName: isSpanish ? 'Nombre completo' : 'Full name',
      email: isSpanish ? 'Correo electrónico' : 'Email',
      phone: isSpanish ? 'Teléfono' : 'Phone',
      subject: isSpanish ? 'Asunto' : 'Subject',
      message: isSpanish ? 'Mensaje' : 'Message',
      submit: isSpanish ? 'Enviar mensaje' : 'Send message',
      subjectOptions: {
        general: isSpanish ? 'Consulta general' : 'General inquiry',
        support: isSpanish ? 'Soporte técnico' : 'Technical support',
        partnership: isSpanish ? 'Alianzas comerciales' : 'Business partnerships',
        quote: isSpanish ? 'Cotización' : 'Quote',
        other: isSpanish ? 'Otro' : 'Other',
      },
    },
    formConsent: {
      title: isSpanish ? 'Consentimiento' : 'Consent',
      acceptContact:
        isSpanish
          ? 'Acepto ser contactado por ToursRed para recibir información sobre mi solicitud'
          : 'I agree to be contacted by ToursRed to receive information about my request',
      acceptPrivacy: isSpanish ? 'Acepto el ' : 'I accept the ',
      privacyLink: isSpanish ? 'aviso de privacidad' : 'privacy policy',
      captchaRequired: isSpanish
        ? 'Por favor completa la verificación de seguridad'
        : 'Please complete the security verification',
    },
    otherWays: {
      title: isSpanish ? 'Otras formas de contacto' : 'Other contact methods',
      emailLabel: 'Email',
      phoneLabel: 'WhatsApp',
      telegramLabel: 'Telegram',
      locationLabel: isSpanish ? 'Ubicación' : 'Location',
    },
    info: {
      email: 'contacto@toursred.com',
      phone: '+52 55 47127668',
      address: 'Av. Homero 229-501, Polanco V Secc',
      city: isSpanish ? 'Ciudad de México, México' : 'Mexico City, Mexico',
    },
    agency: {
      title: isSpanish ? '¿Eres agencia de viajes?' : 'Are you a travel agency?',
      description: isSpanish
        ? 'Únete a nuestra red de más de 500 agencias aliadas y haz crecer tu negocio.'
        : 'Join our network of over 500 partner agencies and grow your business.',
      button: isSpanish ? 'Quiero ser agencia aliada' : 'Become a partner agency',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptContact || !acceptPrivacy) {
      toast({
        title: isSpanish ? 'Error' : 'Error',
        description: isSpanish
          ? 'Debes aceptar los consentimientos para continuar'
          : 'You must accept the consents to continue',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _hp: hpField?.value || '',
          acceptContact,
          acceptPrivacy,
          lang,
        }),
      });

      const result = await response.json();

      if (result.success) {
        await trackTikTokIdentify(formData.email, formData.phone);
        trackTikTokEvent('Contact', { contents: [{ content_id: 'contact', content_type: 'product', content_name: 'Formulario de Contacto' }], currency: 'MXN', value: 0 });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setAcceptContact(false);
        setAcceptPrivacy(false);
        router.push(`/${lang}/gracias`);
      } else {
        toast({
          title: isSpanish ? 'Error' : 'Error',
          description:
            result.error ||
            (isSpanish
              ? 'Hubo un error al enviar tu mensaje. Por favor, intenta más tarde.'
              : 'There was an error sending your message. Please try again later.'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: isSpanish ? 'Error' : 'Error',
        description: isSpanish
          ? 'Hubo un error al enviar tu mensaje. Por favor, intenta más tarde.'
          : 'There was an error sending your message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-slate-700 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Card className="border-0 shadow-xl h-full">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-slate-800 font-medium">
                          {dict.form.fullName}
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-800 font-medium">
                          {dict.form.email}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-slate-800 font-medium">
                          {dict.form.phone}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-slate-800 font-medium">
                        {dict.form.subject}
                      </Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) =>
                          setFormData({ ...formData, subject: value })
                        }
                      >
                        <SelectTrigger className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500">
                          <SelectValue placeholder={dict.form.subject} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            {dict.form.subjectOptions.general}
                          </SelectItem>
                          <SelectItem value="support">
                            {dict.form.subjectOptions.support}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {dict.form.subjectOptions.partnership}
                          </SelectItem>
                          <SelectItem value="quote">
                            {dict.form.subjectOptions.quote}
                          </SelectItem>
                          <SelectItem value="other">
                            {dict.form.subjectOptions.other}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-slate-800 font-medium">
                        {dict.form.message}
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500 resize-none"
                      />
                    </div>

                    <FormConsentSection
                      acceptContact={acceptContact}
                      acceptPrivacy={acceptPrivacy}
                      onAcceptContactChange={setAcceptContact}
                      onAcceptPrivacyChange={setAcceptPrivacy}

                      lang={lang as Locale}
                      dict={dict}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      size="lg"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      {isSubmitting
                        ? isSpanish
                          ? 'Enviando...'
                          : 'Sending...'
                        : dict.form.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8">
                    {dict.otherWays.title}
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <Mail className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 mb-1">
                          {dict.otherWays.emailLabel}
                        </p>
                        <a
                          href={`mailto:${dict.info.email}`}
                          className="text-lg font-medium text-slate-900 hover:text-red-600 transition-colors"
                        >
                          {dict.info.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 mb-1">
                          {dict.otherWays.phoneLabel}
                        </p>
                        <a
                          href="https://wa.me/525547127668"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-slate-900 hover:text-green-600 transition-colors"
                        >
                          {dict.info.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 mb-1">
                          {dict.otherWays.telegramLabel}
                        </p>
                        <a
                          href="https://t.me/ToursRedMX"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-slate-900 hover:text-sky-500 transition-colors"
                        >
                          https://t.me/ToursRedMX
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-500 mb-1">
                          {dict.otherWays.locationLabel}
                        </p>
                        <a
                          href="https://maps.app.goo.gl/6Vpauic8KAVMqzTq7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors"
                        >
                          {dict.info.address}
                        </a>
                        <a
                          href="https://maps.app.goo.gl/6Vpauic8KAVMqzTq7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-base text-slate-600 hover:text-blue-600 transition-colors"
                        >
                          {dict.info.city}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-800 to-slate-900">
                <CardContent className="p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">{dict.agency.title}</h2>
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {dict.agency.description}
                  </p>
                  <Link href={`/${lang}/join-agency`}>
                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold py-6 text-lg">
                      {dict.agency.button}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

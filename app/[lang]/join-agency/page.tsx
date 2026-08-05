'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, CircleCheck as CheckCircle2, Loader as Loader2, Users, TrendingUp, Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Locale } from '@/lib/i18n/config';
import { useToast } from '@/hooks/use-toast';
import { FormConsentSection } from '@/components/FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from '@/components/TikTokPixel';

const MEXICAN_STATES = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
];

export default function JoinAgencyPage() {
  const params = useParams();
  const lang = params.lang as Locale;
  const isSpanish = lang === 'es';
  const router = useRouter();
  const { toast } = useToast();
  const successMessageRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });


  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    agencyName: '',
    email: '',
    phone: '',
    website: '',
    rfc: '',
    rnt: '',
    legalName: '',
    street: '',
    exteriorNumber: '',
    interiorNumber: '',
    neighborhood: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'México',
  });

  const dict = {
    hero: {
      title: isSpanish ? 'Únete como Agencia Aliada ToursRed' : 'Join as a ToursRed Partner Agency',
      subtitle: isSpanish
        ? 'Publica tus tours, llega a más viajeros y haz crecer tu negocio sin costos fijos.'
        : 'Publish your tours, reach more travelers and grow your business with no fixed costs.',
    },
    benefits: {
      title: isSpanish ? '¿Por qué unirse a ToursRed?' : 'Why Join ToursRed?',
      benefit1: {
        title: isSpanish ? 'Publica gratis' : 'Publish for Free',
        description: isSpanish
          ? 'Crea tu perfil y publica tus experiencias sin costo. Solo cobramos comisión por reservas finalizadas.'
          : 'Create your profile and publish your experiences at no cost. We only charge commission on completed bookings.',
      },
      benefit2: {
        title: isSpanish ? 'Más visibilidad para tus tours' : 'More Visibility for Your Tours',
        description: isSpanish
          ? 'Mostramos tus experiencias a viajeros que buscan actividades auténticas en todo México, apoyándote con difusión digital.'
          : 'We showcase your experiences to travelers seeking authentic activities throughout Mexico, supporting you with digital promotion.',
      },
      benefit3: {
        title: isSpanish ? 'Plataforma simple' : 'Simple Platform',
        description: isSpanish
          ? 'Gestiona tus tours, reservas y solicitudes desde un panel intuitivo, sin procesos complicados.'
          : 'Manage your tours, bookings and requests from an intuitive dashboard, without complicated processes.',
      },
      benefit4: {
        title: isSpanish ? 'Acompañamiento real' : 'Real Support',
        description: isSpanish
          ? 'Te apoyamos durante el registro y te guiamos en tus primeras ventas.'
          : 'We support you during registration and guide you through your first sales.',
      },
    },
    requirements: {
      title: isSpanish ? '¿Qué necesitas para registrarte?' : 'What do you need to register?',
      individual: {
        title: isSpanish ? 'Persona Física' : 'Individual',
        items: isSpanish
          ? ['Identificación oficial', 'Constancia de situación fiscal', 'Datos de contacto', 'CLABE bancaria', 'Redes sociales o página web (si aplica)', 'Aceptación del contrato', 'RNT opcional pero recomendable']
          : ['Official ID', 'Tax status certificate', 'Contact information', 'Bank account (CLABE)', 'Social media or website (if applicable)', 'Contract acceptance', 'RNT optional but recommended'],
      },
      business: {
        title: isSpanish ? 'Persona Moral' : 'Business',
        items: isSpanish
          ? ['Acta constitutiva', 'Identificación del representante legal', 'Constancia de situación fiscal', 'Datos de contacto', 'CLABE bancaria', 'Redes sociales o página web', 'Aceptación del contrato', 'RNT opcional pero recomendable']
          : ['Articles of incorporation', 'Legal representative ID', 'Tax status certificate', 'Contact information', 'Bank account (CLABE)', 'Social media or website', 'Contract acceptance', 'RNT optional but recommended'],
      },
    },
    form: {
      title: isSpanish ? 'Completa tu Registro' : 'Complete Your Registration',
      subtitle: isSpanish
        ? 'Llena el formulario y nos pondremos en contacto contigo pronto'
        : 'Fill out the form and we\'ll contact you soon',
      personal: {
        title: isSpanish ? 'Información Personal' : 'Personal Information',
        firstName: isSpanish ? 'Nombre(s)' : 'First Name(s)',
        lastName: isSpanish ? 'Apellido(s)' : 'Last Name(s)',
      },
      agency: {
        title: isSpanish ? 'Información de la Agencia' : 'Agency Information',
        agencyName: isSpanish ? 'Nombre Comercial de la Agencia' : 'Agency Commercial Name',
        email: isSpanish ? 'Correo electrónico' : 'Email',
        phone: isSpanish ? 'Teléfono' : 'Phone',
        website: isSpanish ? 'Sitio Web o Facebook' : 'Website or Facebook',
      },
      fiscal: {
        title: isSpanish ? 'Información Fiscal' : 'Fiscal Information',
        rfc: 'RFC',
        rfcHelper: isSpanish
          ? 'Registro Federal de Contribuyentes'
          : 'Federal Taxpayer Registry',
        rnt: 'RNT',
        rntHelper: isSpanish
          ? 'Registro Nacional de Turismo (Opcional)'
          : 'National Tourism Registry (Optional)',
        legalName: isSpanish ? 'Razón Social' : 'Legal Name',
        legalNameHelper: isSpanish
          ? 'Nombre legal completo del propietario (persona física) o razón social de la empresa (persona moral)'
          : 'Full legal name of the owner (individual) or company legal name (business)',
      },
      address: {
        title: isSpanish ? 'Domicilio de la Agencia' : 'Agency Address',
        street: isSpanish ? 'Calle' : 'Street',
        exteriorNumber: isSpanish ? 'Número Exterior' : 'Exterior Number',
        interiorNumber: isSpanish ? 'Número Interior' : 'Interior Number',
        interiorHelper: isSpanish ? '(Opcional)' : '(Optional)',
        neighborhood: isSpanish ? 'Colonia' : 'Neighborhood',
        city: isSpanish ? 'Ciudad' : 'City',
        state: isSpanish ? 'Estado' : 'State',
        postalCode: isSpanish ? 'Código Postal' : 'Postal Code',
        country: isSpanish ? 'País' : 'Country',
      },
      submit: isSpanish ? 'Enviar Solicitud' : 'Submit Application',
      required: isSpanish ? 'Campo requerido' : 'Required field',
    },
    messages: {
      success: isSpanish
        ? '¡Registro exitoso! Nos pondremos en contacto contigo pronto.'
        : 'Registration successful! We will contact you soon.',
      error: isSpanish
        ? 'Hubo un error al enviar tu solicitud. Por favor, intenta de nuevo.'
        : 'There was an error submitting your application. Please try again.',
      submitting: isSpanish ? 'Enviando...' : 'Submitting...',
      captchaRequired: isSpanish
        ? 'Por favor, completa la verificación de seguridad'
        : 'Please complete the security verification',
      consentRequired: isSpanish
        ? 'Debes aceptar los términos para continuar'
        : 'You must accept the terms to continue',
    },
    formConsent: {
      title: isSpanish ? 'Consentimiento' : 'Consent',
      acceptContact: isSpanish
        ? 'Acepto ser contactado por ToursRed para recibir información sobre mi solicitud'
        : 'I agree to be contacted by ToursRed to receive information about my request',
      acceptPrivacy: isSpanish ? 'Acepto el ' : 'I accept the ',
      privacyLink: isSpanish ? 'aviso de privacidad' : 'privacy policy',
    },
  };

  useEffect(() => {
    if (submitStatus.type && successMessageRef.current) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      successMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [submitStatus]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptContact || !acceptPrivacy) {
      toast({
        title: isSpanish ? 'Error' : 'Error',
        description: dict.messages.consentRequired,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/agency-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, _hp: hpField?.value || '', acceptContact, acceptPrivacy }),
      });

      const data = await response.json();

      if (data.success) {
        await trackTikTokIdentify(formData.email, formData.phone);
        trackTikTokEvent('Lead', { contents: [{ content_id: 'agency-registration', content_type: 'product', content_name: 'Registro Agencia Aliada' }], currency: 'MXN', value: 0 });
        setFormData({
          firstName: '',
          lastName: '',
          agencyName: '',
          email: '',
          phone: '',
          website: '',
          rfc: '',
          rnt: '',
          legalName: '',
          street: '',
          exteriorNumber: '',
          interiorNumber: '',
          neighborhood: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'México',
        });
        router.push(`/${lang}/gracias`);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || dict.messages.error,
        });
        toast({
          title: isSpanish ? 'Error' : 'Error',
          description: data.error || dict.messages.error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        type: 'error',
        message: dict.messages.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-slate-700 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 animate-pulse"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="h-20 w-20 mx-auto mb-6 text-white opacity-90" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {dict.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            {dict.benefits.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.benefits.benefit1.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.benefits.benefit1.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.benefits.benefit2.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.benefits.benefit2.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.benefits.benefit3.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.benefits.benefit3.description}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {dict.benefits.benefit4.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {dict.benefits.benefit4.description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
            {dict.requirements.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                  {dict.requirements.individual.title}
                </h3>
                <ul className="space-y-3">
                  {dict.requirements.individual.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                  {dict.requirements.business.title}
                </h3>
                <ul className="space-y-3">
                  {dict.requirements.business.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              {dict.form.title}
            </h2>
            <p className="text-lg text-slate-600">{dict.form.subtitle}</p>
          </div>

          {submitStatus.type && (
            <div ref={successMessageRef}>
              <Card
                className={`mb-8 border-0 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    {submitStatus.type === 'success' ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0" />
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm font-bold">!</span>
                      </div>
                    )}
                    <p
                      className={`text-lg font-medium ${
                        submitStatus.type === 'success'
                          ? 'text-green-800'
                          : 'text-red-800'
                      }`}
                    >
                      {submitStatus.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {dict.form.personal.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-slate-800 font-medium">
                        {dict.form.personal.firstName} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Juan"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-slate-800 font-medium">
                        {dict.form.personal.lastName} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Pérez García"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {dict.form.agency.title}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="agencyName" className="text-slate-800 font-medium">
                        {dict.form.agency.agencyName} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="agencyName"
                        name="agencyName"
                        value={formData.agencyName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Viajes Aventura México"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-slate-800 font-medium">
                          {dict.form.agency.email} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="correo@ejemplo.com"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-slate-800 font-medium">
                          {dict.form.agency.phone} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          placeholder="+52 (55) 1234-5678"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="website" className="text-slate-800 font-medium">
                        {dict.form.agency.website} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        required
                        placeholder="https://www.tuagencia.com o https://facebook.com/tuagencia"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {dict.form.fiscal.title}
                  </h3>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="rfc" className="text-slate-800 font-medium">
                          {dict.form.fiscal.rfc} <span className="text-red-600">*</span>
                        </Label>
                        <p className="text-sm text-slate-500 mb-2">
                          {dict.form.fiscal.rfcHelper}
                        </p>
                        <Input
                          id="rfc"
                          name="rfc"
                          value={formData.rfc}
                          onChange={handleChange}
                          required
                          placeholder="XAXX010101000"
                          maxLength={13}
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500 uppercase"
                        />
                      </div>
                      <div>
                        <Label htmlFor="rnt" className="text-slate-800 font-medium">
                          {dict.form.fiscal.rnt}
                        </Label>
                        <p className="text-sm text-slate-500 mb-2">
                          {dict.form.fiscal.rntHelper}
                        </p>
                        <Input
                          id="rnt"
                          name="rnt"
                          value={formData.rnt}
                          onChange={handleChange}
                          placeholder="Ej: 12345678"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="legalName" className="text-slate-800 font-medium">
                        {dict.form.fiscal.legalName} <span className="text-red-600">*</span>
                      </Label>
                      <p className="text-sm text-slate-500 mb-2">
                        {dict.form.fiscal.legalNameHelper}
                      </p>
                      <Input
                        id="legalName"
                        name="legalName"
                        value={formData.legalName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Juan Pérez García (persona física) o Viajes Aventura S.A. de C.V. (persona moral)"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    {dict.form.address.title}
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="street" className="text-slate-800 font-medium">
                        {dict.form.address.street} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Av. Insurgentes Sur"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="exteriorNumber" className="text-slate-800 font-medium">
                          {dict.form.address.exteriorNumber} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="exteriorNumber"
                          name="exteriorNumber"
                          value={formData.exteriorNumber}
                          onChange={handleChange}
                          required
                          placeholder="Ej: 123"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="interiorNumber" className="text-slate-800 font-medium">
                          {dict.form.address.interiorNumber} {dict.form.address.interiorHelper}
                        </Label>
                        <Input
                          id="interiorNumber"
                          name="interiorNumber"
                          value={formData.interiorNumber}
                          onChange={handleChange}
                          placeholder="Ej: 4B"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="neighborhood" className="text-slate-800 font-medium">
                        {dict.form.address.neighborhood} <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="neighborhood"
                        name="neighborhood"
                        value={formData.neighborhood}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Roma Norte"
                        className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="city" className="text-slate-800 font-medium">
                          {dict.form.address.city} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Ej: Ciudad de México"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-slate-800 font-medium">
                          {dict.form.address.state} <span className="text-red-600">*</span>
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => handleSelectChange('state', value)}
                          required
                        >
                          <SelectTrigger className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500">
                            <SelectValue placeholder={dict.form.address.state} />
                          </SelectTrigger>
                          <SelectContent>
                            {MEXICAN_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="postalCode" className="text-slate-800 font-medium">
                          {dict.form.address.postalCode} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          placeholder="Ej: 06700"
                          maxLength={5}
                          pattern="\d{5}"
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-slate-800 font-medium">
                          {dict.form.address.country} <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500 bg-slate-50"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
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
                  disabled={isSubmitting || !acceptContact || !acceptPrivacy}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6 rounded-lg font-semibold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      {dict.messages.submitting}
                    </>
                  ) : (
                    <>
                      <Building2 className="h-5 w-5 mr-2" />
                      {dict.form.submit}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

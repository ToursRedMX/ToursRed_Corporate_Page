'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Locale } from '@/lib/i18n/config';
import { ArrowRight } from 'lucide-react';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from './TikTokPixel';

interface AgencySupportPageClientProps {
  lang: Locale;
}

export function AgencySupportPageClient({ lang }: AgencySupportPageClientProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agencyStatus, setAgencyStatus] = useState('');
  const [hasRNT, setHasRNT] = useState('');

  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const [formData, setFormData] = useState({
    agencyName: '',
    responsibleName: '',
    email: '',
    phone: '',
    address: '',
    agencyState: '',
    rntStatus: '',
    services: [] as string[],
    tourTypes: [] as string[],
    projectDescription: '',
    acceptTerms: false,
  });

  const labels = {
    es: {
      button: 'Solicitar apoyo para mi agencia',
      dialogTitle: 'Solicitud de Apoyo para Agencia',
      section1: 'Datos de la Agencia',
      agencyName: 'Nombre de la Agencia',
      responsibleName: 'Nombre del Responsable',
      email: 'Correo electrónico',
      phone: 'Teléfono / WhatsApp',
      address: 'Dirección',
      section2: 'Estado actual de tu agencia',
      startingAgency: 'Estoy por iniciar mi agencia',
      operatingInformally: 'Ya opero informalmente',
      formalAgency: 'Tengo agencia formal constituida',
      rntQuestion: '¿Cuentas con RNT?',
      rntYes: 'Sí',
      rntNo: 'No',
      rntInProcess: 'En trámite',
      section3: 'En qué podemos apoyarte?',
      logoDesign: 'Diseño de logotipo',
      website: 'Página web',
      rntProcess: 'Trámite de RNT',
      sasRegistration: 'Alta de agencia como SAS',
      impiRegistration: 'Registro de marca ante IMPI',
      becomePartner: 'Integrarme como agencia aliada en ToursRed',
      section4: 'Tipo de servicios que planeas ofrecer',
      localTours: 'Tours locales',
      excursions: 'Excursiones',
      nationalTrips: 'Viajes nacionales',
      internationalTrips: 'Viajes internacionales',
      specializedExperiences: 'Experiencias especializadas',
      notDefined: 'Aún no lo tengo definido',
      section5: 'Cuéntanos brevemente tu proyecto',
      describeProject: 'Describe en pocas palabras tu idea o el estado actual de tu agencia...',
      legalNotice: 'Acepto que ToursRed utilice mis datos para fines de contacto y seguimiento comercial',
      submit: 'Enviar solicitud',
      required: 'Este campo es obligatorio',
      agreeMustAccept: 'Debes aceptar los avisos legales',
      submitting: 'Enviando...',
      success: 'Solicitud enviada correctamente',
      error: 'Error al enviar la solicitud',
    },
    en: {
      button: 'Request support for my agency',
      dialogTitle: 'Agency Support Request',
      section1: 'Agency Information',
      agencyName: 'Agency Name',
      responsibleName: 'Responsible Person Name',
      email: 'Email',
      phone: 'Phone / WhatsApp',
      address: 'Address',
      section2: 'Current state of your agency',
      startingAgency: 'I am about to start my agency',
      operatingInformally: 'I already operate informally',
      formalAgency: 'I have a formal agency established',
      rntQuestion: 'Do you have RNT?',
      rntYes: 'Yes',
      rntNo: 'No',
      rntInProcess: 'In process',
      section3: 'How can we support you?',
      logoDesign: 'Logo design',
      website: 'Website',
      rntProcess: 'RNT process',
      sasRegistration: 'Agency registration as SAS',
      impiRegistration: 'Trademark registration with IMPI',
      becomePartner: 'Become a partner agency at ToursRed',
      section4: 'Type of services you plan to offer',
      localTours: 'Local tours',
      excursions: 'Excursions',
      nationalTrips: 'National trips',
      internationalTrips: 'International trips',
      specializedExperiences: 'Specialized experiences',
      notDefined: 'Still not defined',
      section5: 'Tell us briefly about your project',
      describeProject: 'Describe in a few words your idea or the current state of your agency...',
      legalNotice: 'I accept that ToursRed uses my data for contact and commercial follow-up purposes',
      submit: 'Send request',
      required: 'This field is required',
      agreeMustAccept: 'You must accept the legal notices',
      submitting: 'Sending...',
      success: 'Request sent successfully',
      error: 'Error sending request',
    },
  };

  const t = labels[lang];

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleTourTypeChange = (tourType: string) => {
    setFormData((prev) => ({
      ...prev,
      tourTypes: prev.tourTypes.includes(tourType)
        ? prev.tourTypes.filter((t) => t !== tourType)
        : [...prev.tourTypes, tourType],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agencyName || !formData.responsibleName || !formData.email || !formData.phone || !formData.address) {
      toast.error(t.required);
      return;
    }

    if (!formData.agencyState) {
      toast.error(t.required);
      return;
    }

    if (formData.agencyState === 'formal' && !formData.rntStatus) {
      toast.error(t.required);
      return;
    }

    if (formData.services.length === 0) {
      toast.error(t.required);
      return;
    }

    if (!acceptContact || !acceptPrivacy) {
      toast.error(t.agreeMustAccept);
      return;
    }

    setIsLoading(true);

    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/agency-support-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _hp: hpField?.value || '',
          acceptContact,
          acceptPrivacy,
          lang,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        toast.error(result.error || t.error);
        return;
      }

      await trackTikTokIdentify(formData.email, formData.phone);
      trackTikTokEvent('Lead', { contents: [{ content_id: 'agency-support', content_type: 'product', content_name: 'Solicitud de Apoyo para Agencia' }], currency: 'MXN', value: 0 });

      setIsOpen(false);
      setFormData({
        agencyName: '',
        responsibleName: '',
        email: '',
        phone: '',
        address: '',
        agencyState: '',
        rntStatus: '',
        services: [],
        tourTypes: [],
        projectDescription: '',
        acceptTerms: false,
      });
      setAgencyStatus('');
      setHasRNT('');
      setAcceptContact(false);
      setAcceptPrivacy(false);
      router.push(`/${lang}/gracias`);
    } catch (error) {
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        className="bg-white hover:bg-slate-100 text-red-600 hover:text-red-700 rounded-full px-8 font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 group"
        onClick={() => setIsOpen(true)}
      >
        {t.button}
        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white -mx-6 -mt-6 px-6 py-6 rounded-t-lg">
            <DialogTitle className="text-3xl font-bold text-white">{t.dialogTitle}</DialogTitle>
            <p className="text-red-50 text-sm mt-2">
              {lang === 'es'
                ? 'Completa el formulario y nuestro equipo se pondrá en contacto contigo'
                : 'Complete the form and our team will contact you'}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-8 px-6 py-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">1</span>
                {t.section1}
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="agencyName" className="text-slate-700 font-medium">{t.agencyName} *</Label>
                  <Input
                    id="agencyName"
                    value={formData.agencyName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, agencyName: e.target.value }))
                    }
                    placeholder={t.agencyName}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="responsibleName" className="text-slate-700 font-medium">{t.responsibleName} *</Label>
                  <Input
                    id="responsibleName"
                    value={formData.responsibleName}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, responsibleName: e.target.value }))
                    }
                    placeholder={t.responsibleName}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-medium">{t.email} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder={t.email}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-medium">{t.phone} *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder={t.phone}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-slate-700 font-medium">{t.address} *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, address: e.target.value }))
                    }
                    placeholder={t.address}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold mr-3">2</span>
                {t.section2}
              </h3>
              <RadioGroup value={agencyStatus} onValueChange={(value) => {
                setAgencyStatus(value);
                setFormData((prev) => ({ ...prev, agencyState: value }));
              }}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="starting" id="starting" />
                  <Label htmlFor="starting" className="font-normal cursor-pointer">
                    {t.startingAgency}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="informal" id="informal" />
                  <Label htmlFor="informal" className="font-normal cursor-pointer">
                    {t.operatingInformally}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="formal" id="formal" />
                  <Label htmlFor="formal" className="font-normal cursor-pointer">
                    {t.formalAgency}
                  </Label>
                </div>
              </RadioGroup>

              {agencyStatus === 'formal' && (
                <div className="mt-4 pl-4 border-l-2 border-emerald-300 space-y-3">
                  <p className="font-medium text-slate-900">{t.rntQuestion}</p>
                  <RadioGroup value={hasRNT} onValueChange={(value) => {
                    setHasRNT(value);
                    setFormData((prev) => ({ ...prev, rntStatus: value }));
                  }}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="rnt-yes" />
                      <Label htmlFor="rnt-yes" className="font-normal cursor-pointer">
                        {t.rntYes}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="rnt-no" />
                      <Label htmlFor="rnt-no" className="font-normal cursor-pointer">
                        {t.rntNo}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-process" id="rnt-process" />
                      <Label htmlFor="rnt-process" className="font-normal cursor-pointer">
                        {t.rntInProcess}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>

            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold mr-3">3</span>
                {t.section3}
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'logo', label: t.logoDesign },
                  { id: 'website', label: t.website },
                  { id: 'rnt', label: t.rntProcess },
                  { id: 'sas', label: t.sasRegistration },
                  { id: 'impi', label: t.impiRegistration },
                  { id: 'partner', label: t.becomePartner },
                ].map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={service.id}
                      checked={formData.services.includes(service.id)}
                      onCheckedChange={() => handleServiceChange(service.id)}
                    />
                    <Label htmlFor={service.id} className="font-normal cursor-pointer">
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold mr-3">4</span>
                {t.section4}
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'local', label: t.localTours },
                  { id: 'excursions', label: t.excursions },
                  { id: 'national', label: t.nationalTrips },
                  { id: 'international', label: t.internationalTrips },
                  { id: 'specialized', label: t.specializedExperiences },
                  { id: 'undefined', label: t.notDefined },
                ].map((tourType) => (
                  <div key={tourType.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={tourType.id}
                      checked={formData.tourTypes.includes(tourType.id)}
                      onCheckedChange={() => handleTourTypeChange(tourType.id)}
                    />
                    <Label htmlFor={tourType.id} className="font-normal cursor-pointer">
                      {tourType.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold mr-3">5</span>
                {t.section5}
              </h3>
              <Textarea
                value={formData.projectDescription}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, projectDescription: e.target.value }))
                }
                placeholder={t.describeProject}
                className="min-h-[100px]"
              />
            </div>

            <FormConsentSection
              sectionNumber={6}
              acceptContact={acceptContact}
              acceptPrivacy={acceptPrivacy}
              onAcceptContactChange={setAcceptContact}
              onAcceptPrivacyChange={setAcceptPrivacy}

              lang={lang as Locale}
              dict={{
                formConsent: {
                  title: lang === 'es' ? 'Consentimiento' : 'Consent',
                  acceptContact: lang === 'es'
                    ? 'Acepto ser contactado por ToursRed para recibir información sobre mi solicitud'
                    : 'I agree to be contacted by ToursRed to receive information about my request',
                  acceptPrivacy: lang === 'es' ? 'Acepto el ' : 'I accept the ',
                  privacyLink: lang === 'es' ? 'aviso de privacidad' : 'privacy policy',
                },
              }}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading || !acceptContact || !acceptPrivacy}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold text-base py-6 shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? t.submitting : t.submit}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-lg"
              >
                {lang === 'es' ? 'Cancelar' : 'Cancel'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

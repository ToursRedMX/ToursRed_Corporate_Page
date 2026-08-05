'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from './TikTokPixel';

interface TravelInsuranceQuoteFormProps {
  lang: string;
  dict: any;
  isOpen?: boolean;
  onClose?: () => void;
}

export function TravelInsuranceQuoteForm({ lang, dict, isOpen = false, onClose }: TravelInsuranceQuoteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    numberOfTravelers: '',
    tripType: '',
    tripReason: '',
    age: '',
    medicalCondition: 'no',
    medicalDetails: '',
    coverage: [] as string[],
    observations: '',
    fullName: '',
    email: '',
    phone: '',
    preferredContact: '',
  });

  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const form = dict.services.travelInsurance.form;
  const formLabels = form;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => {
      const coverage = prev.coverage as string[];
      return {
        ...prev,
        coverage: coverage.includes(name)
          ? coverage.filter(item => item !== name)
          : [...coverage, name],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: 'Error',
        description: 'Por favor completa todos los campos requeridos',
        variant: 'destructive',
      });
      return;
    }

    if (!acceptContact || !acceptPrivacy) {
      toast({
        title: lang === 'es' ? 'Error' : 'Error',
        description:
          lang === 'es'
            ? 'Debes aceptar los consentimientos para continuar'
            : 'You must accept the consents to continue',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/travel-insurance-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lang,
          _hp: hpField?.value || '',
          acceptContact,
          acceptPrivacy,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || 'Hubo un error al enviar tu solicitud. Intenta más tarde.',
          variant: 'destructive',
        });
        return;
      }

      setFormData({
        destination: '',
        startDate: '',
        endDate: '',
        numberOfTravelers: '',
        tripType: '',
        tripReason: '',
        age: '',
        medicalCondition: 'no',
        medicalDetails: '',
        coverage: [],
        observations: '',
        fullName: '',
        email: '',
        phone: '',
        preferredContact: '',
      });
      setAcceptContact(false);
      setAcceptPrivacy(false);
      await trackTikTokIdentify(formData.email, formData.phone);
      trackTikTokEvent('Lead', { contents: [{ content_id: 'travel-insurance', content_type: 'product', content_name: 'Seguro de Viaje' }], currency: 'MXN', value: 0 });
      if (onClose) onClose();
      router.push(`/${lang}/gracias`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Hubo un error al enviar tu solicitud. Intenta más tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <CardContent className="p-8">
        <h2 className="text-3xl font-bold mb-2 text-slate-900">
          {formLabels.title}
        </h2>
        <p className="text-slate-600 mb-8">Completa el formulario y nos pondremos en contacto contigo</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip Data Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-100">
              {formLabels.tripData.label}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination" className="text-slate-700 font-semibold">
                  {formLabels.tripData.destination}
                </Label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder="Ej: Cancún, Playa del Carmen"
                  value={formData.destination}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-slate-700 font-semibold">
                    {formLabels.tripData.startDate}
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate" className="text-slate-700 font-semibold">
                    {formLabels.tripData.endDate}
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfTravelers" className="text-slate-700 font-semibold">
                    {formLabels.tripData.numberOfTravelers}
                  </Label>
                  <Select value={formData.numberOfTravelers} onValueChange={(value) => handleSelectChange('numberOfTravelers', value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6+">6+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-700 font-semibold">
                    {formLabels.tripData.tripType}
                  </Label>
                  <RadioGroup value={formData.tripType} onValueChange={(value) => handleSelectChange('tripType', value)} className="mt-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="national" id="national" />
                      <Label htmlFor="national" className="font-normal cursor-pointer">
                        {formLabels.tripData.tripTypeOptions.national}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="international" id="international" />
                      <Label htmlFor="international" className="font-normal cursor-pointer">
                        {formLabels.tripData.tripTypeOptions.international}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div>
                <Label htmlFor="tripReason" className="text-slate-700 font-semibold">
                  {formLabels.tripData.tripReason}
                </Label>
                <Select value={formData.tripReason} onValueChange={(value) => handleSelectChange('tripReason', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecciona (opcional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">{formLabels.tripData.tripReasonOptions.vacation}</SelectItem>
                    <SelectItem value="adventure">{formLabels.tripData.tripReasonOptions.adventure}</SelectItem>
                    <SelectItem value="business">{formLabels.tripData.tripReasonOptions.business}</SelectItem>
                    <SelectItem value="other">{formLabels.tripData.tripReasonOptions.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Traveler Profile Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-100">
              {formLabels.travelerProfile.label}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="age" className="text-slate-700 font-semibold">
                  {formLabels.travelerProfile.age}
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="120"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-slate-700 font-semibold">
                  {formLabels.travelerProfile.medicalCondition}
                </Label>
                <RadioGroup value={formData.medicalCondition} onValueChange={(value) => handleSelectChange('medicalCondition', value)} className="mt-3 space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no-medical" />
                    <Label htmlFor="no-medical" className="font-normal cursor-pointer">
                      No
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes-medical" />
                    <Label htmlFor="yes-medical" className="font-normal cursor-pointer">
                      Sí
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.medicalCondition === 'yes' && (
                <div>
                  <Label htmlFor="medicalDetails" className="text-slate-700 font-semibold">
                    {formLabels.travelerProfile.medicalConditionDetails}
                  </Label>
                  <Textarea
                    id="medicalDetails"
                    name="medicalDetails"
                    value={formData.medicalDetails}
                    onChange={handleInputChange}
                    placeholder="Describe brevemente"
                    className="mt-2 h-24"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Coverage Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-100">
              {formLabels.coverage.label}
            </h3>
            <div className="space-y-3">
              {['medical', 'cancellation', 'luggage', 'adventure', 'noSure'].map((coverage) => (
                <div key={coverage} className="flex items-center space-x-2">
                  <Checkbox
                    id={coverage}
                    checked={formData.coverage.includes(coverage)}
                    onCheckedChange={() => handleCheckboxChange(coverage)}
                  />
                  <Label htmlFor={coverage} className="font-normal cursor-pointer text-slate-700">
                    {formLabels.coverage[coverage]}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Observations Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-100">
              Observaciones o Comentarios
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="observations" className="text-slate-700 font-semibold">
                  Información Adicional
                </Label>
                <Textarea
                  id="observations"
                  name="observations"
                  value={formData.observations}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos si hay algo especial que debamos conocer sobre tu viaje o cobertura deseada"
                  className="mt-2 h-32"
                />
                <p className="text-sm text-slate-500 mt-2">(Opcional)</p>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-red-100">
              {formLabels.contactInfo.label}
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-slate-700 font-semibold">
                  {formLabels.contactInfo.fullName}
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-slate-700 font-semibold">
                    {formLabels.contactInfo.email}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-slate-700 font-semibold">
                    {formLabels.contactInfo.phone}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="preferredContact" className="text-slate-700 font-semibold">
                  {formLabels.contactInfo.preferredContact}
                </Label>
                <Select value={formData.preferredContact} onValueChange={(value) => handleSelectChange('preferredContact', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecciona" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">{formLabels.contactInfo.preferredContactOptions.whatsapp}</SelectItem>
                    <SelectItem value="call">{formLabels.contactInfo.preferredContactOptions.call}</SelectItem>
                    <SelectItem value="email">{formLabels.contactInfo.preferredContactOptions.email}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Consent Section */}
          <FormConsentSection
            acceptContact={acceptContact}
            acceptPrivacy={acceptPrivacy}
            onAcceptContactChange={setAcceptContact}
            onAcceptPrivacyChange={setAcceptPrivacy}

            lang={lang as 'es' | 'en'}
            dict={dict}
          />

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold w-full md:w-auto"
              size="lg"
            >
              {isSubmitting ? formLabels.submitting : formLabels.submit}
            </Button>
            <p className="text-sm text-slate-600 text-center mt-4">
              {formLabels.successMessage}
            </p>
          </div>
        </form>
      </CardContent>
  );

  if (isOpen !== undefined && onClose) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sticky top-0 bg-white pb-4 border-b">
            <DialogTitle className="text-3xl font-bold text-slate-900">
              {formLabels.title}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            {formContent}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      {formContent}
    </Card>
  );
}

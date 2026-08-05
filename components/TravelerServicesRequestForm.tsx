'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from './TikTokPixel';

interface TravelerServicesRequestFormProps {
  lang: string;
  isOpen?: boolean;
  onClose?: () => void;
}

type ServiceType = '' | 'itinerary' | 'package' | 'transport';

export function TravelerServicesRequestForm({ lang, isOpen = false, onClose }: TravelerServicesRequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState<ServiceType>('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'whatsapp',
    destinations: '',
    startDate: '',
    endDate: '',
    numberOfTravelers: '',
    budget: '',
    itineraryComments: '',
    includeFlights: '',
    hotelCategory: '',
    packageComments: '',
    transportTypes: [] as string[],
    origin: '',
    destination: '',
    transportStartDate: '',
    transportEndDate: '',
    transportPassengers: '',
    transportComments: '',
  });

  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => {
      const transportTypes = prev.transportTypes as string[];
      return {
        ...prev,
        transportTypes: transportTypes.includes(name)
          ? transportTypes.filter(item => item !== name)
          : [...transportTypes, name],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: 'Error',
        description: 'Por favor completa los datos de contacto',
        variant: 'destructive',
      });
      return;
    }

    if (!serviceType) {
      toast({
        title: 'Error',
        description: 'Por favor selecciona un servicio',
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
      const response = await fetch('/api/traveler-services-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType,
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
        fullName: '',
        email: '',
        phone: '',
        preferredContact: 'whatsapp',
        destinations: '',
        startDate: '',
        endDate: '',
        numberOfTravelers: '',
        budget: '',
        itineraryComments: '',
        includeFlights: '',
        hotelCategory: '',
        packageComments: '',
        transportTypes: [],
        origin: '',
        destination: '',
        transportStartDate: '',
        transportEndDate: '',
        transportPassengers: '',
        transportComments: '',
      });
      setServiceType('');
      setAcceptContact(false);
      setAcceptPrivacy(false);
      await trackTikTokIdentify(formData.email, formData.phone);
      trackTikTokEvent('Lead', { contents: [{ content_id: 'traveler-services', content_type: 'product', content_name: 'Servicios al Viajero' }], currency: 'MXN', value: 0 });
      onClose?.();
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white -mx-6 -mt-6 px-6 py-6 rounded-t-lg">
          <DialogTitle className="text-3xl font-bold text-white">Solicitar Asesoría</DialogTitle>
          <p className="text-red-50 text-sm mt-2">Completa el formulario y nuestro equipo se pondrá en contacto contigo</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 px-6 py-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold mr-3">1</span>
              Datos de Contacto
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-slate-700 font-medium">
                  Nombre completo *
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
                  <Label htmlFor="email" className="text-slate-700 font-medium">
                    Correo electrónico *
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
                  <Label htmlFor="phone" className="text-slate-700 font-medium">
                    WhatsApp / Teléfono *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  Preferencia de contacto
                </Label>
                <RadioGroup value={formData.preferredContact} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredContact: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp" />
                    <Label htmlFor="whatsapp" className="font-normal cursor-pointer">WhatsApp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="call" id="call" />
                    <Label htmlFor="call" className="font-normal cursor-pointer">Llamada</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email-pref" />
                    <Label htmlFor="email-pref" className="font-normal cursor-pointer">Correo</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold mr-3">2</span>
              Selección de Servicio *
            </h3>
            <RadioGroup value={serviceType} onValueChange={(value) => setServiceType(value as ServiceType)}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="itinerary" id="itinerary" />
                  <Label htmlFor="itinerary" className="font-normal cursor-pointer">
                    Armado de itinerario a la medida
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="package" id="package" />
                  <Label htmlFor="package" className="font-normal cursor-pointer">
                    Viaje o paquete a la medida
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="transport" id="transport" />
                  <Label htmlFor="transport" className="font-normal cursor-pointer">
                    Cotización de transporte
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {serviceType === 'itinerary' && (
            <div className="bg-cyan-50 rounded-xl p-6 border border-cyan-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-600 text-white text-sm font-bold mr-3">3</span>
                Detalles del Itinerario
              </h3>
              <div>
                <Label htmlFor="destinations" className="text-slate-700 font-medium">
                  Destino(s) deseado(s) *
                </Label>
                <Input
                  id="destinations"
                  name="destinations"
                  placeholder="Ej: México, Guatemala"
                  value={formData.destinations}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate" className="text-slate-700 font-medium">
                    Fecha de salida *
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
                  <Label htmlFor="endDate" className="text-slate-700 font-medium">
                    Fecha de regreso *
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
                  <Label htmlFor="numberOfTravelers" className="text-slate-700 font-medium">
                    Número de viajeros *
                  </Label>
                  <Input
                    id="numberOfTravelers"
                    name="numberOfTravelers"
                    type="number"
                    min="1"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-slate-700 font-medium">
                    Presupuesto estimado (opcional)
                  </Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="Ej: $5,000 USD"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="itineraryComments" className="text-slate-700 font-medium">
                  Observaciones y Comentarios adicionales
                </Label>
                <Textarea
                  id="itineraryComments"
                  name="itineraryComments"
                  placeholder="Cuéntanos qué tienes en mente..."
                  value={formData.itineraryComments}
                  onChange={handleInputChange}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {serviceType === 'package' && (
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-bold mr-3">3</span>
                Detalles del Paquete
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pkgStartDate" className="text-slate-700 font-medium">
                    Fecha de salida *
                  </Label>
                  <Input
                    id="pkgStartDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="pkgEndDate" className="text-slate-700 font-medium">
                    Fecha de regreso *
                  </Label>
                  <Input
                    id="pkgEndDate"
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
                  <Label htmlFor="pkgTravelers" className="text-slate-700 font-medium">
                    Número de viajeros *
                  </Label>
                  <Input
                    id="pkgTravelers"
                    name="numberOfTravelers"
                    type="number"
                    min="1"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="pkgBudget" className="text-slate-700 font-medium">
                    Presupuesto estimado (opcional)
                  </Label>
                  <Input
                    id="pkgBudget"
                    name="budget"
                    placeholder="Ej: $10,000 USD"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  ¿Incluir vuelos? *
                </Label>
                <RadioGroup value={formData.includeFlights} onValueChange={(value) => setFormData(prev => ({ ...prev, includeFlights: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="flights-yes" />
                    <Label htmlFor="flights-yes" className="font-normal cursor-pointer">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="flights-no" />
                    <Label htmlFor="flights-no" className="font-normal cursor-pointer">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="depends" id="flights-depends" />
                    <Label htmlFor="flights-depends" className="font-normal cursor-pointer">Depende del precio</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  Categoría de hotel deseada *
                </Label>
                <RadioGroup value={formData.hotelCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, hotelCategory: value }))}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3stars" id="hotel-3" />
                    <Label htmlFor="hotel-3" className="font-normal cursor-pointer">3 estrellas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4stars" id="hotel-4" />
                    <Label htmlFor="hotel-4" className="font-normal cursor-pointer">4 estrellas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5stars" id="hotel-5" />
                    <Label htmlFor="hotel-5" className="font-normal cursor-pointer">5 estrellas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="boutique" id="hotel-boutique" />
                    <Label htmlFor="hotel-boutique" className="font-normal cursor-pointer">Boutique / especial</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="packageComments" className="text-slate-700 font-medium">
                  Comentarios adicionales
                </Label>
                <Textarea
                  id="packageComments"
                  name="packageComments"
                  placeholder="Cuéntanos más detalles..."
                  value={formData.packageComments}
                  onChange={handleInputChange}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>
          )}

          {serviceType === 'transport' && (
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-600 text-white text-sm font-bold mr-3">3</span>
                Detalles del Transporte
              </h3>

              <div>
                <Label className="text-slate-700 font-medium mb-3 block">
                  Tipo de transporte *
                </Label>
                <div className="space-y-2">
                  {['Vuelo', 'Transporte terrestre privado', 'Camioneta o Sprinter', 'Autobús', 'Mixto'].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`transport-${type}`}
                        checked={formData.transportTypes.includes(type)}
                        onCheckedChange={() => handleCheckboxChange(type)}
                      />
                      <Label htmlFor={`transport-${type}`} className="font-normal cursor-pointer">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="origin" className="text-slate-700 font-medium">
                    Origen *
                  </Label>
                  <Input
                    id="origin"
                    name="origin"
                    placeholder="Ciudad o aeropuerto"
                    value={formData.origin}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="text-slate-700 font-medium">
                    Destino *
                  </Label>
                  <Input
                    id="destination"
                    name="destination"
                    placeholder="Ciudad o aeropuerto"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transportStartDate" className="text-slate-700 font-medium">
                    Fecha de salida *
                  </Label>
                  <Input
                    id="transportStartDate"
                    name="transportStartDate"
                    type="date"
                    value={formData.transportStartDate}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="transportEndDate" className="text-slate-700 font-medium">
                    Fecha de regreso (si aplica)
                  </Label>
                  <Input
                    id="transportEndDate"
                    name="transportEndDate"
                    type="date"
                    value={formData.transportEndDate}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="transportPassengers" className="text-slate-700 font-medium">
                  Número de pasajeros *
                </Label>
                <Input
                  id="transportPassengers"
                  name="transportPassengers"
                  type="number"
                  min="1"
                  value={formData.transportPassengers}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="transportComments" className="text-slate-700 font-medium">
                  Comentarios adicionales
                </Label>
                <Textarea
                  id="transportComments"
                  name="transportComments"
                  placeholder="Especificaciones, preferencias..."
                  value={formData.transportComments}
                  onChange={handleInputChange}
                  className="mt-2 min-h-[100px]"
                />
              </div>
            </div>
          )}

          <FormConsentSection
            sectionNumber={4}
            acceptContact={acceptContact}
            acceptPrivacy={acceptPrivacy}
            onAcceptContactChange={setAcceptContact}
            onAcceptPrivacyChange={setAcceptPrivacy}

            lang={lang as 'es' | 'en'}
            dict={{}}
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold text-base py-6 shadow-lg hover:shadow-xl transition-all"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar asesoría'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-lg"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

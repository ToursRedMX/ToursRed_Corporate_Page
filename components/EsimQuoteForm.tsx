'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from './TikTokPixel';
import { Wifi } from 'lucide-react';

interface EsimQuoteFormProps {
  lang: string;
  dict: any;
  isOpen: boolean;
  onClose: () => void;
}

export function EsimQuoteForm({ lang, dict, isOpen, onClose }: EsimQuoteFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    destinations: '',
    travelDate: '',
    dataNeeded: '',
    phoneModel: '',
    observations: '',
  });
  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.whatsapp || !formData.destinations || !formData.phoneModel) {
      toast({
        title: 'Campos requeridos',
        description: 'Por favor completa todos los campos obligatorios.',
        variant: 'destructive',
      });
      return;
    }

    if (!acceptContact || !acceptPrivacy) {
      toast({
        title: 'Consentimientos requeridos',
        description: 'Debes aceptar los consentimientos para continuar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/esim-quote', {
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
        fullName: '',
        email: '',
        whatsapp: '',
        destinations: '',
        travelDate: '',
        dataNeeded: '',
        phoneModel: '',
        observations: '',
      });
      setAcceptContact(false);
      setAcceptPrivacy(false);
      await trackTikTokIdentify(formData.email, formData.whatsapp);
      trackTikTokEvent('Lead', { contents: [{ content_id: 'esim', content_type: 'product', content_name: 'eSIM' }], currency: 'MXN', value: 0 });
      onClose();
      router.push(`/${lang}/gracias`);
    } catch {
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-100 rounded-lg">
              <Wifi className="h-6 w-6 text-sky-600" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-900">
              Cotiza tu eSIM de Viaje
            </DialogTitle>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Cuéntanos sobre tu viaje y te ayudamos a encontrar la mejor opción de conectividad.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-2">
          {/* Honeypot */}
          <input type="text" id="_hp_field" name="_hp_field" className="hidden" tabIndex={-1} autoComplete="off" />

          {/* Datos del viaje */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-sky-100">
              Datos de tu viaje
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destinations" className="text-slate-700 font-semibold">
                  Pais(es) o destinos que visitarás <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="destinations"
                  name="destinations"
                  placeholder="Ej: Francia, España, Italia"
                  value={formData.destinations}
                  onChange={handleInputChange}
                  required
                  className="mt-2"
                />
                <p className="text-xs text-slate-500 mt-1">Si son varios países, sepáralos con comas.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="travelDate" className="text-slate-700 font-semibold">
                    Fecha aproximada de viaje
                  </Label>
                  <Input
                    id="travelDate"
                    name="travelDate"
                    type="date"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="dataNeeded" className="text-slate-700 font-semibold">
                    Cantidad de datos que necesitas
                  </Label>
                  <Select value={formData.dataNeeded} onValueChange={(v) => handleSelectChange('dataNeeded', v)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1GB">1 GB (uso básico)</SelectItem>
                      <SelectItem value="3GB">3 GB (uso moderado)</SelectItem>
                      <SelectItem value="5GB">5 GB (uso frecuente)</SelectItem>
                      <SelectItem value="10GB">10 GB (uso intensivo)</SelectItem>
                      <SelectItem value="unlimited">Ilimitado</SelectItem>
                      <SelectItem value="no-se">No sé, necesito orientación</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Dispositivo */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-sky-100">
              Tu dispositivo
            </h3>
            <div>
              <Label htmlFor="phoneModel" className="text-slate-700 font-semibold">
                Modelo de tu celular <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phoneModel"
                name="phoneModel"
                placeholder="Ej: iPhone 14 Pro, Samsung Galaxy S23, Google Pixel 7"
                value={formData.phoneModel}
                onChange={handleInputChange}
                required
                className="mt-2"
              />
              <p className="text-xs text-slate-500 mt-1">Necesitamos verificar que tu dispositivo sea compatible con eSIM.</p>
            </div>
          </div>

          {/* Datos de contacto */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b-2 border-sky-100">
              Datos de contacto
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="text-slate-700 font-semibold">
                  Nombre completo <span className="text-red-500">*</span>
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
                    Correo electrónico <span className="text-red-500">*</span>
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
                  <Label htmlFor="whatsapp" className="text-slate-700 font-semibold">
                    WhatsApp <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    placeholder="Ej: +52 55 1234 5678"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Observaciones */}
          <div>
            <Label htmlFor="observations" className="text-slate-700 font-semibold">
              Comentarios adicionales <span className="text-slate-400 font-normal">(opcional)</span>
            </Label>
            <Textarea
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              placeholder="¿Algo más que debamos saber? Duración del viaje, necesidades especiales, etc."
              className="mt-2 h-24"
            />
          </div>

          {/* Consentimientos */}
          <FormConsentSection
            acceptContact={acceptContact}
            acceptPrivacy={acceptPrivacy}
            onAcceptContactChange={setAcceptContact}
            onAcceptPrivacyChange={setAcceptPrivacy}
            lang={lang as 'es' | 'en'}
            dict={dict}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 text-base"
            size="lg"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar cotización de eSIM'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

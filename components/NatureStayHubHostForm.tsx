'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n/config';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Loader as Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from '@/components/TikTokPixel';

const formSchema = z.object({
  hostName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  hostEmail: z.string().email('Correo electrónico inválido'),
  hostPhone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  accommodationName: z.string().min(2, 'El nombre del alojamiento es requerido'),
  accommodationType: z.string().min(1, 'Selecciona un tipo de alojamiento'),
  accommodationTypeOther: z.string().optional(),
  location: z.string().min(2, 'La ubicación es requerida'),
  capacity: z.string().min(1, 'La capacidad es requerida'),
  naturalEnvironment: z.enum(['yes', 'no'], {
    required_error: 'Por favor selecciona una opción',
  }),
  socialLinks: z.string().optional(),
  googleMapsUrl: z.string().optional(),
  acceptContact: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar ser contactado',
  }),
  acceptPrivacy: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar el aviso de privacidad',
  }),
}).refine((data) => {
  if (data.accommodationType === 'otro' && !data.accommodationTypeOther) {
    return false;
  }
  return true;
}, {
  message: 'Por favor especifica el tipo de alojamiento',
  path: ['accommodationTypeOther'],
});

type FormData = z.infer<typeof formSchema>;

interface NatureStayHubHostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lang: 'es' | 'en';
}

const translations = {
  es: {
    title: 'Registro de Anfitrión',
    description: 'Completa este formulario para registrar tu alojamiento natural',
    hostDataSection: 'Datos del anfitrión',
    accommodationDataSection: 'Datos del alojamiento',
    optionalSection: 'Opcional',
    hostName: 'Nombre completo',
    hostEmail: 'Correo electrónico',
    hostPhone: 'Teléfono / WhatsApp',
    accommodationName: 'Nombre del alojamiento',
    accommodationType: 'Tipo de alojamiento',
    accommodationTypePlaceholder: 'Selecciona un tipo',
    cabin: 'Cabaña',
    glamping: 'Glamping',
    camping: 'Camping',
    other: 'Otro',
    specifyOther: 'Especifique',
    location: 'Ubicación (Estado / Municipio)',
    capacity: 'Número aproximado de unidades o capacidad',
    naturalEnvironment: '¿El alojamiento se encuentra en un entorno natural?',
    yes: 'Sí',
    no: 'No',
    socialLinks: 'Enlace a Instagram / Facebook / Airbnb / Booking (si existe)',
    googleMapsUrl: 'Ubicación en Google Maps',
    submit: 'Enviar Registro',
    submitting: 'Enviando...',
    successMessage: 'Registro enviado exitosamente. Nos pondremos en contacto contigo pronto.',
    errorMessage: 'Error al enviar el registro. Por favor intenta nuevamente.',
  },
  en: {
    title: 'Host Registration',
    description: 'Complete this form to register your natural accommodation',
    hostDataSection: 'Host Information',
    accommodationDataSection: 'Accommodation Information',
    optionalSection: 'Optional',
    hostName: 'Full name',
    hostEmail: 'Email address',
    hostPhone: 'Phone / WhatsApp',
    accommodationName: 'Accommodation name',
    accommodationType: 'Accommodation type',
    accommodationTypePlaceholder: 'Select a type',
    cabin: 'Cabin',
    glamping: 'Glamping',
    camping: 'Camping',
    other: 'Other',
    specifyOther: 'Specify',
    location: 'Location (State / Municipality)',
    capacity: 'Approximate number of units or capacity',
    naturalEnvironment: 'Is the accommodation located in a natural environment?',
    yes: 'Yes',
    no: 'No',
    socialLinks: 'Link to Instagram / Facebook / Airbnb / Booking (if exists)',
    googleMapsUrl: 'Location on Google Maps',
    submit: 'Submit Registration',
    submitting: 'Submitting...',
    successMessage: 'Registration submitted successfully. We will contact you soon.',
    errorMessage: 'Error submitting registration. Please try again.',
  },
};

export default function NatureStayHubHostForm({ open, onOpenChange, lang }: NatureStayHubHostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const t = translations[lang];

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostName: '',
      hostEmail: '',
      hostPhone: '',
      accommodationName: '',
      accommodationType: '',
      accommodationTypeOther: '',
      location: '',
      capacity: '',
      naturalEnvironment: undefined,
      socialLinks: '',
      googleMapsUrl: '',
      acceptContact: false,
      acceptPrivacy: false,
    },
  });

  const watchAccommodationType = form.watch('accommodationType');

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const hpField = document.getElementById('_hp_field') as HTMLInputElement;
      const response = await fetch('/api/nature-stay-hub-host', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, _hp: hpField?.value || '' }),
      });

      const result = await response.json();

      if (!result.success) {
        toast({
          title: 'Error',
          description: result.error || t.errorMessage,
          variant: 'destructive',
        });
        return;
      }

      await trackTikTokIdentify(data.hostEmail, data.hostPhone);
      trackTikTokEvent('Lead', { contents: [{ content_id: 'naturestay-host', content_type: 'product', content_name: 'NatureStay Hub Anfitrion' }], currency: 'MXN', value: 0 });
      form.reset();
      onOpenChange(false);
      router.push(`/${lang}/gracias`);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: t.errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">{t.hostDataSection}</h3>

              <FormField
                control={form.control}
                name="hostName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.hostName}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hostEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.hostEmail}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hostPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.hostPhone}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">{t.accommodationDataSection}</h3>

              <FormField
                control={form.control}
                name="accommodationName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.accommodationName}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accommodationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.accommodationType}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.accommodationTypePlaceholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cabana">{t.cabin}</SelectItem>
                        <SelectItem value="glamping">{t.glamping}</SelectItem>
                        <SelectItem value="camping">{t.camping}</SelectItem>
                        <SelectItem value="otro">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchAccommodationType === 'otro' && (
                <FormField
                  control={form.control}
                  name="accommodationTypeOther"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.specifyOther}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.location}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: Oaxaca / Huatulco" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.capacity}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ej: 10 cabañas o capacidad para 40 personas" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="naturalEnvironment"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t.naturalEnvironment}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {t.yes}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {t.no}
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">{t.optionalSection}</h3>

              <FormField
                control={form.control}
                name="socialLinks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.socialLinks}</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="googleMapsUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.googleMapsUrl}</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://maps.google.com/..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormConsentSection
              acceptContact={form.watch('acceptContact')}
              acceptPrivacy={form.watch('acceptPrivacy')}
              onAcceptContactChange={(checked) =>
                form.setValue('acceptContact', checked)
              }
              onAcceptPrivacyChange={(checked) =>
                form.setValue('acceptPrivacy', checked)
              }

              lang={lang as Locale}
              dict={{
                formConsent: {
                  title: lang === 'es' ? 'Consentimiento' : 'Consent',
                  acceptContact:
                    lang === 'es'
                      ? 'Acepto ser contactado por ToursRed para recibir información sobre mi solicitud'
                      : 'I agree to be contacted by ToursRed to receive information about my request',
                  acceptPrivacy: lang === 'es' ? 'Acepto el ' : 'I accept the ',
                  privacyLink: lang === 'es' ? 'aviso de privacidad' : 'privacy policy',
                },
              }}
            />

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                t.submit
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

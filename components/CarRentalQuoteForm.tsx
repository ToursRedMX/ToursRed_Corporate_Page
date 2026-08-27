'use client';

import { useState } from 'react';
import { Locale } from '@/lib/i18n/config';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FormConsentSection } from './FormConsentSection';
import { trackTikTokEvent, trackTikTokIdentify } from './TikTokPixel';

interface CarRentalQuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
  dict: any;
}

export function CarRentalQuoteForm({ isOpen, onClose, lang, dict }: CarRentalQuoteFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [pickupCalendarOpen, setPickupCalendarOpen] = useState(false);
  const [returnCalendarOpen, setReturnCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    numberOfPeople: '1',
    carPreference: '',
    additionalComments: '',
  });
  const [acceptContact, setAcceptContact] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      const response = await fetch('/api/rent-a-car-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          pickupDate: pickupDate ? format(pickupDate, 'dd/MM/yyyy') : undefined,
          returnDate: returnDate ? format(returnDate, 'dd/MM/yyyy') : undefined,
          _hp: hpField?.value || '',
          acceptContact,
          acceptPrivacy,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          pickupLocation: '',
          numberOfPeople: '1',
          carPreference: '',
          additionalComments: '',
        });
        setPickupDate(undefined);
        setReturnDate(undefined);
        setAcceptContact(false);
        setAcceptPrivacy(false);
        await trackTikTokIdentify(formData.email, formData.phone);
        trackTikTokEvent('Lead', { contents: [{ content_id: 'rent-a-car', content_type: 'product', content_name: 'Renta de Auto' }], currency: 'MXN', value: 0 });
        onClose();
        router.push(`/${lang}/gracias`);
      } else {
        toast({
          title: dict.error.title,
          description: result.error || dict.error.description,
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: dict.error.title,
        description: dict.error.description,
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600">
            {dict.quoteForm.title}
          </DialogTitle>
          <p className="text-slate-500 text-sm">{dict.quoteForm.subtitle}</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-800 font-medium">
                {dict.quoteForm.fullName} <span className="text-red-500">*</span>
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
                {dict.quoteForm.email} <span className="text-red-500">*</span>
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-slate-800 font-medium">
                {dict.quoteForm.phone} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={dict.quoteForm.phonePlaceholder}
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <Label htmlFor="pickupLocation" className="text-slate-800 font-medium">
                {dict.quoteForm.pickupLocation} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="pickupLocation"
                name="pickupLocation"
                placeholder={dict.quoteForm.pickupLocationPlaceholder}
                value={formData.pickupLocation}
                onChange={handleChange}
                required
                className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-slate-800 font-medium">{dict.quoteForm.pickupDate}</Label>
              <Popover open={pickupCalendarOpen} onOpenChange={setPickupCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal border-slate-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? (
                      format(pickupDate, 'PPP', { locale: lang === 'es' ? es : undefined })
                    ) : (
                      <span className="text-slate-400">{dict.quoteForm.pickupDatePlaceholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={(newDate) => {
                      setPickupDate(newDate);
                      setPickupCalendarOpen(false);
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="text-slate-800 font-medium">{dict.quoteForm.returnDate}</Label>
              <Popover open={returnCalendarOpen} onOpenChange={setReturnCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal border-slate-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? (
                      format(returnDate, 'PPP', { locale: lang === 'es' ? es : undefined })
                    ) : (
                      <span className="text-slate-400">{dict.quoteForm.returnDatePlaceholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={(newDate) => {
                      setReturnDate(newDate);
                      setReturnCalendarOpen(false);
                    }}
                    initialFocus
                    disabled={(date) => date < (pickupDate || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numberOfPeople" className="text-slate-800 font-medium">
                {dict.quoteForm.numberOfPeople} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                min="1"
                value={formData.numberOfPeople}
                onChange={handleChange}
                required
                className="mt-2 border-slate-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div>
              <Label className="text-slate-800 font-medium">{dict.quoteForm.carPreference}</Label>
              <Select
                value={formData.carPreference}
                onValueChange={(value) => setFormData({ ...formData, carPreference: value })}
              >
                <SelectTrigger className="mt-2 border-slate-300">
                  <SelectValue placeholder={dict.quoteForm.carPreferencePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={dict.quoteForm.carTypes.any}>{dict.quoteForm.carTypes.any}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.economy}>{dict.quoteForm.carTypes.economy}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.compact}>{dict.quoteForm.carTypes.compact}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.sedan}>{dict.quoteForm.carTypes.sedan}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.suv}>{dict.quoteForm.carTypes.suv}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.van}>{dict.quoteForm.carTypes.van}</SelectItem>
                  <SelectItem value={dict.quoteForm.carTypes.luxury}>{dict.quoteForm.carTypes.luxury}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="additionalComments" className="text-slate-800 font-medium">
              {dict.quoteForm.additionalComments}
            </Label>
            <Textarea
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows={3}
              placeholder={dict.quoteForm.additionalCommentsPlaceholder}
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

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {dict.quoteForm.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isSubmitting ? dict.quoteForm.submitting : dict.quoteForm.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

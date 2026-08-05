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

interface MegaTravelQuoteFormProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'es' | 'en';
  dict: any;
}

export function MegaTravelQuoteForm({ isOpen, onClose, lang, dict }: MegaTravelQuoteFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    tourCode: '',
    numberOfPeople: '1',
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
      const response = await fetch('/api/mega-travel-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          travelDate: date ? format(date, 'dd/MM/yyyy') : undefined,
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
          destination: '',
          tourCode: '',
          numberOfPeople: '1',
          additionalComments: '',
        });
        setDate(undefined);
        setAcceptContact(false);
        setAcceptPrivacy(false);
        await trackTikTokIdentify(formData.email, formData.phone);
        trackTikTokEvent('Lead', { contents: [{ content_id: 'mega-travel', content_type: 'product', content_name: 'Mega Travel' }], currency: 'MXN', value: 0 });
        onClose();
        router.push(`/${lang}/gracias`);
      } else {
        toast({
          title: dict.error.title,
          description: result.error || dict.error.description,
          variant: 'destructive',
        });
      }
    } catch (error) {
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
          <DialogTitle className="text-2xl font-bold text-blue-600">
            {dict.form.title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-800 font-medium">
                {dict.form.fullName} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-800 font-medium">
                {dict.form.email} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-slate-800 font-medium">
                {dict.form.phone} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={dict.form.phonePlaceholder}
                value={formData.phone}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <Label htmlFor="destination" className="text-slate-800 font-medium">
                {dict.form.destination} <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.destination}
                onValueChange={(value) =>
                  setFormData({ ...formData, destination: value })
                }
                required
              >
                <SelectTrigger className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder={dict.form.destinationPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={dict.form.destinations.bestOffers}>
                    {dict.form.destinations.bestOffers}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.currentPromotions}>
                    {dict.form.destinations.currentPromotions}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.europe}>
                    {dict.form.destinations.europe}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.middleEast}>
                    {dict.form.destinations.middleEast}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.canada}>
                    {dict.form.destinations.canada}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.asia}>
                    {dict.form.destinations.asia}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.africa}>
                    {dict.form.destinations.africa}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.pacific}>
                    {dict.form.destinations.pacific}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.southAmerica}>
                    {dict.form.destinations.southAmerica}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.unitedStates}>
                    {dict.form.destinations.unitedStates}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.centralAmerica}>
                    {dict.form.destinations.centralAmerica}
                  </SelectItem>
                  <SelectItem value={dict.form.destinations.nationalTours}>
                    {dict.form.destinations.nationalTours}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tourCode" className="text-slate-800 font-medium">
                {dict.form.tourCode}
              </Label>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-slate-600 font-medium">MT-</span>
                <Input
                  id="tourCode"
                  name="tourCode"
                  placeholder={dict.form.tourCodePlaceholder}
                  value={formData.tourCode}
                  onChange={handleChange}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">{dict.form.tourCodeHelper}</p>
            </div>
            <div>
              <Label className="text-slate-800 font-medium">
                {dict.form.travelDate}
              </Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full mt-2 justify-start text-left font-normal border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, 'PPP', { locale: lang === 'es' ? es : undefined })
                    ) : (
                      <span>{dict.form.travelDatePlaceholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <Label htmlFor="numberOfPeople" className="text-slate-800 font-medium">
              {dict.form.numberOfPeople} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="numberOfPeople"
              name="numberOfPeople"
              type="number"
              min="1"
              value={formData.numberOfPeople}
              onChange={handleChange}
              required
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <Label htmlFor="additionalComments" className="text-slate-800 font-medium">
              {dict.form.additionalComments}
            </Label>
            <Textarea
              id="additionalComments"
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleChange}
              rows={4}
              placeholder={dict.form.additionalCommentsPlaceholder}
              className="mt-2 border-slate-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
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
              {dict.form.cancel}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? dict.form.submitting : dict.form.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

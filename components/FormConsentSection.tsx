'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface FormConsentSectionProps {
  sectionNumber?: number;
  acceptContact: boolean;
  acceptPrivacy: boolean;
  onAcceptContactChange: (checked: boolean) => void;
  onAcceptPrivacyChange: (checked: boolean) => void;
  lang: 'es' | 'en';
  dict: any;
}

export function FormConsentSection({
  sectionNumber,
  acceptContact,
  acceptPrivacy,
  onAcceptContactChange,
  onAcceptPrivacyChange,
  lang,
  dict,
}: FormConsentSectionProps) {
  const consentTexts = dict.formConsent || {
    title: 'Consentimiento',
    acceptContact: 'Acepto ser contactado por ToursRed para recibir información sobre mi solicitud',
    acceptPrivacy: 'Acepto el ',
    privacyLink: 'aviso de privacidad',
  };

  return (
    <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 space-y-4">
      <h3 className="text-lg font-bold text-slate-900 flex items-center">
        {sectionNumber && (
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-sm font-bold mr-3">
            {sectionNumber}
          </span>
        )}
        {consentTexts.title}
      </h3>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptContact"
            checked={acceptContact}
            onCheckedChange={onAcceptContactChange}
            className="mt-1"
          />
          <Label
            htmlFor="acceptContact"
            className="font-normal cursor-pointer text-sm leading-relaxed text-slate-700"
          >
            {consentTexts.acceptContact}
          </Label>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="acceptPrivacy"
            checked={acceptPrivacy}
            onCheckedChange={onAcceptPrivacyChange}
            className="mt-1"
          />
          <Label
            htmlFor="acceptPrivacy"
            className="font-normal cursor-pointer text-sm leading-relaxed text-slate-700"
          >
            {consentTexts.acceptPrivacy}
            <Link
              href={`/${lang}/legal/privacy`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {consentTexts.privacyLink}
            </Link>
          </Label>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, width: 0, overflow: 'hidden' }}
      >
        <label htmlFor="_hp_field">Leave empty</label>
        <input
          id="_hp_field"
          name="_hp"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          defaultValue=""
        />
      </div>
    </div>
  );
}

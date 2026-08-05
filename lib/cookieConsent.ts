export type CookieConsentStatus = 'accepted' | 'rejected' | 'pending';

const CONSENT_KEY = 'toursred_cookie_consent';
const CONSENT_TIMESTAMP_KEY = 'toursred_cookie_consent_timestamp';
const CONSENT_EXPIRY_DAYS = 365;

export function getCookieConsent(): CookieConsentStatus {
  if (typeof window === 'undefined') return 'pending';

  const consent = localStorage.getItem(CONSENT_KEY);
  const timestamp = localStorage.getItem(CONSENT_TIMESTAMP_KEY);

  if (!consent || !timestamp) return 'pending';

  const consentDate = new Date(parseInt(timestamp));
  const expiryDate = new Date(consentDate.getTime() + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  if (new Date() > expiryDate) {
    revokeCookieConsent();
    return 'pending';
  }

  return consent as CookieConsentStatus;
}

export function setCookieConsent(status: 'accepted' | 'rejected'): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem(CONSENT_TIMESTAMP_KEY, Date.now().toString());

  if (status === 'accepted') {
    window.dispatchEvent(new CustomEvent('cookieConsentAccepted'));
  } else {
    window.dispatchEvent(new CustomEvent('cookieConsentRejected'));
  }
}

export function revokeCookieConsent(): void {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(CONSENT_KEY);
  localStorage.removeItem(CONSENT_TIMESTAMP_KEY);
}

export function hasUserDecided(): boolean {
  if (typeof window === 'undefined') return false;

  const consent = getCookieConsent();
  return consent !== 'pending';
}

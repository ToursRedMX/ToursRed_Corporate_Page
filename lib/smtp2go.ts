export interface AgencyFormData {
  firstName: string;
  lastName: string;
  agencyName: string;
  email: string;
  phone: string;
  website: string;
  rfc: string;
  rnt?: string;
  legalName: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface MegaTravelQuoteData {
  name: string;
  email: string;
  phone: string;
  destination: string;
  tourCode?: string;
  travelDate?: string;
  numberOfPeople: number;
  additionalComments?: string;
}

export interface NefertariTravelQuoteData {
  name: string;
  email: string;
  phone: string;
  tripName: string;
  travelDate?: string;
  numberOfPeople: number;
  additionalComments?: string;
}

export interface ExoticcaQuoteData {
  name: string;
  email: string;
  phone: string;
  tripName: string;
  travelDate?: string;
  numberOfPeople: number;
  additionalComments?: string;
}

export interface CarRentalQuoteData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  pickupDate?: string;
  returnDate?: string;
  numberOfPeople: number;
  carPreference?: string;
  additionalComments?: string;
}

export interface TravelInsuranceQuoteData {
  destination: string;
  startDate: string;
  endDate: string;
  numberOfTravelers: string;
  tripType: string;
  tripReason: string;
  age: string;
  medicalCondition: string;
  medicalDetails: string;
  coverage: string[];
  observations?: string;
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  lang: string;
}

export interface EsimQuoteData {
  fullName: string;
  email: string;
  whatsapp: string;
  destinations: string;
  travelDate?: string;
  dataNeeded?: string;
  phoneModel: string;
  observations?: string;
  lang: string;
}

export interface TravelerServicesRequestData {
  fullName: string;
  email: string;
  phone: string;
  preferredContact: string;
  serviceType: 'itinerary' | 'package' | 'transport';
  destinations?: string;
  startDate?: string;
  endDate?: string;
  numberOfTravelers?: string;
  budget?: string;
  itineraryComments?: string;
  includeFlights?: string;
  hotelCategory?: string;
  packageComments?: string;
  transportTypes?: string[];
  origin?: string;
  destination?: string;
  transportStartDate?: string;
  transportEndDate?: string;
  transportPassengers?: string;
  transportComments?: string;
  acceptContact: boolean;
  acceptPrivacy: boolean;
  lang: string;
}

interface SMTP2GoEmailPayload {
  api_key: string;
  to: string[];
  sender: string;
  subject: string;
  html_body: string;
}

const LOGO_URL = 'https://www.toursred.com.mx/logo.png';

const createInternalEmailTemplate = (data: AgencyFormData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #475569 0%, #1e40af 50%, #0d9488 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 160px;
    }
    .field-value {
      color: #1e293b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">🏢 Nuevo Registro de Agencia</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">ToursRed - Red de Agencias Aliadas</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de registro: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">👤 Información Personal</div>
      <div class="field">
        <span class="field-label">Nombre(s):</span>
        <span class="field-value">${data.firstName}</span>
      </div>
      <div class="field">
        <span class="field-label">Apellido(s):</span>
        <span class="field-value">${data.lastName}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🏢 Información de la Agencia</div>
      <div class="field">
        <span class="field-label">Nombre Comercial:</span>
        <span class="field-value">${data.agencyName}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:${data.phone}" style="color: #2563eb;">${data.phone}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Sitio Web/Facebook:</span>
        <span class="field-value">${data.website}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📄 Información Fiscal</div>
      <div class="field">
        <span class="field-label">RFC:</span>
        <span class="field-value">${data.rfc}</span>
      </div>
      ${data.rnt ? `
      <div class="field">
        <span class="field-label">RNT:</span>
        <span class="field-value">${data.rnt}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Razón Social:</span>
        <span class="field-value">${data.legalName}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📍 Domicilio de la Agencia</div>
      <div class="field">
        <span class="field-label">Calle:</span>
        <span class="field-value">${data.street}</span>
      </div>
      <div class="field">
        <span class="field-label">Número Exterior:</span>
        <span class="field-value">${data.exteriorNumber}</span>
      </div>
      ${data.interiorNumber ? `
      <div class="field">
        <span class="field-label">Número Interior:</span>
        <span class="field-value">${data.interiorNumber}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Colonia:</span>
        <span class="field-value">${data.neighborhood}</span>
      </div>
      <div class="field">
        <span class="field-label">Ciudad:</span>
        <span class="field-value">${data.city}</span>
      </div>
      <div class="field">
        <span class="field-label">Estado:</span>
        <span class="field-value">${data.state}</span>
      </div>
      <div class="field">
        <span class="field-label">Código Postal:</span>
        <span class="field-value">${data.postalCode}</span>
      </div>
      <div class="field">
        <span class="field-label">País:</span>
        <span class="field-value">${data.country}</span>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createConfirmationEmailTemplate = (data: AgencyFormData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #475569 0%, #1e40af 50%, #0d9488 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #0d9488;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 160px;
    }
    .field-value {
      color: #1e293b;
    }
    .cta-button {
      display: inline-block;
      background: #dc2626;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      margin: 20px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .check-icon {
      font-size: 48px;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a ToursRed!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Tu solicitud ha sido recibida</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #0d9488; margin: 15px 0;">¡Registro Exitoso!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hola <strong>${data.firstName} ${data.lastName}</strong>,
      </p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hemos recibido tu solicitud para unirte a la red de agencias aliadas de ToursRed.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Datos de tu registro</div>
      <div class="field">
        <span class="field-label">Agencia:</span>
        <span class="field-value">${data.agencyName}</span>
      </div>
      <div class="field">
        <span class="field-label">RFC:</span>
        <span class="field-value">${data.rfc}</span>
      </div>
      <div class="field">
        <span class="field-label">Razón Social:</span>
        <span class="field-value">${data.legalName}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value">${data.email}</span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">${data.phone}</span>
      </div>
      <div class="field">
        <span class="field-label">Ciudad:</span>
        <span class="field-value">${data.city}, ${data.state}</span>
      </div>
    </div>

    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">
        Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo en un plazo de <strong>24 a 48 horas hábiles</strong> para continuar con el proceso de incorporación.
      </p>
      <p style="color: #475569; margin: 15px 0;">
        Mientras tanto, te invitamos a conocer más sobre ToursRed y los beneficios de ser parte de nuestra red.
      </p>
      <a href="https://toursred.com" class="cta-button">Visitar ToursRed</a>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste este registro, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

async function sendEmail(
  apiKey: string,
  apiUrl: string,
  to: string,
  subject: string,
  htmlBody: string
): Promise<{ success: boolean; error?: string }> {
  const payload: SMTP2GoEmailPayload = {
    api_key: apiKey,
    to: [to],
    sender: 'ToursRed <noreply@toursred.com>',
    subject: subject,
    html_body: htmlBody,
  };

  try {
    const response = await fetch(`${apiUrl}email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    let result: any;
    const responseText = await response.text();
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error('SMTP2Go returned non-JSON response:', responseText.substring(0, 500));
      return {
        success: false,
        error: `SMTP2Go returned invalid response (status ${response.status})`,
      };
    }

    if (!response.ok || result.data?.error || result.data?.errors?.length) {
      console.error('SMTP2Go API error:', JSON.stringify(result));
      const errorMsg =
        result.data?.error ||
        (result.data?.errors as string[] | undefined)?.join(', ') ||
        `SMTP2Go error (status ${response.status})`;
      return {
        success: false,
        error: errorMsg,
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

export async function sendAgencyRegistrationEmail(
  data: AgencyFormData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = process.env.AGENCY_REGISTRATION_EMAIL;

  if (!apiKey || !apiUrl || !recipientEmail) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Solicitud de Agencia: ${data.agencyName}`,
    createInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Bienvenido a ToursRed! Tu solicitud ha sido recibida',
    createConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to agency:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createContactInternalEmailTemplate = (data: ContactFormData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #475569 0%, #1e40af 50%, #0d9488 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 120px;
    }
    .field-value {
      color: #1e293b;
    }
    .message-box {
      background: #f1f5f9;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #0d9488;
      margin-top: 15px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">Nuevo Mensaje de Contacto</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">ToursRed - Formulario de Contacto</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">Información del Remitente</div>
      <div class="field">
        <span class="field-label">Nombre:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></span>
      </div>
      ${data.phone ? `<div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">${data.phone}</span>
      </div>` : ''}
      <div class="field">
        <span class="field-label">Asunto:</span>
        <span class="field-value">${data.subject}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Mensaje</div>
      <div class="message-box">
        <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${data.message}</p>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createContactConfirmationEmailTemplate = (data: ContactFormData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #475569 0%, #1e40af 50%, #0d9488 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #0d9488;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .message-box {
      background: #f1f5f9;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #0d9488;
      margin-top: 10px;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .check-icon {
      font-size: 48px;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">Gracias por contactarnos</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Hemos recibido tu mensaje</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #0d9488; margin: 15px 0;">¡Mensaje Recibido!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hola <strong>${data.name}</strong>,
      </p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hemos recibido tu mensaje y nuestro equipo lo revisará a la brevedad.
      </p>
    </div>

    <div class="section">
      <div class="section-title">Copia de tu mensaje</div>
      <p style="margin: 5px 0;"><strong>Asunto:</strong> ${data.subject}</p>
      <div class="message-box">
        <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${data.message}</p>
      </div>
    </div>

    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">
        Nuestro equipo te responderá en un plazo de <strong>24 a 48 horas hábiles</strong>.
      </p>
      <p style="color: #475569; margin: 15px 0;">
        Si tu consulta es urgente, también puedes contactarnos directamente:
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📧 <a href="mailto:contacto@toursred.com" style="color: #2563eb;">contacto@toursred.com</a>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no enviaste este mensaje, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendContactFormEmail(
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nuevo Mensaje de Contacto: ${data.subject}`,
    createContactInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    'Gracias por contactarnos - ToursRed',
    createContactConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createMegaTravelInternalEmailTemplate = (data: MegaTravelQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }
    .section-title {
      color: #1e40af;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #dbeafe;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 180px;
    }
    .field-value {
      color: #1e293b;
    }
    .highlight {
      background: #fef3c7;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
      margin: 15px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">✈️ Nueva Solicitud de Cotización - Mega Travel</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Tours Internacionales</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de solicitud: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    ${data.tourCode ? `
    <div class="highlight">
      <strong>🎯 Código de Tour:</strong> MT-${data.tourCode}
    </div>
    ` : ''}

    <div class="section">
      <div class="section-title">👤 Información del Cliente</div>
      <div class="field">
        <span class="field-label">Nombre Completo:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #2563eb;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:+52${data.phone}" style="color: #2563eb;">+52 ${data.phone}</a></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🌍 Detalles del Viaje</div>
      <div class="field">
        <span class="field-label">Destino de Interés:</span>
        <span class="field-value"><strong>${data.destination}</strong></span>
      </div>
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'persona' : 'personas'}</span>
      </div>
    </div>

    ${data.additionalComments ? `
    <div class="section">
      <div class="section-title">💬 Comentarios Adicionales</div>
      <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${data.additionalComments}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createMegaTravelConfirmationEmailTemplate = (data: MegaTravelQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #3b82f6;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #3b82f6;
    }
    .section-title {
      color: #1e40af;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #dbeafe;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 180px;
    }
    .field-value {
      color: #1e293b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .check-icon {
      font-size: 48px;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Cotización Recibida!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Mega Travel - Tours Internacionales</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #1e40af; margin: 15px 0;">¡Tu Solicitud Ha Sido Recibida!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hola <strong>${data.name}</strong>,
      </p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hemos recibido tu solicitud de cotización para tours internacionales con Mega Travel.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <div class="field">
        <span class="field-label">Destino de Interés:</span>
        <span class="field-value"><strong>${data.destination}</strong></span>
      </div>
      ${data.tourCode ? `
      <div class="field">
        <span class="field-label">Código de Tour:</span>
        <span class="field-value">MT-${data.tourCode}</span>
      </div>
      ` : ''}
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'persona' : 'personas'}</span>
      </div>
      <div class="field">
        <span class="field-label">Email de Contacto:</span>
        <span class="field-value">${data.email}</span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">+52 ${data.phone}</span>
      </div>
    </div>

    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">
        Nuestro equipo especializado en tours internacionales revisará tu solicitud y se pondrá en contacto contigo en un plazo de <strong>24 horas</strong> con una cotización personalizada que incluirá:
      </p>
      <ul style="text-align: left; color: #475569; margin: 15px auto; max-width: 400px;">
        <li>Precio detallado del tour</li>
        <li>Itinerario completo</li>
        <li>Servicios incluidos</li>
        <li>Opciones de pago</li>
        <li>Disponibilidad de fechas</li>
      </ul>
      <p style="color: #475569; margin: 15px 0;">
        Si necesitas atención inmediata, puedes contactarnos directamente:
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📧 <a href="mailto:contacto@toursred.com" style="color: #2563eb;">contacto@toursred.com</a>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste esta cotización, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendMegaTravelQuoteEmail(
  data: MegaTravelQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Cotización Mega Travel: ${data.destination} - ${data.name}`,
    createMegaTravelInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Cotización Recibida! - Mega Travel Tours Internacionales',
    createMegaTravelConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createNefertariTravelInternalEmailTemplate = (data: NefertariTravelQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #a855f7;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    .field {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      min-width: 180px;
    }
    .field-value {
      color: #1e293b;
      flex: 1;
    }
    .highlight {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 18px;
      color: #92400e;
      border-left: 4px solid #f59e0b;
      margin: 15px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">✈️ Nueva Solicitud de Cotización - Nefertari Travel</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Tours Internacionales</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de solicitud: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">👤 Información del Cliente</div>
      <div class="field">
        <span class="field-label">Nombre Completo:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #7c3aed;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:+52${data.phone}" style="color: #7c3aed;">+52 ${data.phone}</a></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🌍 Detalles del Viaje</div>
      <div class="field">
        <span class="field-label">Nombre del Viaje:</span>
        <span class="field-value"><strong>${data.tripName}</strong></span>
      </div>
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'persona' : 'personas'}</span>
      </div>
    </div>

    ${data.additionalComments ? `
    <div class="section">
      <div class="section-title">💬 Comentarios Adicionales</div>
      <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${data.additionalComments}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createNefertariTravelConfirmationEmailTemplate = (data: NefertariTravelQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #a855f7;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #a855f7;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 15px;
    }
    .field {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      min-width: 180px;
    }
    .field-value {
      color: #1e293b;
      flex: 1;
    }
    .info-box {
      background: linear-gradient(135deg, #ddd6fe 0%, #e9d5ff 100%);
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #7c3aed;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Gracias por tu interés!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Nefertari Travel - Tours Internacionales</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <h2 style="margin: 0 0 15px 0; color: #7c3aed; font-size: 24px;">✅ Hemos recibido tu solicitud</h2>
      <p style="margin: 0; color: #475569; font-size: 16px;">
        Nuestro equipo la está revisando y se pondrá en contacto contigo en menos de 24 horas.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <div class="field">
        <span class="field-label">Nombre:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${data.email}</span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">+52 ${data.phone}</span>
      </div>
      <div class="field">
        <span class="field-label">Nombre del Viaje:</span>
        <span class="field-value"><strong>${data.tripName}</strong></span>
      </div>
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople}</span>
      </div>
    </div>

    <div class="info-box">
      <h3 style="margin: 0 0 10px 0; color: #6d28d9; font-size: 18px;">📞 ¿Necesitas ayuda inmediata?</h3>
      <p style="margin: 0; color: #1e293b;">
        <strong>Teléfono:</strong> +52 55 47127668<br>
        <strong>Email:</strong> contacto@toursred.com<br>
        <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste esta cotización, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendNefertariTravelQuoteEmail(
  data: NefertariTravelQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Cotización Nefertari Travel: ${data.tripName} - ${data.name}`,
    createNefertariTravelInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Cotización Recibida! - Nefertari Travel Tours Internacionales',
    createNefertariTravelConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createExoticcaInternalEmailTemplate = (data: ExoticcaQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #ec4899;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }
    .field {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      min-width: 180px;
    }
    .field-value {
      color: #1e293b;
      flex: 1;
    }
    .highlight {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      font-size: 18px;
      color: #92400e;
      border-left: 4px solid #fbbf24;
      margin: 15px 0;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">✈️ Nueva Solicitud de Cotización - Exoticca</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Viajes Internacionales</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de solicitud: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">👤 Información del Cliente</div>
      <div class="field">
        <span class="field-label">Nombre Completo:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #ec4899;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:+52${data.phone}" style="color: #ec4899;">+52 ${data.phone}</a></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🌍 Detalles del Viaje</div>
      <div class="field">
        <span class="field-label">Nombre del Viaje:</span>
        <span class="field-value"><strong>${data.tripName}</strong></span>
      </div>
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople} ${data.numberOfPeople === 1 ? 'persona' : 'personas'}</span>
      </div>
    </div>

    ${data.additionalComments ? `
    <div class="section">
      <div class="section-title">💬 Comentarios Adicionales</div>
      <p style="margin: 0; white-space: pre-wrap; color: #1e293b;">${data.additionalComments}</p>
    </div>
    ` : ''}

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createExoticcaConfirmationEmailTemplate = (data: ExoticcaQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #333333 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #ec4899;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #ec4899;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #000000;
      margin-bottom: 15px;
    }
    .field {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      min-width: 180px;
    }
    .field-value {
      color: #1e293b;
      flex: 1;
    }
    .info-box {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #fbbf24;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Gracias por tu interés!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Exoticca - Viajes Internacionales</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <h2 style="margin: 0 0 15px 0; color: #ec4899; font-size: 24px;">✅ Hemos recibido tu solicitud</h2>
      <p style="margin: 0; color: #475569; font-size: 16px;">
        Nuestro equipo la está revisando y se pondrá en contacto contigo en menos de 24 horas.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <div class="field">
        <span class="field-label">Nombre:</span>
        <span class="field-value">${data.name}</span>
      </div>
      <div class="field">
        <span class="field-label">Email:</span>
        <span class="field-value">${data.email}</span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value">+52 ${data.phone}</span>
      </div>
      <div class="field">
        <span class="field-label">Nombre del Viaje:</span>
        <span class="field-value"><strong>${data.tripName}</strong></span>
      </div>
      ${data.travelDate ? `
      <div class="field">
        <span class="field-label">Fecha Aproximada:</span>
        <span class="field-value">${data.travelDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Número de Personas:</span>
        <span class="field-value">${data.numberOfPeople}</span>
      </div>
    </div>

    <div class="info-box">
      <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 18px;">📞 ¿Necesitas ayuda inmediata?</h3>
      <p style="margin: 0; color: #1e293b;">
        <strong>Teléfono:</strong> +52 55 47127668<br>
        <strong>Email:</strong> contacto@toursred.com<br>
        <strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste esta cotización, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendExoticcaQuoteEmail(
  data: ExoticcaQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Cotización Exoticca: ${data.tripName} - ${data.name}`,
    createExoticcaInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Cotización Recibida! - Exoticca Viajes Internacionales',
    createExoticcaConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

export async function sendGenericEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  return await sendEmail(apiKey, apiUrl, params.to, params.subject, params.html);
}

const createTravelInsuranceInternalEmailTemplate = (data: TravelInsuranceQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 180px;
    }
    .field-value {
      color: #1e293b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">🛡️ Nueva Solicitud de Cotización - Seguro de Viaje</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Asegura tu Viaje</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de solicitud: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">👤 Información del Cliente</div>
      <div class="field">
        <span class="field-label">Nombre Completo:</span>
        <span class="field-value">${data.fullName}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo Electrónico:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #dc2626;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:${data.phone}" style="color: #dc2626;">${data.phone}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Preferencia de Contacto:</span>
        <span class="field-value">${data.preferredContact}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🌍 Detalles del Viaje</div>
      <div class="field">
        <span class="field-label">Destino:</span>
        <span class="field-value"><strong>${data.destination}</strong></span>
      </div>
      <div class="field">
        <span class="field-label">Salida:</span>
        <span class="field-value">${data.startDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Regreso:</span>
        <span class="field-value">${data.endDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Número de Viajeros:</span>
        <span class="field-value">${data.numberOfTravelers} ${data.numberOfTravelers === '1' ? 'persona' : 'personas'}</span>
      </div>
      <div class="field">
        <span class="field-label">Tipo de Viaje:</span>
        <span class="field-value">${data.tripType}</span>
      </div>
      ${data.tripReason ? `
      <div class="field">
        <span class="field-label">Motivo del Viaje:</span>
        <span class="field-value">${data.tripReason}</span>
      </div>
      ` : ''}
    </div>

    <div class="section">
      <div class="section-title">👥 Perfil del Viajero</div>
      ${data.age ? `
      <div class="field">
        <span class="field-label">Edad Principal:</span>
        <span class="field-value">${data.age} años</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Condición Médica:</span>
        <span class="field-value">${data.medicalCondition === 'yes' ? 'Sí' : 'No'}</span>
      </div>
      ${data.medicalCondition === 'yes' && data.medicalDetails ? `
      <div class="field">
        <span class="field-label">Detalles:</span>
        <span class="field-value">${data.medicalDetails}</span>
      </div>
      ` : ''}
    </div>

    ${data.coverage && data.coverage.length > 0 ? `
    <div class="section">
      <div class="section-title">🛡️ Coberturas de Interés</div>
      <ul style="margin: 0; padding-left: 20px;">
        ${data.coverage.map(c => `<li style="color: #1e293b;">${c}</li>`).join('')}
      </ul>
    </div>
    ` : ''}

    ${data.observations ? `
    <div class="section">
      <div class="section-title">📝 Observaciones o Comentarios</div>
      <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488;">
        <p style="margin: 0; color: #1e293b; white-space: pre-wrap;">${data.observations}</p>
      </div>
    </div>
    ` : ''}

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createTravelInsuranceConfirmationEmailTemplate = (data: TravelInsuranceQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #dc2626;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 160px;
    }
    .field-value {
      color: #1e293b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .check-icon {
      font-size: 48px;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Cotización Recibida!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Asegura tu Viaje - ToursRed</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #dc2626; margin: 15px 0;">¡Tu Solicitud Ha Sido Recibida!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hola <strong>${data.fullName}</strong>,
      </p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hemos recibido tu solicitud de cotización de seguro de viaje.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <div class="field">
        <span class="field-label">Destino:</span>
        <span class="field-value"><strong>${data.destination}</strong></span>
      </div>
      <div class="field">
        <span class="field-label">Fechas:</span>
        <span class="field-value">${data.startDate} al ${data.endDate}</span>
      </div>
      <div class="field">
        <span class="field-label">Viajeros:</span>
        <span class="field-value">${data.numberOfTravelers}</span>
      </div>
      <div class="field">
        <span class="field-label">Tipo de Viaje:</span>
        <span class="field-value">${data.tripType}</span>
      </div>
    </div>

    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">
        Nuestro equipo especializado en seguros de viaje revisará tu solicitud y se pondrá en contacto contigo <strong>en breve</strong> con opciones personalizadas.
      </p>
      <p style="color: #475569; margin: 15px 0;">
        Si necesitas atención inmediata, puedes contactarnos directamente:
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📧 <a href="mailto:contacto@toursred.com" style="color: #dc2626;">contacto@toursred.com</a>
      </p>
    </div>

    ${data.observations ? `
    <div class="section">
      <div class="section-title">📝 Tus Observaciones</div>
      <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #0d9488;">
        <p style="margin: 0; color: #1e293b; white-space: pre-wrap;">${data.observations}</p>
      </div>
    </div>
    ` : ''}

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste esta cotización, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendTravelInsuranceQuoteEmail(
  data: TravelInsuranceQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Cotización Seguro de Viaje: ${data.destination} - ${data.fullName}`,
    createTravelInsuranceInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    'Cotización de Seguro de Viaje Recibida - ToursRed',
    createTravelInsuranceConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createTravelerServicesInternalEmailTemplate = (data: TravelerServicesRequestData): string => {
  const serviceTypeLabel = {
    itinerary: 'Armado de itinerario a la medida',
    package: 'Viaje o paquete a la medida',
    transport: 'Cotización de transporte',
  }[data.serviceType];

  let serviceDetails = '';

  if (data.serviceType === 'itinerary') {
    serviceDetails = `
      <div class="field">
        <span class="field-label">Destino(s):</span>
        <span class="field-value">${data.destinations || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Salida:</span>
        <span class="field-value">${data.startDate || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Regreso:</span>
        <span class="field-value">${data.endDate || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Viajeros:</span>
        <span class="field-value">${data.numberOfTravelers || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Presupuesto:</span>
        <span class="field-value">${data.budget || 'No especificado'}</span>
      </div>
      ${data.itineraryComments ? `
      <div class="field">
        <span class="field-label">Comentarios:</span>
        <span class="field-value">${data.itineraryComments}</span>
      </div>
      ` : ''}
    `;
  } else if (data.serviceType === 'package') {
    serviceDetails = `
      <div class="field">
        <span class="field-label">Salida:</span>
        <span class="field-value">${data.startDate || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Regreso:</span>
        <span class="field-value">${data.endDate || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Viajeros:</span>
        <span class="field-value">${data.numberOfTravelers || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Presupuesto:</span>
        <span class="field-value">${data.budget || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">¿Incluir vuelos?:</span>
        <span class="field-value">${
          data.includeFlights === 'yes' ? 'Sí' :
          data.includeFlights === 'no' ? 'No' :
          data.includeFlights === 'depends' ? 'Depende del precio' :
          'No especificado'
        }</span>
      </div>
      <div class="field">
        <span class="field-label">Categoría de hotel:</span>
        <span class="field-value">${
          data.hotelCategory === '3stars' ? '3 estrellas' :
          data.hotelCategory === '4stars' ? '4 estrellas' :
          data.hotelCategory === '5stars' ? '5 estrellas' :
          data.hotelCategory === 'boutique' ? 'Boutique / especial' :
          'No especificado'
        }</span>
      </div>
      ${data.packageComments ? `
      <div class="field">
        <span class="field-label">Comentarios:</span>
        <span class="field-value">${data.packageComments}</span>
      </div>
      ` : ''}
    `;
  } else if (data.serviceType === 'transport') {
    serviceDetails = `
      <div class="field">
        <span class="field-label">Tipo(s) de transporte:</span>
        <span class="field-value">${(data.transportTypes || []).join(', ') || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Origen:</span>
        <span class="field-value">${data.origin || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Destino:</span>
        <span class="field-value">${data.destination || 'No especificado'}</span>
      </div>
      <div class="field">
        <span class="field-label">Salida:</span>
        <span class="field-value">${data.transportStartDate || 'No especificado'}</span>
      </div>
      ${data.transportEndDate ? `
      <div class="field">
        <span class="field-label">Regreso:</span>
        <span class="field-value">${data.transportEndDate}</span>
      </div>
      ` : ''}
      <div class="field">
        <span class="field-label">Pasajeros:</span>
        <span class="field-value">${data.transportPassengers || 'No especificado'}</span>
      </div>
      ${data.transportComments ? `
      <div class="field">
        <span class="field-label">Comentarios:</span>
        <span class="field-value">${data.transportComments}</span>
      </div>
      ` : ''}
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-weight: 600;
      color: #475569;
      display: inline-block;
      width: 150px;
    }
    .field-value {
      color: #1e293b;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .timestamp {
      background: #f1f5f9;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 14px;
      color: #475569;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">✈️ Nueva Solicitud de Asesoría</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Servicios para Viajeros</p>
  </div>

  <div class="content">
    <div class="timestamp">
      📅 Fecha de solicitud: ${new Date().toLocaleDateString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>

    <div class="section">
      <div class="section-title">👤 Información del Cliente</div>
      <div class="field">
        <span class="field-label">Nombre:</span>
        <span class="field-value">${data.fullName}</span>
      </div>
      <div class="field">
        <span class="field-label">Correo:</span>
        <span class="field-value"><a href="mailto:${data.email}" style="color: #dc2626;">${data.email}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Teléfono:</span>
        <span class="field-value"><a href="tel:${data.phone}" style="color: #dc2626;">${data.phone}</a></span>
      </div>
      <div class="field">
        <span class="field-label">Contacto preferido:</span>
        <span class="field-value">${
          data.preferredContact === 'whatsapp' ? 'WhatsApp' :
          data.preferredContact === 'call' ? 'Llamada' :
          data.preferredContact === 'email' ? 'Correo' :
          'No especificado'
        }</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">🎯 Tipo de Servicio</div>
      <div class="field">
        <span class="field-label">Servicio:</span>
        <span class="field-value"><strong>${serviceTypeLabel}</strong></span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">📋 Detalles de la Solicitud</div>
      ${serviceDetails}
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
    </div>
  </div>
</body>
</html>
  `;
};

const createTravelerServicesConfirmationEmailTemplate = (data: TravelerServicesRequestData): string => {
  const serviceTypeLabel = {
    itinerary: 'Armado de itinerario a la medida',
    package: 'Viaje o paquete a la medida',
    transport: 'Cotización de transporte',
  }[data.serviceType];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
      background: white;
      padding: 15px;
      border-radius: 8px;
    }
    .content {
      background: #f8fafc;
      padding: 30px;
      border-radius: 0 0 8px 8px;
    }
    .welcome-box {
      background: white;
      padding: 30px;
      margin-bottom: 20px;
      border-radius: 8px;
      text-align: center;
      border: 2px solid #dc2626;
    }
    .section {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 8px;
      border-left: 4px solid #dc2626;
    }
    .section-title {
      color: #dc2626;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #fee2e2;
    }
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 2px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
    }
    .check-icon {
      font-size: 48px;
      color: #10b981;
    }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Solicitud Recibida!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Servicios para Viajeros - ToursRed</p>
  </div>

  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #dc2626; margin: 15px 0;">¡Tu Solicitud Ha Sido Recibida!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hola <strong>${data.fullName}</strong>,
      </p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">
        Hemos recibido tu solicitud de asesoría para ${serviceTypeLabel.toLowerCase()}.
      </p>
    </div>

    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <p style="color: #475569; margin: 0;">
        <strong>Servicio solicitado:</strong> ${serviceTypeLabel}
      </p>
      <p style="color: #475569; margin: 10px 0 0 0;">
        <strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString('es-MX')}
      </p>
    </div>

    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">
        Nuestro equipo de especialistas revisará tu solicitud y se pondrá en contacto contigo <strong>en breve</strong> con opciones personalizadas y presupuestos.
      </p>
      <p style="color: #475569; margin: 15px 0;">
        Si necesitas atención inmediata, puedes contactarnos:
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)
      </p>
      <p style="color: #475569; margin: 5px 0;">
        📧 <a href="mailto:contacto@toursred.com" style="color: #dc2626;">contacto@toursred.com</a>
      </p>
    </div>

    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
        Si no solicitaste esta asesoría, por favor ignora este correo.
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

export async function sendTravelerServicesRequestEmail(
  data: TravelerServicesRequestData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  const serviceTypeLabel = {
    itinerary: 'Armado de itinerario',
    package: 'Viaje o paquete',
    transport: 'Transporte',
  }[data.serviceType];

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Solicitud - ${serviceTypeLabel}: ${data.fullName}`,
    createTravelerServicesInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    'Solicitud de Asesoría Recibida - ToursRed',
    createTravelerServicesConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send confirmation email to user:', confirmationEmailResult.error);
  }

  return { success: true };
}

const createCarRentalInternalEmailTemplate = (data: CarRentalQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7f1d1d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626; }
    .section h3 { color: #dc2626; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; }
    .field { margin-bottom: 12px; }
    .field label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 4px; }
    .field value { color: #1e293b; font-size: 15px; display: block; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://toursred.com/logo.png" alt="ToursRed" class="logo" />
    <h1 style="margin: 0; font-size: 24px;">Nueva Solicitud de Renta de Auto</h1>
    <p style="margin: 5px 0 0; opacity: 0.8;">Recibida a través de ToursRed</p>
  </div>
  <div class="content">
    <div class="section">
      <h3>Datos del Solicitante</h3>
      <div class="field"><label>Nombre</label><value>${data.name}</value></div>
      <div class="field"><label>Correo</label><value>${data.email}</value></div>
      <div class="field"><label>Teléfono</label><value>${data.phone}</value></div>
    </div>
    <div class="section">
      <h3>Detalles de la Renta</h3>
      <div class="field"><label>Lugar de recogida</label><value>${data.pickupLocation}</value></div>
      ${data.pickupDate ? `<div class="field"><label>Fecha de recogida</label><value>${data.pickupDate}</value></div>` : ''}
      ${data.returnDate ? `<div class="field"><label>Fecha de devolución</label><value>${data.returnDate}</value></div>` : ''}
      <div class="field"><label>Número de personas</label><value>${data.numberOfPeople}</value></div>
      ${data.carPreference ? `<div class="field"><label>Tipo de vehículo preferido</label><value>${data.carPreference}</value></div>` : ''}
      ${data.additionalComments ? `<div class="field"><label>Comentarios adicionales</label><value>${data.additionalComments}</value></div>` : ''}
    </div>
  </div>
  <div class="footer"><p>ToursRed — Sistema de notificaciones internas</p></div>
</body>
</html>`;
};

const createCarRentalConfirmationEmailTemplate = (data: CarRentalQuoteData): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7f1d1d 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #dc2626; }
    .section h3 { color: #dc2626; margin: 0 0 15px 0; font-size: 16px; text-transform: uppercase; }
    .field { margin-bottom: 12px; }
    .field label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; display: block; margin-bottom: 4px; }
    .field value { color: #1e293b; font-size: 15px; display: block; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="https://toursred.com/logo.png" alt="ToursRed" class="logo" />
    <h1 style="margin: 0; font-size: 24px;">¡Solicitud Recibida!</h1>
    <p style="margin: 5px 0 0; opacity: 0.8;">Asesoría de Renta de Auto</p>
  </div>
  <div class="content">
    <p>Hola <strong>${data.name}</strong>,</p>
    <p>Hemos recibido tu solicitud de asesoría para renta de auto. Un asesor de ToursRed se pondrá en contacto contigo a la brevedad.</p>
    <div class="section">
      <h3>Resumen de tu solicitud</h3>
      <div class="field"><label>Lugar de recogida</label><value>${data.pickupLocation}</value></div>
      ${data.pickupDate ? `<div class="field"><label>Fecha de recogida</label><value>${data.pickupDate}</value></div>` : ''}
      ${data.returnDate ? `<div class="field"><label>Fecha de devolución</label><value>${data.returnDate}</value></div>` : ''}
      <div class="field"><label>Número de personas</label><value>${data.numberOfPeople}</value></div>
      ${data.carPreference ? `<div class="field"><label>Tipo de vehículo</label><value>${data.carPreference}</value></div>` : ''}
    </div>
    <p>Si tienes alguna duda, puedes responder este correo o visitar <a href="https://toursred.com" style="color: #dc2626;">toursred.com</a>.</p>
  </div>
  <div class="footer"><p>© ToursRed — Todos los derechos reservados</p></div>
</body>
</html>`;
};

function createEsimQuoteEmailTemplate(data: EsimQuoteData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0369a1 0%, #0891b2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #0891b2; }
    .section-title { color: #0369a1; font-size: 16px; font-weight: bold; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid #e0f2fe; }
    .field { margin-bottom: 10px; }
    .field-label { font-weight: 600; color: #475569; display: inline-block; width: 180px; }
    .field-value { color: #1e293b; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
    .timestamp { background: #f1f5f9; padding: 10px; border-radius: 4px; text-align: center; margin-bottom: 20px; font-size: 14px; color: #475569; }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin:0; font-size:24px;">Nueva Solicitud de Cotización eSIM</h1>
    <p style="margin:8px 0 0 0; opacity:0.9;">ToursRed - eSIM de Viaje</p>
  </div>
  <div class="content">
    <div class="timestamp">Fecha: ${new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
    <div class="section">
      <div class="section-title">Datos del Viaje</div>
      <div class="field"><span class="field-label">Destinos:</span><span class="field-value">${data.destinations}</span></div>
      ${data.travelDate ? `<div class="field"><span class="field-label">Fecha de viaje:</span><span class="field-value">${data.travelDate}</span></div>` : ''}
      ${data.dataNeeded ? `<div class="field"><span class="field-label">Datos necesarios:</span><span class="field-value">${data.dataNeeded}</span></div>` : ''}
    </div>
    <div class="section">
      <div class="section-title">Dispositivo</div>
      <div class="field"><span class="field-label">Modelo de celular:</span><span class="field-value">${data.phoneModel}</span></div>
    </div>
    <div class="section">
      <div class="section-title">Datos de Contacto</div>
      <div class="field"><span class="field-label">Nombre:</span><span class="field-value">${data.fullName}</span></div>
      <div class="field"><span class="field-label">Email:</span><span class="field-value"><a href="mailto:${data.email}" style="color:#2563eb;">${data.email}</a></span></div>
      <div class="field"><span class="field-label">WhatsApp:</span><span class="field-value"><a href="https://wa.me/${data.whatsapp.replace(/\D/g,'')}" style="color:#2563eb;">${data.whatsapp}</a></span></div>
    </div>
    ${data.observations ? `<div class="section"><div class="section-title">Observaciones</div><p style="color:#475569;">${data.observations}</p></div>` : ''}
    <div class="footer"><p>ToursRed &copy; ${new Date().getFullYear()}</p></div>
  </div>
</body>
</html>`;
}

function createEsimQuoteConfirmationTemplate(data: EsimQuoteData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0369a1 0%, #0891b2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 180px; height: auto; margin-bottom: 16px; background: white; padding: 12px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .highlight { background: #e0f2fe; border-left: 4px solid #0891b2; padding: 16px; border-radius: 4px; margin: 16px 0; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="180" style="display:block; max-width:180px; height:auto; margin:0 auto 16px auto;" />
    <h1 style="margin:0; font-size:24px;">¡Solicitud Recibida!</h1>
  </div>
  <div class="content">
    <p>Hola <strong>${data.fullName}</strong>,</p>
    <p>Hemos recibido tu solicitud de cotización para una eSIM de viaje. Nuestro equipo la revisará y se pondrá en contacto contigo muy pronto.</p>
    <div class="highlight">
      <strong>Resumen de tu solicitud:</strong><br/>
      Destinos: ${data.destinations}<br/>
      Dispositivo: ${data.phoneModel}<br/>
      ${data.dataNeeded ? `Datos necesarios: ${data.dataNeeded}<br/>` : ''}
    </div>
    <p>Te contactaremos por <strong>WhatsApp (${data.whatsapp})</strong> o por correo electrónico en las próximas horas hábiles.</p>
    <div class="footer"><p>ToursRed &copy; ${new Date().getFullYear()} | <a href="https://www.toursred.com.mx" style="color:#0369a1;">www.toursred.com.mx</a></p></div>
  </div>
</body>
</html>`;
}

export async function sendEsimQuoteEmail(
  data: EsimQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return { success: false, error: 'Email service not configured' };
  }

  const internalResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Cotización eSIM: ${data.destinations} - ${data.fullName}`,
    createEsimQuoteEmailTemplate(data)
  );

  if (!internalResult.success) return internalResult;

  const confirmationResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Solicitud Recibida! - Cotización eSIM de Viaje | ToursRed',
    createEsimQuoteConfirmationTemplate(data)
  );

  if (!confirmationResult.success) {
    console.error('Failed to send eSIM confirmation email:', confirmationResult.error);
  }

  return { success: true };
}

export async function sendCarRentalQuoteEmail(
  data: CarRentalQuoteData
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SMTP2GO_API_KEY;
  const apiUrl = process.env.SMTP2GO_API_URL;
  const recipientEmail = 'contacto@toursred.com';

  if (!apiKey || !apiUrl) {
    console.error('Missing SMTP2Go configuration');
    return { success: false, error: 'Email service not configured' };
  }

  const internalEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    recipientEmail,
    `Nueva Solicitud Renta de Auto: ${data.pickupLocation} - ${data.name}`,
    createCarRentalInternalEmailTemplate(data)
  );

  if (!internalEmailResult.success) {
    return internalEmailResult;
  }

  const confirmationEmailResult = await sendEmail(
    apiKey,
    apiUrl,
    data.email,
    '¡Solicitud Recibida! - Asesoría de Renta de Auto | ToursRed',
    createCarRentalConfirmationEmailTemplate(data)
  );

  if (!confirmationEmailResult.success) {
    console.error('Failed to send car rental confirmation email:', confirmationEmailResult.error);
  }

  return { success: true };
}

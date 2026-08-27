import { NextResponse } from 'next/server';
import { sendGenericEmail } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

const LOGO_URL = 'https://www.toursred.com.mx/logo.png';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const spamCheck = verifyAntiSpam(body);
    if (!spamCheck.success) {
      return NextResponse.json(
        { error: spamCheck.error || 'Verificación de seguridad fallida' },
        { status: 400 }
      );
    }

    if (!body.acceptContact || !body.acceptPrivacy) {
      return NextResponse.json(
        { error: 'Debes aceptar los consentimientos' },
        { status: 400 }
      );
    }

    const {
      agencyName,
      responsibleName,
      email,
      phone,
      address,
      agencyState,
      rntStatus,
      services,
      tourTypes,
      projectDescription,
      lang,
    } = body;

    const isSpanish = lang === 'es';

    let ip: string | undefined;
    let userAgent: string | undefined;
    try {
      ip = request.headers.get('x-forwarded-for') ?? undefined;
      userAgent = request.headers.get('user-agent') ?? undefined;
    } catch {
      // headers() may throw outside request context in some Next.js versions
    }

    const supabase = getSupabaseServerClient();
    const { data: dbRecord, error: dbError } = await supabase
      .schema('corporate').from('agency_support_submissions')
      .insert({
        agency_name: agencyName,
        responsible_name: responsibleName,
        email,
        phone,
        address: address || null,
        agency_state: agencyState || null,
        rnt_status: rntStatus || null,
        services: services || null,
        tour_types: tourTypes || null,
        project_description: projectDescription || null,
        lang: lang || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[agency-support] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    const subjectLine = isSpanish
      ? `Nueva solicitud de apoyo para agencia: ${agencyName}`
      : `New agency support request: ${agencyName}`;

    const agencyStateLabel = {
      starting: isSpanish ? 'Estoy por iniciar mi agencia' : 'About to start',
      informal: isSpanish ? 'Ya opero informalmente' : 'Operating informally',
      formal: isSpanish ? 'Tengo agencia formal constituida' : 'Formal agency',
    }[agencyState as string];

    const rntStatusLabel = {
      yes: isSpanish ? 'Sí' : 'Yes',
      no: isSpanish ? 'No' : 'No',
      'in-process': isSpanish ? 'En trámite' : 'In process',
    }[rntStatus as string];

    const servicesMap: { [key: string]: string } = {
      logo: isSpanish ? 'Diseño de logotipo' : 'Logo design',
      website: isSpanish ? 'Página web' : 'Website',
      rnt: isSpanish ? 'Trámite de RNT' : 'RNT process',
      sas: isSpanish ? 'Alta de agencia como SAS' : 'Agency registration as SAS',
      impi: isSpanish ? 'Registro de marca ante IMPI' : 'Trademark registration with IMPI',
      partner: isSpanish ? 'Integrarme como agencia aliada en ToursRed' : 'Become a partner agency',
    };

    const tourTypesMap: { [key: string]: string } = {
      local: isSpanish ? 'Tours locales' : 'Local tours',
      excursions: isSpanish ? 'Excursiones' : 'Excursions',
      national: isSpanish ? 'Viajes nacionales' : 'National trips',
      international: isSpanish ? 'Viajes internacionales' : 'International trips',
      specialized: isSpanish ? 'Experiencias especializadas' : 'Specialized experiences',
      undefined: isSpanish ? 'Aún no lo tengo definido' : 'Still not defined',
    };

    const servicesText = (services as string[])
      .map((s) => servicesMap[s] || s)
      .join(', ');

    const tourTypesText = (tourTypes as string[])
      .map((t) => tourTypesMap[t] || t)
      .join(', ');

    const htmlContent = `
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
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e5e7eb;
      border-top: none;
    }
    .section {
      margin-bottom: 25px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f3f4f6;
    }
    .section:last-child {
      border-bottom: none;
    }
    .section h3 {
      color: #dc2626;
      margin-top: 0;
      margin-bottom: 15px;
      font-size: 18px;
    }
    .info-row {
      margin-bottom: 10px;
    }
    .label {
      font-weight: 600;
      color: #4b5563;
      display: inline-block;
      min-width: 150px;
    }
    .value {
      color: #1f2937;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 24px;">${isSpanish ? 'Nueva Solicitud de Apoyo para Agencia' : 'New Agency Support Request'}</h1>
  </div>
  <div class="content">
    <div class="section">
      <h3>${isSpanish ? 'Datos de la Agencia' : 'Agency Information'}</h3>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Nombre de la Agencia:' : 'Agency Name:'}</span>
        <span class="value">${agencyName}</span>
      </div>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Nombre del Responsable:' : 'Responsible Person:'}</span>
        <span class="value">${responsibleName}</span>
      </div>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Correo:' : 'Email:'}</span>
        <span class="value"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></span>
      </div>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Teléfono:' : 'Phone:'}</span>
        <span class="value">${phone}</span>
      </div>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Dirección:' : 'Address:'}</span>
        <span class="value">${address}</span>
      </div>
    </div>

    <div class="section">
      <h3>${isSpanish ? 'Estado de la Agencia' : 'Agency Status'}</h3>
      <div class="info-row">
        <span class="label">${isSpanish ? 'Estado:' : 'Status:'}</span>
        <span class="value">${agencyStateLabel}</span>
      </div>
      ${agencyState === 'formal' ? `
      <div class="info-row">
        <span class="label">${isSpanish ? 'RNT:' : 'RNT:'}</span>
        <span class="value">${rntStatusLabel}</span>
      </div>
      ` : ''}
    </div>

    <div class="section">
      <h3>${isSpanish ? 'Servicios Solicitados' : 'Requested Services'}</h3>
      <div class="value">${servicesText}</div>
    </div>

    <div class="section">
      <h3>${isSpanish ? 'Tipos de Servicios a Ofrecer' : 'Types of Services to Offer'}</h3>
      <div class="value">${tourTypesText}</div>
    </div>

    <div class="section">
      <h3>${isSpanish ? 'Descripción del Proyecto' : 'Project Description'}</h3>
      <div class="value">${projectDescription || (isSpanish ? '(No especificado)' : '(Not specified)')}</div>
    </div>
  </div>
</body>
</html>
    `;

    const adminEmail = process.env.CONTACT_EMAIL || 'contacto@toursred.com';
    console.log('[agency-support-request] Sending admin email for submission:', recordId);
    const adminResult = await sendGenericEmail({
      to: adminEmail,
      subject: subjectLine,
      html: htmlContent,
    });

    if (!adminResult.success) {
      console.error('[agency-support-request] Admin email failed:', adminResult.error);
    }

    const confirmationHtml = isSpanish
      ? `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .welcome-box { background: white; padding: 30px; margin-bottom: 20px; border-radius: 8px; text-align: center; border: 2px solid #dc2626; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #dc2626; }
    .section-title { color: #dc2626; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fee2e2; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
    .check-icon { font-size: 48px; color: #10b981; }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">¡Solicitud Recibida!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Solicitud de Asesoría para Agencias - ToursRed</p>
  </div>
  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #dc2626; margin: 15px 0;">¡Tu Solicitud Ha Sido Recibida!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">Hola <strong>${responsibleName}</strong>,</p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">Hemos recibido tu solicitud de apoyo para tu agencia <strong>${agencyName}</strong>.</p>
    </div>
    <div class="section">
      <div class="section-title">📋 Resumen de tu Solicitud</div>
      <p style="color: #475569; margin: 0;"><strong>Agencia:</strong> ${agencyName}</p>
      <p style="color: #475569; margin: 10px 0 0 0;"><strong>Fecha de solicitud:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
    </div>
    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">¿Qué sigue ahora?</h3>
      <p style="color: #475569; margin: 15px 0;">Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo <strong>en breve</strong> con opciones personalizadas y presupuestos.</p>
      <p style="color: #dc2626; margin: 15px 0; font-weight: bold;">Este servicio no tiene costo.</p>
      <p style="color: #475569; margin: 15px 0;">Si necesitas atención inmediata, puedes contactarnos:</p>
      <p style="color: #475569; margin: 5px 0;">📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)</p>
      <p style="color: #475569; margin: 5px 0;">📧 <a href="mailto:${email}" style="color: #dc2626;">${email}</a></p>
    </div>
    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Red de Agencias de Viajes Aliadas</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Ciudad de México</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">Si no solicitaste esta asesoría, por favor ignora este correo.</p>
    </div>
  </div>
</body>
</html>
      `
      : `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .logo { max-width: 200px; height: auto; margin-bottom: 20px; background: white; padding: 15px; border-radius: 8px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
    .welcome-box { background: white; padding: 30px; margin-bottom: 20px; border-radius: 8px; text-align: center; border: 2px solid #dc2626; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #dc2626; }
    .section-title { color: #dc2626; font-size: 18px; font-weight: bold; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #fee2e2; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center; color: #64748b; font-size: 14px; }
    .check-icon { font-size: 48px; color: #10b981; }
  </style>
</head>
<body>
  <div class="header">
    <img src="${LOGO_URL}" alt="ToursRed" class="logo" width="200" style="display:block; max-width:200px; height:auto; margin:0 auto 20px auto;" />
    <h1 style="margin: 0; font-size: 28px;">Request Received!</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Agency Advisory Request - ToursRed</p>
  </div>
  <div class="content">
    <div class="welcome-box">
      <div class="check-icon">✓</div>
      <h2 style="color: #dc2626; margin: 15px 0;">Your Request Has Been Received!</h2>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">Hello <strong>${responsibleName}</strong>,</p>
      <p style="color: #475569; font-size: 16px; margin: 10px 0;">We have received your support request for your agency <strong>${agencyName}</strong>.</p>
    </div>
    <div class="section">
      <div class="section-title">📋 Request Summary</div>
      <p style="color: #475569; margin: 0;"><strong>Agency:</strong> ${agencyName}</p>
      <p style="color: #475569; margin: 10px 0 0 0;"><strong>Request date:</strong> ${new Date().toLocaleDateString('en-US')}</p>
    </div>
    <div style="background: white; padding: 25px; border-radius: 8px; text-align: center;">
      <h3 style="color: #1e293b; margin-top: 0;">What's Next?</h3>
      <p style="color: #475569; margin: 15px 0;">Our team will review your request and contact you <strong>shortly</strong> with personalized options and quotes.</p>
      <p style="color: #dc2626; margin: 15px 0; font-weight: bold;">This service is free.</p>
      <p style="color: #475569; margin: 15px 0;">If you need immediate assistance, you can contact us:</p>
      <p style="color: #475569; margin: 5px 0;">📞 <a href="https://wa.me/525547127668" style="color: #10b981; text-decoration: none;">+52 55 47127668</a> (WhatsApp)</p>
      <p style="color: #475569; margin: 5px 0;">📧 <a href="mailto:${email}" style="color: #dc2626;">${email}</a></p>
    </div>
    <div class="footer">
      <p style="margin: 0;"><strong>ToursRed</strong></p>
      <p style="margin: 5px 0;">Network of Allied Travel Agencies</p>
      <p style="margin: 5px 0;">📧 contacto@toursred.com | 📞 +52 55 47127668</p>
      <p style="margin: 5px 0; font-size: 12px;">Av. Homero 229-501, Polanco, Mexico City</p>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">If you did not request this advisory, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
      `;

    const confirmationResult = await sendGenericEmail({
      to: email,
      subject: isSpanish ? 'Solicitud recibida - ToursRed' : 'Request received - ToursRed',
      html: confirmationHtml,
    });

    if (!confirmationResult.success) {
      console.error('[agency-support-request] Confirmation email failed:', confirmationResult.error);
    }

    const emailSucceeded = adminResult.success;
    if (recordId) {
      await supabase
        .schema('corporate').from('agency_support_submissions')
        .update({
          email_status: emailSucceeded ? 'sent' : 'failed',
          email_error: emailSucceeded ? null : (adminResult.error || 'Unknown error'),
        })
        .eq('id', recordId);
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email,
      phone,
      contentId: 'agency-support',
      contentName: 'Solicitud de Apoyo para Agencia',
      ip,
      userAgent,
    });

    return NextResponse.json(
      { success: true, message: 'Request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing agency support request:', errorMessage, error);
    return NextResponse.json(
      { success: false, message: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

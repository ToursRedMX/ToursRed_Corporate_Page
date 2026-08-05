import { NextResponse } from 'next/server';
import { sendAgencyRegistrationEmail, AgencyFormData } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

const rfcRegex = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalCodeRegex = /^\d{5}$/;

function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push('Los apellidos son requeridos y deben tener al menos 2 caracteres');
  }

  if (!data.agencyName || data.agencyName.trim().length < 3) {
    errors.push('El nombre comercial de la agencia es requerido');
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.push('El teléfono debe tener al menos 10 dígitos');
  }

  if (!data.website || data.website.trim().length < 5) {
    errors.push('El sitio web o Facebook es requerido');
  }

  if (!data.rfc || !rfcRegex.test(data.rfc.toUpperCase())) {
    errors.push('El RFC no tiene un formato válido');
  }

  if (!data.legalName || data.legalName.trim().length < 3) {
    errors.push('La razón social es requerida');
  }

  if (!data.street || data.street.trim().length < 3) {
    errors.push('La calle es requerida');
  }

  if (!data.exteriorNumber || data.exteriorNumber.trim().length < 1) {
    errors.push('El número exterior es requerido');
  }

  if (!data.neighborhood || data.neighborhood.trim().length < 2) {
    errors.push('La colonia es requerida');
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.push('La ciudad es requerida');
  }

  if (!data.state || data.state.trim().length < 2) {
    errors.push('El estado es requerido');
  }

  if (!data.postalCode || !postalCodeRegex.test(data.postalCode)) {
    errors.push('El código postal debe tener 5 dígitos');
  }

  if (!data.country || data.country.trim().length < 2) {
    errors.push('El país es requerido');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const spamCheck = verifyAntiSpam(body);
    if (!spamCheck.success) {
      return NextResponse.json(
        { success: false, error: spamCheck.error || 'Verificación de seguridad fallida' },
        { status: 400 }
      );
    }

    if (!body.acceptContact || !body.acceptPrivacy) {
      return NextResponse.json(
        {
          success: false,
          error: 'Debes aceptar los consentimientos',
        },
        { status: 400 }
      );
    }

    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos inválidos',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    const formData: AgencyFormData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      agencyName: body.agencyName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      website: body.website.trim(),
      rfc: body.rfc.trim().toUpperCase(),
      rnt: body.rnt ? body.rnt.trim() : undefined,
      legalName: body.legalName.trim(),
      street: body.street.trim(),
      exteriorNumber: body.exteriorNumber.trim(),
      interiorNumber: body.interiorNumber ? body.interiorNumber.trim() : undefined,
      neighborhood: body.neighborhood.trim(),
      city: body.city.trim(),
      state: body.state.trim(),
      postalCode: body.postalCode.trim(),
      country: body.country.trim(),
    };

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
      .schema('corporate').from('agency_registration_submissions')
      .insert({
        first_name: formData.firstName,
        last_name: formData.lastName,
        agency_name: formData.agencyName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        rfc: formData.rfc,
        rnt: formData.rnt || null,
        legal_name: formData.legalName,
        street: formData.street,
        exterior_number: formData.exteriorNumber,
        interior_number: formData.interiorNumber || null,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        postal_code: formData.postalCode,
        country: formData.country,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[agency-registration] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[agency-registration] Sending email for submission:', recordId);
    const result = await sendAgencyRegistrationEmail(formData);

    if (!result.success) {
      console.error('[agency-registration] Email failed:', result.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('agency_registration_submissions')
          .update({ email_status: 'failed', email_error: result.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[agency-registration] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('agency_registration_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: formData.email,
      phone: formData.phone,
      contentId: 'agency-registration',
      contentName: 'Registro Agencia Aliada',
      ip,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: 'Registro enviado exitosamente',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing agency registration:', errorMessage, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error al procesar tu registro. Por favor, intenta más tarde.',
      },
      { status: 500 }
    );
  }
}

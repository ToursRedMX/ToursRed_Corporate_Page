import { NextResponse } from 'next/server';
import { sendCarRentalQuoteEmail, CarRentalQuoteData } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push('El teléfono debe contener exactamente 10 dígitos');
  }

  if (!data.pickupLocation || data.pickupLocation.trim().length < 2) {
    errors.push('El lugar de recogida es requerido');
  }

  if (!data.numberOfPeople || data.numberOfPeople < 1) {
    errors.push('El número de personas debe ser al menos 1');
  }

  return { valid: errors.length === 0, errors };
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

    const validation = validateFormData(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', errors: validation.errors },
        { status: 400 }
      );
    }

    const formData: CarRentalQuoteData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      pickupLocation: body.pickupLocation.trim(),
      pickupDate: body.pickupDate ? body.pickupDate.trim() : undefined,
      returnDate: body.returnDate ? body.returnDate.trim() : undefined,
      numberOfPeople: parseInt(body.numberOfPeople),
      carPreference: body.carPreference ? body.carPreference.trim() : undefined,
      additionalComments: body.additionalComments ? body.additionalComments.trim() : undefined,
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
      .schema('corporate').from('rent_a_car_quote_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        pickup_location: formData.pickupLocation,
        pickup_date: formData.pickupDate || null,
        return_date: formData.returnDate || null,
        number_of_people: formData.numberOfPeople,
        car_preference: formData.carPreference || null,
        additional_comments: formData.additionalComments || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[rent-a-car-quote] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[rent-a-car-quote] Sending email for submission:', recordId);
    const result = await sendCarRentalQuoteEmail(formData);

    if (!result.success) {
      console.error('[rent-a-car-quote] Email failed:', result.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('rent_a_car_quote_submissions')
          .update({ email_status: 'failed', email_error: result.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[rent-a-car-quote] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('rent_a_car_quote_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: formData.email,
      phone: formData.phone,
      contentId: 'rent-a-car',
      contentName: 'Renta de Auto',
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true, message: 'Solicitud enviada exitosamente' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing car rental quote:', errorMessage, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta más tarde.',
      },
      { status: 500 }
    );
  }
}

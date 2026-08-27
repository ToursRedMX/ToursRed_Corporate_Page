import { NextResponse } from 'next/server';
import { sendExoticcaQuoteEmail } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

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

    const { name, email, phone, tripName, travelDate, numberOfPeople, additionalComments } = body;

    if (!name || !email || !phone || !tripName || !numberOfPeople) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 }
      );
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Teléfono debe tener 10 dígitos' },
        { status: 400 }
      );
    }

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
      .schema('corporate').from('exoticca_quote_submissions')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        trip_name: tripName.trim(),
        travel_date: travelDate || null,
        number_of_people: parseInt(numberOfPeople),
        additional_comments: additionalComments || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[exoticca-quote] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[exoticca-quote] Sending email for submission:', recordId);
    const result = await sendExoticcaQuoteEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      tripName: tripName.trim(),
      travelDate: travelDate?.trim(),
      numberOfPeople: parseInt(numberOfPeople),
      additionalComments: additionalComments?.trim(),
    });

    if (!result.success) {
      console.error('[exoticca-quote] Email failed:', result.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('exoticca_quote_submissions')
          .update({ email_status: 'failed', email_error: result.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[exoticca-quote] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('exoticca_quote_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email,
      phone,
      contentId: 'exoticca',
      contentName: 'Exoticca Viajes',
      ip,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: 'Cotización enviada exitosamente',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in exoticca-quote API:', errorMessage, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error al procesar tu cotización. Por favor, intenta más tarde.',
      },
      { status: 500 }
    );
  }
}

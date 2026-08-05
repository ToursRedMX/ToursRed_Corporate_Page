import { NextResponse } from 'next/server';
import { sendTravelInsuranceQuoteEmail } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const spamCheck = verifyAntiSpam(data);
    if (!spamCheck.success) {
      return NextResponse.json(
        { error: spamCheck.error || 'Verificación de seguridad fallida' },
        { status: 400 }
      );
    }

    const requiredFields = ['destination', 'fullName', 'email', 'phone'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
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
      .schema('corporate').from('travel_insurance_quote_submissions')
      .insert({
        destination: data.destination,
        start_date: data.startDate || null,
        end_date: data.endDate || null,
        number_of_travelers: data.numberOfTravelers || null,
        trip_type: data.tripType || null,
        trip_reason: data.tripReason || null,
        age: data.age || null,
        medical_condition: data.medicalCondition || null,
        medical_details: data.medicalDetails || null,
        coverage: data.coverage || null,
        observations: data.observations || null,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        preferred_contact: data.preferredContact || null,
        lang: data.lang || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[travel-insurance-quote] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[travel-insurance-quote] Sending email for submission:', recordId);
    const emailResult = await sendTravelInsuranceQuoteEmail(data);

    if (!emailResult.success) {
      console.error('[travel-insurance-quote] Email failed:', emailResult.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('travel_insurance_quote_submissions')
          .update({ email_status: 'failed', email_error: emailResult.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[travel-insurance-quote] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('travel_insurance_quote_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: data.email,
      phone: data.phone,
      contentId: 'travel-insurance',
      contentName: 'Seguro de Viaje',
      ip,
      userAgent,
    });

    return NextResponse.json(
      { success: true, message: 'Quote request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing travel insurance quote:', errorMessage, error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu cotización. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

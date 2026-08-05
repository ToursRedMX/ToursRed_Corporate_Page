import { NextResponse } from 'next/server';
import { sendTravelerServicesRequestEmail } from '@/lib/smtp2go';
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

    const requiredFields = ['fullName', 'email', 'phone', 'serviceType'];
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
      .schema('corporate').from('traveler_services_submissions')
      .insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        preferred_contact: data.preferredContact || null,
        service_type: data.serviceType,
        destinations: data.destinations || null,
        start_date: data.startDate || null,
        end_date: data.endDate || null,
        number_of_travelers: data.numberOfTravelers || null,
        budget: data.budget || null,
        itinerary_comments: data.itineraryComments || null,
        include_flights: data.includeFlights || null,
        hotel_category: data.hotelCategory || null,
        package_comments: data.packageComments || null,
        transport_types: data.transportTypes || null,
        origin: data.origin || null,
        destination: data.destination || null,
        transport_start_date: data.transportStartDate || null,
        transport_end_date: data.transportEndDate || null,
        transport_passengers: data.transportPassengers || null,
        transport_comments: data.transportComments || null,
        accept_contact: data.acceptContact || false,
        accept_privacy: data.acceptPrivacy || false,
        lang: data.lang || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[traveler-services] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[traveler-services-request] Sending email for submission:', recordId);
    const emailResult = await sendTravelerServicesRequestEmail(data);

    if (!emailResult.success) {
      console.error('[traveler-services-request] Email failed:', emailResult.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('traveler_services_submissions')
          .update({ email_status: 'failed', email_error: emailResult.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[traveler-services-request] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('traveler_services_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: data.email,
      phone: data.phone,
      contentId: 'traveler-services',
      contentName: 'Servicios al Viajero',
      ip,
      userAgent,
    });

    return NextResponse.json(
      { success: true, message: 'Request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing traveler services request:', errorMessage, error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

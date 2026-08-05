import { NextResponse } from 'next/server';
import { sendEsimQuoteEmail } from '@/lib/smtp2go';
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

    const requiredFields = ['fullName', 'email', 'whatsapp', 'destinations', 'phoneModel'];
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
      .schema('corporate').from('esim_quote_submissions')
      .insert({
        full_name: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        destinations: data.destinations,
        travel_date: data.travelDate || null,
        data_needed: data.dataNeeded || null,
        phone_model: data.phoneModel,
        observations: data.observations || null,
        lang: data.lang || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[esim-quote] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[esim-quote] Sending email for submission:', recordId);
    const emailResult = await sendEsimQuoteEmail(data);

    if (!emailResult.success) {
      console.error('[esim-quote] Email failed:', emailResult.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('esim_quote_submissions')
          .update({ email_status: 'failed', email_error: emailResult.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[esim-quote] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('esim_quote_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: data.email,
      phone: data.whatsapp,
      contentId: 'esim',
      contentName: 'eSIM',
      ip,
      userAgent,
    });

    return NextResponse.json(
      { success: true, message: 'eSIM quote request sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing eSIM quote:', errorMessage, error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu cotización. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

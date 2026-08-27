import { NextResponse } from 'next/server';
import { sendContactFormEmail, ContactFormData } from '@/lib/smtp2go';
import { verifyAntiSpam } from '@/lib/antispam';
import { sendTikTokServerEvent } from '@/lib/tiktokServerEvents';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFormData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('El nombre es requerido y debe tener al menos 2 caracteres');
  }

  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!data.subject || data.subject.trim().length < 2) {
    errors.push('El asunto es requerido');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
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

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      subject: body.subject.trim(),
      message: body.message.trim(),
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
      .schema('corporate').from('contact_submissions')
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[contact] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    console.log('[contact] Sending email for submission:', recordId);
    const result = await sendContactFormEmail(formData);

    if (!result.success) {
      console.error('[contact] Email failed:', result.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('contact_submissions')
          .update({ email_status: 'failed', email_error: result.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      console.log('[contact] Email sent successfully for submission:', recordId);
      if (recordId) {
        await supabase
          .schema('corporate').from('contact_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Contact',
      email: formData.email,
      phone: formData.phone,
      contentId: 'contact',
      contentName: 'Formulario de Contacto',
      ip,
      userAgent,
    });

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado exitosamente',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing contact form:', errorMessage, error);
    return NextResponse.json(
      {
        success: false,
        error: 'Ocurrió un error al enviar tu mensaje. Por favor, intenta más tarde.',
      },
      { status: 500 }
    );
  }
}

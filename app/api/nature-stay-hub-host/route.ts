import { NextResponse } from 'next/server';
import { sendGenericEmail } from '@/lib/smtp2go';
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

    if (!data.acceptContact || !data.acceptPrivacy) {
      return NextResponse.json(
        { error: 'Debes aceptar los consentimientos' },
        { status: 400 }
      );
    }

    const {
      hostName,
      hostEmail,
      hostPhone,
      accommodationName,
      accommodationType,
      accommodationTypeOther,
      location,
      capacity,
      naturalEnvironment,
      socialLinks,
      googleMapsUrl,
    } = data;

    const accommodationTypeDisplay =
      accommodationType === 'otro'
        ? `Otro (${accommodationTypeOther})`
        : accommodationType === 'cabana'
        ? 'Cabaña'
        : accommodationType === 'glamping'
        ? 'Glamping'
        : accommodationType === 'camping'
        ? 'Camping'
        : accommodationType;

    const naturalEnvironmentDisplay =
      naturalEnvironment === 'yes' ? 'Sí' : 'No';

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
      .schema('corporate').from('nature_stay_hub_submissions')
      .insert({
        host_name: hostName,
        host_email: hostEmail,
        host_phone: hostPhone,
        accommodation_name: accommodationName,
        accommodation_type: accommodationType || null,
        accommodation_type_other: accommodationTypeOther || null,
        location: location || null,
        capacity: capacity || null,
        natural_environment: naturalEnvironment || null,
        social_links: socialLinks || null,
        google_maps_url: googleMapsUrl || null,
        email_status: 'pending',
        ip_address: ip,
        user_agent: userAgent,
      })
      .select('id')
      .maybeSingle();

    if (dbError) {
      console.error('[nature-stay-hub] DB insert error:', dbError.message);
    }

    const recordId = dbRecord?.id;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #14b8a6;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background-color: #f9f9f9;
              padding: 20px;
              border-radius: 0 0 8px 8px;
            }
            .section {
              margin-bottom: 25px;
              background-color: white;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .section-title {
              color: #14b8a6;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 10px;
              border-bottom: 2px solid #14b8a6;
              padding-bottom: 5px;
            }
            .field {
              margin-bottom: 12px;
            }
            .field-label {
              font-weight: bold;
              color: #555;
            }
            .field-value {
              margin-top: 2px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nuevo Registro de Anfitrión</h1>
              <p>Nature Stay Hub</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Datos del Anfitrión</div>
                <div class="field">
                  <div class="field-label">Nombre completo:</div>
                  <div class="field-value">${hostName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Correo electrónico:</div>
                  <div class="field-value">${hostEmail}</div>
                </div>
                <div class="field">
                  <div class="field-label">Teléfono / WhatsApp:</div>
                  <div class="field-value">${hostPhone}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Datos del Alojamiento</div>
                <div class="field">
                  <div class="field-label">Nombre del alojamiento:</div>
                  <div class="field-value">${accommodationName}</div>
                </div>
                <div class="field">
                  <div class="field-label">Tipo de alojamiento:</div>
                  <div class="field-value">${accommodationTypeDisplay}</div>
                </div>
                <div class="field">
                  <div class="field-label">Ubicación (Estado / Municipio):</div>
                  <div class="field-value">${location}</div>
                </div>
                <div class="field">
                  <div class="field-label">Número aproximado de unidades o capacidad:</div>
                  <div class="field-value">${capacity}</div>
                </div>
                <div class="field">
                  <div class="field-label">¿Se encuentra en un entorno natural?:</div>
                  <div class="field-value">${naturalEnvironmentDisplay}</div>
                </div>
              </div>

              ${socialLinks || googleMapsUrl ? `
                <div class="section">
                  <div class="section-title">Información Adicional</div>
                  ${socialLinks ? `
                    <div class="field">
                      <div class="field-label">Enlaces a redes sociales / plataformas:</div>
                      <div class="field-value">${socialLinks}</div>
                    </div>
                  ` : ''}
                  ${googleMapsUrl ? `
                    <div class="field">
                      <div class="field-label">Ubicación en Google Maps:</div>
                      <div class="field-value"><a href="${googleMapsUrl}">${googleMapsUrl}</a></div>
                    </div>
                  ` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('[nature-stay-hub-host] Sending admin email for submission:', recordId);
    const result = await sendGenericEmail({
      to: 'contacto@naturestayhub.com',
      subject: `Nuevo Registro de Anfitrión - ${accommodationName}`,
      html: emailHtml,
    });

    if (!result.success) {
      console.error('[nature-stay-hub-host] Admin email failed:', result.error);
      if (recordId) {
        await supabase
          .schema('corporate').from('nature_stay_hub_submissions')
          .update({ email_status: 'failed', email_error: result.error || 'Unknown error' })
          .eq('id', recordId);
      }
    } else {
      const confirmationHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #14b8a6;
                color: white;
                padding: 30px 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .header h1 {
                margin: 0 0 5px 0;
                font-size: 24px;
              }
              .header p {
                margin: 0;
                opacity: 0.9;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px 20px;
                border-radius: 0 0 8px 8px;
              }
              .greeting {
                font-size: 18px;
                margin-bottom: 15px;
              }
              .summary {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                box-shadow: 0 2px 4px rgba(0,0,0,0.08);
              }
              .summary-title {
                color: #14b8a6;
                font-weight: bold;
                font-size: 16px;
                margin-bottom: 12px;
                border-bottom: 2px solid #14b8a6;
                padding-bottom: 5px;
              }
              .field {
                margin-bottom: 8px;
              }
              .field-label {
                font-weight: bold;
                color: #555;
                display: inline;
              }
              .field-value {
                color: #333;
                display: inline;
              }
              .footer {
                text-align: center;
                margin-top: 25px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #888;
                font-size: 13px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nature Stay Hub</h1>
                <p>Registro recibido</p>
              </div>
              <div class="content">
                <p class="greeting">Hola ${hostName},</p>
                <p>Hemos recibido tu registro como anfitrión en Nature Stay Hub. Nuestro equipo revisará tu información y se pondrá en contacto contigo pronto.</p>

                <div class="summary">
                  <div class="summary-title">Resumen de tu registro</div>
                  <div class="field">
                    <span class="field-label">Alojamiento:</span>
                    <span class="field-value">${accommodationName}</span>
                  </div>
                  <div class="field">
                    <span class="field-label">Tipo:</span>
                    <span class="field-value">${accommodationTypeDisplay}</span>
                  </div>
                  <div class="field">
                    <span class="field-label">Ubicación:</span>
                    <span class="field-value">${location}</span>
                  </div>
                  <div class="field">
                    <span class="field-label">Capacidad:</span>
                    <span class="field-value">${capacity}</span>
                  </div>
                </div>

                <p>Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este correo.</p>

                <div class="footer">
                  <p>Nature Stay Hub - Alojamientos naturales en México</p>
                  <p>Este correo fue enviado porque registraste tu alojamiento en nuestra plataforma.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      await sendGenericEmail({
        to: hostEmail,
        subject: `Tu registro en Nature Stay Hub ha sido recibido - ${accommodationName}`,
        html: confirmationHtml,
      });

      if (recordId) {
        await supabase
          .schema('corporate').from('nature_stay_hub_submissions')
          .update({ email_status: 'sent' })
          .eq('id', recordId);
      }
    }

    sendTikTokServerEvent({
      eventName: 'Lead',
      email: hostEmail,
      phone: hostPhone,
      contentId: 'naturestay-host',
      contentName: 'NatureStay Hub Anfitrion',
      ip,
      userAgent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error processing Nature Stay Hub host registration:', errorMessage, error);
    return NextResponse.json(
      { error: 'Ocurrió un error al procesar tu registro. Por favor, intenta más tarde.' },
      { status: 500 }
    );
  }
}

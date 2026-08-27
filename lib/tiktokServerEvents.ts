import { createHash } from 'crypto';

const PIXEL_ID = 'D92LMIRC77UBI6V960KG';
const API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

function sha256(value: string): string {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

type TikTokServerEventOptions = {
  eventName: string;
  email: string;
  phone?: string;
  contentId: string;
  contentName: string;
  ip?: string;
  userAgent?: string;
};

export async function sendTikTokServerEvent(options: TikTokServerEventOptions): Promise<void> {
  const token = process.env.TIKTOK_ACCESS_TOKEN;
  if (!token) return;

  const { eventName, email, phone, contentId, contentName, ip, userAgent } = options;

  const user: Record<string, string> = {
    email: sha256(email),
  };
  if (phone) user.phone_number = sha256(phone);
  if (ip) user.ip = ip;
  if (userAgent) user.user_agent = userAgent;

  const payload = {
    pixel_code: PIXEL_ID,
    events: [
      {
        event: eventName,
        event_time: Math.floor(Date.now() / 1000),
        user,
        properties: {
          contents: [
            {
              content_id: contentId,
              content_type: 'product',
              content_name: contentName,
            },
          ],
          currency: 'MXN',
          value: 0,
        },
      },
    ],
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': token,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    console.error('[TikTok eAPI] Error sending server event:', err);
  }
}

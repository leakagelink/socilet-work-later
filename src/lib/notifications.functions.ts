import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';

const SendInput = z.object({
  userIds: z.array(z.string().uuid()).optional(), // if empty/undefined => broadcast to all
  title: z.string().min(1).max(120),
  body: z.string().min(1).max(500),
  type: z.string().default('general'),
  data: z.record(z.string(), z.any()).optional(),
});

/**
 * Send a push notification to specific users (or all users if userIds omitted).
 * Admin-only. Sends via FCM HTTP v1 API + records in `notifications` table.
 */
export const sendPushNotification = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SendInput.parse(input))
  .handler(async ({ data, context }) => {
    // Authorize: must be admin
    const { data: isAdmin } = await context.supabase.rpc('has_role', {
      _user_id: context.userId,
      _role: 'admin',
    });
    if (!isAdmin) {
      throw new Error('Forbidden: admin only');
    }

    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');

    // Get target tokens
    let tokensQuery = supabaseAdmin
      .from('user_push_tokens')
      .select('user_id, fcm_token, platform');

    if (data.userIds && data.userIds.length > 0) {
      tokensQuery = tokensQuery.in('user_id', data.userIds);
    }

    const { data: tokens, error: tokensError } = await tokensQuery;
    if (tokensError) throw new Error(tokensError.message);

    if (!tokens || tokens.length === 0) {
      return { ok: true, sent: 0, message: 'No registered devices' };
    }

    // Insert notification records
    const targetUserIds = data.userIds && data.userIds.length > 0
      ? data.userIds
      : Array.from(new Set(tokens.map((t) => t.user_id)));

    const records = targetUserIds.map((uid) => ({
      user_id: uid,
      title: data.title,
      body: data.body,
      type: data.type,
      data: data.data ?? null,
    }));

    await supabaseAdmin.from('notifications').insert(records);

    // Send via FCM HTTP v1 API
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      return {
        ok: false,
        sent: 0,
        message: 'FIREBASE_SERVICE_ACCOUNT_JSON secret not configured yet. Notification records saved to DB.',
      };
    }

    try {
      const sa = JSON.parse(serviceAccountJson);
      const accessToken = await getFcmAccessToken(sa);
      const projectId = sa.project_id;

      let sentCount = 0;
      const errors: string[] = [];

      for (const t of tokens) {
        try {
          const res = await fetch(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: {
                  token: t.fcm_token,
                  notification: { title: data.title, body: data.body },
                  data: data.data
                    ? Object.fromEntries(
                        Object.entries(data.data).map(([k, v]) => [k, String(v)])
                      )
                    : undefined,
                  android: {
                    priority: 'HIGH',
                    notification: { sound: 'default', default_vibrate_timings: true },
                  },
                },
              }),
            }
          );

          if (res.ok) {
            sentCount++;
          } else {
            const errText = await res.text();
            errors.push(`token ${t.fcm_token.slice(0, 10)}: ${errText.slice(0, 100)}`);
            // If token invalid, remove it
            if (res.status === 404 || errText.includes('UNREGISTERED')) {
              await supabaseAdmin
                .from('user_push_tokens')
                .delete()
                .eq('fcm_token', t.fcm_token);
            }
          }
        } catch (e) {
          errors.push(String(e).slice(0, 100));
        }
      }

      return { ok: true, sent: sentCount, total: tokens.length, errors: errors.slice(0, 5) };
    } catch (e) {
      return { ok: false, sent: 0, message: `FCM error: ${String(e).slice(0, 200)}` };
    }
  });

/**
 * Get OAuth2 access token for FCM HTTP v1 API using service account.
 * Uses JWT signed with RS256.
 */
async function getFcmAccessToken(sa: {
  client_email: string;
  private_key: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const b64url = (input: string | Uint8Array) => {
    const b64 = typeof input === 'string'
      ? btoa(input)
      : btoa(String.fromCharCode(...input));
    return b64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;

  // Import PEM private key
  const pem = sa.private_key.replace(/\\n/g, '\n');
  const pemBody = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');
  const binaryDer = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(unsigned)
  );

  const jwt = `${unsigned}.${b64url(new Uint8Array(signature))}`;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(`OAuth2 token failed: ${await tokenRes.text()}`);
  }
  const tokenData = (await tokenRes.json()) as { access_token: string };
  return tokenData.access_token;
});

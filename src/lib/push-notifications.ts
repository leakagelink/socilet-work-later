import { Capacitor } from '@capacitor/core';
import { PushNotifications, type Token } from '@capacitor/push-notifications';
import { Device } from '@capacitor/device';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Register the device for push notifications and save FCM token to backend.
 * Should be called after user logs in.
 */
export async function registerPushNotifications(userId: string): Promise<void> {
  // Only run on native platforms (Android/iOS APK)
  if (!Capacitor.isNativePlatform()) {
    console.log('[Push] Web platform — skipping native push registration');
    return;
  }

  try {
    // Request permission
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      console.warn('[Push] Permission not granted');
      return;
    }

    // Register listeners BEFORE calling register()
    await PushNotifications.removeAllListeners();

    await PushNotifications.addListener('registration', async (token: Token) => {
      console.log('[Push] FCM Token received:', token.value.slice(0, 20) + '...');
      await saveTokenToBackend(userId, token.value);
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('[Push] Registration error:', err);
    });

    await PushNotifications.addListener('pushNotificationReceived', (notification) => {
      // Foreground notification
      toast(notification.title || 'Notification', {
        description: notification.body,
      });
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', (action) => {
      // User tapped a notification
      const data = action.notification.data;
      console.log('[Push] Notification tapped:', data);
      // Navigate based on data.route if provided
      if (data?.route) {
        window.location.href = data.route;
      }
    });

    // Register with FCM
    await PushNotifications.register();
  } catch (error) {
    console.error('[Push] Setup failed:', error);
  }
}

async function saveTokenToBackend(userId: string, fcmToken: string): Promise<void> {
  try {
    const info = await Device.getInfo();
    const platform = Capacitor.getPlatform() as 'android' | 'ios' | 'web';

    const { error } = await supabase
      .from('user_push_tokens')
      .upsert(
        {
          user_id: userId,
          fcm_token: fcmToken,
          platform,
          device_info: {
            model: info.model,
            osVersion: info.osVersion,
            manufacturer: info.manufacturer,
          },
        },
        { onConflict: 'user_id,fcm_token' }
      );

    if (error) {
      console.error('[Push] Failed to save token:', error);
    } else {
      console.log('[Push] Token saved to backend');
    }
  } catch (e) {
    console.error('[Push] saveTokenToBackend error:', e);
  }
}

export async function unregisterPushNotifications(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await PushNotifications.removeAllListeners();
  } catch (e) {
    console.error('[Push] unregister error:', e);
  }
}

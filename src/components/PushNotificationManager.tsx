import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { supabase } from '@/integrations/supabase/client';
import { registerPushNotifications } from '@/lib/push-notifications';

/**
 * Re-registers push tokens for users who have ALREADY granted notification
 * permission. Does NOT trigger a fresh permission prompt — that only happens
 * when the user explicitly taps "Enable notifications" on /notifications,
 * which shows our in-app rationale first (Play Store policy requirement).
 */
export function PushNotificationManager() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    let mounted = true;

    const tryRegisterIfAlreadyGranted = async (userId: string) => {
      try {
        const status = await PushNotifications.checkPermissions();
        if (status.receive === 'granted') {
          await registerPushNotifications(userId);
        }
      } catch (e) {
        console.error('[Push] check failed', e);
      }
    };

    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data.user) tryRegisterIfAlreadyGranted(data.user.id);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        tryRegisterIfAlreadyGranted(session.user.id);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}

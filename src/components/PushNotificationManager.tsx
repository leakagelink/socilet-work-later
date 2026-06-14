import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { registerPushNotifications } from '@/lib/push-notifications';

/**
 * Hooks into auth state and registers push notifications when user signs in.
 * Only active on native (Capacitor) platforms.
 */
export function PushNotificationManager() {
  useEffect(() => {
    let mounted = true;

    // Register on initial mount if already signed in
    supabase.auth.getUser().then(({ data }) => {
      if (mounted && data.user) {
        registerPushNotifications(data.user.id).catch(console.error);
      }
    });

    // Re-register on sign in
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        registerPushNotifications(session.user.id).catch(console.error);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return null;
}

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.socilet.app',
  appName: 'Socilet',
  webDir: 'dist/client',
  server: {
    // TanStack Start is SSR — the mobile app loads the published site in a WebView.
    // For local dev with live-reload, replace url with your preview URL.
    url: 'https://socilet-work-later.lovable.app',
    cleartext: false,
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.socilet.app',
  appName: 'Socilet',
  webDir: 'dist',
  server: {
    // For live-reload during development, uncomment and set your dev URL:
    // url: 'https://<your-preview-url>.lovable.app',
    // cleartext: true,
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

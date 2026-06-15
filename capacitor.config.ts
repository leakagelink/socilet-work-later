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
    SplashScreen: {
      // Native splash dikhti hai jab tak WebView website load nahi karta
      launchShowDuration: 3000,
      launchAutoHide: false, // hum manually hide karenge jab app ready ho
      backgroundColor: '#0F172A', // app ke background se match
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: true,
      androidSpinnerStyle: 'large',
      spinnerColor: '#3B82F6',
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;

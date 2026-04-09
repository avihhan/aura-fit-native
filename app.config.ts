import type { ExpoConfig } from 'expo/config';

/**
 * Android: usesCleartextTraffic allows http:// WebView URLs (local Vite, LAN).
 * Use HTTPS-only WEB_APP_URL for production store builds when possible.
 *
 * iOS: NSAllowsLocalNetworking helps reach host machine on local network during dev.
 */
const config: ExpoConfig = {
  name: 'aura-fit-native',
  slug: 'aura-fit-native',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  newArchEnabled: true,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsLocalNetworking: true,
      },
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
  web: {
    favicon: './assets/favicon.png',
  },
};

export default config;

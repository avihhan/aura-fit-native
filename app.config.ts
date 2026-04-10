import type { ExpoConfig } from 'expo/config';

/**
 * Android: usesCleartextTraffic allows http:// WebView URLs (local Vite, LAN).
 * Use HTTPS-only WEB_APP_URL for production store builds when possible.
 *
 * iOS: NSAllowsLocalNetworking helps reach host machine on local network during dev.
 */
const config: ExpoConfig = {
  name: 'aura-fit-native',
  // Must match the slug of the Expo project linked by extra.eas.projectId (see expo.fyi/eas-project-id).
  slug: 'aura-fit',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  // WebView + Expo Go is more stable with the old architecture on many devices.
  newArchEnabled: false,
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    bundleIdentifier: 'com.avihhan.aurafitnative',
    supportsTablet: true,
    infoPlist: {
      NSAppTransportSecurity: {
        NSAllowsLocalNetworking: true,
      },
    },
  },
  android: {
    package: 'com.avihhan.aurafitnative',
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
  extra: {
    eas: {
      projectId: '81e7c345-25dc-466a-ab91-f69242f5263b',
    },
  },
};

export default config;

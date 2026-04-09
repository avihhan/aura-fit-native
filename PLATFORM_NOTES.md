# Platform notes (local HTTP / WebView)

## Android

- **Cleartext:** Configured with `expo-build-properties` so `http://10.0.2.2:3001` and LAN `http://` URLs load in WebView during development.
- **Emulator WebView:** The SPA’s origin is `http://10.0.2.2:3001`. Ensure Flask CORS includes that origin (default in `aura-fit/server`) and set `VITE_API_URL=http://10.0.2.2:5000` in the mobile web `.env` when testing API from the emulator.

## iOS

- **Local networking:** `NSAllowsLocalNetworking` in `app.config.ts` helps reach the dev machine on a LAN for physical devices.
- **Simulator:** `http://localhost:3001` for Vite on the same Mac usually works for the WebView URL.

## Production

- Use **HTTPS** for both the deployed mobile web (`EXPO_PUBLIC_WEB_APP_URL`) and the API (e.g. Cloud Run). Disable reliance on cleartext in release builds by shipping HTTPS-only URLs.

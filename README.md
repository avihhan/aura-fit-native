# aura-fit-native

React Native shell (Expo) that loads the **Aura Fit mobile web app** in a `WebView`. API calls are configured in the monorepo’s Vite app (`VITE_API_URL`), not in this repo.

Keep this repo as a **sibling** of the `aura-fit` monorepo. See [REPOSITORY_LAYOUT.md](REPOSITORY_LAYOUT.md).

## Prerequisites

- Node.js 18+
- For device builds: Android Studio / Xcode (or EAS Build)

## Setup

```bash
cp .env.example .env
# Edit EXPO_PUBLIC_WEB_APP_URL for your machine (see table below)
npm install
```

## Run

```bash
npm start
# then press a (Android) or i (iOS), or scan QR with Expo Go
```

## `EXPO_PUBLIC_WEB_APP_URL` (WebView)

This is the **only** URL the native shell controls: where the SPA is hosted.

| Setup | Typical value |
|--------|----------------|
| iOS Simulator + Vite on Mac | `http://localhost:3001` |
| Android Emulator + Vite on host PC | `http://10.0.2.2:3001` |
| Physical phone + Vite on same Wi‑Fi | `http://<your-PC-LAN-IP>:3001` (Vite must listen on `0.0.0.0`) |
| Production | `https://…` where the built mobile web is deployed |

## API URL (not set here)

The Flask base URL is **`VITE_API_URL`** in [`aura-fit/mobile`](../aura-fit/mobile) (see that folder’s `.env.example`). Use `http://localhost:5000` for local desktop, `http://10.0.2.2:5000` for Android emulator WebView, or your **Cloud Run** HTTPS URL for production builds.

Add any extra web origins to the server’s **`CORS_ORIGINS`** (comma-separated). Default server config already allows localhost and `10.0.2.2` for ports 3000/3001.

## Local HTTP and native platforms

- **Android:** Cleartext HTTP is enabled via `expo-build-properties` (`usesCleartextTraffic`) so `http://` dev URLs work. Prefer **HTTPS** for store releases.
- **iOS:** `NSAllowsLocalNetworking` is set in [app.config.ts](app.config.ts) to help local/LAN dev. Production should use HTTPS for `EXPO_PUBLIC_WEB_APP_URL`.

## Production builds (EAS)

See **[docs/EAS_BUILD_AND_SUBMIT.md](docs/EAS_BUILD_AND_SUBMIT.md)** for `eas login`, `eas init`, setting **`EXPO_PUBLIC_WEB_APP_URL`** on EAS (not only local `.env`), `eas build`, and `eas submit` to Play / App Store.

Quick commands after setup:

```bash
npm run eas:build:android
npm run eas:submit:android
```

## Related repos

- [aura-fit](../aura-fit) — Flask API, Vite mobile web, admin portal

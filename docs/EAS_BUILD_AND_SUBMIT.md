# EAS Build and store submission

Use this flow so **`EXPO_PUBLIC_WEB_APP_URL`** is set on EAS servers at bundle time (not only from your laptop’s `.env`).

## Prerequisites

1. An [Expo](https://expo.dev) account.
2. **Android:** Google Play Console app (paid developer account).
3. **iOS:** Apple Developer Program membership; Mac optional if you use only EAS cloud builds for iOS.

## One-time: link this repo to an EAS project

GitHub integration on expo.dev does **not** automatically set **`extra.eas.projectId`** on your computer. You must link the same **Project ID** locally once.

### You already created the project on expo.dev (your case)

1. Open [expo.dev](https://expo.dev) → select **aura-fit-native** (or your project name).
2. Go to **Project settings** (or **General**) and copy **Project ID** (a UUID like `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).

From the `aura-fit-native` folder, with the same Expo account you used on the website:

```bash
npx eas login
npx eas init --id YOUR_PROJECT_ID_HERE --force
```

`--force` applies the link without the “create a new project?” prompt. This writes **`extra.eas.projectId`** into `app.config.ts` (or merges it).

Then run:

```bash
npm run eas:build:android
```

### New project (no dashboard project yet)

```bash
npx eas login
npx eas init
```

Accept creating/linking when prompted; that also sets **`extra.eas.projectId`**.

### After linking

Set a stable **Android application ID** and **iOS bundle identifier** before your first store build (in `app.config.ts` under `android.package` and `ios.bundleIdentifier`). Changing them later requires a new listing or careful migration.

## Set `EXPO_PUBLIC_WEB_APP_URL` for production builds

`.env` is not uploaded to EAS Build (and should stay gitignored). Configure the URL in one of these ways:

### Option A — Expo website (recommended for teams)

1. Open [expo.dev](https://expo.dev) → your project → **Environment variables**.
2. Add **`EXPO_PUBLIC_WEB_APP_URL`** for the **production** environment with your HTTPS mobile-web URL.

Ensure the **production** build profile uses that environment (EAS associates variables with the environment name matching your workflow).

### Option B — EAS CLI

```bash
npx eas env:create --name EXPO_PUBLIC_WEB_APP_URL --value https://your-mobile-web.example.com --environment production --scope project
```

Adjust flags if your `eas-cli` version shows different syntax (`npx eas env:create --help`).

### Option C — `eas.json` (simple, URL is public)

You can add an `env` block under `build.production` in `eas.json`:

```json
"production": {
  "env": {
    "EXPO_PUBLIC_WEB_APP_URL": "https://your-mobile-web.example.com"
  }
}
```

Only do this if you are fine committing that URL to git.

## Build

```bash
# Android (AAB for Play Store — configured in eas.json)
npm run eas:build:android

# iOS (IPA for App Store / TestFlight)
npm run eas:build:ios

# Both
npm run eas:build:all
```

Follow the links in the terminal to track builds and download artifacts when finished.

## Submit to stores

After a successful production build:

**Android (Play Console)**

```bash
npm run eas:submit:android
```

First time: `eas submit` will ask for a Google Service Account JSON or Play Console credentials; [Expo’s submit docs](https://docs.expo.dev/submit/android/) describe the setup.

**iOS (App Store Connect)**

```bash
npm run eas:submit:ios
```

First time: configure Apple ID, app-specific password or API key, and bundle ID in App Store Connect as documented by Expo.

## CI (GitHub Actions, etc.)

In CI, do **not** rely on a checked-in `.env`. Use:

- EAS **access token**: `EXPO_TOKEN` in CI secrets, and
- Environment variables configured on Expo for **production**, or inject `EXPO_PUBLIC_*` via `eas.json` / EAS env.

Example:

```bash
npx eas build --platform android --profile production --non-interactive
```

See [EAS Build with GitHub Actions](https://docs.expo.dev/build-reference/github-actions/).

## Checklist before shipping

- [ ] Mobile web deployed to HTTPS; URL matches **`EXPO_PUBLIC_WEB_APP_URL`** used in the native build.
- [ ] **`aura-fit/mobile`** built with **`VITE_API_URL`** pointing at production API.
- [ ] Flask **`CORS_ORIGINS`** includes your mobile web origin.
- [ ] Version/build numbers incremented per store rules (EAS can manage **remote** app version source — see `eas.json` `appVersionSource`).

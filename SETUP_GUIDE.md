# Green Legacy Mobile App - Setup & Run Guide

This is a production-quality React Native CLI mobile app for the Green Legacy NGO with a separate mock backend server for local development.

## Project Structure

```
green-legacy-app-base-code-/
├── App.tsx                     # Main app entry
├── package.json               # Mobile app dependencies
├── tsconfig.json             # TypeScript config
├── navigation/               # Navigation stacks & tabs
│   ├── RootNavigator.tsx
│   └── MainTabNavigator.tsx
├── contexts/                 # Global state (Auth, Donations)
│   ├── AuthContext.tsx
│   └── DonationsContext.tsx
├── components/               # Reusable UI components
│   ├── AnimatedButton.tsx
│   ├── AppHeader.tsx
│   ├── MetricCard.tsx
│   ├── DonationCard.tsx
│   └── CarouselDot.tsx
├── screens/                  # App screens
│   ├── OnboardingScreen.tsx
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── RewardsScreen.tsx
│   ├── DonateScreen.tsx (protected)
│   ├── DonationSuccessScreen.tsx
│   ├── AboutScreen.tsx
│   ├── NotificationsScreen.tsx
│   ├── ImpactScreen.tsx
│   ├── ContactScreen.tsx
│   ├── MediaScreen.tsx
│   └── MoreScreen.tsx
└── server/                   # Mock backend (Express + TypeScript)
    ├── src/
    │   ├── index.ts          # Server entry point
    │   ├── routes.ts         # API endpoints (/auth, /donations, /stats)
    │   ├── data.ts           # In-memory data store + seed helpers
    │   └── seedCli.ts        # CLI for seeding/clearing demo data
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

## Prerequisites

- Node.js 16+ (check with `node -v`)
- npm or yarn
- Android SDK / Xcode (for running the native app)
- Android emulator or device connected via USB

## Installation & Setup

### 1. Install Root Dependencies (Mobile App)

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm install --legacy-peer-deps
```

This installs React, React Native, navigation, AsyncStorage, and build tools.

### 2. Install Server Dependencies

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm install
```

This installs Express, TypeScript, ts-node-dev, and utilities for the mock API server.

## Running the App

### Option A: Run Server Only (Seeded with Demo Data)

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start:seed
```

Server will start at `http://localhost:4000` and seed 6 demo donations.

### Option B: Run Server (No Auto-Seed)

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start
```

Then manually seed via CLI (in a separate terminal):

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run seed -- seed 8          # Seed 8 donations
npm run seed -- clear           # Clear all donations
```

### Option C: Run React Native App

In a new PowerShell terminal (keep the server running):

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npx react-native run-android
```

For iOS:
```powershell
npx react-native run-ios
```

The app will open the onboarding screen. Press "Get Started" to access the Main tabs.

## Features

### Mobile App
- **Onboarding**: 3 slides with animated carousel dots.
- **Auth**: Mock Google login (persisted via AsyncStorage).
- **Screens**: Home, About, Donate (protected), Dashboard, Rewards, More, Notifications, etc.
- **Animations**: Button press effects, metric card fades, donation card scales, animated unread dot.
- **State Management**: AuthContext (user + login) and DonationsContext (donations list + computed stats).
- **Protected Routes**: DonateScreen & Dashboard redirect to LoginScreen if not logged in.

### Mock Server
- **Endpoints**:
  - `POST /api/auth/google` → Mock login (returns user + token)
  - `GET /api/donations` → List donations
  - `POST /api/donations` → Add donation (called by DonateScreen)
  - `GET /api/stats` → Aggregated stats (trees, oxygen, CO2, points)
  - `POST /api/seed` → Seed demo donations

- **Data**: In-memory store; data resets on server restart. TODO: persist to JSON/DB for longer sessions.

## API Integration

### From Mobile App to Server

Contexts (AuthContext, DonationsContext) use `fetch()` to call:
- `http://10.0.2.2:4000/api` (Android emulator)
- `http://localhost:4000/api` (iOS simulator)
- `http://<your-machine-ip>:4000/api` (physical device)

To change the base URL for a physical device, edit:
- `contexts/AuthContext.tsx` (line 3)
- `contexts/DonationsContext.tsx` (line 3)

Replace `10.0.2.2` with your PC's LAN IP, e.g., `192.168.1.10`.

## Authentication & Persistence

- **Login**: Mock button on LoginScreen calls `auth.login()` → calls mock `/auth/google` endpoint.
- **Persistence**: AsyncStorage stores the user JSON on login; app loads it on restart.
- **Logout**: Removes user from AsyncStorage.

**TODO**: Replace with real OAuth2 flow and SecureStore for tokens.

## Donations & State

- **Adding Donations**: DonateScreen form → `addDonation()` → `/api/donations POST` → refreshes stats → navigates to DonationSuccessScreen.
- **Stats Calculation**: Server computes trees, oxygen (10 kg/tree/year), CO₂ (21 kg/tree/year), and Green Points (1 tree = 10 pts; 2–3 = 25 pts each; 4–5 = 50 pts each).
- **Tier Logic**: Points vary by donation size (implemented in `server/src/data.ts`).

## Troubleshooting

### `npm install` fails with peer dependency errors
Use `--legacy-peer-deps`:
```powershell
npm install --legacy-peer-deps
```

### Server won't start ("Cannot find module 'express'")
Ensure you ran `npm install` in the `server/` folder:
```powershell
cd server
npm install
npm run start
```

### App crashes with "Cannot find module '@react-native-async-storage/async-storage'"
Install AsyncStorage:
```powershell
npm install @react-native-async-storage/async-storage
```

### Android emulator can't reach server at `10.0.2.2`
Ensure server is running on `localhost:4000` on your PC and the emulator can access it. If not, use your PC's LAN IP instead.

### "Command not found: npx"
Ensure Node.js & npm are installed:
```powershell
node -v
npm -v
```

## Development Workflow

1. **Start Server** (one terminal):
   ```powershell
   cd server
   npm run start:seed
   ```

2. **Start RN Dev Server** (another terminal):
   ```powershell
   npm start
   ```

3. **Run App** (third terminal or press `a` in dev server):
   ```powershell
   npx react-native run-android
   ```

4. **Edit Code**: Changes auto-reload (Fast Refresh).

## Next Steps / TODOs

- Replace mock auth with real Google Sign-In (use `@react-native-google-signin/google-signin`).
- Integrate real payment gateway for donations (Stripe, PayU, etc.).
- Persist server data to a database (SQLite, MongoDB) or JSON file.
- Add SecureStore for token storage instead of AsyncStorage.
- Implement backend authentication (JWT tokens, session management).
- Add E2E tests (Detox) and unit tests (Jest).
- Deploy to Play Store (generate signed APK/AAB).

## Support

For issues or questions, refer to:
- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [React Native AsyncStorage](https://react-native-async-storage.github.io/async-storage)

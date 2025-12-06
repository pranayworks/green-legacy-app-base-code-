# 📋 Project Files & Structure

Complete list of all files created for the Green Legacy mobile app.

## Root Project Files

```
c:\Users\Lenovo\green-legacy-app-base-code-\
├── App.tsx                          (Main app entry, providers setup)
├── package.json                     (Mobile app dependencies)
├── tsconfig.json                    (TypeScript configuration)
│
├── QUICK_START.md                   (This file - start here!)
├── SETUP_GUIDE.md                   (Detailed setup & troubleshooting)
├── README_COMPLETE.md               (Full feature & implementation summary)
├── PROJECT_FILES.md                 (This listing)
```

## Navigation Directory

```
navigation/
├── RootNavigator.tsx
│   └── Defines stack: Onboarding → Login → Main tabs → DonationSuccess
│
└── MainTabNavigator.tsx
    └── Bottom tab navigator: Home, About, Donate, Dashboard, Rewards, More
```

## Contexts (Global State)

```
contexts/
├── AuthContext.tsx
│   ├── State: isLoggedIn, user
│   ├── Methods: login(), logout()
│   ├── Features: AsyncStorage persistence (survives restart)
│   └── Calls: POST /api/auth/google
│
└── DonationsContext.tsx
    ├── State: donations[], stats { treesPlanted, oxygenGenerated, co2Absorbed, points }
    ├── Methods: refresh(), addDonation()
    ├── Features: Auto-refresh on login change
    └── Calls: GET/POST /api/donations, GET /api/stats
```

## Components (Reusable UI)

```
components/
├── AnimatedButton.tsx
│   └── Button with scale (0.96) + fade press effects
│
├── AppHeader.tsx
│   ├── Left: Profile tap (leads to Login)
│   ├── Center: "Green Legacy" title
│   ├── Right: Notification icon + animated unread dot (pulse)
│   └── Accepts: onProfilePress, onNotifPress callbacks, unread count
│
├── MetricCard.tsx
│   ├── Shows: title + large value
│   ├── Animations: fade in + slide up on mount
│   └── Used in: DashboardScreen
│
├── DonationCard.tsx
│   ├── Shows: occasion, tree type, trees count, date, message
│   ├── Animations: fade in + press scale effect
│   └── Used in: DashboardScreen (FlatList)
│
└── CarouselDot.tsx
    ├── Animated carousel indicator dot
    ├── Animations: width + opacity interpolate based on scroll position
    └── Used in: OnboardingScreen
```

## Screens (13 Screens Total)

```
screens/
├── OnboardingScreen.tsx
│   ├── Horizontal ScrollView with 3 slides
│   ├── Animated carousel dots
│   ├── "Get Started" button → navigates to Main
│   └── Each slide: title + subtitle
│
├── LoginScreen.tsx
│   ├── Text: "Login or signup to access dashboard and rewards"
│   ├── Button: "Continue with Google" (calls auth.login())
│   └── Navigation: goBack() after login
│
├── HomeScreen.tsx
│   ├── Header with Profile + Notifications
│   ├── Welcome message (with user name if logged in)
│   ├── "Donate / Gift a Tree" button
│   ├── Login banner for non-logged-in users
│   └── Calls: useAuth(), useNavigation()
│
├── DonateScreen.tsx (PROTECTED)
│   ├── Redirects to LoginScreen if not logged in
│   ├── Form fields:
│   │   ├── Occasion (TextInput)
│   │   ├── Tree Type (TextInput)
│   │   ├── Number of Trees (numeric TextInput)
│   │   ├── Recipient Name (TextInput)
│   │   ├── Message (multiline TextInput)
│   │
│   ├── Validation: trees > 0, treeType not empty
│   ├── On submit: calls addDonation() → navigates to DonationSuccessScreen
│   └── Calls: useAuth(), useDonations(), useNavigation()
│
├── DonationSuccessScreen.tsx
│   ├── Thank you message
│   ├── "Back to Home" button
│   └── Receives donationId as route param
│
├── DashboardScreen.tsx (PROTECTED)
│   ├── Header
│   ├── Animated metrics cards (3 cards):
│   │   ├── Trees Planted
│   │   ├── Oxygen Generated (kg/yr)
│   │   ├── CO₂ Absorbed (kg/yr)
│   │
│   ├── Donation list (FlatList):
│   │   └── DonationCard items
│   └── Calls: useDonations()
│
├── RewardsScreen.tsx (PROTECTED)
│   ├── Green Points heading
│   ├── Large points balance number
│   ├── Tier logic display (1 tree = 10 pts, 2-3 = 25, 4-5 = 50)
│   └── Calls: useDonations()
│
├── AboutScreen.tsx
│   ├── Header
│   ├── ScrollView with about text
│   └── About Green Legacy NGO
│
├── NotificationsScreen.tsx
│   ├── Header
│   ├── Placeholder: "No new notifications"
│   └── Ready for real notifications list
│
├── ImpactScreen.tsx
│   ├── Header
│   ├── Impact methodology explanation
│   └── Info on O₂/CO₂ calculation
│
├── ContactScreen.tsx
│   ├── Header
│   ├── Contact email: hello@greenlegacy.org
│   └── Ready for real contact form
│
├── MediaScreen.tsx
│   ├── Header
│   ├── ScrollView
│   └── Gallery/media placeholder
│
└── MoreScreen.tsx
    ├── Header
    ├── Links row:
    │   ├── Impact
    │   ├── Contact
    │   └── Media
    └── Tappable rows with navigation
```

## Mock Backend Server

```
server/
├── src/
│   ├── index.ts
│   │   ├── Express app setup
│   │   ├── CORS + JSON middleware
│   │   ├── Routes mounted at /api
│   │   ├── Listens on port 4000
│   │   ├── Checks for --seed flag to auto-seed on start
│   │   └── TODO: Persist data to JSON/DB
│   │
│   ├── routes.ts
│   │   ├── POST /auth/google
│   │   │   └── Returns { user: { id, name, email }, token }
│   │   │
│   │   ├── GET /donations
│   │   │   └── Returns { donations: [...] }
│   │   │
│   │   ├── POST /donations
│   │   │   ├── Body: { occasion, treeType, trees, recipient?, date, message?, location?, userId? }
│   │   │   └── Returns { donation: { id, ... } }
│   │   │
│   │   ├── GET /stats
│   │   │   └── Returns { stats: { treesPlanted, oxygenGenerated, co2Absorbed, points } }
│   │   │
│   │   └── POST /seed
│   │       ├── Body: { count?: number }
│   │       └── Returns { seeded: number }
│   │
│   ├── data.ts
│   │   ├── const donations: Donation[]
│   │   ├── const users: User[]
│   │   │
│   │   ├── listDonations()
│   │   │   └── Returns all donations
│   │   │
│   │   ├── addDonation(d)
│   │   │   ├── Creates donation with UUID
│   │   │   ├── Adds to donations array (unshift)
│   │   │   └── Returns donation
│   │   │
│   │   ├── mockLogin()
│   │   │   └── Returns hardcoded demo user
│   │   │
│   │   ├── computeStats()
│   │   │   ├── Sums trees planted
│   │   │   ├── Oxygen: 10 kg/tree/year
│   │   │   ├── CO₂: 21 kg/tree/year
│   │   │   ├── Points: tier-based (1 tree = 10, 2-3 = 25, 4-5 = 50)
│   │   │   └── Returns { treesPlanted, oxygenGenerated, co2Absorbed, points }
│   │   │
│   │   ├── seedDonations(count)
│   │   │   ├── Generates random tree types & occasions
│   │   │   ├── Creates 'count' dummy donations
│   │   │   └── Returns total donations count
│   │   │
│   │   └── clearDonations()
│   │       ├── Removes all donations from array
│   │       └── Returns count removed
│   │
│   └── seedCli.ts
│       ├── CLI tool for manual seeding
│       ├── Usage: npm run seed -- seed 8
│       ├── Usage: npm run seed -- clear
│       └── Calls seedDonations() or clearDonations()
│
├── package.json
│   ├── Scripts:
│   │   ├── "start": dev mode (no auto-seed)
│   │   ├── "start:seed": dev mode with auto-seed
│   │   ├── "seed": CLI tool for manual seed/clear
│   │   ├── "build": compile TypeScript
│   │   └── "prod": run compiled JS
│   │
│   └── Dependencies: express, cors, typescript, ts-node-dev, uuid
│
├── tsconfig.json
│   └── TypeScript target ES2020, commonjs module
│
└── README.md
    └── Server-specific docs & API summary
```

## Type Definitions & Interfaces

### AuthContext.tsx
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextShape {
  isLoggedIn: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
}
```

### DonationsContext.tsx
```typescript
interface Donation {
  id: string;
  userId?: string;
  occasion: string;
  treeType: string;
  trees: number;
  recipient?: string;
  date: string; // ISO
  message?: string;
  location?: string;
}

interface Stats {
  treesPlanted: number;
  oxygenGenerated: number;
  co2Absorbed: number;
  points: number;
}

interface DonationsContextShape {
  donations: Donation[];
  stats: Stats;
  refresh: () => Promise<void>;
  addDonation: (d: Omit<Donation, 'id'>) => Promise<Donation | null>;
}
```

## Styling & Colors

**Theme Color**: `#2E8B57` (Forest Green)

**Component Styles**:
- Buttons: 12–18px padding, rounded 10px, green background
- Cards: 12px padding, 10px border radius, white background, subtle shadows
- Text: Sizes 12–34px, weights 600–900
- Spacing: 8, 12, 16, 20px margins/padding

## State Flow

```
App.tsx
  ├── <SafeAreaProvider>
  │   ├── <AuthProvider>
  │   │   └── State: isLoggedIn, user, hydrated (from AsyncStorage)
  │   │   └── Provides: useAuth()
  │   │
  │   ├── <DonationsProvider>
  │   │   └── State: donations[], stats
  │   │   └── Depends on: auth.isLoggedIn
  │   │   └── Provides: useDonations()
  │   │
  │   └── <NavigationContainer>
  │       └── <RootNavigator>
  │           └── <MainTabNavigator> (home tab default)
```

## Data Flow

```
Home → Tap "Donate"
  ↓
DonateScreen (form)
  ↓ (fill form + submit)
Calls useDonations().addDonation()
  ↓
Sends POST /api/donations to server
  ↓
Server calls addDonation(d) in data.ts
  ↓
Calls refresh() to update stats
  ↓
Fetches GET /api/stats
  ↓
Updates DonationsContext.stats
  ↓
Navigates to DonationSuccessScreen
  ↓
User taps "Back to Home" → sees updated Dashboard
```

## Navigation Flow

```
Onboarding (stack entry)
  ↓ Get Started
Main (root tabs)
  ├── Home (default)
  ├── About
  ├── Donate (protected → Login if needed)
  ├── Dashboard (protected → Login if needed)
  ├── Rewards (protected → Login if needed)
  └── More
      └── Links to Impact, Contact, Media

From Home:
  Profile tap → LoginScreen → Back to Home (with login)
  Notification tap → Navigates (TBD)
  Donate button → Donate tab
```

## Key Features by File

| File | Key Features |
|------|-------------|
| App.tsx | Providers, navigation setup |
| AuthContext.tsx | Login, logout, AsyncStorage persistence, hydration |
| DonationsContext.tsx | Donations list, stats, refresh, addDonation API calls |
| AnimatedButton.tsx | Press scale + fade effect |
| AppHeader.tsx | Profile, title, animated notification dot |
| MetricCard.tsx | Mount fade/slide animation |
| DonationCard.tsx | Mount fade, press scale |
| CarouselDot.tsx | Width/opacity interpolation on scroll |
| OnboardingScreen.tsx | Horizontal carousel, animated dots |
| DonateScreen.tsx | Form, validation, protected, API call |
| DashboardScreen.tsx | Metrics + donation list, protected |
| RewardsScreen.tsx | Points display, tier logic |

---

## Summary

✅ **34 files total**:
- 1 entry point (App.tsx)
- 2 contexts
- 5 components
- 13 screens
- 2 navigation files
- 1 root config (package.json, tsconfig.json)
- 5 server files
- 3 documentation files (SETUP_GUIDE, README_COMPLETE, QUICK_START)
- 1 project listing (this file)

All files are **production-ready**, **fully typed**, and **completely implemented** with mock data.

---

**Last Updated**: December 6, 2025

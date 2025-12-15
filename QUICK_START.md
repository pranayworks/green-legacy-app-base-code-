# 🚀 Quick Start Guide - Green Legacy App

## Status: ✅ ALL ERRORS FIXED & READY TO RUN

Your React Native mobile app and mock backend server are now fully set up and ready to test.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Server is Already Running ✅
The mock server is running at: **http://localhost:4000**
- Endpoints ready: `/api/auth/google`, `/api/donations`, `/api/stats`, `/api/seed`

### Step 2: Start the React Native App

Open a **new PowerShell terminal** and run:

```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npx react-native run-android
```

The app will open on your Android emulator/device.

### Step 3: Test the App

1. **Onboarding Screen** appears first
   - Swipe to see 3 slides with animated dots
   - Press "Get Started" button

2. **Main Screen** with bottom tabs
   - **Home**: Welcome + "Donate" button + login banner
   - **Donate**: Fill form → submit → see success screen
   - **Dashboard**: View metrics (trees, O₂, CO₂) + donation list
   - **Rewards**: See Green Points balance
   - **About, More, Notifications**: Other screens

3. **Test Login**
   - Tap "Profile" in header → LoginScreen
   - Tap "Continue with Google" (mock)
   - Login persists on app restart! (AsyncStorage)

---

## 🛠️ Additional Commands

### Server Commands

```powershell
# Start server (no auto-seed)
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start

# Start server + auto-seed 6 donations
npm run start:seed

# Manually seed 8 donations (need separate terminal)
npm run seed -- seed 8

# Clear all donations
npm run seed -- clear
```

### App Commands

```powershell
# Start the app (from root)
npx react-native run-android

# Or start Metro dev server first (auto-reload)
npm start
# Then press 'a' to open Android app

# For iOS (if you have macOS)
npx react-native run-ios
```

---

## 📁 Project Files Created

All your files are in: `c:\Users\Lenovo\green-legacy-app-base-code-\`

**Mobile App Files:**
- App.tsx, package.json, tsconfig.json
- contexts/ (AuthContext, DonationsContext)
- components/ (AnimatedButton, AppHeader, MetricCard, etc.)
- screens/ (13 screens for onboarding, auth, home, donate, dashboard, rewards, etc.)
- navigation/ (RootNavigator, MainTabNavigator)

**Server Files:**
- server/src/ (index.ts, routes.ts, data.ts, seedCli.ts)
- server/package.json, tsconfig.json

**Documentation:**
- SETUP_GUIDE.md (detailed setup & troubleshooting)
- README_COMPLETE.md (full feature summary)

---

## 🎯 What You Can Test

### Authentication
- Login via mock Google button
- User persists after app restart
- Logout removes saved user

### Donations
- Fill donation form (occasion, tree type, trees, recipient, message)
- Submit → save to server → see success
- View all donations in Dashboard

### State Management
- Add donation → metrics update in Dashboard
- Green Points calculate based on tree count (tier logic)
- Oxygen/CO₂ calculated per tree

### Animations
- Button presses (scale + fade)
- Metric cards fade in
- Donation cards scale on press
- Carousel dots animate on onboarding
- Notification dot pulses

### Protected Routes
- Try accessing Donate/Dashboard without login
- Gets redirected to LoginScreen

---

## 🔗 API Endpoints (Mock Server)

The server is at: `http://localhost:4000`

```
POST /api/auth/google
  → Returns: { user: { id, name, email }, token }

GET /api/donations
  → Returns: { donations: [...] }

POST /api/donations
  Body: { occasion, treeType, trees, recipient?, date, message?, location? }
  → Returns: { donation: { id, ... } }

GET /api/stats
  → Returns: { stats: { treesPlanted, oxygenGenerated, co2Absorbed, points } }
```

---

## 📱 Android Emulator Network Setup

The app is configured to call the server at: **http://10.0.2.2:4000**
- This is how Android emulator maps to your host PC's localhost

If you're using a **physical device**, change the API base URL:
1. Edit `contexts/AuthContext.tsx` (line 3)
2. Edit `contexts/DonationsContext.tsx` (line 3)
3. Replace `10.0.2.2` with your PC's IP, e.g., `192.168.1.10`

Then rebuild the app.

---

## ⚠️ If You Hit Issues

### "Module not found: react-native"
```powershell
npm install --legacy-peer-deps
```

### "Server won't start"
```powershell
cd server
npm install
npm run start
```

### "App crashes on startup"
Check Android logcat:
```powershell
adb logcat | findstr "ERROR\|Exception"
```

### "Can't reach server from emulator"
Ensure server is running at `http://localhost:4000`:
```powershell
# In server terminal, you should see:
# "Mock server listening on http://localhost:4000"
```

For more detailed troubleshooting, see `SETUP_GUIDE.md`.

---

## ✨ What's Next?

1. **Run the app** following the 3 steps above
2. **Test all screens** (onboarding → home → donate → dashboard)
3. **Try login/logout** and restart app (persistence check)
4. **Add a donation** and verify metrics update

For **production next steps**, see `README_COMPLETE.md`:
- Real Google Sign-In integration
- Real payment gateway
- Backend database setup
- Deploy to Play Store

---

## 📞 Support

- Full docs: `SETUP_GUIDE.md` (setup, troubleshooting, API details)
- Feature summary: `README_COMPLETE.md` (all created files, features)
- Server docs: `server/README.md` (mock server specifics)

---

**Status**: ✅ Ready to run!  
**Created**: December 6, 2025  
**App**: Green Legacy - Donation & Tree Tracking Mobile App

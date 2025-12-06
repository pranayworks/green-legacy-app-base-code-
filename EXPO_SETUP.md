# 🚀 Updated: Using Expo for Easy Testing

Good news! I've updated your project to use **Expo**, which is much simpler than React Native CLI for development.

## Why Expo?
- ✅ No Android SDK needed
- ✅ Test on your phone instantly
- ✅ Much faster setup
- ✅ Same React Native code

---

## 📱 How to Run

### Option 1: Run on Your Phone (Easiest)

**Step 1: Install Expo Go App**
- Download **Expo Go** from Google Play Store or App Store
- Install on your Android phone

**Step 2: Start Expo Server**
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm start
```

Expected output:
```
Starting Expo Server...
Metro Bundler starting...
→ Scan the QR code above with Expo Go
```

**Step 3: Scan QR Code**
- Open Expo Go app on your phone
- Scan the QR code shown in terminal
- App loads in seconds! 🎉

---

### Option 2: Run on Android Emulator

**Step 1: Start Expo Server**
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm start
```

**Step 2: Open in Emulator**
- Press **`a`** in the terminal (for Android)
- Emulator must be running
- App will open in seconds

---

### Option 3: Run in Browser (Quick Test)

**Step 1: Start Expo Server**
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm start
```

**Step 2: Open in Browser**
- Press **`w`** in the terminal
- Browser opens with your app
- Not fully functional but good for quick UI tests

---

## 🎯 Quick Commands

```powershell
# Start server (all platforms)
npm start

# Android emulator only
npx expo start --android

# iOS simulator only (Mac only)
npx expo start --ios

# Reset cache (if issues)
npx expo start -c

# Tunnel mode (test on slow connections)
npx expo start --tunnel
```

---

## ✅ Before You Start

Make sure server is still running in separate terminal:
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start
```

Should show:
```
Mock server listening on http://localhost:4000
```

---

## 📱 What You'll See

**Step 1: QR Code**
- Terminal shows QR code
- Messages like "Waiting for a connection from a development client"

**Step 2: App Loading**
- Onboarding screen appears
- 3-slide carousel
- "Get Started" button

**Step 3: Home Screen** ✨
- Green header
- Welcome message
- Animated buttons
- Login banner

---

## 🆘 Troubleshooting

### ❌ "Metro bundler error"
```powershell
npx expo start -c  # Clear cache
```

### ❌ "Cannot find module"
```powershell
npm install  # Reinstall dependencies
```

### ❌ "Network error"
Make sure both terminals have no errors:
- Terminal 1: Server at http://localhost:4000
- Terminal 2: Expo server with QR code

### ❌ "Expo Go won't connect"
- Check phone is on same WiFi as computer
- Ensure firewall allows port 19000-19006
- Use tunnel mode: `npx expo start --tunnel`

---

## 🎉 You're Ready!

```powershell
npm start
```

Then scan QR with Expo Go, or press `a` for Android! 📱


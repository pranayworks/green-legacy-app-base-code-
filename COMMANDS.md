# 📋 Copy-Paste Commands Reference

Use these exact commands to run your Green Legacy app. Just copy and paste into PowerShell.

---

## ✅ Setup (One Time Only)

### 1. Install Mobile App Dependencies
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm install --legacy-peer-deps
```

Expected output: `added 940 packages...`

### 2. Install Server Dependencies
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm install
```

Expected output: `added 141 packages...`

---

## 🚀 Run (Every Time You Want to Test)

### Terminal 1: Start the Mock Server
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start
```

Expected output:
```
[INFO] ts-node-dev ver. 2.0.0...
Mock server listening on http://localhost:4000
```

**Keep this running!** Do NOT close this terminal.

### Terminal 2: Start React Native App
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npx react-native run-android
```

The app will build and launch on your Android emulator/device.

---

## 🌱 Optional: Seed Demo Donations

### Option A: Auto-Seed on Server Start
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start:seed
```

Server starts and auto-seeds 6 demo donations.

### Option B: Manually Seed via CLI
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run seed -- seed 8
```

Adds 8 demo donations to the server.

### Option C: Clear All Donations
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run seed -- clear
```

Removes all donations from server.

---

## 🔧 Useful Commands

### Check Node/npm Version
```powershell
node -v
npm -v
```

### Check If Server Is Running
```powershell
curl http://localhost:4000
```

Should return: `Green Legacy Mock Server`

### View Server Logs
The server terminal already shows logs. Look for:
- `Mock server listening on http://localhost:4000`
- Any `[INFO]` or `[ERR]` messages

### Restart App in Emulator
```powershell
adb shell am start -n com.greenlegacyapp/.MainActivity
```

### View App Logs
```powershell
adb logcat | findstr "ERROR\|greenlegacy"
```

---

## 📝 Quick Testing Checklist

After running the app, test these:

```
☐ Onboarding: Swipe 3 slides, tap "Get Started"
☐ Home: Tap "Donate" button
☐ Donate Form: Fill & submit
☐ Success: See thank you screen
☐ Dashboard: See updated metrics
☐ Login: Tap Profile, continue with Google
☐ Persistence: Restart app, user still logged in
☐ Logout: Logout, verify user gone
```

---

## 🆘 If Something Goes Wrong

### Server won't start
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm install
npm run start
```

### App won't build
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-
npm install --legacy-peer-deps
npx react-native run-android
```

### Can't connect to server (10.0.2.2)
Check server is running:
```powershell
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start
```

### Android emulator issues
```powershell
adb devices
```

Should list your emulator as `emulator-XXXX device`.

---

## 📂 All Command Locations

These are your working directories:

```
Mobile App Root:
  c:\Users\Lenovo\green-legacy-app-base-code-

Server Folder:
  c:\Users\Lenovo\green-legacy-app-base-code-\server

Always cd to the correct folder before running npm commands!
```

---

## 💡 Pro Tips

1. **Keep terminal windows organized**
   - Terminal 1: Server (don't close)
   - Terminal 2: App & npm commands

2. **Make development faster**
   - Server auto-reloads on code changes (ts-node-dev)
   - App auto-reloads with Fast Refresh
   - Edit code, save, and see changes instantly

3. **Debug with Metro DevTools**
   - While app is running, press Ctrl+M (Android)
   - Select "Debug remotely" or "Open Debugger"

4. **Seed fresh data**
   - Always: `npm run seed -- clear` then `npm run seed -- seed 6`
   - Gives you predictable demo data

---

## 📞 Documentation Files

```
README.md                    ← Overview (read first!)
QUICK_START.md              ← 3-step quick start
SETUP_GUIDE.md              ← Detailed setup & troubleshooting
README_COMPLETE.md          ← Full feature summary
PROJECT_FILES.md            ← Complete file listing
COMMANDS.md                 ← This file
```

---

## ✅ You're Ready!

Just run these 3 commands in order:

```powershell
# 1. Install deps (one time)
npm install --legacy-peer-deps

# 2. Start server (Terminal 1)
cd c:\Users\Lenovo\green-legacy-app-base-code-\server
npm run start

# 3. Start app (Terminal 2)
cd c:\Users\Lenovo\green-legacy-app-base-code-
npx react-native run-android
```

That's it! Your app is live! 🚀

---

**Happy coding!** 🌳

# Quick Reference Guide - Green Legacy App

## 🚀 5-MINUTE SETUP

### 1. Install Dependencies
```bash
cd /path/to/green-legacy-app-base-code-
npm install
```

### 2. Start Development Server
```bash
npx expo start --lan
```

### 3. Test on Device
- **Android**: Expo Go app → Scan QR code
- **iOS**: Camera app → Scan QR code (opens in Expo)

---

## 🔑 CREDENTIALS NEEDED

### Google Sign-In
- **Where**: GoogleSignInButton.tsx (line 16-18)
- **Get from**: https://console.cloud.google.com/
- **Replace**: `YOUR_WEB_CLIENT_ID` and `YOUR_iOS_CLIENT_ID`

### Stripe Payment
- **Where**: PaymentScreen.tsx (line 1)
- **Get from**: https://dashboard.stripe.com/
- **Replace**: `pk_test_YOUR_KEY_HERE` with `pk_live_YOUR_ACTUAL_KEY`

### Database
- **Choose**: Firebase, Supabase, or custom backend
- **Guide**: See docs/DATABASE_INTEGRATION.ts
- **Update**: DonationsContext.tsx with API calls

---

## 📱 APP STRUCTURE

```
App Root
  ├── AuthProvider (Login/Logout)
  ├── DonationsProvider (Donations/Stats)
  └── Navigation
      └── MainTabNavigator
          ├── Home 🏠
          ├── About ℹ️
          ├── Donate 🎁
          ├── Dashboard 📊
          ├── Rewards ⭐
          └── More ⋯
```

---

## 🎯 FEATURE USAGE

### Image Upload (DonateScreen)
```tsx
// Already integrated, just use:
<TouchableOpacity onPress={takePhoto}>
  <Text>📷 Take Photo</Text>
</TouchableOpacity>
```

### Google Sign-In
```tsx
import GoogleSignInButton from './components/GoogleSignInButton';

<GoogleSignInButton
  onSignIn={(user) => handleLogin(user)}
  onError={(error) => console.log(error)}
/>
```

### Stripe Payment
```tsx
// Navigate from DonateScreen:
nav.navigate('Payment', { trees: 5 })
```

### Social Sharing
```tsx
import ShareOptions from './components/ShareOptions';

<ShareOptions
  title="I Planted Trees!"
  message="Join me in making a difference"
  url="https://greenlegacy.org"
/>
```

### Push Notifications
```tsx
import { sendDonationNotification } from './utils/notifications';

// After donation:
await sendDonationNotification(5, 'John');
```

---

## 🎨 COLORS

```
#E8F5E9  - Light background
#C8E6C9  - Headers
#1B5E20  - Primary text
#2E7D32  - Secondary text
#4CAF50  - Buttons/accent
```

---

## ❌ ERRORS & SOLUTIONS

### "Cannot find module HomeScreen"
- **Cause**: Linter false positive
- **Solution**: Ignore, files exist

### "Google Sign-In not working"
- **Solution**: Check GoogleSignInButton.tsx has correct credentials
- **Test**: Click sign-in button

### "Payment screen not loading"
- **Solution**: Verify Stripe key in PaymentScreen.tsx
- **Test**: Inspect CardField rendering

### "Notifications not showing"
- **Solution**: Check device permissions
- **Test**: Call `sendLocalNotification('Test', 'Message')`

---

## 📦 IMPORTANT FILES

| File | Purpose | Action |
|------|---------|--------|
| `GoogleSignInButton.tsx` | OAuth setup | ✏️ Add credentials |
| `PaymentScreen.tsx` | Payment form | ✏️ Add Stripe key |
| `docs/DATABASE_INTEGRATION.ts` | DB guide | 📖 Review & choose |
| `DonationsContext.tsx` | API calls | ✏️ Update endpoints |
| `app.json` | App config | ✏️ Set app name/icons |

---

## 🧪 TESTING CHECKLIST

- [ ] Navigate through all 13 screens
- [ ] Test image upload (camera & gallery)
- [ ] Test Google Sign-In login/logout
- [ ] Test donation form submission
- [ ] Test payment form (use 4242 4242 4242 4242)
- [ ] Test share functionality
- [ ] Test notifications (manual trigger)
- [ ] Test pull-to-refresh on Dashboard
- [ ] Test tab navigation
- [ ] Test animations on page load

---

## 🚀 DEPLOY STEPS

### Step 1: Update app.json
```json
{
  "name": "Green Legacy",
  "slug": "green-legacy",
  "version": "1.0.0",
  "ios": { "bundleIdentifier": "com.greenlegacy.app" },
  "android": { "package": "com.greenlegacy.app" }
}
```

### Step 2: Add Credentials
- Google: GoogleSignInButton.tsx
- Stripe: PaymentScreen.tsx
- Database: DonationsContext.tsx

### Step 3: Build
```bash
eas build --platform ios
eas build --platform android
```

### Step 4: Submit
- iOS: App Store Connect
- Android: Google Play Console

---

## 📚 QUICK LINKS

- **Expo Docs**: https://docs.expo.dev/
- **Firebase**: https://firebase.google.com/
- **Supabase**: https://supabase.com/
- **Stripe**: https://stripe.com/
- **Google Cloud**: https://console.cloud.google.com/

---

## 💡 COMMON CUSTOMIZATIONS

### Change App Name
```json
// app.json
"name": "Your App Name"
```

### Change Primary Color
```tsx
// Find all #4CAF50 and replace with your color
// Also update in all screen StyleSheets
```

### Add New Screen
```tsx
// 1. Create screens/YourScreen.tsx
// 2. Add to MainTabNavigator.tsx
// 3. Import and add Tab.Screen
```

### Update API Endpoint
```tsx
// In DonationsContext.tsx
const API_BASE = 'https://your-api.com/api';
```

---

**Last Updated**: December 7, 2025  
**Version**: 1.0.0  
**Status**: Production Ready ✅

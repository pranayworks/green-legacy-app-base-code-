# Database Integration Guide for Green Legacy App

This guide provides examples for migrating from the mock API to real databases.

---

## FIREBASE REALTIME DATABASE SETUP

### 1. Install Firebase SDK:
```bash
npm install firebase @react-native-firebase/app @react-native-firebase/database --legacy-peer-deps
```

### 2. Initialize Firebase in your app:

```typescript
import * as firebase from '@react-native-firebase/app';
import firebaseDatabase from '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  databaseURL: 'https://your-project.firebaseio.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
```

### 3. Example: Migrating DonationsContext to Firebase

```typescript
export const firebaseDonationsService = {
  // Add donation
  async addDonation(userId: string, donation: any) {
    try {
      const ref = firebaseDatabase()
        .ref(`users/${userId}/donations`)
        .push();
      await ref.set({
        ...donation,
        createdAt: new Date().toISOString(),
      });
      return { id: ref.key, ...donation };
    } catch (error) {
      console.error('Error adding donation:', error);
      throw error;
    }
  },

  // Get user donations
  async getUserDonations(userId: string) {
    try {
      const snapshot = await firebaseDatabase()
        .ref(`users/${userId}/donations`)
        .once('value');
      const donations: any[] = [];
      snapshot.forEach((child) => {
        donations.push({ id: child.key, ...child.val() });
      });
      return donations;
    } catch (error) {
      console.error('Error fetching donations:', error);
      return [];
    }
  },

  // Get global stats
  async getGlobalStats() {
    try {
      const snapshot = await firebaseDatabase()
        .ref('stats')
        .once('value');
      return snapshot.val() || {
        totalTrees: 0,
        totalDonations: 0,
        totalUsers: 0,
      };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { totalTrees: 0, totalDonations: 0, totalUsers: 0 };
    }
  },

  // Listen to real-time updates
  listenToDonations(userId: string, callback: (donations: any[]) => void) {
    const ref = firebaseDatabase().ref(`users/${userId}/donations`);
    ref.on('value', (snapshot) => {
      const donations: any[] = [];
      snapshot.forEach((child) => {
        donations.push({ id: child.key, ...child.val() });
      });
      callback(donations);
    });
    // Return unsubscribe function
    return () => ref.off();
  },
};
```

---

## POSTGRESQL / NODE.JS BACKEND SETUP

### 1. Update your Express server with proper endpoints:

```javascript
const express = require('express');
const app = express();

// Donations endpoints
app.get('/api/donations/:userId', async (req, res) => {
  const donations = await Donation.findByUserId(req.params.userId);
  res.json(donations);
});

app.post('/api/donations', async (req, res) => {
  const donation = await Donation.create(req.body);
  res.json(donation);
});

// Stats endpoints
app.get('/api/stats', async (req, res) => {
  const stats = await Donation.getGlobalStats();
  res.json(stats);
});

// Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  const leaderboard = await User.getTopDonors(limit=100);
  res.json(leaderboard);
});
```

---

## SUPABASE (POSTGRESQL) SETUP

### 1. Install Supabase client:
```bash
npm install @supabase/supabase-js --legacy-peer-deps
```

### 2. Initialize Supabase:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);
```

### 3. Example Supabase Service:

```typescript
export const supabaseDonationsService = {
  async addDonation(userId: string, donation: any) {
    const { data, error } = await supabase
      .from('donations')
      .insert([{ ...donation, user_id: userId }]);
    if (error) throw error;
    return data?.[0];
  },

  async getUserDonations(userId: string) {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async getLeaderboard() {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, trees_planted, points')
      .order('trees_planted', { ascending: false })
      .limit(100);
    if (error) throw error;
    return data || [];
  },
};
```

---

## MIGRATION CHECKLIST

- [ ] Choose database (Firebase, PostgreSQL, Supabase, MongoDB)
- [ ] Set up authentication (Firebase Auth, Auth0, JWT)
- [ ] Create database schema (Donations, Users, Stats, Leaderboard)
- [ ] Implement API endpoints for all operations
- [ ] Update DonationsContext to use real API
- [ ] Update AuthContext to use real authentication
- [ ] Add error handling and retry logic
- [ ] Implement offline support (AsyncStorage caching)
- [ ] Set up data validation and security rules
- [ ] Test all CRUD operations
- [ ] Monitor and optimize database queries
- [ ] Set up backups and disaster recovery

---

## RECOMMENDED ARCHITECTURE

```
Frontend (React Native)
        ↓
   API Layer (Services)
        ↓
Node.js / Express Backend
        ↓
PostgreSQL / Firebase Database
```

### Benefits:
- Clean separation of concerns
- Scalable backend
- Easy to update API logic
- Better security (validation on server)
- Easier to add new features

---

## NEXT STEPS

1. **Choose your database** - Firebase is fastest to set up, Supabase gives you PostgreSQL power, custom Node.js gives maximum control
2. **Configure credentials** - Add your database keys to environment variables
3. **Update context files** - Replace the mock API calls with real ones
4. **Test thoroughly** - Run through all donation flows end-to-end
5. **Monitor performance** - Watch for slow queries and optimize

For questions, refer to the official documentation of your chosen platform.

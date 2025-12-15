import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Centralized API base resolution. Prefer an explicit value set in app config (manifest.extra.API_BASE),
// otherwise fall back to the development debuggerHost or emulator mappings.
export const resolveApiBase = (): string => {
  try {
    // Check for environment variable or manifest config
    const extra = (Constants as any).manifest?.extra || (Constants as any).manifest2?.extra;
    if (extra && extra.API_BASE) return extra.API_BASE;

    const dbg = (Constants as any).manifest?.debuggerHost || (Constants as any).manifest2?.debuggerHost;
    if (dbg && typeof dbg === 'string') {
      const host = dbg.split(':')[0];
      return `http://${host}:4000/api`;
    }
  } catch (e) {
    // ignore and fallthrough
  }

  if (Platform.OS === 'android') return 'http://10.0.2.2:4000/api';
  return 'http://localhost:4000/api';
};

export const API_BASE = resolveApiBase();

// Export other config values for convenience
export const CONFIG = {
  API_BASE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || 'your-google-client-id',
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY || 'pk_test_your-stripe-key',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/green-legacy'
};

export default CONFIG;

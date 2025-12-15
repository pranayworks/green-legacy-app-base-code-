import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '../src/config';

// Keys used to persist secrets
const TOKEN_KEY = 'GL_TOKEN_V1';
const STORAGE_USER_KEY = 'GL_USER_V1';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
}

interface AuthContextShape {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  login: () => Promise<void>; // backward-compatible alias (maps to Google login by default)
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  signupWithCredentials: (email: string, password: string, profile?: Partial<User>) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithPhone: (phone: string, otp?: string) => Promise<void>;
  signupWithPhone: (phone: string, otp?: string, profile?: Partial<User>) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<string | null>;
}

// provide a safe default so components using useAuth before provider won't crash
const noop = async () => {};
const AuthContext = createContext<AuthContextShape>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: noop,
  loginWithCredentials: async () => {},
  signupWithCredentials: async () => {},
  loginWithGoogle: async () => {},
  loginWithPhone: async () => {},
  signupWithPhone: async () => {},
  updateProfile: async () => {},
  logout: () => {},
  getToken: async () => null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load token & user from AsyncStorage (temporary: using AsyncStorage for token persistence)
  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (storedToken) {
          setToken(storedToken);
          // Optionally try to fetch user profile from backend
          try {
            const res = await fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } });
            if (res.ok) {
              const json = await res.json();
              setUser(json.user || json);
            }
          } catch (err) {
            // ignore profile fetch errors; we'll fallback to persisted user
          }
        }

        if (!user) {
          const raw = await AsyncStorage.getItem(STORAGE_USER_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            setUser(parsed);
          }
        }
      } catch (err) {
        console.warn('Auth init error', err);
      } finally {
        setIsReady(true);
      }
    };

    init();
  }, []);

  const persistUser = async (u: User | null) => {
    try {
      if (u) await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(u));
      else await AsyncStorage.removeItem(STORAGE_USER_KEY);
    } catch (e) {
      console.warn('Failed to persist user', e);
    }
  };

  const persistToken = async (t: string | null) => {
    try {
      if (t) await AsyncStorage.setItem(TOKEN_KEY, t);
      else await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to persist token', e);
    }
  };

  // Backward-compatible login -> Google login by default
  const login = async () => loginWithGoogle();

  // Credentials login: POST /auth/login => { token, user }
  const loginWithCredentials = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Login failed: ${res.status} ${txt}`);
      }
      const json = await res.json();
      const newToken = json.token || json.accessToken || null;
      const newUser = json.user || json;
      setToken(newToken);
      setUser(newUser || null);
      await persistToken(newToken);
      await persistUser(newUser || null);
    } catch (err) {
      console.warn('loginWithCredentials failed', err);
      throw err;
    }
  };

  // Signup with email/password (mocked)
  const signupWithCredentials = async (email: string, password: string, profile?: Partial<User>) => {
    try {
      // In production you'd call POST /auth/signup
      const mockToken = `gl_token_${Date.now()}`;
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: (profile && profile.name) || `User${Date.now()}`,
        email,
        phone: profile?.phone,
        age: profile?.age
      } as User;

      setToken(mockToken);
      setUser(mockUser);
      await persistToken(mockToken);
      await persistUser(mockUser);
    } catch (err) {
      console.warn('signupWithCredentials failed', err);
      throw err;
    }
  };

  // Google login flow (server-side exchange) - keeps previous behavior
  const loginWithGoogle = async () => {
    try {
      // For testing: set a mock user (in production, call actual backend Google endpoint)
      const mockToken = `gl_token_${Date.now()}`;
      const mockUser: User = {
        id: `google_${Date.now()}`,
        name: 'Green Supporter',
        email: 'supporter@greenlegacy.org'
      };
      
      setToken(mockToken);
      setUser(mockUser);
      await persistToken(mockToken);
      await persistUser(mockUser);
    } catch (err) {
      console.warn('Login failed', err);
      throw err;
    }
  };

  // Phone OTP login (stub)
  const loginWithPhone = async (phone: string, otp?: string) => {
    try {
      const mockToken = `gl_phone_${Date.now()}`;
      const mockUser: User = { id: `phone_${Date.now()}`, name: `PhoneUser`, email: `${phone}@example.com`, phone } as User;
      setToken(mockToken);
      setUser(mockUser);
      await persistToken(mockToken);
      await persistUser(mockUser);
    } catch (err) {
      console.warn('loginWithPhone failed', err);
      throw err;
    }
  };

  const signupWithPhone = async (phone: string, otp?: string, profile?: Partial<User>) => {
    try {
      const mockToken = `gl_phone_signup_${Date.now()}`;
      const mockUser: User = { id: `phone_${Date.now()}`, name: profile?.name || 'New Supporter', email: profile?.email || `${phone}@example.com`, phone, age: profile?.age } as User;
      setToken(mockToken);
      setUser(mockUser);
      await persistToken(mockToken);
      await persistUser(mockUser);
    } catch (err) {
      console.warn('signupWithPhone failed', err);
      throw err;
    }
  };

  // Update user profile locally and persist
  const updateProfile = async (data: Partial<User>) => {
    try {
      const next = { ...(user || {}), ...data } as User;
      setUser(next);
      await persistUser(next);
      return;
    } catch (err) {
      console.warn('updateProfile failed', err);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    try {
      await persistToken(null);
      await persistUser(null);
    } catch (e) {
      console.warn('Failed to clear storage', e);
    }
  };

  const getToken = async () => {
    if (token) return token;
    try {
      const t = await AsyncStorage.getItem(TOKEN_KEY);
      setToken(t);
      return t;
    } catch (e) {
      return null;
    }
  };

  const value: AuthContextShape = {
    isLoggedIn: !!user,
    user,
    token,
    login,
    loginWithCredentials,
    signupWithCredentials,
    loginWithGoogle,
    loginWithPhone,
    signupWithPhone,
    updateProfile,
    logout,
    getToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'http://10.0.2.2:4000/api'; // use 10.0.2.2 for Android emulator

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

const STORAGE_KEY = 'GL_USER_V1';

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load persisted user on mount
    const loadUser = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        }
      } catch (err) {
        console.warn('Failed to load user from storage', err);
      } finally {
        setIsReady(true);
      }
    };
    
    loadUser();
  }, []);

  const login = async () => {
    // Mock Google login via mock server
    try {
      const res = await fetch(`${API_BASE}/auth/google`, { method: 'POST' });
      if (!res.ok) throw new Error('Login request failed');
      const json = await res.json();
      setUser(json.user);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(json.user));
      } catch (e) {
        console.warn('Failed to persist user', e);
      }
    } catch (err) {
      console.warn('Login failed', err);
      throw err;
    }
  };

  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to remove user from storage', e);
    }
  };

  // Always return provider with current state
  const value: AuthContextShape = {
    isLoggedIn: !!user,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

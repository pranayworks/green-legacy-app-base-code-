import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const resolveApiBase = () => {
  try {
    const dbg = (Constants as any).manifest?.debuggerHost || (Constants as any).manifest2?.debuggerHost;
    if (dbg && typeof dbg === 'string') {
      const host = dbg.split(':')[0];
      return `http://${host}:4000/api`;
    }
  } catch (e) {}

  if (Platform.OS === 'android') return 'http://10.0.2.2:4000/api';
  return 'http://localhost:4000/api';
};

const API_BASE = resolveApiBase();

// Helper function to fetch with timeout
const fetchWithTimeout = (url: string, options?: RequestInit, timeout: number = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('API request timeout')), timeout)
    )
  ]);
};

export interface Donation {
  id: string;
  userId?: string;
  occasion: string;
  treeType: string;
  trees: number;
  recipient?: string;
  date: string;
  message?: string;
  location?: string;
  photo?: string;
  donorName?: string;
  certificateId?: string;
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

const DonationsContext = createContext<DonationsContextShape | undefined>(undefined);

export const DonationsProvider = ({ children }: { children: ReactNode }) => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<Stats>({ treesPlanted: 0, oxygenGenerated: 0, co2Absorbed: 0, points: 0 });
  const auth = useAuth();

  const refresh = async () => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/donations`, undefined, 10000);
      if (!res.ok) throw new Error('Failed to fetch donations');
      const json = await res.json();
      setDonations(json.donations || []);
      
      const sres = await fetchWithTimeout(`${API_BASE}/stats`, undefined, 10000);
      if (!sres.ok) throw new Error('Failed to fetch stats');
      const sjson = await sres.json();
      setStats(sjson.stats || { treesPlanted: 0, oxygenGenerated: 0, co2Absorbed: 0, points: 0 });
    } catch (err) {
      console.warn('refresh failed', err);
      // Set default values if API fails
      setDonations([]);
      setStats({ treesPlanted: 0, oxygenGenerated: 0, co2Absorbed: 0, points: 0 });
    }
  };

  // Only refresh when user logs in/out
  useEffect(() => {
    // To avoid Metro/dev-server hangs when the device cannot reach a local backend
    // we DO NOT automatically refresh donations on startup in the dev build.
    // Call `refresh()` manually (for example after login or via a pull-to-refresh) to fetch data.
    // This prevents automatic network calls that block startup when API is not reachable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return;
  }, [auth.isLoggedIn]);

  const addDonation = async (d: Omit<Donation, 'id'>) => {
    try {
      const res = await fetchWithTimeout(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, userId: auth.user?.id })
      }, 10000);
      if (!res.ok) throw new Error('Failed to add donation');
      const json = await res.json();
      await refresh();
      return json.donation as Donation;
    } catch (err) {
      console.warn('addDonation failed', err);
      return null;
    }
  };

  const value: DonationsContextShape = {
    donations,
    stats,
    refresh,
    addDonation
  };

  return (
    <DonationsContext.Provider value={value}>
      {children}
    </DonationsContext.Provider>
  );
};

export const useDonations = () => {
  const ctx = useContext(DonationsContext);
  if (!ctx) throw new Error('useDonations must be used within DonationsProvider');
  return ctx;
};

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

const API_BASE = 'http://10.0.2.2:4000/api';

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
      const res = await fetch(`${API_BASE}/donations`);
      if (!res.ok) throw new Error('Failed to fetch donations');
      const json = await res.json();
      setDonations(json.donations || []);
      
      const sres = await fetch(`${API_BASE}/stats`);
      if (!sres.ok) throw new Error('Failed to fetch stats');
      const sjson = await sres.json();
      setStats(sjson.stats || { treesPlanted: 0, oxygenGenerated: 0, co2Absorbed: 0, points: 0 });
    } catch (err) {
      console.warn('refresh failed', err);
    }
  };

  // Only refresh when user logs in/out
  useEffect(() => {
    if (auth.isLoggedIn) {
      refresh();
    } else {
      setDonations([]);
      setStats({ treesPlanted: 0, oxygenGenerated: 0, co2Absorbed: 0, points: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  const addDonation = async (d: Omit<Donation, 'id'>) => {
    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...d, userId: auth.user?.id })
      });
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

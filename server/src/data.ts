// In-memory mock data and helpers for the mock server
import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Donation {
  id: string;
  userId?: string;
  occasion: string;
  treeType: string;
  trees: number;
  recipient?: string;
  date: string; // ISO
  message?: string;
  location?: string;
}

const donations: Donation[] = [];

const users: User[] = [
  { id: '1', name: 'Demo User', email: 'demo@greenlegacy.org' }
];

export function listDonations() {
  return donations;
}

export function addDonation(d: Omit<Donation, 'id'>) {
  const donation: Donation = { id: uuidv4(), ...d };
  donations.unshift(donation);
  return donation;
}

export function mockLogin() {
  // NOTE: This is a mock — replace with real OAuth in production
  return users[0];
}

export function computeStats() {
  const treesPlanted = donations.reduce((s, d) => s + d.trees, 0);
  // Simple multipliers (example): oxygen 10 kg/tree/year, co2 21 kg/tree/year
  const oxygenGenerated = +(treesPlanted * 10).toFixed(1);
  const co2Absorbed = +(treesPlanted * 21).toFixed(1);
  // Points: 1 tree = 10 pts, 2-3 trees = 25 pts each, 4-5 trees = 50 pts each
  const points = donations.reduce((acc, d) => {
    if (d.trees === 1) return acc + d.trees * 10;
    if (d.trees >= 2 && d.trees <= 3) return acc + d.trees * 25;
    if (d.trees >= 4 && d.trees <= 5) return acc + d.trees * 50;
    // default multiplier for >5
    return acc + d.trees * 60;
  }, 0);

  return { treesPlanted, oxygenGenerated, co2Absorbed, points };
}

// Seeding helpers for demo
export function seedDonations(count = 6) {
  const types = ['Neem', 'Mango', 'Peepal', 'Banyan', 'Teak'];
  const occasions = ['Birthday', 'Anniversary', 'In Memory', 'Corporate Gift', 'General Donation'];
  for (let i = 0; i < count; i++) {
    addDonation({
      userId: i % 2 === 0 ? '1' : undefined,
      occasion: occasions[i % occasions.length],
      treeType: types[i % types.length],
      trees: Math.floor(Math.random() * 5) + 1,
      recipient: i % 2 === 0 ? 'Friend' : undefined,
      date: new Date(Date.now() - i * 86400000).toISOString(),
      message: `Seed donation #${i + 1}`,
      location: 'Demo City'
    });
  }
  return donations.length;
}

// NOTE: Do not auto-seed here. Seeding is controlled from index.ts or via CLI (seedCli.ts)
// seedDonations(4);

export function clearDonations() {
  const removed = donations.length;
  donations.length = 0; // clear in place
  return removed;
}

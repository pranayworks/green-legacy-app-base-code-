import { seedDonations, clearDonations } from './data';

const argv = process.argv.slice(2);
const cmd = argv[0];
const count = Number(argv[1]) || 6;

if (cmd === 'seed') {
  const total = seedDonations(count);
  console.log(`Seeded ${total} donations`);
  process.exit(0);
}

if (cmd === 'clear') {
  const removed = clearDonations();
  console.log(`Cleared ${removed} donations`);
  process.exit(0);
}

console.log('Usage: ts-node src/seedCli.ts <seed|clear> [count]');
process.exit(1);

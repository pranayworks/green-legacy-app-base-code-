import express from 'express';
import cors from 'cors';
import routes from './routes';
import { seedDonations } from './data';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => res.send('Green Legacy Mock Server'));

// If server started with a --seed flag, seed demo data once
const shouldSeed = process.argv.includes('--seed');
if (shouldSeed) {
  const total = seedDonations(6);
  // eslint-disable-next-line no-console
  console.log(`Seeded ${total} demo donations`);
}

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Mock server listening on http://localhost:${PORT}`);
});

// TODO: Persist data to a simple JSON file or connect to a lightweight DB for longer-lived dev sessions.

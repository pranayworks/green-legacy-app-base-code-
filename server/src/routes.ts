import express from 'express';
import { addDonation, computeStats, listDonations, mockLogin, seedDonations } from './data';

const router = express.Router();

// POST /auth/google -> mock login
router.post('/auth/google', (req, res) => {
  const user = mockLogin();
  // return a mock token
  res.json({ user, token: 'mock-token-123' });
});

// GET /donations
router.get('/donations', (req, res) => {
  res.json({ donations: listDonations() });
});

// POST /donations
router.post('/donations', (req, res) => {
  const body = req.body;
  if (!body || !body.trees || !body.treeType) {
    return res.status(400).json({ error: 'Invalid donation payload' });
  }
  const donation = addDonation({
    occasion: body.occasion || 'Donation',
    treeType: body.treeType,
    trees: Number(body.trees) || 1,
    recipient: body.recipient,
    date: body.date || new Date().toISOString(),
    message: body.message,
    location: body.location || 'Unknown',
    userId: body.userId
  });
  res.status(201).json({ donation });
});

// POST /seed -> populate some demo donations
router.post('/seed', (req, res) => {
  const count = Number(req.body?.count) || 6;
  try {
    const total = seedDonations(count);
    res.json({ seeded: total });
  } catch (err) {
    res.status(500).json({ error: 'seed failed' });
  }
});

// GET /stats
router.get('/stats', (req, res) => {
  res.json({ stats: computeStats() });
});

export default router;

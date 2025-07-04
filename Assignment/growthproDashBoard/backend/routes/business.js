import express from 'express';
import headlines from '../data/headlines.js';

const router = express.Router();

router.post('/business-data', (req, res) => {
  console.log("✅ POST /business-data hit");
  console.log("Body received:", req.body);

  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const rating = (Math.random() * 1 + 4).toFixed(1);
  const reviews = Math.floor(Math.random() * 500 + 20);
  const headline = `Why ${name} is ${location}'s Sweetest Spot in 2025`;

  console.log("➡️ Sending response:", { rating, reviews, headline });
  res.json({ rating, reviews, headline });
});

router.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;

  if (!name || !location) {
    return res.status(400).json({ error: 'Name and location are required' });
  }

  const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)]
    .replace('{name}', name)
    .replace('{location}', location);

  res.json({ headline: randomHeadline });
});

export default router;

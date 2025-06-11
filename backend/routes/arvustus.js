import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// POST – salvesta uus arvustus
router.post('/', async (req, res) => {
  console.log('POST body:', req.body);

  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ message: 'Arvustus salvestatud' });
  } catch (err) {
    console.error('Viga salvestamisel:', err);
    res.status(500).json({ error: 'Salvestamine ebaõnnestus' });
  }
});

// GET – kõik arvustused
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Laadimine ebaõnnestus' });
  }
});

export default router;

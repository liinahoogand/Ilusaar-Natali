import express from 'express';
import Arvustus from '../models/Arvustus.js';

const router = express.Router();

// POST – salvesta uus arvustus
router.post('/', async (req, res) => {
  console.log('POST body:', req.body);

  try {
    const arvustus = new Arvustus(req.body);
    await arvustus.save();
    res.status(201).json({ message: 'Arvustus salvestatud' });
  } catch (err) {
    console.error('Viga salvestamisel:', err);
    res.status(500).json({ error: 'Salvestamine ebaõnnestus' });
  }
});

// GET – kõik arvustused
router.get('/', async (req, res) => {
  try {
    const arvustused = await Arvustus.find().sort({ createdAt: -1 });
    res.json(arvustused);
  } catch (err) {
    res.status(500).json({ error: 'Laadimine ebaõnnestus' });
  }
});

export default router;

import express from 'express';
import Kasutaja from '../models/Kasutaja.js';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const kasutajad = await Kasutaja.find();
    res.json(kasutajad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { kasutajanimi, parool } = req.body;

  try {
    const user = await Kasutaja.findOne({ kasutajanimi });

    if (!user || user.parool !== parool) {
      return res.status(401).json({ message: 'Vale kasutajanimi või parool' });
    }

    res.status(200).json({ token: 'fake-token', kasutaja: user.kasutajanimi });
  } catch (err) {
    res.status(500).json({ message: 'Serveri viga' });
  }
});

export default router;

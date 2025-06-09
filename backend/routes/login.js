import express from 'express';
import bcrypt from 'bcrypt';
import Kasutaja from '../models/Kasutaja.js';

const router = express.Router();

// Kõigi kasutajate nimekiri (ilma paroolideta!)
router.get("/", async (req, res) => {
  try {
    const kasutajad = await Kasutaja.find({}, { parool: 0 }); // Eemalda parool väljast
    res.json(kasutajad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sisselogimine
router.post('/', async (req, res) => {
  const { kasutajanimi, parool } = req.body;

  try {
    const user = await Kasutaja.findOne({ kasutajanimi });
    if (!user) {
      return res.status(401).json({ message: 'Vale kasutajanimi või parool' });
    }

    let paroolSobib = false;

    // Proovi bcryptiga
    try {
      paroolSobib = await bcrypt.compare(parool, user.parool);
    } catch (e) {
      // ignoreeri (nt kui pole üldse hash, vaid plaintext)
    }

    // Kui bcrypt ei sobinud, proovi otse (plaintext)
    if (!paroolSobib && user.parool === parool) {
      paroolSobib = true;

      // Salvesta nüüd räsitud parool (turvaline üleminek)
      const uusHash = await bcrypt.hash(parool, 10);
      user.parool = uusHash;
      await user.save();
    }

    if (!paroolSobib) {
      return res.status(401).json({ message: 'Vale kasutajanimi või parool' });
    }

    // Tokeni loomine (näiteks JWT - siia saab lisada hiljem)
    res.status(200).json({
      token: 'fake-token', // asenda tegeliku JWT-ga hiljem
      kasutaja: user.kasutajanimi
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Serveri viga' });
  }
});

export default router;


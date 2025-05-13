import express from 'express';
import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// E-maili seadistus
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'lhoogand@gmail.com',
    pass: 'yvvlqqfiqcpulkzj'
  }
});

// POST – uus broneering
router.post('/', async (req, res) => {
  console.log('POST body:', req.body);
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    if (req.body.email) {
      const { nimi, kuupäev, kell, teenus, teenusepakkuja } = req.body;

      const message = {
        from: '"Ilusalong" <lhoogand@gmail.com>',
        to: req.body.email,
        subject: 'Broneeringu kinnitus',
        text: `Tere, ${nimi}!\n\nTeie broneering teenusele "${teenus}" (${teenusepakkuja}) on kinnitatud:\n\nKuupäev: ${kuupäev}\nKell: ${kell}\n\nKohtumiseni!`
      };

      await transporter.sendMail(message);
      console.log('Email saadetud:', req.body.email);
    }

    res.status(201).json({ message: 'Booking saved and email sent (if applicable)' });
  } catch (err) {
    console.error('Salvestus- või saatmisviga:', err);
    res.status(500).json({ error: 'Failed to save booking or send email' });
  }
});

// GET – kõik broneeringud
router.get("/", async (req, res) => {
  try {
    const services = await Booking.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET – üksik broneering ID alusel
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Broneeringut ei leitud' });
    }

    res.status(200).json(booking);
  } catch (err) {
    console.error('Viga üksiku broneeringu toomisel:', err);
    res.status(500).json({ error: 'Midagi läks valesti' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const result = await Booking.deleteOne({ _id: req.params.id }); // ← _id, mitte id!

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Broneeringut ei leitud' });
    }

    res.status(200).json({ message: 'Broneering kustutatud' });
  } catch (err) {
    console.error('Viga kustutamisel:', err);
    res.status(500).json({ error: 'Kustutamine ebaõnnestus' });
  }
});

export default router;

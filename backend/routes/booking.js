import express from 'express';
import Booking from '../models/Booking.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Loo transpordi objekt (kasuta oma e-maili andmeid)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Või "Sendinblue", "Mailgun", "Outlook", jne
  auth: {
    user: 'lhoogand@gmail.com',
    pass: 'yvvlqqfiqcpulkzj'
  }
});

router.post('/', async (req, res) => {
  console.log('POST body:', req.body);
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    // Kui email olemas, saada kinnitus
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

import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

// POST - save new booking
router.post('/', async (req, res) => {
  console.log('POST body:', req.body); // ← Lisa see rida!
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json({ message: 'Booking saved' });
  } catch (err) {
    console.error('Salvestusviga:', err); // ← Lisa see ka!
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// GET - fetch all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

export default router;

import express from "express";
import Service from "../models/Service.js";

const router = express.Router();

// Hangi kõik teenused
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lisa uus teenus
router.post("/", async (req, res) => {
  try {
    const newService = new Service(req.body);
    const saved = await newService.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Uuenda teenust
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('Viga teenuse uuendamisel:', err);
    res.status(500).json({ error: 'Teenuse uuendamine ebaõnnestus' });
  }
});

// Kustuta teenus
router.delete('/:id', async (req, res) => {
  try {
    const result = await Service.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Teenust ei leitud' });
    }

    res.status(200).json({ message: 'Teenus kustutatud' });
  } catch (err) {
    console.error('Viga teenuse kustutamisel:', err);
    res.status(500).json({ error: 'Teenuse kustutamine ebaõnnestus' });
  }
});

export default router;


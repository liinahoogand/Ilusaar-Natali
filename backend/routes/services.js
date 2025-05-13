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

export default router;

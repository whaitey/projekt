// routes/szamlak.js
const express = require('express');
const router = express.Router();

const Szamla = require('../models/Szamla');

// GET all szamlak
router.get('/', async (req, res) => {
  try {
    const szamlak = await Szamla.find();
    res.json(szamlak);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new szamla
router.post('/', async (req, res) => {
  console.log('req.body:', req.body);
  const { szamlaSorszam, kiallito, vevo } = req.body;
  console.log('req.body:', req.body);

  try {
    const newSzamla = new Szamla({ szamlaSorszam, kiallito, vevo });
    const savedSzamla = await newSzamla.save();
    res.status(201).json(savedSzamla);
  } catch (error) {
    console.error('Error creating szamla:', error);
    res.status(400).json({ message: 'Bad request' });
  }
});

module.exports = router;

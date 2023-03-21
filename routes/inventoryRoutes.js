const express = require('express');
const router = express.Router();
const Item = require('../models/itemModel'); // Feltételezzük, hogy létrehoztál egy Item modelt a Mongoose-hoz.

// Összes elem lekérdezése
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Új elem létrehozása
router.post('/', async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    description: req.body.description
  });

  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
});



// Egy elem lekérdezése azonosító alapján
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Elem frissítése azonosító alapján
router.put('/:id', async (req, res) => {
  try {
    const { name, quantity, description } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, quantity, description },
      { new: true }
    );

    if (updatedItem) {
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating item', error });
  }
});



// Elem törlése azonosító alapján
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware az elem azonosító alapján történő lekérdezésére
async function getItem(req, res, next) {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.item = item;
  next();
}

module.exports = router;

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;

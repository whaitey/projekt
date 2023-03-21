// models/Szamla.js
const mongoose = require('mongoose');

const SzamlaSchema = new mongoose.Schema({
  szamlaSorszam: {
    type: String,
    required: true
  },
  kiallito: {
    type: String,
    required: true
  },
  vevo: {
    type: String,
    required: true
  },
  termekLista: [
    {
      nev: { type: String, required: true },
      ar: { type: Number, required: true },
      mennyiseg: { type: Number, required: true }
    }
  ],
  kelt: { type: String, required: false },
  teljesites: { type: String, required: false },
  fizetesiHatarido: { type: String, required: false },
});

module.exports = mongoose.model('Szamla', SzamlaSchema);

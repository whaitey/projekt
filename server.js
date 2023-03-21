const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const inventoryRoutes = require('./routes/inventoryRoutes'); // Új import

// Express alkalmazás létrehozása
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

// MongoDB adatbázishoz kapcsolódás
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/projectdb';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error(`Error connecting to MongoDB: ${err}`);
  });

// Middleware használata az Express alkalmazásban

app.use(express.json());

// Route-ok használata az Express alkalmazásban
app.use('/api/items', inventoryRoutes); // Új route használat

// Express szerver indítása
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

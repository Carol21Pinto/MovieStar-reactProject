const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/movies', movieRoutes);

// MongoDB (optional for now)
mongoose.connect('mongodb://localhost:27017/moviestar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

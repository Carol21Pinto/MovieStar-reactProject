const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes'); // 🔐 New

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes); // 🔐 New

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

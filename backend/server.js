const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    // If no URI is provided, use a local MongoDB fallback for development
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio-builder';
    // Use family: 4 to force IPv4, fixing Node 18+ DNS resolution issues on Railway
    const conn = await mongoose.connect(mongoURI, { family: 4 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/portfolio', require('./routes/portfolioRoutes'));

app.get('/', (req, res) => {
  res.send('Portfolio Builder API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

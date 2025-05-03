const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
// Add CORS package
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
// Enable CORS for all routes
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

// Connect to DB 
mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000 
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
    console.error('MongoDB connection error details:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', err);
  });

app.get('/', (req, res) => {
  res.send('Login Registration API is running');
});
// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
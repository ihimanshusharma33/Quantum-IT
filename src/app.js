const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);

// Connect to MongoDB with more detailed error handling
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds instead of 30
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error details:');
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Full error:', err);
    
    if (err.name === 'MongooseServerSelectionError') {
      console.error('MongoDB server selection error - check if MongoDB is running');
    }
  });

app.get('/', (req, res) => {
  res.send('Login Registration API is running');
});

const PORT =3000;

const server = app.listen(PORT, () => {
  console.log(`Server running `);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying port ${PORT + 1}...`);
    // Try the next port
    app.listen(PORT + 1,  () => {
      console.log(`Server running on ${PORT + 1}`);
    });
  } else {
    console.error('Server startup error:', err);
  }
});
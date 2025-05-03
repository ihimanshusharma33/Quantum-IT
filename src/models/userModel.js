const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// First, let's try to drop the old index
// This is a collection-level operation, so we'll use the connection directly
mongoose.connection.on('connected', async () => {
  try {
    // Once connected, try to drop the problematic index
    const collections = await mongoose.connection.db.collections();
    const userCollection = collections.find(c => c.collectionName === 'users');
    
    if (userCollection) {
      await userCollection.dropIndex('username_1').catch(err => {
        // It's okay if the index doesn't exist
        console.log('Note: username index may not exist or was already dropped');
      });
    }
  } catch (err) {
    console.log('Note: Could not check/drop indexes, but will continue:', err.message);
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it's modified or new
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
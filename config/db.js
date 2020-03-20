const mongoose = require('mongoose');
const keys = require('./config/keys');

const db = keys.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB successfully connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

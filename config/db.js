const mongoose = require('mongoose');
const keys = require('./keys');

const db = keys.mongoURI;

const connectDB = async () => {
  console.log(process.env.NODE_ENV);
  console.log(db);
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB successfully connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

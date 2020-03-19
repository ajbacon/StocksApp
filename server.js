const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const users = require('./routes/api/users');

const app = express();

// connect database
// connectDB();

// Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure the database
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
console.log('DB URI:');
console.log(db);

// connect to the database
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => console.log(err));

// Passport middleware
// app.use(passport.initialize());
// // Passport config
// require('./config/passport')(passport);
// // Routes
// app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
//define routes
// TBD

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

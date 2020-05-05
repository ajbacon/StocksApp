const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const watchItems = require('./routes/api/watchItems');
const auth = require('./routes/api/auth');
const connectDB = require('./config/db');
var path = require('path');

const app = express();

// Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect to the database
connectDB();

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/watchitems', watchItems);

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;

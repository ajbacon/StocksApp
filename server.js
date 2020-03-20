const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const passport = require('passport');
const users = require('./routes/api/users');

const app = express();

// Init Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configure the database
const db = keys.mongoURI;

// connect to the database

async mongoose.connect(db, )

// mongoose
//   .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB successfully connected...'))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require('./config/passport')(passport);
// Routes
app.use('/api/users', users);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

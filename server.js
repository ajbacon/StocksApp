const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

// connect database
connectDB();

// Init Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

//define routes
// TBD

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

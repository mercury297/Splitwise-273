/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');

const app = express();
const bp = require('body-parser');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv');

dotenv.config();
const db = require('./models/index');

app.use(bp.json());
app.use(bp.urlencoded({
  extended: true,
}));
app.use(morgan('dev'));

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(express.static('public'));

app.use('/user', require('./routes/userRoutes'));
app.use('/group', require('./routes/groupRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chinmay\'s application.' });
});

const port = process.env.PORT;
// || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

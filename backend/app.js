/* eslint-disable no-console */

const express = require('express');

const app = express();
const bp = require('body-parser');

const db = require('./models/index');

app.use(bp.json());

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

app.use('/user', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chinmay\'s application.' });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

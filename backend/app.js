/* eslint-disable no-console */

const express = require('express');
const morgan = require('morgan');

const app = express();
const bp = require('body-parser');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv');

dotenv.config();
// eslint-disable-next-line no-unused-vars
const db = require('./models/index');

app.use(bp.json());
app.use(bp.urlencoded({
  extended: true,
}));
app.use(morgan('dev'));

app.use(cors());

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
console.log('env baby:', process.env.SEQUELIZE_SYNC_FORCE);
app.use('/user', require('./routes/userRoutes'));
app.use('/group/createGroup', require('./routes/createGroupRoutes'));
app.use('/group/myGroups', require('./routes/myGroupRoutes'));
app.use('/group/', require('./routes/groupsRoutes'));
app.use('/recentActivity', require('./routes/recentActivityRoutes'));
app.use('/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to chinmay\'s application.' });
});

const port = process.env.PORT;
// || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));
module.exports = app;

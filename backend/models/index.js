/* eslint-disable no-console */
const Sequelize = require('sequelize');
// const { groupUsers } = require('./group_user');
// const DT = Sequelize.DataTypes;
const { groups } = require('./group');
const { groupUsers } = require('./group_user');
const { users } = require('./user');
const { transactions } = require('./transaction');
const { expenses } = require('./expenses');
const { recentActivity } = require('./recentActivity');

const sequelize = new Sequelize('splitdb', 'root', process.env.DB_PASSWORD, {
  host: process.env.DB_URI,
  port: 3306,
  // eslint-disable-next-line no-console
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

// const sequelize = new Sequelize('splitwise-db.cxahoocsb1cn.us-east-2.rds.amazonaws.com');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

if (process.env.SEQUELIZE_SYNC_FORCE === 'true') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('all dbs created');
    })
    .catch((err) => {
      console.log(err.sql);
    });
}

module.exports = {
  groups,
  users,
  transactions,
  expenses,
  groupUsers,
  recentActivity,
};

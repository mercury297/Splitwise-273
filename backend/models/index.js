/* eslint-disable no-console */
const Sequelize = require('sequelize');
// const { groupUsers } = require('./group_user');
// const DT = Sequelize.DataTypes;
const { groups } = require('./group');
const { groupUsers } = require('./group_user');
const { users } = require('./user');
const { transactions } = require('./transaction');
const { expenses } = require('./expenses');

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

// const addInviteField = async () => {
//   try {
//     const result = await sequelize.query('ALTER TABLE group_users
//                         ADD COLUMN invite_accepted bool default false;');
//     console.log(result);
//     return result;
//   } catch {
//     return 'Some error adding column';
//   }
// };

// const output = addInviteField();

module.exports = {
  groups,
  users,
  transactions,
  expenses,
  groupUsers,
};

// console.log('Results for group_users field :', output);

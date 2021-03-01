/* eslint-disable no-console */
const Sequelize = require('sequelize');
// const { groupUsers } = require('./group_user');
const { groups } = require('./group');
const { users } = require('./user');
const { transactions } = require('./transaction');
const { expenses } = require('./expenses');

const sequelize = new Sequelize('splitdb', 'root', 'root_123', {
  host: 'splitwise-db.cxahoocsb1cn.us-east-2.rds.amazonaws.com',
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

groups.belongsToMany(
  users,
  {
    // junction table
    through: 'group_users',

    // parent class id
    foreignKey: 'group_id',
  },
);

users.belongsToMany(
  groups,
  {
    // junction table
    through: 'group_users',

    // parent class id
    foreignKey: 'user_id',
  },
);

groups.hasMany(expenses);

sequelize.sync()
  .then(() => {
    console.log('databases created ig');
    users.create({ name: 'user 1', email: 'user1@user1.com', password: 'user1@2021' });
  })
  .catch((err) => {
    console.log(err.sql);
  });

module.exports = {
  groups,
  users,
  transactions,
  expenses,
};

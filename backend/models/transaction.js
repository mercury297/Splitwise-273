const Sequelize = require('sequelize');
const { dbCreds, SEQUELIZE_SYNC_FORCE } = require('../config/db.config');

const DT = Sequelize.DataTypes;

const sequelize = new Sequelize(dbCreds.dbName, 'root', dbCreds.dbPassword, {
  host: dbCreds.host,
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

const transactions = sequelize.define(
  'transaction_table',
  {
    tx_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    user_that_owes: {
      type: DT.STRING,
      isEmail: true,
      allowNull: false,
    },
    user_that_paid: {
      type: DT.STRING,
      isEmail: true,
      allowNull: false,
    },
    amount_owed: {
      type: DT.STRING(100),
      allowNull: false,
    },
    settled_flag: {
      type: DT.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    group_id: {
      type: DT.STRING,
      allowNull: false,
    },
    group_name: {
      type: DT.STRING,
      allowNull: false,
    },
    expense_id: {
      type: DT.STRING,
      allowNull: false,
    },
  },
);

if (SEQUELIZE_SYNC_FORCE === 'true') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('expense db created');
    })
    .catch((err) => {
      console.log(err.sql);
    });
}

module.exports = {
  transactions,
};

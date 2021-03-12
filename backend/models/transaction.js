const Sequelize = require('sequelize');

const DT = Sequelize.DataTypes;

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
      validate: {
        isEMail: true,
      },
    },
    user_that_paid: {
      type: DT.STRING,
      validate: {
        isEMail: true,
      },
    },
    amount_owed: {
      type: DT.STRING(100),
      allowNull: false,
    },
    settled_flag: {
      type: DT.BOOLEAN,
      allowNull: false,
    },
  },
);

if (process.env.SEQUELIZE_SYNC_FORCE === 'true') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('tx db created');
    })
    .catch((err) => {
      console.log(err.sql);
    });
}

module.exports = {
  transactions,
};

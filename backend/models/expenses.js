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

const expenses = sequelize.define(
  'expenses_table',
  {
    expense_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    date: {
      type: DT.DATEONLY,
      defaultValue: Sequelize.NOW,

    },
    description: {
      type: DT.STRING,
    },
    paid_by: {
      type: DT.STRING,
      validate: {
        isEMail: true,
      },
    },
    amount: {
      type: DT.STRING(100),
      allowNull: false,
    },
    expense_added_by: {
      type: DT.STRING,
      validate: {
        isEmail: true,
      },
    },
    group_id: {
      type: DT.STRING,
    },
  },
);

sequelize.sync(
  {
    force: process.env.SEQUELIZE_SYNC_FORCE,
  },
)
  .then(() => {
    console.log('expense db created');
  })
  .catch((err) => {
    console.log(err.sql);
  });

module.exports = {
  expenses,
};

const Sequelize = require('sequelize');

const DT = Sequelize.DataTypes;

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
  },
);

module.exports = {
  expenses,
};

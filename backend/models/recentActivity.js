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

const recentActivity = sequelize.define(
  'recent_activity_table',
  {
    activity_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    operation_type: {
      type: DT.STRING,
      allowNull: false,
    },
    email: {
      type: DT.STRING,
      isEMail: true,
    },
    group_name: {
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
  recentActivity,
};

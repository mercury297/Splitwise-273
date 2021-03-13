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
    user_id: {
      type: DT.STRING,
      allowNull: false,
    },
    email: {
      type: DT.STRING,
      isEMail: true,
    },
    group_id: {
      type: DT.STRING,
      allowNull: false,
    },
    group_name: {
      type: DT.STRING,
      allowNull: false,
    },
  },
);

if (process.env.SEQUELIZE_SYNC_FORCE === ' false') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('recent activity db created');
    })
    .catch((err) => {
      console.log(err.sql);
    });
}

module.exports = {
  recentActivity,
};

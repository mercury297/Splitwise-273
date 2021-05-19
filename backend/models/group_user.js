const Sequelize = require('sequelize');
// const { users } = require('./user');
// const { groups } = require('./group');
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

const groupUsers = sequelize.define('group_users',
  {
    group_user_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    invite_flag: {
      type: DT.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    group_id: {
      type: DT.STRING,
      allowNull: false,
    },
    user_id: {
      type: DT.STRING,
      allowNull: false,
    },
    email: {
      type: DT.STRING(100),
      isEmail: true,
      allowNull: false,

    },
    group_name: {
      type: DT.STRING,
      allowNull: false,
    },
  });

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

// // groups.belongsToMany(
// //   users,
// //   {
// //     // junction table
// //     through: 'group_users',

// //     // parent class id
// //     foreignKey: 'group_id',
// //   },
// // );

// // users.belongsToMany(
// //   groups,
// //   {
// //     // junction table
// //     through: 'group_users',

// //     // parent class id
// //     foreignKey: 'user_id',
// //   },
// // );

module.exports = {
  groupUsers,
};

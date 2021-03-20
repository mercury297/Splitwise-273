const Sequelize = require('sequelize');
// const { users } = require('./user');
// const { groups } = require('./group');

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

if (process.env.SEQUELIZE_SYNC_FORCE === 'true') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('groupuser junction db created');
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

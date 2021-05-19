const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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
  freezeTableName: true
});

const salt = 10;

const users = sequelize.define(
  'user_table',
  {
    user_id:
      {
        type: DT.UUID,
        primaryKey: true,
        defaultValue: DT.UUIDV1,
      },
    name:
    {
      type: DT.STRING(50),
      allowNull: false,
    },
    phone_number: {
      type: DT.STRING(50),
    },
    photo_URL: {
      type: DT.STRING(200),
    },
    default_currency: {
      type: DT.STRING(100),
      defaultValue: 'USD',
    },
    language: {
      type: DT.STRING(50),
    },
    email: {
      type: DT.STRING(50),
      allowNull: false,
      unique: true,
    },
    timezone: {
      type: DT.STRING(200),
    },
    password: {
      type: DT.STRING(200),
      allowNull: false,
    },
  },
  {
    hooks: {
      // eslint-disable-next-line no-shadow
      beforeCreate: (users) => {
        // eslint-disable-next-line no-param-reassign
        users.password = users.password !== '' ? bcrypt.hashSync(users.password, salt) : '';
      },
    },
  },
);

if (SEQUELIZE_SYNC_FORCE) {
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
  users,
};

// users.belongsToMany(
//   groups,
//   {
//     // junction table
//     through: 'group_users',

//     // parent class id
//     foreignKey: 'user_id',
//   },
// );

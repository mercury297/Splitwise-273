const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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

if (process.env.SEQUELIZE_SYNC_FORCE === 'true') {
  sequelize.sync(
    {
      force: true,
    },
  )
    .then(() => {
      console.log('user db created');
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

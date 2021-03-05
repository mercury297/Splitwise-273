const Sequelize = require('sequelize');
// const { groups } = require('./group');

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
);

sequelize.sync(
  // {
  //   force: true,
  // },
)
  .then(() => {
    console.log('user db created');
  })
  .catch((err) => {
    console.log(err.sql);
  });

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

const Sequelize = require('sequelize');
// const { users } = require('./user');
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

const groups = sequelize.define(
  'group_table',
  {
    group_id: {
      type: DT.UUID,
      primaryKey: true,
      defaultValue: DT.UUIDV1,
    },
    created_by: {
      type: DT.STRING(50),
      allowNull: false,
    },
    photo_URL: {
      type: DT.STRING(200),
    },
    group_name: {
      type: DT.STRING(100),
      allowNull: false,
      unique: true,
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

// groups.belongsToMany(
//   users,
//   {
//     // junction table
//     through: 'group_users',

//     // parent class id
//     foreignKey: 'group_id',
//   },
// );

// groups.associate = (models) => {
//   groups.belongsToMany(models.Groups, {
//     through: 'GroupUsers',
//     as: 'groups',
//     foreignKey: 'userId',
//   });
// };
// groups.belongsTo(users, { foreignKey: 'user_id' });

module.exports = {
  groups,
};

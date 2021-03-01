// const Sequelize = require('sequelize');
// // const { users } = require('./user');
// // const { groups } = require('./group');

// const DT = Sequelize.DataTypes;

// const sequelize = new Sequelize('splitdb', 'root', 'root_123', {
//   host: 'splitwise-db.cxahoocsb1cn.us-east-2.rds.amazonaws.com',
//   port: 3306,
//   // eslint-disable-next-line no-console
//   logging: console.log,
//   maxConcurrentQueries: 100,
//   dialect: 'mysql',
//   dialectOptions: {
//     ssl: 'Amazon RDS',
//   },
// });

// // const groupUsers = sequelize.define(
// //   'group_users',
// //   {
// //     user_id: {
// //       type: DT.STRING,
// //       allowNull: false,
// //       references: {
// //         model: 'user_table',
// //         key: 'user_id',
// //       },
// //     },
// //     group_id: {
// //       type: DT.STRING,
// //       allowNull: false,
// //       references: {
// //         model: 'group_table',
// //         key: 'group_id',
// //       },
// //     },
// //   },
// // );

// // sequelize.sync();

// // module.exports = {
// //   groupUsers,
// // };

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

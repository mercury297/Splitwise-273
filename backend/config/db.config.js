// export const dbName = 'splitwise-graphql';
// export const host = 'splitwise-graphql.cxahoocsb1cn.us-east-2.rds.amazonaws.com';
// // export const port = '3306';
// export const dbPassword = 'root_123';
const dbCreds = {
    dbName: 'splitwise',
    host: 'splitwise-graphql.cxahoocsb1cn.us-east-2.rds.amazonaws.com',
    dbPassword: 'root_123',
};
const SEQUELIZE_SYNC_FORCE = false;

module.exports = {
    dbCreds,
    SEQUELIZE_SYNC_FORCE,
}
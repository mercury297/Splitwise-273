const { Op } = require('sequelize');
const { transactions } = require('../models/index');

const getDuesForGroup = async (userID, groupID) => {
  try {
    const duesObject = await transactions.findAll({
      where: {
        [Op.and]: [{ group_id: groupID }, { settled_flag: false }],
        [Op.or]: [{ user_that_paid: userID }, { user_that_owes: userID }],
      },
    });
    if (duesObject !== undefined || duesObject !== null) {
      return {
        statusCode: 200,
        body: duesObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No such dues exists',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  getDuesForGroup,
};

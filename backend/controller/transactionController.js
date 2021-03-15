const { Op, fn, col } = require('sequelize');
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

const createTransactionsForExpense = async (transactionArray) => {
  try {
    const transactionsObject = await transactions.bulkCreate(transactionArray);
    if (transactionsObject !== undefined
      && transactionsObject !== null) {
      return {
        statusCode: 201,
        body: transactionsObject,
      };
    }
    return {
      statusCode: 404,
      body: 'transaction bulk create failed.',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getGroupSummary = async (groupID) => {
  try {
    const summaryObject = await transactions.findAll({
      attributes: ['user_that_owes',
        [fn('sum', col('amount_owed')), 'total_owed'],
        'user_that_paid',
      ],
      where: {
        group_id: groupID,
      },
      group: ['user_that_owes', 'user_that_paid'],
      raw: true,
    });
    if (summaryObject !== undefined
      || summaryObject !== null) {
      return {
        statusCode: 200,
        body: summaryObject,
      };
    }
    return {
      statusCode: 500,
      body: 'No TXs found',
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
  createTransactionsForExpense,
  getGroupSummary,
};

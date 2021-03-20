const { Op, fn, col } = require('sequelize');
const { transactions } = require('../models/index');

const getDuesForGroup = async (email, groupID) => {
  try {
    const duesObject = await transactions.findAll({
      where: {
        [Op.and]: [{ group_id: groupID }, { settled_flag: false }],
        [Op.or]: [{ user_that_paid: email }, { user_that_owes: email }],
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
        settled_flag: false,
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

// later change attr group_id to group_name after DB defn is updated
const getUserSummary = async (userID) => {
  try {
    const summaryObject = await transactions.findAll({
      attributes: ['user_that_owes',
        [fn('sum', col('amount_owed')), 'total_owed'],
        'user_that_paid', 'group_id', 'group_name',
      ],
      where: {
        settled_flag: false,
        [Op.or]: [{ user_that_paid: userID }, { user_that_owes: userID }],
      },
      group: ['user_that_owes', 'user_that_paid', 'group_id'],
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

const settleUp = async (currentUser, settleUpUser) => {
  console.log(currentUser, settleUpUser, 'settle contr');
  try {
    const settleObjectOwed = await transactions.update(
      { settled_flag: true },
      {
        where: {
          settled_flag: false,
          [Op.and]: [{ user_that_paid: currentUser }, { user_that_owes: settleUpUser }],
        },
      },
    );
    const settleObjectOwes = await transactions.update(
      { settled_flag: true },
      {
        where: {
          settled_flag: false,
          [Op.and]: [{ user_that_paid: settleUpUser }, { user_that_owes: currentUser }],
        },
      },
    );
    if (settleObjectOwed !== undefined
      && settleObjectOwes !== undefined
      && settleObjectOwed !== null && settleObjectOwes !== null) {
      return {
        statusCode: 200,
        body: { settleObjectOwed, settleObjectOwes },
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

const updateAllTxs = async (expenseID, updatedAmount) => {
  try {
    const updateObject = await transactions.update(
      { amount_owed: updatedAmount },
      {
        where: {
          expense_id: expenseID,
        },
      },
    );
    if (updateObject !== undefined || updateObject !== null) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No such TXs exist',
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
  getUserSummary,
  settleUp,
  updateAllTxs,
};

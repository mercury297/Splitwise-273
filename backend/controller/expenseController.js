const { expenses } = require('../models/index');

const createExpense = async (expenseBody) => {
  try {
    const expenseObject = await expenses.create(expenseBody);
    return {
      statusCode: 201,
      body: expenseObject,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createExpense,
};

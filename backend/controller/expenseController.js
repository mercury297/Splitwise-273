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

const getExpenses = async (groupName) => {
  try {
    const expensesObject = await expenses.findAll({
      where: {
        group_name: groupName,
      },
    });
    if (expensesObject !== undefined
      && expensesObject !== null
      && expensesObject.length !== 0) {
      return {
        statusCode: 200,
        body: expensesObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No expenses in this group!',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const updateExpense = async (updateData, expenseID) => {
  try {
    const expenseObject = await expenses.update(updateData,
      {
        where: { expense_id: expenseID },
      });
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
  getExpenses,
  updateExpense,
};

const express = require('express');
const { getExpenses, createExpense } = require('../controller/expenseController');
const getTransactionsArray = require('../services/bulkTxCreater');
const { summarizer } = require('../services/prepareSummary');
const { createTransactionsForExpense, getGroupSummary } = require('../controller/transactionController');
const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.get('/getExpensesList/:groupName', async (req, res) => {
  const expenseListRes = getExpenses(req.params.groupName);
  const { statusCode, body } = expenseListRes;
  res.status(statusCode).send(body);
});

router.post('/addExpense', async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    paid_by,
    amount,
    // eslint-disable-next-line camelcase
    expense_added_by,
    // eslint-disable-next-line camelcase
    group_name,
  } = req.body;

  const expenseBody = await createExpense(req.body);
  // console.log(expenseBody);
  const { statusCode, body } = expenseBody;
  if (statusCode === 201) {
    const txArray = await getTransactionsArray(group_name, paid_by, amount);
    console.log('txArr:', txArray);

    const createTxObject = await createTransactionsForExpense(txArray);
    const activityObject = await createActivity({
      operation_type: 'ADD EXPENSE',
      email: expense_added_by,
      group_name,
    });
    console.log('Activity added :', activityObject);
    res.status(createTxObject.statusCode).send('Expense added successfully');
  } else {
    res.status(statusCode).send(body);
  }
});

router.get('/getSummary/:groupID', async (req, res) => {
  const summaryBody = await getGroupSummary(req.params.groupID);
  const { statusCode, body } = summaryBody;
  const summaryObject = await summarizer(body, req.params.groupID);
  res.status(statusCode).send(summaryObject);
});

module.exports = router;

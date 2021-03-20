const express = require('express');
const { getExpenses, createExpense, updateExpense } = require('../controller/expenseController');
const { getTransactionsArray, getUpdatedAmount } = require('../services/bulkTxCreater');
const { summarizer } = require('../services/prepareSummary');
const { createTransactionsForExpense, getGroupSummary, updateAllTxs } = require('../controller/transactionController');
const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.get('/getExpensesList/:groupName', async (req, res) => {
  const expenseListRes = await getExpenses(req.params.groupName);
  console.log(expenseListRes);
  const { statusCode, body } = expenseListRes;
  res.status(statusCode).send(body);
});

router.post('/addExpense', async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    paid_by,
    amount,
    // eslint-disable-next-line camelcase
    // eslint-disable-next-line camelcase
    group_name,
  } = req.body;

  const expenseBody = await createExpense(req.body);
  // console.log(expenseBody);
  const { statusCode, body } = expenseBody;
  console.log('exp body:', body);
  if (statusCode === 201) {
    const txArray = await getTransactionsArray(
      group_name, paid_by, amount, body.dataValues.expense_id,
    );
    console.log('txArr:', txArray);

    const createTxObject = await createTransactionsForExpense(txArray);
    const activityObject = await createActivity({
      operation_type: 'ADD EXPENSE',
      email: paid_by,
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

router.put('/updateExpense', async (req, res) => {
  const {
    expenseID, amount, groupName, email,
  } = req.body;
  const amountAfterDivide = await getUpdatedAmount(amount, groupName);
  const updateExpenseRes = await updateExpense({
    amount,
  }, expenseID);

  if (updateExpenseRes.statusCode === 201) {
    const updateTxRes = await updateAllTxs(expenseID, amountAfterDivide);
    const { statusCode, body } = updateTxRes;
    console.log('update body', body);
    const activityObject = await createActivity({
      operation_type: 'UPDATE EXPENSE',
      email,
      group_name: groupName,
    });
    console.log('activity object :', activityObject.body);
    res.status(statusCode).send('Updated successfully');
  } else {
    console.log(updateExpenseRes.body);
    res.status(updateExpenseRes.statusCode).send('Failed to update');
  }
});

module.exports = router;

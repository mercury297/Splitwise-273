const express = require('express');
const { getExpenses, createExpense } = require('../controller/expenseController');
const getTransactionsArray = require('../services/bulkTxCreater');
const { createTransactionsForExpense } = require('../controller/transactionController');

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
    group_name,
  } = req.body.expenseBody;

  const expenseBody = await createExpense(req.body.expenseBody);
  console.log(expenseBody);
  const { statusCode, body } = expenseBody;
  if (statusCode === 201) {
    const txArray = await getTransactionsArray(group_name, paid_by, amount);
    console.log('txArr:', txArray);

    const createTxObject = await createTransactionsForExpense(txArray);
    res.status(createTxObject.statusCode).send(createTxObject.body);
  } else {
    res.status(statusCode).send(body);
  }
});

module.exports = router;

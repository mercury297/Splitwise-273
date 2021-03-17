const express = require('express');
const { getUserSummary, settleUp } = require('../controller/transactionController');
const { dashboardSummarizer } = require('../services/prepareSummary');

const router = express.Router();

router.get('/getSummary/:email', async (req, res) => {
  const summaryRes = await getUserSummary(req.params.email);
  const { statusCode, body } = summaryRes;
  const summary = await dashboardSummarizer(body, req.params.email);
  res.status(statusCode).send(summary);
});

router.post('/settleUp', async (req, res) => {
  const { currentUser, settleUser } = req.body;
  const settleUpRes = await settleUp(currentUser, settleUser);
  const { statusCode, body } = settleUpRes;
  res.status(statusCode).send(body);
});

module.exports = router;

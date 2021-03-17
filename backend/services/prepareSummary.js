const { getGroupUsers } = require('../controller/groupUserController');

const summarizer = async (summaryObject, groupID) => {
  let usersList = await getGroupUsers(groupID);
  usersList = usersList.body;
  const emailsList = usersList.map((users) => users.dataValues.email);
  const owes = {};

  for (let i = 0; i < emailsList.length; i += 1) {
    owes[emailsList[i]] = 0;
  }

  for (let i = 0; i < summaryObject.length; i += 1) {
    const currentTx = summaryObject[i];
    owes[currentTx.user_that_owes] += currentTx.total_owed;
    owes[currentTx.user_that_paid] -= currentTx.total_owed;
  }

  return owes;
};

const dashboardSummarizer = async (summaryObject, currentUser) => {
  const summary = { owes: [], owed: [] };

  for (let i = 0; i < summaryObject.length; i += 1) {
    if (summaryObject[i].total_owed > 0 && summaryObject[i].user_that_owes === currentUser) {
      summary.owes.push(summaryObject[i]);
    } else {
      summary.owed.push(summaryObject[i]);
    }
  }
  return summary;
};

module.exports = {
  summarizer,
  dashboardSummarizer,
};

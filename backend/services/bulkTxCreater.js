const { getUsersByGroupName } = require('../controller/groupUserController');

const getTransactionsArray = async (groupName, userThatPaid, amount, expenseID) => {
  console.log('user that paid :', userThatPaid);
  const usersObject = await getUsersByGroupName(groupName);
  // console.log('userObj:', usersObject.body[0].dataValues.email);
  const txArray = [];
  const arrayObject = usersObject.body;
  // console.log(arrayObject[0].dataValues, 'len', arrayObject.length);
  const amountDividend = amount / arrayObject.length;
  if (usersObject.statusCode === 200) {
    for (let i = 0; i < arrayObject.length; i += 1) {
      // console.log('Inside for loop', 'Obj key', Object.keys(arrayObject[i].dataValues));
      if (arrayObject[i].dataValues.email !== userThatPaid) {
        txArray.push({
          user_that_owes: arrayObject[i].dataValues.email,
          user_that_paid: userThatPaid,
          amount_owed: amountDividend.toString(),
          group_id: arrayObject[i].dataValues.group_id,
          group_name: groupName,
          expense_id: expenseID,
        });
      }
    }
    return txArray;
  }
  return usersObject;
};

const getUpdatedAmount = async (amount, groupName) => {
  const usersObject = await getUsersByGroupName(groupName);
  const amountDividend = amount / usersObject.body.length;
  return amountDividend;
};

module.exports = {
  getTransactionsArray,
  getUpdatedAmount,
};

import { currencyFormatter, getCurrentUserData } from './commonUtils';

const getTotal = (untotalledArray) => {
  const total = untotalledArray.reduce((acc, elem) => acc + elem.total_owed, 0);
  return total;
};

const getTotalBalance = (data) => {
  const owedTotal = getTotal(data.owed);
  const owesTotal = getTotal(data.owes);
  return {
    total: owedTotal - owesTotal,
    owed: owedTotal,
    owes: owesTotal,
  };
};

// group_id: "8fe0d740-855a-11eb-a41c-7dea59488261"
// group_name : "something"
// total_owed: 100
//
// user_that_owes: "Y@G.com"
//
// user_that_paid: "A@J.com"

const createArrayForDueList = (dueObject, owed) => {
  const userDetails = getCurrentUserData();
  const currentCurrency = userDetails.default_currency;
  // console.log(dueObject, owed);
  if (dueObject.length === 0) {
    return [];
  }
  let IDsList = [];
  const IDsListTotals = {};
  if (owed) {
    IDsList = dueObject.map((elem) => elem.user_that_owes);
  } else {
    IDsList = dueObject.map((elem) => elem.user_that_paid);
  }

  for (let i = 0; i < IDsList.length; i += 1) {
    IDsListTotals[IDsList[i]] = 0;
  }
  const dueList = {};
  for (let i = 0; i < IDsList.length; i += 1) {
    dueList[IDsList[i]] = [];
  }
  for (let i = 0; i < dueObject.length; i += 1) {
    const currentUser = dueObject[i];
    let currentName = '';
    if (owed) {
      currentName = currentUser.user_that_owes;
    } else {
      currentName = currentUser.user_that_paid;
    }
    IDsListTotals[currentName] += currentUser.total_owed;
    if (owed) {
      dueList[currentName].push(`${currentName} owes you ${currencyFormatter(currentCurrency, currentUser.total_owed)} from group: ${currentUser.group_name}`);
    } else {
      dueList[currentName].push(`You owe ${currentName} ${currencyFormatter(currentCurrency, currentUser.total_owed)} from group: ${currentUser.group_name}`);
    }
  }
  return {
    dueList,
    totals: IDsListTotals,
  };
};

const getArrForSelect = (list) => {
  const selectArr = [];
  for (let i = 0; i < list.length; i += 1) {
    selectArr.push({ label: list[i], value: list[i] });
  }
  return selectArr;
};

export {
  getTotalBalance,
  createArrayForDueList,
  getArrForSelect,
};

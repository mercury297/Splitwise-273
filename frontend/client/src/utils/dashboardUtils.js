const getTotal = (untotalledArray) => {
  const total = untotalledArray.reduce((acc, elem) => acc + elem.total_owed, 0);
  return total;
};

const getTotalBalance = (data) => {
  const owedTotal = getTotal(data.owed);
  const owesTotal = getTotal(data.owes);
  return {
    total: owedTotal + owesTotal,
    owed: owedTotal,
    owes: owesTotal,
  };
};

export default getTotalBalance;

/* eslint-disable no-restricted-syntax */
const getSummaryArr = (summaryObject) => {
  const arr = [];
  for (const key in summaryObject) {
    if (summaryObject[key] > 0) {
      arr.push(`${key} owes ${summaryObject[key]}`);
    } else if (summaryObject[key] < 0) {
      arr.push(`${key} gets back ${summaryObject[key] * -1}`);
    } else {
      arr.push(`${key} is settled`);
    }
  }
  console.log('arr', arr);
  return arr;
};

export default getSummaryArr;

/* eslint-disable no-restricted-globals */
const types = { 'CREATE GROUP': 'created group', 'UPDATE EXPENSE': 'updated expense', 'ADD EXPENSE': 'added expense' };

const getActivitySummary = (email, groupName, operation) => {
  const operationType = types[operation];
  if (operation === 'CREATE GROUP') {
    return `${email} ${operationType} ${groupName}`;
  }
  return `${email} ${operationType} in group ${groupName}`;
};

const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const dateOfWeek = new Date(date).getDate();
  return isNaN(dayOfWeek) ? null
    : `${dateOfWeek}  ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]}`;
};

export {
  getActivitySummary,
  getDayOfWeek,
};

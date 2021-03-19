const getArrayForSelect = (users) => {
  const userList = users.map((user) => ({
    label: user.email,
    value: user.user_id,
  }));
  return userList;
};

export default getArrayForSelect;

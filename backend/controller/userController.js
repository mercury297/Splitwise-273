/* eslint-disable consistent-return */
const { users } = require('../models/index');

// eslint-disable-next-line consistent-return
const createUser = async (name, email, password) => {
  try {
    const userObejct = await users.create({ name, email, password });
    return {
      statusCode: 201,
      body: userObejct,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }

  // .then((result) => {
  //   console.log('user created: ', result);
  //   return {
  //     statusCode: 201,
  //     body: result,
  //   };
  // })
  // .catch((err) => {
  // //   console.log(err);
  //   console.log('Some error for user creation. Mostly validation');
  //   //   const responseArray = [err, 500];
  //   return {
  //     statusCode: 500,
  //     body: err,
  //   };
  // });
};

// eslint-disable-next-line consistent-return
const getUser = (userID) => {
  try {
    users.findByPk(userID)
      .then((user) => user);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('User data fetching error : ', err);
    return 'Error. Could not find user';
  }
};

/**
 * [someFunction description]
 * @param  {String} userID ID of user to be updated
 * @param  {Object} updateData update object eg: {name: Yash, language: Spanish}
 * @return {String}      Successful update or Failure
 */
const updateUser = (userID, updateData) => {
  try {
    users.findByPk(userID)
      .then(
        (user) => {
          user.update(updateData)
            .then(() => 'User data updated succesfully');
        },
      );
  } catch (err) {
    return 'Error. Could not update user';
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
};

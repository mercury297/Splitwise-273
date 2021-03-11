/* eslint-disable consistent-return */
// const { Op } = require('sequelize');
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
};

// eslint-disable-next-line consistent-return
const getUser = async (userID) => {
  try {
    const userObject = await users.findByPk(userID);
    // console.log(userObject);
    if (userObject !== undefined && userObject !== null) {
      // console.log(200);
      return {
        statusCode: 200,
        body: userObject,
      };
    }
    return {
      statusCode: 404,
      body: 'User not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getUserByCreds = async (userEmail) => {
  try {
    const userObject = await users.findOne({
      where: {
        // [Op.and]: [
        //   { email: userEmail },
        //   { password: userPassword },
        // ],
        email: userEmail,
      },
    });
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    }

    return {
      statusCode: 404,
      body: 'User not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

/**
 * [someFunction description]
 * @param  {String} userID ID of user to be updated
 * @param  {Object} updateData update object eg: {name: Yash, language: Spanish}
 * @return {String}      Successful update or Failure
 */
const updateUser = async (userID, updateData) => {
  try {
    const updateObject = await users.update(
      updateData,
      { where: { user_id: userID } },
    );
    if (updateObject !== undefined && updateObject !== null) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

// createUser('Yash', 'Yash@1.com', 'Yash@1');
// const getOutput = async () => {
//   const output = await getUserByCreds('Yash@1.com', 'Yash@1');
//   console.log('get :', output.body.dataValues);
// };

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
};

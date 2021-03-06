/* eslint-disable consistent-return */
const { Op } = require('sequelize');
const { users } = require('../models/index');

// eslint-disable-next-line consistent-return
const createUser = async (name, email, password) => {
  try {
    const userObject = await users.create({ name, email, password });
    return {
      statusCode: 201,
      body: userObject,
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

const getUserByCreds = async (email) => {
  try {
    const userObject = await users.findOne({
      where: {
        email,
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
    console.log(err);
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

const getAllUsersExceptCurrent = async (email) => {
  try {
    const userObject = await users.findAll({
      where: {
        [Op.not]: { email },
      },
    });
    if (userObject !== undefined && userObject !== null) {
      return {
        statusCode: 200,
        body: userObject,
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  getUserByCreds,
  getAllUsersExceptCurrent,
};

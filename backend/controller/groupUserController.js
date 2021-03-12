const { groupUsers } = require('../models/index');

const getGroupUsers = async (groupID) => {
  try {
    const groupObject = await groupUsers.findAll({
      where: {
        group_id: groupID,
      },
    });
    if (groupObject !== undefined || groupObject !== null) {
      return {
        statusCode: 200,
        body: groupObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No such group exists',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const deleteGroupUsers = async (groupID) => {
  try {
    const deleteObject = await groupUsers.destroy({
      where: {
        group_id: groupID,
      },
    });
    if (deleteObject !== undefined || deleteObject !== null) {
      return {
        statusCode: 200,
        body: deleteObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No such group exists',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const createGroupUser = async (groupID, userID) => {
  try {
    const createObject = await groupUsers.create({
      group_id: groupID,
      user_id: userID,
    });
    if (createObject !== undefined || createObject !== null) {
      return {
        statusCode: 201,
        body: createObject,
      };
    }
    return {
      statusCode: 500,
      body: 'Create in group user controller has failed.',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  getGroupUsers,
  deleteGroupUsers,
  createGroupUser,
};

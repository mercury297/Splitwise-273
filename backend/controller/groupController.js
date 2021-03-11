const { groups } = require('../models/index');
const { groupUsers } = require('../models/index');

// Get group details by group ID
const getGroup = async (userID) => {
  try {
    const groupObject = await groups.findByPk(userID);
    if (groupObject !== undefined && groupObject !== null) {
      return {
        statusCode: 200,
        body: groupObject,
      };
    }
    return {
      statusCode: 404,
      body: 'Group not found',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const createGroup = async (groupName, emailID, userID) => {
  try {
    const groupObject = await groups.create({ group_name: groupName, created_by: emailID });
    console.log('group :', groupObject);
    const groupUserObject = await groupUsers.create({
      invite_flag: true, group_id: groupObject.group_id, user_id: userID,
    });
    console.log('group user: ', groupUserObject);
    return {
      statusCode: 201,
      body: groupObject,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createGroup,
  getGroup,
};

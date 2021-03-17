const { groups } = require('../models/index');
const { groupUsers } = require('../models/index');

// Get group details by group ID
const getGroup = async (groupID) => {
  try {
    const groupObject = await groups.findByPk(groupID);
    if (groupObject !== undefined || groupObject !== null) {
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
      invite_flag: true,
      group_id: groupObject.group_id,
      user_id: userID,
      group_name: groupObject.group_name,
      email: emailID,
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

/**
 * [someFunction description]
 * @param  {String} groupID ID of user to be updated
 * @param  {Object} updateData update object eg: {name: Yash, language: Spanish}
 * @return {String}      Successful update or Failure
 */
const updateGroup = async (groupID, updateData) => {
  try {
    const updateObject = await groups.update(
      updateData,
      { where: { group_id: groupID } },
    );
    if (updateObject !== undefined && updateObject !== null) {
      return {
        statusCode: 200,
        body: updateObject,
      };
    }
    return {
      statusCode: 500,
      body: 'Update not successful',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getGroupName = async (groupID) => {
  try {
    const groupObject = await groups.find({
      attributes: ['group_name', 'group_id'],
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
      body: 'Group not found',
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
  updateGroup,
  getGroupName,
};

const { Op } = require('sequelize');
const { recentActivity } = require('../models/index');
const { getMyGroups } = require('./groupUserController');

const createActivity = async (activityBody) => {
  try {
    // const { user_id, email, operation_type, group_id, group_name } = activityBody;
    const createActivityObject = await recentActivity.create(activityBody);
    return {
      statusCode: 201,
      body: createActivityObject,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const getActivities = async (userID) => {
  try {
    const myGroupsObject = await getMyGroups(userID);
    const groupIDs = myGroupsObject.body.map((myGroup) => myGroup.dataValues.group_name);
    console.log('groupIDs', groupIDs);
    const recentActivitiesObject = await recentActivity.findAll({
      where: {
        group_name: {
          [Op.in]: groupIDs,
        },
      },
    });
    console.log(recentActivitiesObject);
    if (recentActivitiesObject !== undefined && recentActivitiesObject !== null) {
      return {
        statusCode: 200,
        body: recentActivitiesObject,
      };
    }
    return {
      statusCode: 404,
      body: 'No activity for this user',
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

module.exports = {
  createActivity,
  getActivities,
};

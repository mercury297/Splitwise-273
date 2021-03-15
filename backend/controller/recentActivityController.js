const { recentActivity } = require('../models/index');

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

const getActivities = async (email) => {
  try {
    const recentActivitiesObject = await recentActivity.findAll({
      where: {
        email,
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

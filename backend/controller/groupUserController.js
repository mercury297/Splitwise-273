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

const getInvitations = async (userID) => {
  try {
    const getInvitationObject = await groupUsers.findAll({
      where: {
        user_id: userID,
        invite_flag: false,
      },
    });
    if (getInvitationObject !== undefined || getInvitationObject !== null) {
      return {
        statusCode: 200,
        body: getInvitationObject,
      };
    }
    return {
      statusCode: 500,
      body: 'Could not get Invitations for this user',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const acceptInvitation = async (groupID) => {
  try {
    const acceptInvitationObject = await groupUsers.update(
      { invite_flag: true },
      {
        where: {
          group_id: groupID,
        },
      },
    );
    if (acceptInvitationObject !== undefined || acceptInvitationObject !== null) {
      return {
        statusCode: 200,
        body: 'Invitation accepted successfully',
      };
    }
    return {
      statusCode: 500,
      body: 'Invitation update unsuccesful.',
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err,
    };
  }
};

const leaveGroupUser = async (groupID, userID) => {
  try {
    const leaveGroupUserObject = await groupUsers.destroy({
      where: {
        group_id: groupID,
        user_id: userID,
      },
    });
    if (leaveGroupUserObject !== undefined
      && leaveGroupUserObject !== null
      // eslint-disable-next-line eqeqeq
      && leaveGroupUserObject != 0) {
      return {
        statusCode: 200,
        body: 'User group entries deleted successfully(user left group).',
      };
    }
    return {
      statusCode: 500,
      body: 'User already left group.',
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
  getInvitations,
  acceptInvitation,
  leaveGroupUser,
};

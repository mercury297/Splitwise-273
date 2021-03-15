const express = require('express');
const { getInvitations, acceptInvitation } = require('../controller/groupUserController');
const { getDuesForGroup } = require('../controller/transactionController');
const { leaveGroupUser, getMyGroups } = require('../controller/groupUserController');
// const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.post('/getInvitationList', async (req, res) => {
  const { userID } = req.body;
  const invitationListRes = await getInvitations(userID);
  const { statusCode, body } = invitationListRes;
  res.status(statusCode).send(body);
});

router.post('/acceptInvitation', async (req, res) => {
  const { userID, groupID } = req.body;
  const acceptInvitationRes = await acceptInvitation(userID, groupID);
  if (acceptInvitationRes.statusCode === 200) {
    res.status(200).send(acceptInvitationRes.body);
  } else {
    res.status(500).send({
      errors: {
        body: acceptInvitationRes.body,
      },
    });
  }
});

router.delete('/leaveGroup', async (req, res) => {
  const { groupID } = req.body;
  const { userID } = req.body;
  const getDuesRes = await getDuesForGroup(userID, groupID);
  const { statusCode, body } = getDuesRes;
  if (statusCode === 200 && body.length === 0) {
    const leaveObject = await leaveGroupUser(groupID, userID);
    if (leaveObject.statusCode === 200) {
      res.status(statusCode).send('user left group');
    } else {
      res.status(500).send(leaveObject.body);
    }
  } else {
    res.send(body);
  }
});

router.get('/getMyGroups/:userID', async (req, res) => {
  const getMyGroupsRes = await getMyGroups(req.params.userID);
  const { statusCode, body } = getMyGroupsRes;
  res.status(statusCode).send({
    myGroups: body,
  });
});

module.exports = router;

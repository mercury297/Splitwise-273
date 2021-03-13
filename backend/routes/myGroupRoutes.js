const express = require('express');
const { getInvitations, acceptInvitation } = require('../controller/groupUserController');
const { getDuesForGroup } = require('../controller/transactionController');
const { leaveGroupUser, getMyGroups } = require('../controller/groupUserController');
// const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

// router.

router.post('/getInvitationList', async (req, res) => {
  const { userID } = req.body;
  const invitationListRes = await getInvitations(userID);
  //   console.log(invitationListRes);
  if (invitationListRes.statusCode === 200) {
    res.status(200).send({
      invitationList: invitationListRes.body,
    });
  } else {
    res.status(500).send({
      errors: {
        body: invitationListRes.body,
      },
    });
  }
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
  if (getDuesRes.statusCode === 200 && getDuesRes.body.length === 0) {
    // console.log('line 46');
    const leaveObject = await leaveGroupUser(groupID, userID);
    // console.log(leaveObject);
    if (leaveObject.statusCode === 200) {
      res.status(200).send('user left group');
    } else {
      res.status(500).send(leaveObject.body);
    }
  } else {
    res.send(getDuesRes);
  }
});

router.get('/getMyGroups/:userID', async (req, res) => {
  // const userID = req.params.userID;
  const getMyGroupsRes = await getMyGroups(req.params.userID);
  const { statusCode, body } = getMyGroupsRes;
  res.status(statusCode).send({
    myGroups: body,
  });
});

module.exports = router;

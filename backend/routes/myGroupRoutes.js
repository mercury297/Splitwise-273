const express = require('express');
const { getInvitations, acceptInvitation } = require('../controller/groupUserController');
const { getDuesForGroup } = require('../controller/transactionController');
const { leaveGroupUser, getMyGroups } = require('../controller/groupUserController');
// const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.get('/getInvitationList/:userID', async (req, res) => {
  const invitationListRes = await getInvitations(req.params.userID);
  const { statusCode, body } = invitationListRes;
  console.log(body.length);
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

router.post('/leaveGroup', async (req, res) => {
  console.log(req.body);
  const { groupID } = req.body;
  const { email } = req.body;
  const { userID } = req.body;
  const getDuesRes = await getDuesForGroup(email, groupID);
  const { statusCode, body } = getDuesRes;
  // console.log(getDuesRes);
  console.log(body);
  if (statusCode === 200 && body.length === 0) {
    const leaveObject = await leaveGroupUser(groupID, userID);
    if (leaveObject.statusCode === 200) {
      res.status(statusCode).send('user left group');
    } else {
      res.status(500).send(leaveObject.body);
    }
  } else {
    res.status(500).send('Dues in left group');
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

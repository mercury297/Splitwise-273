const express = require('express');
const { getInvitations, acceptInvitation } = require('../controller/groupUserController');

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
  const { groupID } = req.body;
  const acceptInvitationRes = await acceptInvitation(groupID);
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

module.exports = router;

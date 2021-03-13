const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getParams, s3 } = require('../services/s3Uploader');

const { getGroup, createGroup, updateGroup } = require('../controller/groupController');
const { getGroupUsers, createGroupUser } = require('../controller/groupUserController');
const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.post('/createGroup', async (req, res) => {
  const groupDetails = req.body.groupObject;
  const { name } = groupDetails;
  const { email } = groupDetails;
  const { userID } = groupDetails;
  console.log(name, email, userID);
  const createRes = await createGroup(name, email, userID);
  if (createRes.statusCode === 201) {
    const activityObject = await createActivity({
      operation_type: 'CREATE GROUP',
      user_id: userID,
      email,
      group_id: createRes.body.dataValues.group_id,
      group_name: createRes.body.dataValues.group_name,
    });
    console.log(activityObject.body);
    res.status(201).send({
      group: {
        name: createRes.body.dataValues.group_name,
        created_by: createRes.body.dataValues.created_by,
        groupID: createRes.body.dataValues.group_id,
      },
    });
  } else {
    res.status(500).send({
      errors: {
        body: createRes.body,
      },
    });
  }
});

router.post('/addProfilePicture', upload.single('file'), async (req, res) => {
  const { file } = req;
  const { groupID } = req.body;
  const { userID } = req.body;
  const { email } = req.body;
  const { groupName } = req.body;
  const groupDetails = await getGroup(groupID);

  if (groupDetails.statusCode === 500 || groupDetails.statusCode === 404) {
    res.status(500).send({
      errors: {
        body: groupDetails.body,
      },
    });
  }
  const params = getParams(groupID, file.buffer, file.mimetype);

  s3.upload(params, async (err, data) => {
    if (err) {
      res.status(500).send({
        errors: {
          body: err,
        },
      });
    } else {
      const userUpdateRes = await updateGroup(groupID, { photo_URL: data.Location });
      if (userUpdateRes.statusCode === 200) {
        const activityObject = await createActivity({
          operation_type: 'UPDATE GROUP PICTURE',
          user_id: userID,
          email,
          group_id: groupID,
          group_name: groupName,
        });
        console.log(activityObject.body);
        res.status(200).send({
          update: userUpdateRes.body,
        });
      } else {
        res.status(500).send({
          errors: {
            body: userUpdateRes.body,
          },
        });
      }
    }
  });
});

router.post('/sendInvite', async (req, res) => {
  const inviteDetails = req.body.inviteObject;
  const { groupID } = inviteDetails;
  const { userID } = inviteDetails;

  const sendInviteRes = await createGroupUser(groupID, userID);
  if (sendInviteRes.statusCode === 201) {
    res.status(201).send(`Invite sent to user with user_id = ${userID}`);
  } else {
    res.status(500).send({
      errors: {
        body: sendInviteRes.body,
      },
    });
  }
});

router.post('/getGroupUserList', async (req, res) => {
  const { groupID } = req.body;
  const getUsersRes = await getGroupUsers(groupID);
  if (getUsersRes.statusCode === 200) {
    res.status(200).send({
      groupUsers: getUsersRes.body,
    });
  } else {
    res.status(500).send({
      errors: {
        body: getUsersRes.body,
      },
    });
  }
});

module.exports = router;

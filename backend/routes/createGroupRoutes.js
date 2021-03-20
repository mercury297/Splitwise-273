const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getParams, s3 } = require('../services/s3Uploader');

const { getGroup, createGroup, updateGroup } = require('../controller/groupController');
const { createGroupUsers } = require('../controller/groupUserController');
const { getAllUsersExceptCurrent } = require('../controller/userController');
const { createActivity } = require('../controller/recentActivityController');

const router = express.Router();

router.post('/createGroup', async (req, res) => {
  const {
    name,
    email,
    userID,
  } = req.body;
  const createRes = await createGroup(name, email, userID);
  if (createRes.statusCode === 201) {
    const activityObject = await createActivity({
      operation_type: 'CREATE GROUP',
      email,
      group_name: createRes.body.dataValues.group_name,
    });
    console.log('activity added :', activityObject);
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
          email,
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
  const inviteArray = req.body;
  console.log('invite arr: ', inviteArray);
  const sendInviteRes = await createGroupUsers(inviteArray);
  if (sendInviteRes.statusCode === 201) {
    res.status(201).send('Invites sent to all the users');
  } else {
    res.status(500).send({
      errors: {
        body: sendInviteRes.body,
      },
    });
  }
});

router.get('/getUsersForGroup/:email', async (req, res) => {
  // const { groupID } = req.body;
  // console.log('hi');
  const getUsersRes = await getAllUsersExceptCurrent(req.params.email);
  const { statusCode, body } = getUsersRes;
  res.status(statusCode).send(body);
});

module.exports = router;

const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getParams, s3 } = require('../services/s3Uploader');

const { getGroup, createGroup } = require('../controller/groupController');

const router = express.Router();

router.post('/createGroup', async (req, res) => {
  const groupDetails = req.body.groupObject;
  const { name } = groupDetails;
  const { email } = groupDetails;
  const createRes = await createGroup(name, email);
  if (createRes.statusCode === 201) {
    res.status(201).send({
      group: {
        name: createRes.body.dataValues.group_name,
        created_by: createRes.body.dataValues.created_by,
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

module.exports = router;

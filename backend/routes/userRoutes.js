const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createUser, getUserByCreds, getUser, updateUser,
} = require('../controller/userController');
// const { getGroup } = require('../controller/groupController');
// const s3Uploader = require('../services/s3Uploader');
const { getParams, s3 } = require('../services/s3Uploader');

const router = express.Router();

router.post('/register', async (req, res) => {
  const userDetails = req.body.userObject;
  const { name } = userDetails;
  const { email } = userDetails;
  const { password } = userDetails;
  const createRes = await createUser(name, email, password);
  if (createRes.statusCode === 201) {
    res.status(201).send({
      user: {
        email: createRes.body.dataValues.email,
        name: createRes.body.dataValues.name,
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

router.post('/login', async (req, res) => {
  const userCreds = req.body.userObject;
  const { email } = userCreds;
  const { password } = userCreds;
  let userDetails = await getUserByCreds(email);
  if (userDetails.statusCode === 200) {
    userDetails = userDetails.body.dataValues;
    bcrypt.compare(password, userDetails.password, (
      err,
      isMatch,
    ) => {
      console.log(bcrypt.hashSync(password, 10));
      // console.log(userDetails.password);
      if (err) {
        res.status(500).send({
          errors: {
            body: err,
          },
        });
      } else if (!isMatch) {
        res.status(403).send({
          errors: {
            body: 'Unauth User',
          },
        });
      } else {
        console.log('Successful log in');
        delete userDetails.password;
        res.status(200).send({
          user: userDetails,
        });
      }
    });
  } else {
    res.status(userDetails.statusCode).send({
      errors: {
        body: userDetails.body,
      },
    });
  }
});

router.post('/updateProfilePicture', upload.single('file'), async (req, res) => {
  // console.log(req.body);
  const { file } = req;
  const { ID } = req.body;
  console.log('file', file);
  // console.log('inside');
  const userDetails = await getUser(ID);
  // console.log(userDetails);
  if (userDetails.statusCode === 500 || userDetails.statusCode === 404) {
    res.status(500).send({
      errors: {
        body: userDetails.body,
      },
    });
  }
  // eslint-disable-next-line brace-style
  // else if (type === 'group') {
  //   const groupDetails = await getGroup(ID);
  //   if (groupDetails.statusCode === 500 || groupDetails.statusCode === 404) {
  //     res.status(500).send({
  //       errors: {
  //         body: groupDetails.body,
  //       },
  //     });
  //   }
  //   // eslint-disable-next-line no-unused-vars
  //   groupFlag = true;
  // }
  const params = getParams(ID, file.buffer, file.mimetype);

  s3.upload(params, async (err, data) => {
    if (err) {
      res.status(500).send({
        errors: {
          body: err,
        },
      });
    } else {
      const userUpdateRes = await updateUser(ID, { photo_URL: data.Location });
      if (userUpdateRes.statusCode === 200) {
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

module.exports = router;

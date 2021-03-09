const express = require('express');
const bcrypt = require('bcrypt');
const {
  createUser, getUserByCreds,
} = require('../controller/userController');

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

// module.exports = {
//   router,
// };

module.exports = router;

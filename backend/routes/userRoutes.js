const express = require('express');
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
  const userDetails = await getUserByCreds(email, password);
  if (userDetails.statusCode === 200) {
    res.status(200).send({
      user: userDetails.body.dataValues,
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

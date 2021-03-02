const express = require('express');
const { createUser, getUser, updateUser } = require('../controller/userController');

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
        email: createRes.body.email,
        name: createRes.body.name,
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

// module.exports = {
//   router,
// };

module.exports = router;

const express = require('express');
const { getActivities } = require('../controller/recentActivityController');

const router = express.Router();

router.get('/getRecentActivity/:email/:userID', async (req, res) => {
  const activitiesRes = await getActivities(req.params.userID);
  console.log(activitiesRes);
  if (activitiesRes.statusCode === 200) {
    res.status(200).send({
      body: activitiesRes.body,
    });
  } else {
    res.status(500).send({
      errors: {
        body: activitiesRes.body,
      },
    });
  }
});

module.exports = router;

const express = require('express');
const { getActivities } = require('../controller/recentActivityController');

const router = express.Router();

router.get('/getRecentActivity/:userId', async (req, res) => {
  const activitiesRes = await getActivities(req.params.userId);
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

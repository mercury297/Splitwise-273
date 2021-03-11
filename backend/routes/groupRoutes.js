const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const { getParams, s3 } = require('../services/s3Uploader');

const { getGroup } = require('../controller/groupController');

const router = express.Router();

module.exports = router;
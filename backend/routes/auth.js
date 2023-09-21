const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/refresh-access-token', authController.refreshAccessToken);

module.exports = router;
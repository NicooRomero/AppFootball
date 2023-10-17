const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

router.get('/:id', notificationsController.getNotifications);
router.delete('/:id', notificationsController.deleteInvitation);

module.exports = router;
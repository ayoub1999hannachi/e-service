const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Send a message
router.post('/send', messageController.createMessage);

// Get messages between two users
router.get('user/:senderId/:receiverId', messageController.getMessagesBetweenUsers);
router.get('/:userId', messageController.getAllMessagesForUser);
module.exports = router;

const MessageService = require('../services/messageService');
const mongoose = require('mongoose');

exports.createMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;
    const newMessage = await MessageService.createMessage(sender, receiver, content);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

exports.getMessagesBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    const messages = await MessageService.getMessagesBetweenUsers(senderId, receiverId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};


// Get all messages where the user is either the sender or the receiver
exports.getAllMessagesForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await MessageService.getAllMessagesForUser(userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages', error });
  }
};

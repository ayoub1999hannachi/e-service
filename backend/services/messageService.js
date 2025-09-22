const Message = require('../models/Message');

const mongoose = require('mongoose');

exports.createMessage = async (senderId, receiverId, content) => {
  const newMessage = new Message({
    sender: senderId,
    receiver: receiverId,
    content,
  });
  return await newMessage.save();
};

exports.getMessagesBetweenUsers = async (senderId, receiverId) => {
  return await Message.find({
    $or: [
      { sender: senderId, receiver: receiverId },
      { sender: receiverId, receiver: senderId }
    ]
  }).sort({ timestamp: 1 });
};




exports.getAllMessagesForUser = async (userId) => {
  // Fetch all messages where the user is either the sender or the receiver
  return await Message.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate('sender', 'fullname email')   // Populate the sender's name and email
    .populate('receiver', 'fullname email') // Populate the receiver's name and email
    .sort({ timestamp: 1 }); // Sort messages by timestamp
};
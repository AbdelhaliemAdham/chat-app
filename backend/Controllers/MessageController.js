const messageModel = require("../Models/messageModel");

const createMessage = async (req, res) => {
  const { text, chatId, senderId } = req.body;

  if (!text || !chatId || !senderId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const message = new messageModel({
      text,
      chatId,
      senderId,
    });
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  const chatId = req.params.chatId;

  if (!chatId) {
    return res.status(400).json({ message: "Chat ID is required." });
  }

  try {
    const messages = await messageModel.find({ chatId });
    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: "No messages found for this chat ID." });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, createMessage };

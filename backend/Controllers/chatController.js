const chatModal = require("../Models/chatModel");

const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;

    const chat = await chatModal
      .findOne({
        members: { $all: [firstId, secondId] },
      })
      .lean();

    if (chat) return res.status(200).json(chat);

    const newChat = new chatModal({
      members: [firstId, secondId],
    });

    const response = await newChat.save();

    return res.status(200).json(response.toObject());
  } catch (error) {
    console.error(error); // Log the error
    return res.status(500).json({ message: error.message });
  }
};

const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;

    const chat = await chatModal
      .findOne({
        members: { $all: [firstId, secondId] },
      })
      .lean();

    if (chat) {
      return res.status(200).json(chat);
    } else {
      return res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const findUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const chats = await chatModal
      .find({
        members: { $all: [userId] },
      })
      .lean();
    if (chats.length > 0) {
      return res.status(200).json(chats);
    } else {
      return res.status(404).json({ message: "No chats found for this user." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createChat, findChat, findUserChats };

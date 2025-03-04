const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../Controllers/MessageController");
const router = express.Router();

router.post("/", createMessage);
router.get("/find/:chatId", getMessages);

module.exports = router;

const express = require("express");
const {
  registerUser,
  loginUser,
  findUserById,
  findAllUsers,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUserById);
router.get("/", findAllUsers);

module.exports = router;

const userModal = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await userModal.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    if (password.length <= 6 || password.length >= 20)
      return res.status(400).json({
        message:
          "Password should be more than 6 characters and not more than 20",
      });

    if (!email || !password || !name)
      return res.status(400).json({ message: "Please fill all fields" });

    user = new userModal({ email, password, name });
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, token, user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required." });
    }
    let user = await userModal.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = createToken(user._id);
    res.status(200).json({
      _id: user._id,
      token,
      user: { name: user.name, email, password },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModal.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userModal.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, findUserById, findAllUsers };

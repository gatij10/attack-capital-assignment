const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { email, password, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ email, passwordHash: hashedPassword, username });
    await newUser.save();
    res.status(201).send("User registered");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token });
  } else {
    res.status(400).send("Invalid credentials");
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { register, login, getAllUsers };

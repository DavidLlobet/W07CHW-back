const chalk = require("chalk");
const debug = require("debug")("user:controller");
const bcrypt = require("bcrypt");
const User = require("../../database/models/user");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    error.code = 400;
    error.message = "Cannot get the users";
    next(error);
  }
};

const userSignUp = async (req, res, next) => {
  const newUser = req.body;
  const user = await User.findOne({ username: newUser.username });
  if (user) {
    debug(chalk.redBright("Username already taken"));
    const error = new Error("Username already taken");
    error.code = 400;
    next(error);
  } else {
    newUser.name = newUser.name ? newUser.name : "";
    newUser.friends = [];
    newUser.enemies = [];
    newUser.image = newUser.image ? newUser.image : "";
    newUser.imageLocal = newUser.imageLocal ? newUser.imageLocal : "";
    newUser.bio = newUser.bio ? newUser.bio : "";
    newUser.password = await bcrypt.hash(newUser.password, 10);
    User.create(newUser);
    res.json().status(200);
  }
};

module.exports = {
  getAllUsers,
  userSignUp,
};

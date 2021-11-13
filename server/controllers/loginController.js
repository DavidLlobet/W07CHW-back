require("dotenv").config();
const debug = require("debug")("user:controller");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    debug(chalk.red("Wrong credentials"));
    const error = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      debug(chalk.red("Wrong password"));
      const error = new Error("Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          admin: user.admin,
        },
        process.env.SERVER_PORT,
        {
          expiresIn: 72 * 60 * 60,
        }
      );
      res.json({ token });
    }
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
    try {
      const password = await bcrypt.hash(newUser.password, 10);

      const createUser = await User.create({
        username: newUser.username,
        password,
        name: newUser.name,
        age: newUser.age,
        bio: newUser.bio,
        image: "url",
        imageLocal: "url",
        friends: [],
        enemies: [],
      });
      debug(chalk.blue("New user registered"));
      res.json(createUser);
    } catch {
      const error = new Error("Cannot register");
      error.code = 400;
      next(error);
    }
  }
};

module.exports = { userLogin, userSignUp };

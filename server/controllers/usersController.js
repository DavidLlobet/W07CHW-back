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

module.exports = {
  getAllUsers,
};

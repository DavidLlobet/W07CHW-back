const { Schema, Types, model } = require("mongoose");

const userSignUpSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    max: 130,
    min: 16,
  },
  bio: {
    type: String,
    required: true,
    maxLength: 100,
  },
  image: {
    type: String,
    required: true,
  },
  imageLocal: {
    type: String,
    required: true,
  },
  friends: {
    type: [Types.ObjectId],
    ref: "Users",
    required: true,
  },
  enemies: {
    type: [Types.ObjectId],
    ref: "Users",
    required: true,
  },
});

const User = model("User", userSignUpSchema);

module.exports = User;

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

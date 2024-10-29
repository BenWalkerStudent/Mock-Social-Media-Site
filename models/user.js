const mongoose = require("mongoose");
const { scheduler } = require("timers/promises");
const { use } = require("../routes/connect");
const { type } = require("os");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: {
    type: Array,
    required: true,
  },
});

module.exports = userSchema;

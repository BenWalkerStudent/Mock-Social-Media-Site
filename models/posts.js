const mongoose = require("mongoose");
const { scheduler } = require("timers/promises");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  }, // Title of the post
  content: String, // Main content of the post
  author: {
    userId: String, // Reference to the user who created the post
    username: String, // Username of the author
  },
  createdAt: Date, // Date and time the post was created
});

module.exports = mongoose.model("postSchema", postSchema);

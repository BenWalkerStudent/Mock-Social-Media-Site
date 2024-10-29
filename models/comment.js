const mongoose = require("mongoose");
const { scheduler } = require("timers/promises");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  parentId: String,
  author: {
    userId: String, // Reference to the user who made the comment
    username: String, // Username of the commenter
    profileImageUrl: String, // Optional profile image URL of the commenter
  },
  content: String, // The comment text
  createdAt: Date, // Date and time the comment was posted
});

module.exports = postSchema;

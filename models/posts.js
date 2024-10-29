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
  comments: [
    {
      author: {
        userId: String, // Reference to the user who made the comment
        username: String, // Username of the commenter
        profileImageUrl: String, // Optional profile image URL of the commenter
      },
      content: String, // The comment text
      createdAt: Date, // Date and time the comment was posted
      updatedAt: Date, // Date and time the comment was last updated
    },
  ],
});

module.exports = mongoose.model("postSchema", postSchema);

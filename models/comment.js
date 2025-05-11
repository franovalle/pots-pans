//Note using this repo as a guide: https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/controllers/comments.js
//Note to self: I want to use this to allow the hospital to claim the donation 
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({ //this is for the accept 
  commentText: {
    type: String,
    required: true,
  },
  /*likes: {
    type: Number,
    required: true,
  },*/
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
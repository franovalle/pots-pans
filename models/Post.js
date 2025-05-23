
//Note using repo https://github.com/100devs/binary-upload-boom/blob/main/views/feed.ejs and repo https://github.com/Resilient-Labs/quick-pound-2025a/blob/main/routes/comments.js as a guide


const mongoose = require("mongoose");


const PostSchema = new mongoose.Schema({
  org: {
    type: String,
    require: true,
  },
  item: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
    note: {
    type: String,
    require: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);

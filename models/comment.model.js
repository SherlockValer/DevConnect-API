const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: {type: String, maxlength: [2200, "character limit exceeded"]},
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

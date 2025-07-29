const Comment = require("../models/comment.model.js");
const { catchAsync } = require("../utils/catchAsync.js");

const createComment = catchAsync(async (req, res) => {
  const comment = await Comment.create({
    project: req.params.projectId,
    user: req.user.id,
    text: req.body.text,
  });

  res.status(201).json({ status: "success", comment });
});

const getComments = catchAsync(async (req, res) => {
  const comments = await Comment.find({
    project: req.params.projectId,
  })
    .sort({ createdAt: -1 })
    .populate("user", "name avatar");

  res.status(200).json({ status: "success", comments });
});

module.exports = { createComment, getComments };

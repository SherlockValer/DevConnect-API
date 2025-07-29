const express = require("express");
const Comment = require("../models/comment.model.js");
const {
  createComment,
  getComments,
} = require("../controllers/comment.controller.js");

const router = express.Router();

router.post("/:projectId/comments", createComment);

router.get("/:projectId/comments", getComments);

module.exports = router;

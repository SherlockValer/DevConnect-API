const User = require("../models/user.model.js");
const Project = require("../models/project.model.js");
const { catchAsync } = require("../utils/catchAsync.js");

const search = catchAsync(async (req, res) => {
  const { query } = req.query;

  const users = await User.find({ name: new RegExp(query, "i") });
  const projects = await Project.find({ title: new RegExp(query, "i") });

  res.status(200).json({ status: "success", users, projects });
});

module.exports = search;

const { catchAsync } = require("../utils/catchAsync.js");
const Project = require("../models/project.model.js");

const createProject = catchAsync(async (req, res) => {
  const newProject = await Project.create({ ...req.body, user: req.user.id });
  res.status(201).json({ status: "success", newProject });
});

const getProjects = catchAsync(async (req, res) => {
  const projects = await Project.find().populate("user", "name avatar");
  res.status(200).json({ status: "success", projects });
});

const getProjectById = catchAsync(async (req, res) => {
  const project = await Project.findById(req.params.id).populate(
    "user",
    "name avatar"
  );
  res.status(200).json({ status: "success", project });
});

module.exports = { createProject, getProjects, getProjectById };

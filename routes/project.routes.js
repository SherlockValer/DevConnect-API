const express = require("express");
const {
  createProject,
  getProjects,
  getProjectById,
} = require("../controllers/project.controller.js");

const router = express.Router();

router.post("/", createProject);

router.get("/", getProjects);

router.get("/:id", getProjectById);

module.exports = router;


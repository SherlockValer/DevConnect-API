const express = require("express");
const { getUser, updateProfile } = require("../controllers/user.controller.js");

const router = express.Router();

router.get("/me", getUser);

router.put("/me", updateProfile);

module.exports = router;

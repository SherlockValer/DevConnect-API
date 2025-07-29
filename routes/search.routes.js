const express = require("express");
const search = require("../controllers/search.controller.js");

const router = express.Router();

router.get("/", search);

module.exports = router;


const express = require("express");
const router = express.Router();
const { getBestsellers } = require("../controllers/bestsellerController");

// GET /api/bestsellers
router.get("/", getBestsellers);

module.exports = router;
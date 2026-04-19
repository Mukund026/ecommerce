const express = require("express");
const router = express.Router();
const { getAccessories } = require("../controllers/accessoriesController");

router.get("/", getAccessories);

module.exports = router;

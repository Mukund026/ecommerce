const express = require("express");
const router = express.Router();
const { getSmartphones, getSmartphoneById } = require("../controllers/smartphoneController");

// GET /api/smartphones
router.get("/", getSmartphones);

// GET /api/smartphones/:id
router.get("/:id", getSmartphoneById);

module.exports = router;

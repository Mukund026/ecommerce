const express = require("express");
const router = express.Router();
const { getToys, getToyById, getTopToyBrands } = require("../controllers/toysController");

// GET /api/toys
router.get("/", getToys);

// GET /api/toys/brands
router.get("/brands", getTopToyBrands);

// GET /api/toys/:id
router.get("/:id", getToyById);

module.exports = router;

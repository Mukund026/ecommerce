const express = require("express");
const router = express.Router();
const { getComputers, getComputerById, getBrands } = require("../controllers/computersController");

// GET /api/computers
router.get("/", getComputers);

// GET /api/computers/brands
router.get("/brands", getBrands);

// GET /api/computers/:id
router.get("/:id", function(req, res, next) {
  if (req.params.id === "brands") {
    return next("route");
  }
  getComputerById(req, res, next);
});

module.exports = router;

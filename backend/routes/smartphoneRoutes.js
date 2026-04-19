const express = require("express");
const router = express.Router();
const { getSmartphones, getSmartphoneById, getBrands } = require("../controllers/smartphoneController");
const { getAccessories } = require("../controllers/accessoriesController");

// GET /api/smartphones
router.get("/", getSmartphones);

// GET /api/smartphones/accessories
router.get("/accessories", getAccessories);

// GET /api/smartphones/brands
router.get("/brands", getBrands);

// GET /api/smartphones/:id
router.get("/:id", function(req, res, next) {
  if (req.params.id === "brands" || req.params.id === "accessories") {
    return next("route");
  }
  getSmartphoneById(req, res, next);
});

module.exports = router;

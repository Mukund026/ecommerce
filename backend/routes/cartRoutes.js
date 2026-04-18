const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart
} = require("../controllers/cartController");

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/:productId", protect, removeFromCart);
router.put("/:productId", protect, updateCartItem);
router.delete("/", protect, clearCart);

module.exports = router;

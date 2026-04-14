const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createOrder, getMyOrders, updateOrderStatus} = require("../controllers/orderController");
const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, createOrder);

router.put("/:id/status", protect, adminOnly, updateOrderStatus);

router.get("/my-orders", protect, getMyOrders);

module.exports = router;
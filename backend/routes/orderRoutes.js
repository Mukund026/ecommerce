const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createOrder, getMyOrders, updateOrderStatus} = require("../controllers/orderController");
const adminOnly = require("../middleware/adminMiddleware");



/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order placed successfully
 */
router.post("/", protect, createOrder);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.put("/:id/status", protect, adminOnly, updateOrderStatus);


/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     parameters:
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 */
router.get("/my-orders", protect, getMyOrders);

module.exports = router;
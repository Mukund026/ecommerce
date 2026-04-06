const express = require("express");
const router = express.Router();
const protect = require("../middleware/adminMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

/**
  * /api/admin/stats:
 *   get:
 *     summary: Get admin dashboard stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;
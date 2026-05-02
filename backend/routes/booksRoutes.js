const express = require("express");
const router = express.Router();
const { getBooks, getBookById, getBookCategories } = require("../controllers/booksController");

// GET /api/books
router.get("/", getBooks);

// GET /api/books/categories
router.get("/categories", getBookCategories);

// GET /api/books/:id
router.get("/:id", getBookById);

module.exports = router;

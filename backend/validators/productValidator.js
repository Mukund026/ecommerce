const { body } = require("express-validator");

exports.createProductValidator = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").nonEmpty().withMessage("Product price is required").isNumeric().withMessage("Product price must be a number"),
  body("description").notEmpty().withMessage("Product description is required"),
  body("category").notEmpty().withMessage("Product category is required"),
]
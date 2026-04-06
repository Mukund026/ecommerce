const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../middleware/asyncHandler");
const { successResponse } = require("../utils/successResponse");

// Register a new user
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user with role (default to "customer")
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "customer"
  });

  // Generate JWT token
  const token = generateToken(user);

  // Respond
  successResponse(res, 201, { user, token }, "User registered successfully");
});

// Login a user
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user);
    successResponse(res, 200, { user, token }, "Login successful");
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Get user profile
exports.getProfile = asyncHandler(async (req, res) => {
  successResponse(res, 200, req.user, "User profile fetched successfully");
});


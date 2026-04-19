const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const bestsellerRoutes = require("./routes/bestsellerRoutes");
const smartphoneRoutes = require("./routes/smartphoneRoutes");

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
  }),
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Static images
app.use(
  "/accessoriesimages",
  express.static(path.join(__dirname, "accessoriesimages")),
);

// ✅ Static images
app.use(
  "/accessoriesimages",
  express.static(path.join(__dirname, "accessoriesimages")),
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many login attempts, please try again later",
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/accessories", require("./routes/accessoriesRoutes"));
app.use("/api/smartphones", smartphoneRoutes);
app.use("/api/bestsellers", bestsellerRoutes);

const errorController = require("./middleware/errorMiddleware");
app.use(errorController);

module.exports = app;

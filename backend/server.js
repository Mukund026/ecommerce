require("dotenv").config({ path: __dirname + "/.env" });
const app = require("./app");
const connectdb = require("./config/db");

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectdb();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening at port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();

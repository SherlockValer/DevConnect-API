const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const projectRoutes = require("./routes/project.routes.js");
const commentRoutes = require("./routes/comment.routes.js");
const searchRoutes = require("./routes/search.routes.js");
const globalErrorHandler = require("./middlewares/error.middleware.js");
const protect = require("./middlewares/auth.middleware.js");

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  })
);
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", protect, userRoutes);
app.use("/api/v1/projects", protect, projectRoutes);
app.use("/api/v1/projects", protect, commentRoutes);
app.use("/api/v1/search", protect, searchRoutes);

// Error handling middleware
app.use(globalErrorHandler);

// DB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, { dbName: "v1" })
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log("Server running on port 5001");
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

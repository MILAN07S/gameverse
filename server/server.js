const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const gameRoutes = require("./routes/gameRoutes");

const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    limit: "10mb",
    extended: true,
  })
);


// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "GameVerse API is running",
  });
});


// =========================
// API ROUTES
// =========================

// Authentication
app.use("/api/auth", authRoutes);

// Reviews
app.use("/api/reviews", reviewRoutes);

// Public categories
app.use("/api/categories", categoryRoutes);

// Public games
app.use("/api/games", gameRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Admin categories
app.use("/api/admin/categories", categoryRoutes);


// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `GameVerse server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(
      "MongoDB error:",
      error.message
    );
  });
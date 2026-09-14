const express = require("express");
const User = require("../models/User");
const Review = require("../models/Review");

const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/stats", adminOnly, async (req, res) => {
  try {
    const users = await User.countDocuments();
    const reviews = await Review.countDocuments();

    res.json({
      users,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch admin statistics.",
    });
  }
});

module.exports = router;